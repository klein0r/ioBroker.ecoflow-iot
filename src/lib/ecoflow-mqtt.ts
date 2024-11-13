import mqtt from 'mqtt';
import { EventEmitter } from 'node:events';
import { EcoflowApi } from './ecoflow-api';

export namespace EcoflowMqtt {
    type LocalEventTypes = {
        credentialUpdate: [mqttCredentials: MqttCredentials];
        newParamsEvent: [sn: string, moduleType: string, params: Record<string, any>];
    };

    class TypedEventEmitter<TEvents extends Record<string, any>> {
        private emitter = new EventEmitter();

        public emit<TEventName extends keyof TEvents & string>(eventName: TEventName, ...eventArg: TEvents[TEventName]): void {
            this.emitter.emit(eventName, ...(eventArg as []));
        }

        public on<TEventName extends keyof TEvents & string>(eventName: TEventName, handler: (...eventArg: TEvents[TEventName]) => void): void {
            this.emitter.on(eventName, handler as any);
        }

        public off<TEventName extends keyof TEvents & string>(eventName: TEventName, handler: (...eventArg: TEvents[TEventName]) => void): void {
            this.emitter.off(eventName, handler as any);
        }
    }

    export type MqttCredentials = {
        user: string;
        password: string;
        url: string;
        port: number;
        protocol: 'mqtt' | 'mqtts';
    };

    export class Client extends TypedEventEmitter<LocalEventTypes> {
        private logger: ioBroker.Log;
        private ecoFlowApiClient: EcoflowApi.Client;

        private mqttPublishId: number;
        private mqttClient?: mqtt.MqttClient;
        private mqttCredentials?: MqttCredentials;

        public constructor(logger: ioBroker.Log, apiClient: EcoflowApi.Client, mqttCredentials?: MqttCredentials) {
            super();

            this.logger = logger;
            this.ecoFlowApiClient = apiClient;
            this.mqttCredentials = mqttCredentials;

            this.mqttPublishId = 1;
        }

        public async init(snList: Array<string>): Promise<void> {
            let mqttCredentials = this.mqttCredentials;
            if (!mqttCredentials) {
                mqttCredentials = await this.generateNewCredentials();
            }

            try {
                this.mqttClient = await this.getMqttClient(mqttCredentials, snList);
            } catch (err) {
                this.logger.error(`Mqtt client init failed: ${err}`);
            }
        }

        private async generateNewCredentials(): Promise<MqttCredentials> {
            const apiCertificateAcquisition = await this.ecoFlowApiClient.getCertificateAcquisition();
            const mqttCredentials = {
                user: apiCertificateAcquisition.certificateAccount,
                password: apiCertificateAcquisition.certificatePassword,
                url: apiCertificateAcquisition.url,
                port: Number(apiCertificateAcquisition.port),
                protocol: apiCertificateAcquisition.protocol,
            };

            this.mqttCredentials = mqttCredentials;
            this.emit('credentialUpdate', mqttCredentials);

            return mqttCredentials;
        }

        private async getMqttClient(mqttCredentials: MqttCredentials, snList: Array<string>): Promise<mqtt.MqttClient> {
            const mqttClient = mqtt.connect({
                protocol: mqttCredentials.protocol,
                host: mqttCredentials.url,
                port: mqttCredentials.port,
                username: mqttCredentials.user,
                password: mqttCredentials.password,
            });

            this.logger.info(`MQTT client connected to ${mqttCredentials.url}:${mqttCredentials.port} (user: ${mqttCredentials.user})`);

            for (const sn of snList) {
                await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/quota`);
                this.logger.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/quota`);

                await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/set_reply`);
                this.logger.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/set_reply`);
            }

            mqttClient.on('message', (topic, message) => {
                this.logger.debug(`[MQTT client] Received message on topic ${topic}: ${message}`);

                // Find matching device
                for (const sn of snList) {
                    // this.log.debug(`[MQTT client] Searching ${sn} in topic ${topic}`);
                    if (topic.includes(sn)) {
                        try {
                            const payload = message.toString();
                            const payloadObj = JSON.parse(payload);

                            if (topic.endsWith('/quota')) {
                                // Update state values
                                this.emit('newParamsEvent', sn, payloadObj.moduleType, payloadObj.params);
                            } else if (topic.endsWith('/set_reply')) {
                                // TODO?

                                this.logger.debug(`Received set reply: ${payload}`);
                            }
                        } catch {}
                    }
                }
            });

            return mqttClient;
        }

        public async publishChange(sn: string, moduleType: string, operateType: string, params: Record<string, any>): Promise<void> {
            if (this.mqttClient && this.mqttCredentials) {
                const payload = {
                    id: this.mqttPublishId++,
                    version: '1.0',
                    moduleType: parseInt(moduleType),
                    operateType,
                    params,
                };

                await this.mqttClient.publishAsync(`/open/${this.mqttCredentials.user}/${sn}/set`, JSON.stringify(payload));
                this.logger.debug(`[publishChange] Sent to ${sn}: ${JSON.stringify(payload)}`);
            }
        }
    }
}
