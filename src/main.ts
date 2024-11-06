/*
 * Created with @iobroker/create-adapter v2.6.5
 */
import * as utils from '@iobroker/adapter-core';
import { EcoflowApi } from './lib/ecoflow-api';

class EcoflowIot extends utils.Adapter {
    private apiConnected: boolean;
    private ecoFlowApiClient: EcoflowApi.Client | null;

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'ecoflow-iot',
        });

        this.apiConnected = false;
        this.ecoFlowApiClient = null;

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    private async onReady(): Promise<void> {
        this.setApiConnected(false);

        this.ecoFlowApiClient = new EcoflowApi.Client(this.config.accessKey, this.config.secretKey);

        const deviceList = await this.ecoFlowApiClient.getDeviceList();
        for (const device of deviceList) {
            this.log.debug(device.sn);
        }

        await this.subscribeStatesAsync('*');
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

    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (id && state && !state.ack) {
            const idNoNamespace = this.removeNamespace(id);

            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        }
    }

    public removeNamespace(id: string): string {
        const re = new RegExp(this.namespace + '*\\.', 'g');
        return id.replace(re, '');
    }

    private async onUnload(callback: () => void): Promise<void> {
        try {
            await this.setApiConnected(false);

            callback();
        } catch (e) {
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