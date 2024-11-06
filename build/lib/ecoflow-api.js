"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ecoflow_api_exports = {};
__export(ecoflow_api_exports, {
  EcoflowApi: () => EcoflowApi
});
module.exports = __toCommonJS(ecoflow_api_exports);
var import_axios = __toESM(require("axios"));
var import_node_crypto = __toESM(require("node:crypto"));
var EcoflowApi;
((EcoflowApi2) => {
  class Client {
    logger;
    axiosInstance = void 0;
    accessKey;
    secretKey;
    constructor(logger, accessKey, secretKey) {
      this.logger = logger;
      this.accessKey = accessKey;
      this.secretKey = secretKey;
      this.axiosInstance = import_axios.default.create({
        baseURL: "https://api.ecoflow.com/",
        timeout: 3e3,
        validateStatus: (status) => {
          return [200].indexOf(status) > -1;
        },
        responseType: "json"
      });
    }
    flattenKeys(obj, prefix) {
      const getPrefix = (k) => {
        if (!prefix)
          return k;
        return Array.isArray(obj) ? `${prefix}[${k}]` : `${prefix}.${k}`;
      };
      let res = {};
      Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === "object") {
          res = { ...res, ...this.flattenKeys(obj[k], getPrefix(k)) };
        } else {
          res[getPrefix(k)] = obj[k];
        }
      });
      return res;
    }
    async apiRequestAsync(method, url, data) {
      const sha256 = (str, key) => import_node_crypto.default.createHmac("sha256", key).update(str).digest("hex");
      const nonce = String(1e5 + Math.floor(Math.random() * 1e5));
      const timestamp = String(Date.now());
      let dataStr = "";
      if (data) {
        const flatData = this.flattenKeys(data);
        const flatDataKeys = Object.keys(flatData);
        flatDataKeys.sort();
        dataStr = flatDataKeys.map((k) => `${k}=${flatData[k]}`).join("&") + "&";
      }
      const uri = `${dataStr}accessKey=${this.accessKey}&nonce=${nonce}&timestamp=${timestamp}`;
      const sign = sha256(uri, this.secretKey);
      const apiResponse = await this.axiosInstance.request({
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          accessKey: this.accessKey,
          nonce,
          timestamp,
          sign
        }
      });
      this.logger.debug(`Received ${apiResponse.status} from ${method} to ${url} (${uri}): ${JSON.stringify(apiResponse.data)}`);
      if (apiResponse.status === 200 && apiResponse.data.code == 0) {
        return apiResponse.data;
      }
      throw new Error(`${apiResponse.data.code}: ${apiResponse.data.message}`);
    }
    async getDeviceList() {
      const deviceListResponse = await this.apiRequestAsync("get", "/iot-open/sign/device/list");
      return deviceListResponse.data;
    }
    async getDeviceQuota(sn) {
      const quotaResponse = await this.apiRequestAsync("get", `/iot-open/sign/device/quota/all?sn=${sn}`);
      return quotaResponse.data;
    }
    async getCertificateAcquisition() {
      const certificationResponse = await this.apiRequestAsync("get", "/iot-open/sign/certification");
      return certificationResponse.data;
    }
  }
  EcoflowApi2.Client = Client;
})(EcoflowApi || (EcoflowApi = {}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EcoflowApi
});
//# sourceMappingURL=ecoflow-api.js.map
