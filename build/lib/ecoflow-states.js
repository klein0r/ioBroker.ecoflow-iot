"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ecoflow_states_exports = {};
__export(ecoflow_states_exports, {
  knownStates: () => knownStates
});
module.exports = __toCommonJS(ecoflow_states_exports);
const knownStates = {
  "pd.wattsInSum": {
    common: {
      desc: "Total input power",
      type: "number",
      unit: "W"
    }
  },
  "bms_emsStatus.maxChargeSoc": {
    common: {
      desc: "Maximum charging SOC",
      type: "number",
      unit: "%"
    }
  },
  "bms_bmsStatus.designCap": {
    common: {
      desc: "Design capacity",
      type: "number",
      unit: "mAh"
    }
  },
  "bms_bmsStatus.fullCap": {
    common: {
      desc: "Full capacity",
      type: "number",
      unit: "mAh"
    }
  },
  "bms_bmsStatus.temp": {
    common: {
      desc: "Temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "bms_bmsStatus.f32ShowSoc": {
    common: {
      desc: "Battery level SOC",
      type: "number",
      unit: "%"
    }
  },
  "pd.beepMode": {
    common: {
      desc: "BEEP mode",
      type: "number",
      states: {
        0: "normal",
        1: "silent"
      }
    }
  },
  "bms_bmsStatus.outputWatts": {
    common: {
      desc: "Output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.typec2Watts": {
    common: {
      desc: "Type-C 2 output power",
      type: "number",
      unit: "W"
    }
  },
  "inv.outputWatts": {
    common: {
      desc: "Discharging power",
      type: "number",
      unit: "W"
    }
  },
  "bms_bmsStatus.vol": {
    common: {
      desc: "Voltage",
      type: "number",
      unit: "V"
    }
  },
  "bms_emsStatus.chgVol": {
    common: {
      desc: "Charging voltage",
      type: "number",
      unit: "V"
    }
  },
  "inv.invOutFreq": {
    common: {
      desc: "Output frequency",
      type: "number",
      unit: "Hz"
    }
  },
  "mppt.inAmp": {
    common: {
      desc: "PV input current",
      type: "number",
      unit: "mA"
    }
  },
  "mppt.inVol": {
    common: {
      desc: "PV input voltage",
      type: "number",
      unit: "mV"
    }
  },
  "inv.fanState": {
    common: {
      desc: "Fan status",
      type: "number",
      states: {
        0: "disabled",
        1: "level 1",
        2: "level 2",
        3: "level 3"
      }
    }
  },
  "inv.cfgAcXboost": {
    common: {
      desc: "X-Boost switch",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "mppt.cfgAcEnabled": {
    common: {
      desc: "AC switch",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "inv.outTemp": {
    common: {
      desc: "Temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.usb1Watts": {
    common: {
      desc: "Common USB1 output power",
      type: "number",
      unit: "W"
    }
  },
  "mppt.dcdc12vAmp": {
    common: {
      desc: "DC 12 V 30 A output current",
      type: "number",
      unit: "mA"
    }
  },
  "inv.invOutVol": {
    common: {
      desc: "Inverter actual output voltage",
      type: "number",
      unit: "mV"
    }
  },
  /*
  'pd.extRj45Port': {
      common: {
          desc: 'RJ45 port: 0: NULL; 1: RC(BLE_CTL)',
          type: 'number',
      },
  },
  */
  "bms_emsStatus.chgAmp": {
    common: {
      desc: "Charging current",
      type: "number",
      unit: "A"
    }
  },
  /*
  'bms_bmsStatus.errCode': {
      common: {
          desc: 'Global error code',
          type: 'number',
      },
  },
  */
  "inv.inputWatts": {
    common: {
      desc: "Charging power",
      type: "number",
      unit: "W"
    }
  },
  "mppt.cfgAcOutVol": {
    common: {
      desc: "Output voltage configured for the inverter",
      type: "number",
      unit: "V"
    }
  },
  "bms_emsStatus.chgState": {
    common: {
      desc: "Charging status",
      type: "number"
    }
  },
  "bms_bmsStatus.inputWatts": {
    common: {
      desc: "Input power",
      type: "number",
      unit: "W"
    }
  },
  "bms_emsStatus.openBmsIdx": {
    common: {
      desc: "Battery pack enabling status",
      type: "number"
    }
  },
  "pd.typec2Temp": {
    common: {
      desc: "Type-C 2 temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.carUsedTime": {
    common: {
      desc: "CAR use time",
      type: "number",
      unit: "sec."
    }
  },
  "pd.typec1Watts": {
    common: {
      desc: "Type-C 1 output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.chgDsgState": {
    common: {
      desc: "Charging status on screen",
      type: "number",
      states: {
        1: "discharging",
        2: "charging"
      }
    }
  },
  "inv.chgPauseFlag": {
    common: {
      desc: "PV charging pause flag",
      type: "number"
    }
  },
  "inv.acInFreq": {
    common: {
      desc: "Inverter input frequency",
      type: "number",
      unit: "Hz"
    }
  },
  "mppt.carStandbyMin": {
    common: {
      desc: "Auto shutdown when there is no load",
      type: "number",
      unit: "min."
    }
  },
  "pd.soc": {
    common: {
      desc: "Display SOC",
      type: "number",
      unit: "%"
    }
  },
  "inv.invOutAmp": {
    common: {
      desc: "Inverter output current",
      type: "number",
      unit: "mA"
    }
  },
  "bms_emsStatus.fanLevel": {
    common: {
      desc: "Fan level",
      type: "number"
    }
  },
  "mppt.cfgAcOutFreq": {
    common: {
      desc: "Output frequency configured for the inverter",
      type: "number",
      unit: "Hz"
    }
  },
  "mppt.carOutVol": {
    common: {
      desc: "Car charger output voltage",
      type: "number",
      unit: "mV"
    }
  },
  "inv.dcInVol": {
    common: {
      desc: "DC input voltage",
      type: "number",
      unit: "mV"
    }
  },
  /*
  'pd.ext3p8Port': {
      common: {
          desc: '3+8 ports: 0: NULL; 1: CC; 2: PR; 3: SP (BC)',
          type: 'number',
      },
  },
  */
  "mppt.cfgAcXboost": {
    common: {
      desc: "X-Boost switch",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "pd.dsgPowerDC": {
    common: {
      desc: "Cumulative DC discharge capacity",
      type: "number",
      unit: "Wh"
    }
  },
  "inv.dcInAmp": {
    common: {
      desc: "DC input current",
      type: "number",
      unit: "mA"
    }
  },
  "pd.typecUsedTime": {
    common: {
      desc: "Type-C use time",
      type: "number",
      unit: "sec."
    }
  },
  "mppt.carOutAmp": {
    common: {
      desc: "Car charger output current",
      type: "number",
      unit: "mA"
    }
  },
  "bms_bmsStatus.remainCap": {
    common: {
      desc: "Remaining capacity",
      type: "number",
      unit: "mAh"
    }
  },
  "pd.brightLevel": {
    common: {
      desc: "LCD brightness level",
      type: "number"
    }
  },
  "inv.dcInTemp": {
    common: {
      desc: "DC temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "bms_emsStatus.maxAvailNum": {
    common: {
      desc: "Maximum available quantity",
      type: "number"
    }
  },
  "bms_emsStatus.maxCloseOilEb": {
    common: {
      desc: "Disable SOC of Smart Generator",
      type: "number"
    }
  },
  "mppt.dcdc12vVol": {
    common: {
      desc: "DC 12 V 30 A output voltage",
      type: "number",
      unit: "mV"
    }
  },
  "pd.wattsOutSum": {
    common: {
      desc: "Total output power",
      type: "number",
      unit: "W"
    }
  },
  "mppt.scrStandbyMin": {
    common: {
      desc: "Auto shutdown when there is no load",
      type: "number",
      unit: "min."
    }
  },
  "mppt.carOutWatts": {
    common: {
      desc: "Car charger output power",
      type: "number",
      unit: "W"
    }
  },
  "bms_emsStatus.f32LcdShowSoc": {
    common: {
      desc: "SoC value displayed on LCD",
      type: "number",
      unit: "%"
    }
  },
  "inv.cfgAcEnabled": {
    common: {
      desc: "AC switch",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "mppt.outVol": {
    common: {
      desc: "PV output voltage",
      type: "number",
      unit: "mV"
    }
  },
  "bms_emsStatus.paraVolMax": {
    common: {
      desc: "Maximum voltage when two devices work in parallel",
      type: "number",
      unit: "V"
    }
  },
  "mppt.chgType": {
    common: {
      desc: "Actual charging type",
      type: "number",
      states: {
        0: "null",
        1: "Adapter (adapter/DC power)",
        2: "MPPT (solar energy)",
        3: "AC (grid charging)",
        4: "Gas (petrol and electricity)",
        5: "Wind (wind power)"
      }
    }
  },
  /*
  'bms_bmsStatus.bmsFault': {
      common: {
          desc: 'BMS permanent fault',
          type: 'number',
      },
  },
  */
  "inv.acDipSwitch": {
    common: {
      desc: "AC fast/slow charging dip switch",
      type: "number",
      states: {
        0: "unknown",
        1: "fast charging",
        2: "slow charging"
      }
    }
  },
  "mppt.cfgChgType": {
    common: {
      desc: "Configured charging type - valid when xt60_chg_type is 0",
      type: "number",
      states: {
        0: "Auto",
        1: "MPPT",
        2: "Adapter"
      }
    }
  },
  "bms_emsStatus.paraVolMin": {
    common: {
      desc: "Minimum voltage when two devices work in parallel",
      type: "number",
      unit: "V"
    }
  },
  "inv.standbyMins": {
    common: {
      desc: "Auto shutdown when there is no load",
      type: "number",
      unit: "min."
    }
  },
  "inv.dischargeType": {
    common: {
      desc: "Discharging type",
      type: "number",
      states: {
        1: "AC discharging",
        2: "PR",
        3: "BC"
      }
    }
  },
  "pd.carState": {
    common: {
      desc: "CAR button status",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "mppt.chgState": {
    common: {
      desc: "Charging status",
      type: "number",
      states: {
        0: "off",
        1: "Charging",
        2: "Standby (during AC charging, DC charging stops)"
      }
    }
  },
  "pd.invUsedTime": {
    common: {
      desc: "Inverter use time",
      type: "number",
      unit: "sec."
    }
  },
  /*
  'bms_emsStatus.bmsWarState': {
      common: {
          desc: 'BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag',
          type: 'number',
      },
  },
  */
  "mppt.carState": {
    common: {
      desc: "Car charger switch status",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "mppt.dischargeType": {
    common: {
      desc: "Discharging type",
      type: "number",
      states: {
        1: "AC discharging",
        2: "PR",
        3: "BC"
      }
    }
  },
  "pd.typec1Temp": {
    common: {
      desc: "Type-C 1 temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.dcInUsedTime": {
    common: {
      desc: "DC charging time",
      type: "number",
      unit: "sec."
    }
  },
  "bms_bmsStatus.sysVer": {
    common: {
      desc: "System version",
      type: "number"
    }
  },
  "mppt.carTemp": {
    common: {
      desc: "Car charging temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.model": {
    common: {
      desc: "Product model",
      type: "number"
    }
  },
  "bms_bmsStatus.minCellVol": {
    common: {
      desc: "Minimum cell voltage",
      type: "number",
      unit: "mV"
    }
  },
  "mppt.outWatts": {
    common: {
      desc: "PV output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.wifiAutoRcvy": {
    common: {
      desc: "Wi-Fi mode on power on",
      type: "number",
      states: {
        0: "Default mode (STA)",
        1: "Restore last usage mode (STA/AP)"
      }
    }
  },
  "pd.remainTime": {
    common: {
      desc: "Time remaining before full charging / full discharge (if negative)",
      type: "number",
      unit: "min."
    }
  },
  "bms_bmsStatus.maxCellVol": {
    common: {
      desc: "Maximum cell voltage",
      type: "number",
      unit: "mV"
    }
  },
  "bms_bmsStatus.type": {
    common: {
      desc: "BMS type",
      type: "number",
      states: {
        1: "lithium battery",
        2: "oil-powered"
      }
    }
  },
  "bms_bmsStatus.maxCellTemp": {
    common: {
      desc: "Maximum cell temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "mppt.outAmp": {
    common: {
      desc: "PV output current",
      type: "number",
      unit: "mA"
    }
  },
  /*
  'pd.ext4p8Port': {
      common: {
          desc: '4+8 ports; only supports left port status identification: 0: NULL; 1: Extra battery; 2: Smart generator',
          type: 'number',
      },
  },
  */
  "bms_bmsStatus.cellId": {
    common: {
      desc: "Cell material LI/LFP/LA, battery capacity type",
      type: "number",
      states: {
        1: "2.5 Ah per battery",
        2: "2.0 Ah per battery"
      }
    }
  },
  "bms_bmsStatus.minMosTemp": {
    common: {
      desc: "Minimum MOS temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "mppt.chgPauseFlag": {
    common: {
      desc: "PV charging pause flag",
      type: "number"
    }
  },
  "bms_emsStatus.minOpenOilEb": {
    common: {
      desc: "Enable SOC of Smart Generator",
      type: "number"
    }
  },
  "mppt.acStandbyMins": {
    common: {
      desc: "Auto shutdown when there is no load",
      type: "number",
      unit: "min."
    }
  },
  "mppt.powStandbyMin": {
    common: {
      desc: "Auto shutdown when there is no load",
      type: "number",
      unit: "min."
    }
  },
  "inv.chargerType": {
    common: {
      desc: "Charger type",
      type: "number",
      states: {
        1: "AC charging",
        2: "DC adapter charging",
        3: "Solar charging",
        4: "CC",
        5: "BC"
      }
    }
  },
  "pd.chgSunPower": {
    common: {
      desc: "Cumulative solar charge capacity",
      type: "number",
      unit: "Wh"
    }
  },
  "pd.carTemp": {
    common: {
      desc: "CAR temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "bms_bmsStatus.bqSysStatReg": {
    common: {
      desc: "BQ hardware protection register",
      type: "number"
    }
  },
  "inv.acInAmp": {
    common: {
      desc: "Inverter input current",
      type: "number",
      unit: "mA"
    }
  },
  "bms_emsStatus.chgRemainTime": {
    common: {
      desc: "Remaining charging time",
      type: "number",
      unit: "min."
    }
  },
  "pd.dsgPowerAC": {
    common: {
      desc: "Cumulative AC power discharged",
      type: "number",
      unit: "Wh"
    }
  },
  "bms_bmsStatus.openBmsIdx": {
    common: {
      desc: "Battery pack enabling status",
      type: "number"
    }
  },
  "pd.qcUsb2Watts": {
    common: {
      desc: "qc_usb2 output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.wireWatts": {
    common: {
      desc: "Wireless charging output power",
      type: "number",
      unit: "W"
    }
  },
  "bms_bmsStatus.num": {
    common: {
      desc: "BMS number",
      type: "number"
    }
  },
  "pd.chgPowerAC": {
    common: {
      desc: "Cumulative AC charge (wall socket)",
      type: "number",
      unit: "Wh"
    }
  },
  "pd.lcdOffSec": {
    common: {
      desc: "LCD screen timeout",
      type: "number",
      unit: "sec."
    }
  },
  "bms_bmsStatus.soc": {
    common: {
      desc: "Battery level",
      type: "number",
      unit: "%"
    }
  },
  "inv.acInVol": {
    common: {
      desc: "Inverter input voltage",
      type: "number",
      unit: "mV"
    }
  },
  "inv.FastChgWatts": {
    common: {
      desc: "Maximum charging power for AC",
      type: "number",
      unit: "W"
    }
  },
  "inv.SlowChgWatts": {
    common: {
      desc: "Minimum charging power for AC",
      type: "number",
      unit: "W"
    }
  },
  "mppt.beepState": {
    common: {
      desc: "Buzzer status",
      type: "number",
      states: {
        0: "Default",
        1: "Silent mode"
      }
    }
  },
  "pd.sysVer": {
    common: {
      desc: "System version: 0x0102002F = V1.2.0.47",
      type: "number"
    }
  },
  "mppt.dc24vTemp": {
    common: {
      desc: "DCDC 24 V temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "bms_emsStatus.chgCmd": {
    common: {
      desc: "Charge command",
      type: "number"
    }
  },
  "bms_bmsStatus.tagChgAmp": {
    common: {
      desc: "Target charging current",
      type: "number",
      unit: "mA"
    }
  },
  "bms_bmsStatus.maxMosTemp": {
    common: {
      desc: "Maximum MOS temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "mppt.cfgChgWatts": {
    common: {
      desc: "AC maximum charging power",
      type: "number",
      unit: "W"
    }
  },
  "pd.qcUsb1Watts": {
    common: {
      desc: "qc_usb1 output power",
      type: "number",
      unit: "W"
    }
  },
  /*
  'pd.reserved': {
      common: {
          desc: 'Reserve 2 bytes',
          type: 'number',
      },
  },
  */
  "bms_bmsStatus.minCellTemp": {
    common: {
      desc: "Minimum cell temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.chgPowerDC": {
    common: {
      desc: "Cumulative DC charge (adapter)",
      type: "number",
      unit: "Wh"
    }
  },
  "pd.standbyMin": {
    common: {
      desc: "Standby auto shutdown time",
      type: "number",
      unit: "min.",
      min: 0,
      max: 5999
    }
  },
  "mppt.swVer": {
    common: {
      desc: "MPPT version number",
      type: "number"
    }
  },
  "inv.cfgAcOutFreq": {
    common: {
      desc: "Configured output frequency for inverter",
      type: "number",
      unit: "Hz"
    }
  },
  "mppt.x60ChgType": {
    common: {
      desc: "XT60 paddle status",
      type: "number",
      states: {
        0: "Not detected",
        1: "MPPT",
        2: "Adapter"
      }
    }
  },
  "bms_bmsStatus.soh": {
    common: {
      desc: "Health status SoH",
      type: "number",
      unit: "%"
    }
  },
  "inv.errCode": {
    common: {
      desc: "Global error code",
      type: "number"
    }
  },
  "bms_emsStatus.openUpsFlag": {
    common: {
      desc: "UPS mode enable flag",
      type: "number"
    }
  },
  "bms_emsStatus.minDsgSoc": {
    common: {
      desc: "Minimum discharge SoC",
      type: "number",
      unit: "%"
    }
  },
  "mppt.dcdc12vWatts": {
    common: {
      desc: "DC 12 V 30 A output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.usbqcUsedTime": {
    common: {
      desc: "USB QC use time",
      type: "number",
      unit: "sec."
    }
  },
  "pd.dcOutState": {
    common: {
      desc: "DC button status",
      type: "number",
      states: {
        0: "off",
        1: "on"
      }
    }
  },
  "bms_bmsStatus.remainTime": {
    common: {
      desc: "Time remaining",
      type: "number"
    }
  },
  "bms_emsStatus.emsIsNormalFlag": {
    common: {
      desc: "EMS status",
      type: "number",
      states: {
        0: "sleep",
        1: "normal"
      }
    }
  },
  "mppt.inWatts": {
    common: {
      desc: "PV input power",
      type: "number",
      unit: "W"
    }
  },
  "pd.usbUsedTime": {
    common: {
      desc: "USB use time",
      type: "number",
      unit: "sec."
    }
  },
  "pd.mpptUsedTime": {
    common: {
      desc: "MPPT use time",
      type: "number",
      unit: "sec."
    }
  },
  /*
  'inv.reserved': {
      common: {
          desc: 'Reserve 8 bytes',
          type: 'number',
      },
  },
  */
  "mppt.mpptTemp": {
    common: {
      desc: "MPPT temperature",
      type: "number",
      unit: "\xB0C"
    }
  },
  "pd.wifiRssi": {
    common: {
      desc: "Wi-Fi signal strength",
      type: "number"
    }
  },
  "bms_bmsStatus.amp": {
    common: {
      desc: "Current",
      type: "number",
      unit: "mA"
    }
  },
  "inv.invType": {
    common: {
      desc: "PSDR model code (corresponds to dip Switch and high-low voltage switch)",
      type: "number"
    }
  },
  "bms_emsStatus.lcdShowSoc": {
    common: {
      desc: "SoC value displayed on LCD",
      type: "number",
      unit: "%"
    }
  },
  "inv.cfgAcOutVol": {
    common: {
      desc: "Output voltage configured for the inverter",
      type: "number",
      unit: "V"
    }
  },
  "bms_emsStatus.bmsModel": {
    common: {
      desc: "BMS model",
      type: "number"
    }
  },
  "pd.errCode": {
    common: {
      desc: "Global error code",
      type: "number"
    }
  },
  "pd.carWatts": {
    common: {
      desc: "Car output power",
      type: "number",
      unit: "W"
    }
  },
  "pd.usb2Watts": {
    common: {
      desc: "Normal USB2 output power",
      type: "number",
      unit: "W"
    }
  },
  "mppt.dcChgCurrent": {
    common: {
      desc: "DC maximum charging current",
      type: "number",
      unit: "mA"
    }
  },
  "bms_emsStatus.dsgRemainTime": {
    common: {
      desc: "Remaining discharging time",
      type: "number",
      unit: "min."
    }
  },
  "inv.sysVer": {
    common: {
      desc: "System version",
      type: "number"
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  knownStates
});
//# sourceMappingURL=ecoflow-states.js.map
