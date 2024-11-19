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
var ecoflow_mqtt_exports = {};
__export(ecoflow_mqtt_exports, {
  EcoflowMqtt: () => EcoflowMqtt
});
module.exports = __toCommonJS(ecoflow_mqtt_exports);
var import_mqtt = __toESM(require("mqtt"));
var import_node_events = require("node:events");
var EcoflowMqtt;
((EcoflowMqtt2) => {
  class TypedEventEmitter {
    emitter = new import_node_events.EventEmitter();
    emit(eventName, ...eventArg) {
      this.emitter.emit(eventName, ...eventArg);
    }
    on(eventName, handler) {
      this.emitter.on(eventName, handler);
    }
    off(eventName, handler) {
      this.emitter.off(eventName, handler);
    }
  }
  class Client extends TypedEventEmitter {
    logger;
    ecoFlowApiClient;
    mqttPublishId;
    mqttClient;
    mqttCredentials;
    constructor(logger, apiClient, mqttCredentials) {
      super();
      this.logger = logger;
      this.ecoFlowApiClient = apiClient;
      this.mqttCredentials = mqttCredentials;
      this.mqttPublishId = 1;
    }
    async init(snList) {
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
    async generateNewCredentials() {
      const apiCertificateAcquisition = await this.ecoFlowApiClient.getCertificateAcquisition();
      const mqttCredentials = {
        user: apiCertificateAcquisition.certificateAccount,
        password: apiCertificateAcquisition.certificatePassword,
        url: apiCertificateAcquisition.url,
        port: Number(apiCertificateAcquisition.port),
        protocol: apiCertificateAcquisition.protocol
      };
      this.mqttCredentials = mqttCredentials;
      this.emit("credentialUpdate", mqttCredentials);
      return mqttCredentials;
    }
    async getMqttClient(mqttCredentials, snList) {
      const mqttClient = import_mqtt.default.connect({
        protocol: mqttCredentials.protocol,
        host: mqttCredentials.url,
        port: mqttCredentials.port,
        username: mqttCredentials.user,
        password: mqttCredentials.password
      });
      this.logger.info(`MQTT client connected to ${mqttCredentials.url}:${mqttCredentials.port} (user: ${mqttCredentials.user})`);
      for (const sn of snList) {
        await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/quota`);
        this.logger.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/quota`);
        await mqttClient.subscribeAsync(`/open/${mqttCredentials.user}/${sn}/set_reply`);
        this.logger.debug(`MQTT Client subscribed to /open/${mqttCredentials.user}/${sn}/set_reply`);
      }
      mqttClient.on("message", (topic, message) => {
        this.logger.debug(`[MQTT client] Received message on topic ${topic}: ${message}`);
        for (const sn of snList) {
          if (topic.includes(sn)) {
            try {
              const payload = message.toString();
              const payloadObj = JSON.parse(payload);
              if (topic.endsWith("/quota")) {
                this.emit("newParamsEvent", sn, payloadObj.moduleType, payloadObj.params);
              } else if (topic.endsWith("/set_reply")) {
                this.logger.debug(`Received set reply: ${payload}`);
              }
            } catch {
            }
          }
        }
      });
      return mqttClient;
    }
    async publishChange(sn, moduleType, operateType, params) {
      if (this.mqttClient && this.mqttCredentials) {
        const payload = {
          id: this.mqttPublishId++,
          version: "1.0",
          moduleType: parseInt(moduleType),
          operateType,
          params
        };
        await this.mqttClient.publishAsync(`/open/${this.mqttCredentials.user}/${sn}/set`, JSON.stringify(payload));
        this.logger.debug(`[publishChange] Sent to ${sn}: ${JSON.stringify(payload)}`);
      }
    }
  }
  EcoflowMqtt2.Client = Client;
})(EcoflowMqtt || (EcoflowMqtt = {}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EcoflowMqtt
});
//# sourceMappingURL=ecoflow-mqtt.js.map
