"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var utils = __toESM(require("@iobroker/adapter-core"));
var import_ecoflow_api = require("./lib/ecoflow-api");
var import_ecoflow_mqtt = require("./lib/ecoflow-mqtt");
var import_ecoflow_states = require("./lib/ecoflow-states");
class EcoflowIot extends utils.Adapter {
  apiConnected;
  ecoFlowApiClient;
  ecoFlowMqttClient;
  knownDevices;
  constructor(options = {}) {
    super({
      ...options,
      name: "ecoflow-iot"
    });
    this.apiConnected = false;
    this.knownDevices = {};
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }
  getEcoflowApiClient() {
    if (!this.ecoFlowApiClient) {
      this.ecoFlowApiClient = new import_ecoflow_api.EcoflowApi.Client(this.log, this.config.accessKey, this.config.secretKey);
    }
    return this.ecoFlowApiClient;
  }
  async onReady() {
    var _a, _b;
    this.setApiConnected(false);
    if (!this.config.accessKey || !this.config.secretKey) {
      this.log.error(`Access key and/or secret key is empty. Please check instance configuration and restart.`);
      if (typeof this.terminate === "function") {
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
      const moduleTypes = {
        pd: { moduleType: "1", prefix: "pd" },
        bms: { moduleType: "2", prefix: "bms_bmsStatus" },
        inv: { moduleType: "3", prefix: "inv" },
        bms_slave: { moduleType: "4", prefix: "bms_emsStatus" },
        mppt: { moduleType: "5", prefix: "mppt" }
      };
      await this.extendObject(`devices.${device.sn}`, {
        type: "device",
        common: {
          name: device.productName,
          desc: device.sn
        },
        native: {
          sn: device.sn
        }
      });
      this.knownDevices[device.sn] = {};
      for (const [type, config] of Object.entries(moduleTypes)) {
        this.knownDevices[device.sn][config.moduleType] = {};
        const objIdPrefix = `devices.${device.sn}.${type}`;
        await this.extendObject(objIdPrefix, {
          type: "channel",
          common: {
            name: `${config.prefix} (${config.moduleType})`
          },
          native: {}
        });
        const moduleTypeQuota = Object.keys(deviceQuota).filter((quota) => quota.startsWith(`${config.prefix}.`));
        for (const quota of moduleTypeQuota) {
          const valueType = typeof deviceQuota[quota];
          if (valueType === "number") {
            const quotaId = quota.replace(`${config.prefix}.`, "");
            const efState = Object.hasOwn(import_ecoflow_states.knownStates, quota) ? import_ecoflow_states.knownStates[quota] : {};
            const objId = `${objIdPrefix}.${quotaId}`;
            this.knownDevices[device.sn][config.moduleType][quotaId] = {
              objId,
              valueType
            };
            await this.extendObject(objId, {
              type: "state",
              common: {
                name: quota,
                role: "value",
                type: "number",
                read: true,
                write: false,
                ...(_a = efState == null ? void 0 : efState.common) != null ? _a : {}
              },
              native: {
                sn: device.sn,
                quota,
                moduleType: config.moduleType,
                ...(_b = efState == null ? void 0 : efState.native) != null ? _b : {}
              }
            });
            await this.setState(objId, { val: deviceQuota[quota], ack: true });
          }
        }
      }
    }
    const mqttCredentials = await this.getStoredMqttClientCredentials();
    this.ecoFlowMqttClient = new import_ecoflow_mqtt.EcoflowMqtt.Client(this.log, this.getEcoflowApiClient(), mqttCredentials);
    this.ecoFlowMqttClient.on("credentialUpdate", (mqttCredentials2) => this.updateMqttClientCredentials(mqttCredentials2));
    this.ecoFlowMqttClient.on("newParamsEvent", (sn, moduleType, params) => {
      var _a2, _b2;
      for (const [param, val] of Object.entries(params)) {
        const quotaDescription = (_b2 = (_a2 = this.knownDevices[sn]) == null ? void 0 : _a2[moduleType]) == null ? void 0 : _b2[param];
        if (quotaDescription) {
          const valueType = typeof val;
          if (valueType === "number" && valueType === quotaDescription.valueType) {
            this.log.silly(`[MQTT client] Setting ${quotaDescription.objId} to ${val}`);
            this.setState(quotaDescription.objId, {
              val: Number(val),
              ack: true
            });
          }
        }
      }
    });
    this.ecoFlowMqttClient.init(Object.keys(this.knownDevices));
    await this.subscribeStatesAsync("*");
  }
  async getStoredMqttClientCredentials() {
    const mqttStates = await this.getStatesAsync("mqtt.*");
    let isValid = true;
    const checkIDs = ["user", "password", "url", "port", "protocol"];
    for (const checkID of checkIDs) {
      const checkState = mqttStates[`${this.namespace}.mqtt.${checkID}`];
      if (!checkState || !checkState.val) {
        isValid = false;
      }
    }
    if (!isValid) {
      this.log.info("Stored MQTT credentials are empty oder invalid. Recreating new information.");
      return void 0;
    }
    return {
      user: String(mqttStates[`${this.namespace}.mqtt.user`].val),
      password: String(mqttStates[`${this.namespace}.mqtt.password`].val),
      url: String(mqttStates[`${this.namespace}.mqtt.url`].val),
      port: Number(mqttStates[`${this.namespace}.mqtt.port`].val),
      protocol: mqttStates[`${this.namespace}.mqtt.protocol`].val == "mqtts" ? "mqtts" : "mqtt"
    };
  }
  async updateMqttClientCredentials(mqttCredentials) {
    await this.setStateChangedAsync("mqtt.user", { val: mqttCredentials.user, ack: true });
    await this.setStateChangedAsync("mqtt.password", { val: mqttCredentials.password, ack: true });
    await this.setStateChangedAsync("mqtt.url", { val: mqttCredentials.url, ack: true });
    await this.setStateChangedAsync("mqtt.port", { val: mqttCredentials.port, ack: true });
    await this.setStateChangedAsync("mqtt.protocol", { val: mqttCredentials.protocol, ack: true });
  }
  async setApiConnected(connection) {
    if (connection !== this.apiConnected) {
      await this.setStateChangedAsync("info.connection", { val: connection, ack: true });
      this.apiConnected = connection;
      if (connection) {
        this.log.debug("API is online");
      } else {
        this.log.debug("API is offline");
      }
    }
  }
  async onStateChange(id, state) {
    var _a, _b, _c, _d, _e, _f;
    if (id && state && !state.ack) {
      const idNoNamespace = this.removeNamespace(id);
      if (idNoNamespace.startsWith("devices.")) {
        const stateObj = await this.getObjectAsync(id);
        const sn = (_a = stateObj == null ? void 0 : stateObj.native) == null ? void 0 : _a.sn;
        const operateType = (_b = stateObj == null ? void 0 : stateObj.native) == null ? void 0 : _b.operateType;
        const operateParamName = (_c = stateObj == null ? void 0 : stateObj.native) == null ? void 0 : _c.operateParamName;
        const moduleType = stateObj == null ? void 0 : stateObj.native.moduleType;
        if (sn && operateType && moduleType) {
          this.log.info(`${idNoNamespace} changed to ${state.val} - perform change of operateType ${operateType}, moduleType ${moduleType} for ${sn}`);
          const operateParams = {
            [operateParamName]: state.val
          };
          const objList = await this.getObjectViewAsync("system", "state", {
            startkey: `${this.namespace}.devices.${sn}.`,
            endkey: `${this.namespace}.devices.${sn}.\u9999`,
            include_docs: true
          });
          for (const obj of objList.rows) {
            if (obj.id !== id) {
              const testModuleType = (_d = obj.value.native) == null ? void 0 : _d.moduleType;
              const testOperateType = (_e = obj.value.native) == null ? void 0 : _e.operateType;
              const testOperateParamName = (_f = obj.value.native) == null ? void 0 : _f.operateParamName;
              if (testModuleType == moduleType && testOperateType == operateType && testOperateParamName) {
                const additionalState = await this.getForeignStateAsync(obj.id);
                if (additionalState) {
                  operateParams[testOperateParamName] = additionalState.val;
                }
              }
            }
          }
          if (this.ecoFlowMqttClient) {
            await this.ecoFlowMqttClient.publishChange(sn, moduleType, operateType, operateParams);
          }
        }
      }
    }
  }
  removeNamespace(id) {
    const re = new RegExp(this.namespace + "*\\.", "g");
    return id.replace(re, "");
  }
  async onUnload(callback) {
    try {
      await this.setApiConnected(false);
      if (this.ecoFlowMqttClient) {
      }
      callback();
    } catch {
      callback();
    }
  }
}
if (require.main !== module) {
  module.exports = (options) => new EcoflowIot(options);
} else {
  (() => new EcoflowIot())();
}
//# sourceMappingURL=main.js.map
