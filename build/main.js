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
var import_mqtt = __toESM(require("mqtt"));
var import_ecoflow_api = require("./lib/ecoflow-api");
var import_ecoflow_states = require("./lib/ecoflow-states");
class EcoflowIot extends utils.Adapter {
  apiConnected;
  ecoFlowApiClient;
  knownDevices;
  mqttConnection;
  constructor(options = {}) {
    super({
      ...options,
      name: "ecoflow-iot"
    });
    this.apiConnected = false;
    this.ecoFlowApiClient = null;
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
    var _a;
    this.setApiConnected(false);
    if (!this.config.accessKey || !this.config.secretKey) {
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
                quota,
                moduleType: config.moduleType
              }
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
    }
    mqttClient.on("message", (topic, message) => {
      var _a2;
      this.log.debug(`[MQTT client] Received message on topic ${topic}: ${message}`);
      for (const [sn, quota] of Object.entries(this.knownDevices)) {
        this.log.debug(`[MQTT client] Searching ${sn} in topic ${topic}`);
        if (topic.includes(sn)) {
          try {
            const payload = message.toString();
            const payloadObj = JSON.parse(payload);
            for (const [param, val] of Object.entries(payloadObj.params)) {
              const quotaDescription = (_a2 = quota == null ? void 0 : quota[payloadObj.moduleType]) == null ? void 0 : _a2[param];
              if (quotaDescription) {
                const valueType = typeof val;
                if (valueType === "number" && valueType === quotaDescription.valueType) {
                  this.log.debug(`[MQTT client] Setting ${quotaDescription.objId} to ${val}`);
                  this.setState(quotaDescription.objId, {
                    val: Number(val),
                    ack: true,
                    c: topic
                  });
                }
              }
            }
          } catch {
          }
        }
      }
    });
    await this.subscribeStatesAsync("*");
  }
  async getMqttConnection() {
    if (!this.mqttConnection) {
      const mqttCredentials = await this.getMqttClientCredentials();
      const mqttClient = import_mqtt.default.connect({
        protocol: mqttCredentials.protocol,
        host: mqttCredentials.url,
        port: mqttCredentials.port,
        username: mqttCredentials.user,
        password: mqttCredentials.password
      });
      this.log.info(`MQTT Client connected to ${mqttCredentials.url}:${mqttCredentials.port} (user: ${mqttCredentials.user})`);
      await this.setApiConnected(true);
      this.mqttConnection = {
        client: mqttClient,
        credentials: mqttCredentials
      };
    }
    return this.mqttConnection;
  }
  async getMqttClientCredentials(forceRecreate) {
    if (forceRecreate) {
      const ecoFlowApiClient = this.getEcoflowApiClient();
      const certificate = await ecoFlowApiClient.getCertificateAcquisition();
      await this.setState("mqtt.user", { val: certificate.certificateAccount, ack: true });
      await this.setState("mqtt.password", { val: certificate.certificatePassword, ack: true });
      await this.setState("mqtt.url", { val: certificate.url, ack: true });
      await this.setState("mqtt.port", { val: Number(certificate.port), ack: true });
      await this.setState("mqtt.protocol", { val: certificate.protocol, ack: true });
    }
    const mqttStates = await this.getStatesAsync("mqtt.*");
    return {
      user: String(mqttStates[`${this.namespace}.mqtt.user`].val),
      password: String(mqttStates[`${this.namespace}.mqtt.password`].val),
      url: String(mqttStates[`${this.namespace}.mqtt.url`].val),
      port: Number(mqttStates[`${this.namespace}.mqtt.port`].val),
      protocol: mqttStates[`${this.namespace}.mqtt.protocol`].val == "mqtts" ? "mqtts" : "mqtt"
    };
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
  onStateChange(id, state) {
    if (id && state && !state.ack) {
      this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
    }
  }
  removeNamespace(id) {
    const re = new RegExp(this.namespace + "*\\.", "g");
    return id.replace(re, "");
  }
  async onUnload(callback) {
    try {
      await this.setApiConnected(false);
      if (this.mqttConnection) {
        await this.mqttConnection.client.endAsync();
        this.mqttConnection = void 0;
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
