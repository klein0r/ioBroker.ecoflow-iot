/*
 * Created with @iobroker/create-adapter v2.6.5
 */
import * as utils from '@iobroker/adapter-core';
import mqtt from 'mqtt';
import { EcoflowApi } from './lib/ecoflow-api';
import { knownStates as efKnownStates } from './lib/ecoflow-states';

type QuotaDescription = {
    valueType: string;
    objId: string;
};

type ModuleTypeDescription = Record<string, QuotaDescription>;

type DeviceDescription = Record<string, ModuleTypeDescription>;

type MqttCredentials = {
    user: string;
    password: string;
    url: string;
    port: number;
    protocol: 'mqtt' | 'mqtts';
};

class EcoflowIot extends utils.Adapter {
    private mqttPublishId: number;
    private apiConnected: boolean;
    private ecoFlowApiClient: EcoflowApi.Client | null;
    private knownDevices: Record<string /* sn */, DeviceDescription>;
    private mqttConnection?: { client: mqtt.MqttClient; credentials: MqttCredentials };

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'ecoflow-iot',
        });

        this.mqttPublishId = 1;
        this.apiConnected = false;
        this.ecoFlowApiClient = null;
        this.knownDevices = {};

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    private getEcoflowApiClient(): EcoflowApi.Client {
        if (!this.ecoFlowApiClient) {
            this.ecoFlowApiClient = new EcoflowApi.Client(this.log, this.config.accessKey, this.config.secretKey);
        }

        return this.ecoFlowApiClient;
    }

    private async onReady(): Promise<void> {
        this.setApiConnected(false);

        if (!this.config.accessKey || !this.config.secretKey) {
            this.log.error(`Access key and/or secret key is empty. Please check instance configuration and restart.`);

            if (typeof this.terminate === 'function') {
                this.terminate(11);
            } else {
                process.exit(11);
            }

            return;
        }

        const ecoFlowApiClient = this.getEcoflowApiClient();

        const deviceList = await ecoFlowApiClient.getDeviceList();
        for (const device of deviceList) {
            this.log.debug(`[onReady] Found device ${device.sn}: ${device.productName} (online: ${device.online})`);

            const deviceQuota = await ecoFlowApiClient.getDeviceQuota(device.sn);

            const moduleTypes: Record<string, { moduleType: string; prefix: string }> = {
                pd: { moduleType: '1', prefix: 'pd' },
                bms: { moduleType: '2', prefix: 'bms_bmsStatus' },
                inv: { moduleType: '3', prefix: 'inv' },
                bms_slave: { moduleType: '4', prefix: 'bms_emsStatus' },
                mppt: { moduleType: '5', prefix: 'mppt' },
            };

            await this.extendObject(`devices.${device.sn}`, {
                type: 'device',
                common: {
                    name: device.productName,
                    desc: device.sn,
                },
                native: {
                    sn: device.sn,
                },
            });

            this.knownDevices[device.sn] = {};

            for (const [type, config] of Object.entries(moduleTypes)) {
                this.knownDevices[device.sn][config.moduleType] = {};

                const objIdPrefix = `devices.${device.sn}.${type}`;

                await this.extendObject(objIdPrefix, {
                    type: 'channel',
                    common: {
                        name: `${config.prefix} (${config.moduleType})`,
                    },
                    native: {},
                });

                const moduleTypeQuota = Object.keys(deviceQuota).filter((quota) => quota.startsWith(`${config.prefix}.`));

                for (const quota of moduleTypeQuota) {
                    const valueType = typeof deviceQuota[quota];
                    // TODO: Other types?
                    if (valueType === 'number') {
                        const quotaId = quota.replace(`${config.prefix}.`, '');
                        const efState = Object.hasOwn(efKnownStates, quota) ? efKnownStates[quota] : {};
                        const objId = `${objIdPrefix}.${quotaId}`;

                        this.knownDevices[device.sn][config.moduleType][quotaId] = {
                            objId,
                            valueType,
                        };

                        await this.extendObject(objId, {
                            type: 'state',
                            common: {
                                name: quota,
                                role: 'value',
                                type: 'number',
                                read: true,
                                write: false,
                                ...(efState?.common ?? {}),
                            },
                            native: {
                                sn: device.sn,
                                quota,
                                moduleType: config.moduleType,
                                ...(efState?.native ?? {}),
                            },
                        });

                        await this.setState(objId, { val: deviceQuota[quota], ack: true });
                    }
                }
            }
        }

        const mqttConnection = await this.getMqttConnection();
        const mqttCredentials = mqttConnection.credentials;
        const mqttClient = mqttConnection.client;

        this.log.info(`MQTT Client connected to ${mqttCredentials.url}:${mqttCredentials.port} (user: ${mqttCredentials.user})`);

        for (const sn of Object.keys(this.knownDevices)) {
            await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/quota`);
            this.log.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/quota`);

            await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/set_reply`);
            this.log.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/set_reply`);
        }

        mqttClient.on('message', (topic, message) => {
            this.log.debug(`[MQTT client] Received message on topic ${topic}: ${message}`);

            // Find matching device
            for (const [sn, quota] of Object.entries(this.knownDevices)) {
                // this.log.debug(`[MQTT client] Searching ${sn} in topic ${topic}`);
                if (topic.includes(sn)) {
                    try {
                        const payload = message.toString();
                        const payloadObj = JSON.parse(payload);

                        if (topic.endsWith('/quota')) {
                            // Update state values

                            for (const [param, val] of Object.entries(payloadObj.params)) {
                                const quotaDescription = quota?.[payloadObj.moduleType]?.[param];
                                if (quotaDescription) {
                                    const valueType = typeof val;
                                    if (valueType === 'number' && valueType === quotaDescription.valueType) {
                                        this.log.silly(`[MQTT client] Setting ${quotaDescription.objId} to ${val}`);

                                        this.setState(quotaDescription.objId, {
                                            val: Number(val),
                                            ack: true,
                                            c: topic,
                                        });
                                    }
                                }
                            }
                        } else if (topic.endsWith('/set_reply')) {
                            // TODO

                            this.log.info(`Received set reply: ${payload}`);
                        }
                    } catch {}
                }
            }
        });

        await this.subscribeStatesAsync('*');
    }

    private async getMqttConnection(): Promise<{ client: mqtt.MqttClient; credentials: MqttCredentials }> {
        if (!this.mqttConnection) {
            const mqttCredentials = await this.getMqttClientCredentials();
            const mqttClient = mqtt.connect({
                protocol: mqttCredentials.protocol,
                host: mqttCredentials.url,
                port: mqttCredentials.port,
                username: mqttCredentials.user,
                password: mqttCredentials.password,
            });

            this.log.info(`MQTT Client connected to ${mqttCredentials.url}:${mqttCredentials.port} (user: ${mqttCredentials.user})`);

            await this.setApiConnected(true);

            this.mqttConnection = {
                client: mqttClient,
                credentials: mqttCredentials,
            };
        }

        return this.mqttConnection;
    }

    private async getMqttClientCredentials(forceRecreate?: boolean): Promise<MqttCredentials> {
        if (forceRecreate) {
            const ecoFlowApiClient = this.getEcoflowApiClient();
            const certificate = await ecoFlowApiClient.getCertificateAcquisition();

            await this.setState('mqtt.user', { val: certificate.certificateAccount, ack: true });
            await this.setState('mqtt.password', { val: certificate.certificatePassword, ack: true });
            await this.setState('mqtt.url', { val: certificate.url, ack: true });
            await this.setState('mqtt.port', { val: Number(certificate.port), ack: true });
            await this.setState('mqtt.protocol', { val: certificate.protocol, ack: true });
        }

        const mqttStates = await this.getStatesAsync('mqtt.*');
        return {
            user: String(mqttStates[`${this.namespace}.mqtt.user`].val),
            password: String(mqttStates[`${this.namespace}.mqtt.password`].val),
            url: String(mqttStates[`${this.namespace}.mqtt.url`].val),
            port: Number(mqttStates[`${this.namespace}.mqtt.port`].val),
            protocol: mqttStates[`${this.namespace}.mqtt.protocol`].val == 'mqtts' ? 'mqtts' : 'mqtt',
        };
    }

    private async setApiConnected(connection: boolean): Promise<void> {
        if (connection !== this.apiConnected) {
            await this.setStateChangedAsync('info.connection', { val: connection, ack: true });
            this.apiConnected = connection;

            if (connection) {
                // API was offline - refresh all states
                this.log.debug('API is online');
            } else {
                this.log.debug('API is offline');
            }
        }
    }

    private async publishChange(sn: string, moduleType: string, operateType: string, params: Record<string, any>): Promise<void> {
        const mqttConnection = await this.getMqttConnection();
        const mqttCredentials = mqttConnection.credentials;

        const payload = {
            id: this.mqttPublishId++,
            version: '1.0',
            moduleType: parseInt(moduleType),
            operateType,
            params,
        };

        await mqttConnection.client.publishAsync(`/open/${mqttCredentials.user}/${sn}/set`, JSON.stringify(payload));

        this.log.debug(`[publishChange] Sent to ${sn}: ${JSON.stringify(payload)}`);
    }

    private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
        if (id && state && !state.ack) {
            const idNoNamespace = this.removeNamespace(id);

            if (idNoNamespace.startsWith('devices.')) {
                // Device operation

                const stateObj = await this.getObjectAsync(id);
                const sn = stateObj?.native?.sn;
                const operateType = stateObj?.native?.operateType;
                const operateParamName = stateObj?.native?.operateParamName;
                const moduleType = stateObj?.native.moduleType;

                if (sn && operateType && moduleType) {
                    this.log.info(`${idNoNamespace} changed to ${state.val} - perform change of operateType ${operateType}, moduleType ${moduleType} for ${sn}`);

                    const operateParams = {
                        [operateParamName]: state.val,
                    };

                    // Find more values for same operateType
                    const objList = await this.getObjectViewAsync('system', 'state', {
                        startkey: `${this.namespace}.devices.${sn}.`,
                        endkey: `${this.namespace}.devices.${sn}.\u9999`,
                        include_docs: true,
                    });

                    for (const obj of objList.rows) {
                        if (obj.id !== id) {
                            const testModuleType = obj.value.native?.moduleType;
                            const testOperateType = obj.value.native?.operateType;
                            const testOperateParamName = obj.value.native?.operateParamName;

                            if (testModuleType == moduleType && testOperateType == operateType && testOperateParamName) {
                                const additionalState = await this.getForeignStateAsync(obj.id);
                                if (additionalState) {
                                    operateParams[testOperateParamName] = additionalState.val;
                                }
                            }
                        }
                    }

                    await this.publishChange(sn, moduleType, operateType, operateParams);
                }
            }
        }
    }

    public removeNamespace(id: string): string {
        const re = new RegExp(this.namespace + '*\\.', 'g');
        return id.replace(re, '');
    }

    private async onUnload(callback: () => void): Promise<void> {
        try {
            await this.setApiConnected(false);

            if (this.mqttConnection) {
                await this.mqttConnection.client.endAsync();
                this.mqttConnection = undefined;
            }

            callback();
        } catch {
            callback();
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new EcoflowIot(options);
} else {
    // otherwise start the instance directly
    (() => new EcoflowIot())();
}
