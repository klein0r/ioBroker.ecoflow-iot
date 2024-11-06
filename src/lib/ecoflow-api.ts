import crypto from 'node:crypto';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export namespace EcoflowApi {

    export type EcoFlowDevice = {
        sn: string;
        online: number;
        productName: string;
    }

    export type EcoFlowCertification = {
        certificateAccount: string;
        certificatePassword: string;
        url: string;
        port: string;
        protocol: string;
    }

    export class Client {
        private logger: ioBroker.Log;
        private axiosInstance: AxiosInstance | undefined = undefined;
        private accessKey: string;
        private secretKey: string;

        public constructor(logger: ioBroker.Log, accessKey: string, secretKey: string) {
            this.logger = logger;

            this.accessKey = accessKey;
            this.secretKey = secretKey;

            this.axiosInstance = axios.create({
                baseURL: 'https://api.ecoflow.com/',
                timeout: 3000,
                validateStatus: (status) => {
                    return [200].indexOf(status) > -1;
                },
                responseType: 'json',
            });
        }

        private flattenKeys(obj: Record<string, any>, prefix?: string): Record<string, any> {
            const getPrefix = (k: string): string => {
                if (!prefix) return k;
                return (Array.isArray(obj)) ? `${prefix}[${k}]` : `${prefix}.${k}`;
            };

            let res: Record<string, any> = {};

            Object.keys(obj).forEach(k => {
                if (typeof obj[k] === 'object') {
                    res = { ...res, ...this.flattenKeys(obj[k], getPrefix(k)) };
                } else {
                    res[getPrefix(k)] = obj[k];
                }
            });

            return res;
        }

        private async apiRequestAsync(method: 'get'|'post'|'put', url: string, data?: Object) {
            const sha256 = (str: string, key: string) => crypto.createHmac('sha256', key).update(str).digest('hex');

            const nonce = String(100000 + Math.floor(Math.random() * 100000));
            const timestamp = String(Date.now());

            // Generate data string (sorted by keys)
            let dataStr = '';
            if (data) {
                const flatData = this.flattenKeys(data);
                const flatDataKeys = Object.keys(flatData);
                flatDataKeys.sort();

                dataStr = flatDataKeys.map(k => `${k}=${flatData[k]}`).join('&') + '&';
            }

            const uri = `${dataStr}accessKey=${this.accessKey}&nonce=${nonce}&timestamp=${timestamp}`;
            const sign = sha256(uri, this.secretKey);

            const apiResponse = await this.axiosInstance!.request(
                {
                    method,
                    url,
                    data,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        accessKey: this.accessKey,
                        nonce,
                        timestamp,
                        sign,
                    },
                }
            );

            this.logger.debug(`Received ${apiResponse.status} from ${method} to ${url} (${uri}): ${JSON.stringify(apiResponse.data)}`);

            if (apiResponse.status === 200 && apiResponse.data.code == 0) {
                return apiResponse.data;
            } else if (apiResponse.data.code) {
                throw new Error(`${apiResponse.data.code}: ${apiResponse.data.message}`);
            }
        }

        public async getDeviceList(): Promise<Array<EcoFlowDevice>> {
            const deviceListResponse = await this.apiRequestAsync('get', '/iot-open/sign/device/list');

            return deviceListResponse.data;
        }

        public async getCertificateAcquisition(): Promise<EcoFlowCertification> {
            const certificationResponse = await this.apiRequestAsync('get', '/iot-open/sign/certification');

            return certificationResponse.data;
        }
    }
}