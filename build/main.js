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
var import_ecoflow_states = require("./lib/ecoflow-states");
class EcoflowIot extends utils.Adapter {
  apiConnected;
  ecoFlowApiClient;
  constructor(options = {}) {
    super({
      ...options,
      name: "ecoflow-iot"
    });
    this.apiConnected = false;
    this.ecoFlowApiClient = null;
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }
  async onReady() {
    this.setApiConnected(false);
    this.ecoFlowApiClient = new import_ecoflow_api.EcoflowApi.Client(this.log, this.config.accessKey, this.config.secretKey);
    const deviceList = await this.ecoFlowApiClient.getDeviceList();
    for (const device of deviceList) {
      this.log.debug(`[onReady] Found device ${device.sn}: ${device.productName} (online: ${device.online})`);
      const deviceQuota = await this.ecoFlowApiClient.getDeviceQuota(device.sn);
      const moduleTypes = {
        PD: { moduleType: 1, prefix: "pd" },
        BMS: { moduleType: 2, prefix: "bms_emsStatus" },
        INV: { moduleType: 3, prefix: "inv" },
        BMS_SLAVE: { moduleType: 4, prefix: "bms_bmsStatus" },
        MPPT: { moduleType: 5, prefix: "mppt" }
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
      for (const [type, config] of Object.entries(moduleTypes)) {
        await this.extendObject(`devices.${device.sn}.${type}`, {
          type: "channel",
          common: {
            name: `${type} (${config.moduleType})`
          },
          native: {}
        });
        if (config.prefix) {
          const moduleTypeQuota = Object.keys(deviceQuota).filter((quota) => quota.startsWith(`${config.prefix}.`));
          for (const quota of moduleTypeQuota) {
            const quotaId = quota.replace(`${config.prefix}.`, "");
            const efState = Object.hasOwn(import_ecoflow_states.knownStates, quota) ? import_ecoflow_states.knownStates[quota].common : {};
            await this.extendObject(`devices.${device.sn}.${type}.${quotaId}`, {
              type: "state",
              common: {
                name: quota,
                role: "value",
                type: "mixed",
                read: true,
                write: false,
                ...efState
              },
              native: {
                quota,
                moduleType: config.moduleType
              }
            });
            await this.setState(`devices.${device.sn}.${type}.${quotaId}`, { val: deviceQuota[quota], ack: true });
          }
        }
      }
    }
    await this.subscribeStatesAsync("*");
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
