export const knownStates: Record<string, ioBroker.PartialStateObject> = {
    'pd.wattsInSum': {
        common: {
            desc: 'Total input power',
            unit: 'W',
        },
    },
    'bms_emsStatus.maxChargeSoc': {
        common: {
            desc: 'Maximum charging SOC',
            unit: '%',
        },
    },
    'bms_bmsStatus.designCap': {
        common: {
            desc: 'Design capacity',
            unit: 'mAh',
        },
    },
    'bms_bmsStatus.fullCap': {
        common: {
            desc: 'Full capacity',
            unit: 'mAh',
        },
    },
    'bms_bmsStatus.temp': {
        common: {
            desc: 'Temperature',
            unit: '°C',
        },
    },
    'bms_bmsStatus.f32ShowSoc': {
        common: {
            desc: 'Battery level SOC',
            unit: '%',
        },
    },
    'pd.beepMode': {
        common: {
            desc: 'BEEP mode',
            states: {
                0: 'normal',
                1: 'silent',
            },
        },
    },
    'bms_bmsStatus.outputWatts': {
        common: {
            desc: 'Output power',
            unit: 'W',
        },
    },
    'pd.typec2Watts': {
        common: {
            desc: 'Type-C 2 output power',
            unit: 'W',
        },
    },
    'inv.outputWatts': {
        common: {
            desc: 'Discharging power',
            unit: 'W',
        },
    },
    'bms_bmsStatus.vol': {
        common: {
            desc: 'Voltage',
            unit: 'V',
        },
    },
    'bms_emsStatus.chgVol': {
        common: {
            desc: 'Charging voltage',
            unit: 'V',
        },
    },
    'inv.invOutFreq': {
        common: {
            desc: 'Output frequency',
            unit: 'Hz',
        },
    },
    'mppt.inAmp': {
        common: {
            desc: 'PV input current',
            unit: 'mA',
        },
    },
    'mppt.inVol': {
        common: {
            desc: 'PV input voltage',
            unit: 'mV',
        },
    },
    'inv.fanState': {
        common: {
            desc: 'Fan status',
            states: {
                0: 'disabled',
                1: 'level 1',
                2: 'level 2',
                3: 'level 3',
            },
        },
    },
    'inv.cfgAcXboost': {
        common: {
            desc: 'X-Boost switch',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.cfgAcEnabled': {
        common: {
            desc: 'AC switch',
            states: {
                0: 'off',
                1: 'on',
            },
            write: true,
        },
        native: {
            operateType: 'acChgCfg',
            operateParamName: 'enabled',
        },
    },
    'mppt.cfgAcOutFreq': {
        common: {
            desc: 'Output frequency configured for the inverter',
            unit: 'Hz',
            // write: true,
        },
        native: {
            operateType: 'acChgCfg',
            operateParamName: 'out_freq',
        },
    },
    'mppt.cfgAcOutVol': {
        common: {
            desc: 'Output voltage configured for the inverter',
            unit: 'V',
            // write: true,
        },
        native: {
            operateType: 'acChgCfg',
            operateParamName: 'out_voltage',
        },
    },
    'mppt.cfgAcXboost': {
        common: {
            desc: 'X-Boost switch',
            states: {
                0: 'off',
                1: 'on',
            },
            write: true,
        },
        native: {
            operateType: 'acChgCfg',
            operateParamName: 'xboost',
        },
    },
    'inv.outTemp': {
        common: {
            desc: 'Temperature',
            unit: '°C',
        },
    },
    'pd.usb1Watts': {
        common: {
            desc: 'Common USB1 output power',
            unit: 'W',
        },
    },
    'mppt.dcdc12vAmp': {
        common: {
            desc: 'DC 12 V 30 A output current',
            unit: 'mA',
        },
    },
    'inv.invOutVol': {
        common: {
            desc: 'Inverter actual output voltage',
            unit: 'mV',
        },
    },
    /*
    'pd.extRj45Port': {
        common: {
            desc: 'RJ45 port: 0: NULL; 1: RC(BLE_CTL)',
        },
    },
    */
    'bms_emsStatus.chgAmp': {
        common: {
            desc: 'Charging current',
            unit: 'A',
        },
    },
    /*
    'bms_bmsStatus.errCode': {
        common: {
            desc: 'Global error code',
        },
    },
    */
    'inv.inputWatts': {
        common: {
            desc: 'Charging power',
            unit: 'W',
        },
    },
    'bms_emsStatus.chgState': {
        common: {
            desc: 'Charging status',
        },
    },
    'bms_bmsStatus.inputWatts': {
        common: {
            desc: 'Input power',
            unit: 'W',
        },
    },
    'bms_emsStatus.openBmsIdx': {
        common: {
            desc: 'Battery pack enabling status',
        },
    },
    'pd.typec2Temp': {
        common: {
            desc: 'Type-C 2 temperature',
            unit: '°C',
        },
    },
    'pd.carUsedTime': {
        common: {
            desc: 'CAR use time',
            unit: 'sec.',
        },
    },
    'pd.typec1Watts': {
        common: {
            desc: 'Type-C 1 output power',
            unit: 'W',
        },
    },
    'pd.chgDsgState': {
        common: {
            desc: 'Charging status on screen',
            states: {
                1: 'discharging',
                2: 'charging',
            },
        },
    },
    'inv.chgPauseFlag': {
        common: {
            desc: 'PV charging pause flag',
        },
    },
    'inv.acInFreq': {
        common: {
            desc: 'Inverter input frequency',
            unit: 'Hz',
        },
    },
    'mppt.carStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            unit: 'min.',
        },
    },
    'pd.soc': {
        common: {
            desc: 'Display SOC',
            unit: '%',
        },
    },
    'inv.invOutAmp': {
        common: {
            desc: 'Inverter output current',
            unit: 'mA',
        },
    },
    'bms_emsStatus.fanLevel': {
        common: {
            desc: 'Fan level',
        },
    },
    'mppt.carOutVol': {
        common: {
            desc: 'Car charger output voltage',
            unit: 'mV',
        },
    },
    'inv.dcInVol': {
        common: {
            desc: 'DC input voltage',
            unit: 'mV',
        },
    },
    /*
    'pd.ext3p8Port': {
        common: {
            desc: '3+8 ports: 0: NULL; 1: CC; 2: PR; 3: SP (BC)',
        },
    },
    */
    'pd.dsgPowerDC': {
        common: {
            desc: 'Cumulative DC discharge capacity',
            unit: 'Wh',
        },
    },
    'inv.dcInAmp': {
        common: {
            desc: 'DC input current',
            unit: 'mA',
        },
    },
    'pd.typecUsedTime': {
        common: {
            desc: 'Type-C use time',
            unit: 'sec.',
        },
    },
    'mppt.carOutAmp': {
        common: {
            desc: 'Car charger output current',
            unit: 'mA',
        },
    },
    'bms_bmsStatus.remainCap': {
        common: {
            desc: 'Remaining capacity',
            unit: 'mAh',
        },
    },
    'pd.brightLevel': {
        common: {
            desc: 'LCD brightness level',
        },
    },
    'inv.dcInTemp': {
        common: {
            desc: 'DC temperature',
            unit: '°C',
        },
    },
    'bms_emsStatus.maxAvailNum': {
        common: {
            desc: 'Maximum available quantity',
        },
    },
    'bms_emsStatus.maxCloseOilEb': {
        common: {
            desc: 'Disable SOC of Smart Generator',
        },
    },
    'mppt.dcdc12vVol': {
        common: {
            desc: 'DC 12 V 30 A output voltage',
            unit: 'mV',
        },
    },
    'pd.wattsOutSum': {
        common: {
            desc: 'Total output power',
            unit: 'W',
        },
    },
    'mppt.scrStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            unit: 'min.',
        },
    },
    'mppt.carOutWatts': {
        common: {
            desc: 'Car charger output power',
            unit: 'W',
        },
    },
    'bms_emsStatus.f32LcdShowSoc': {
        common: {
            desc: 'SoC value displayed on LCD',
            unit: '%',
        },
    },
    'inv.cfgAcEnabled': {
        common: {
            desc: 'AC switch',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.outVol': {
        common: {
            desc: 'PV output voltage',
            unit: 'mV',
        },
    },
    'bms_emsStatus.paraVolMax': {
        common: {
            desc: 'Maximum voltage when two devices work in parallel',
            unit: 'V',
        },
    },
    'mppt.chgType': {
        common: {
            desc: 'Actual charging type',
            states: {
                0: 'null',
                1: 'Adapter (adapter/DC power)',
                2: 'MPPT (solar energy)',
                3: 'AC (grid charging)',
                4: 'Gas (petrol and electricity)',
                5: 'Wind (wind power)',
            },
        },
    },
    /*
    'bms_bmsStatus.bmsFault': {
        common: {
            desc: 'BMS permanent fault',
        },
    },
    */
    'inv.acDipSwitch': {
        common: {
            desc: 'AC fast/slow charging dip switch',
            states: {
                0: 'unknown',
                1: 'fast charging',
                2: 'slow charging',
            },
        },
    },
    'mppt.cfgChgType': {
        common: {
            desc: 'Configured charging type - valid when xt60_chg_type is 0',
            states: {
                0: 'Auto',
                1: 'MPPT',
                2: 'Adapter',
            },
        },
    },
    'bms_emsStatus.paraVolMin': {
        common: {
            desc: 'Minimum voltage when two devices work in parallel',
            unit: 'V',
        },
    },
    'inv.standbyMins': {
        common: {
            desc: 'Auto shutdown when there is no load',
            unit: 'min.',
        },
    },
    'inv.dischargeType': {
        common: {
            desc: 'Discharging type',
            states: {
                1: 'AC discharging',
                2: 'PR',
                3: 'BC',
            },
        },
    },
    'pd.carState': {
        common: {
            desc: 'CAR button status',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.chgState': {
        common: {
            desc: 'Charging status',
            states: {
                0: 'off',
                1: 'Charging',
                2: 'Standby (during AC charging, DC charging stops)',
            },
        },
    },
    'pd.invUsedTime': {
        common: {
            desc: 'Inverter use time',
            unit: 'sec.',
        },
    },
    /*
    'bms_emsStatus.bmsWarState': {
        common: {
            desc: 'BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag',
        },
    },
    */
    'mppt.carState': {
        common: {
            desc: 'Car charger switch status',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.dischargeType': {
        common: {
            desc: 'Discharging type',
            states: {
                1: 'AC discharging',
                2: 'PR',
                3: 'BC',
            },
        },
    },
    'pd.typec1Temp': {
        common: {
            desc: 'Type-C 1 temperature',
            unit: '°C',
        },
    },
    'pd.dcInUsedTime': {
        common: {
            desc: 'DC charging time',
            unit: 'sec.',
        },
    },
    'bms_bmsStatus.sysVer': {
        common: {
            desc: 'System version',
        },
    },
    'mppt.carTemp': {
        common: {
            desc: 'Car charging temperature',
            unit: '°C',
        },
    },
    'pd.model': {
        common: {
            desc: 'Product model',
        },
    },
    'bms_bmsStatus.minCellVol': {
        common: {
            desc: 'Minimum cell voltage',
            unit: 'mV',
        },
    },
    'mppt.outWatts': {
        common: {
            desc: 'PV output power',
            unit: 'W',
        },
    },
    'pd.wifiAutoRcvy': {
        common: {
            desc: 'Wi-Fi mode on power on',
            states: {
                0: 'Default mode (STA)',
                1: 'Restore last usage mode (STA/AP)',
            },
        },
    },
    'pd.remainTime': {
        common: {
            desc: 'Time remaining before full charging / full discharge (if negative)',
            unit: 'min.',
        },
    },
    'bms_bmsStatus.maxCellVol': {
        common: {
            desc: 'Maximum cell voltage',
            unit: 'mV',
        },
    },
    'bms_bmsStatus.type': {
        common: {
            desc: 'BMS type',
            states: {
                1: 'lithium battery',
                2: 'oil-powered',
            },
        },
    },
    'bms_bmsStatus.maxCellTemp': {
        common: {
            desc: 'Maximum cell temperature',
            unit: '°C',
        },
    },
    'mppt.outAmp': {
        common: {
            desc: 'PV output current',
            unit: 'mA',
        },
    },
    /*
    'pd.ext4p8Port': {
        common: {
            desc: '4+8 ports; only supports left port status identification: 0: NULL; 1: Extra battery; 2: Smart generator',
        },
    },
    */
    'bms_bmsStatus.cellId': {
        common: {
            desc: 'Cell material LI/LFP/LA, battery capacity type',
            states: {
                1: '2.5 Ah per battery',
                2: '2.0 Ah per battery',
            },
        },
    },
    'bms_bmsStatus.minMosTemp': {
        common: {
            desc: 'Minimum MOS temperature',
            unit: '°C',
        },
    },
    'mppt.chgPauseFlag': {
        common: {
            desc: 'PV charging pause flag',
        },
    },
    'bms_emsStatus.minOpenOilEb': {
        common: {
            desc: 'Enable SOC of Smart Generator',
        },
    },
    'mppt.acStandbyMins': {
        common: {
            desc: 'Auto shutdown when there is no load',
            unit: 'min.',
        },
    },
    'mppt.powStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            unit: 'min.',
        },
    },
    'inv.chargerType': {
        common: {
            desc: 'Charger type',
            states: {
                1: 'AC charging',
                2: 'DC adapter charging',
                3: 'Solar charging',
                4: 'CC',
                5: 'BC',
            },
        },
    },
    'pd.chgSunPower': {
        common: {
            desc: 'Cumulative solar charge capacity',
            unit: 'Wh',
        },
    },
    'pd.carTemp': {
        common: {
            desc: 'CAR temperature',
            unit: '°C',
        },
    },
    'bms_bmsStatus.bqSysStatReg': {
        common: {
            desc: 'BQ hardware protection register',
        },
    },
    'inv.acInAmp': {
        common: {
            desc: 'Inverter input current',
            unit: 'mA',
        },
    },
    'bms_emsStatus.chgRemainTime': {
        common: {
            desc: 'Remaining charging time',
            unit: 'min.',
        },
    },
    'pd.dsgPowerAC': {
        common: {
            desc: 'Cumulative AC power discharged',
            unit: 'Wh',
        },
    },
    'bms_bmsStatus.openBmsIdx': {
        common: {
            desc: 'Battery pack enabling status',
        },
    },
    'pd.qcUsb2Watts': {
        common: {
            desc: 'qc_usb2 output power',
            unit: 'W',
        },
    },
    'pd.wireWatts': {
        common: {
            desc: 'Wireless charging output power',
            unit: 'W',
        },
    },
    'bms_bmsStatus.num': {
        common: {
            desc: 'BMS number',
        },
    },
    'pd.chgPowerAC': {
        common: {
            desc: 'Cumulative AC charge (wall socket)',
            unit: 'Wh',
        },
    },
    'pd.lcdOffSec': {
        common: {
            desc: 'LCD screen timeout',
            unit: 'sec.',
        },
    },
    'bms_bmsStatus.soc': {
        common: {
            desc: 'Battery level',
            unit: '%',
        },
    },
    'inv.acInVol': {
        common: {
            desc: 'Inverter input voltage',
            unit: 'mV',
        },
    },
    'inv.FastChgWatts': {
        common: {
            desc: 'Maximum charging power for AC',
            unit: 'W',
        },
    },
    'inv.SlowChgWatts': {
        common: {
            desc: 'Minimum charging power for AC',
            unit: 'W',
        },
    },
    'mppt.beepState': {
        common: {
            desc: 'Buzzer status',
            states: {
                0: 'Default',
                1: 'Silent mode',
            },
        },
    },
    'pd.sysVer': {
        common: {
            desc: 'System version: 0x0102002F = V1.2.0.47',
        },
    },
    'mppt.dc24vTemp': {
        common: {
            desc: 'DCDC 24 V temperature',
            unit: '°C',
        },
    },
    'bms_emsStatus.chgCmd': {
        common: {
            desc: 'Charge command',
        },
    },
    'bms_bmsStatus.tagChgAmp': {
        common: {
            desc: 'Target charging current',
            unit: 'mA',
        },
    },
    'bms_bmsStatus.maxMosTemp': {
        common: {
            desc: 'Maximum MOS temperature',
            unit: '°C',
        },
    },
    'mppt.cfgChgWatts': {
        common: {
            desc: 'AC maximum charging power',
            unit: 'W',
        },
    },
    'pd.qcUsb1Watts': {
        common: {
            desc: 'qc_usb1 output power',
            unit: 'W',
        },
    },
    /*
    'pd.reserved': {
        common: {
            desc: 'Reserve 2 bytes',
        },
    },
    */
    'bms_bmsStatus.minCellTemp': {
        common: {
            desc: 'Minimum cell temperature',
            unit: '°C',
        },
    },
    'pd.chgPowerDC': {
        common: {
            desc: 'Cumulative DC charge (adapter)',
            unit: 'Wh',
        },
    },
    'pd.standbyMin': {
        common: {
            desc: 'Standby auto shutdown time',
            unit: 'min.',
            min: 0,
            max: 5999,
        },
    },
    'mppt.swVer': {
        common: {
            desc: 'MPPT version number',
        },
    },
    'inv.cfgAcOutFreq': {
        common: {
            desc: 'Configured output frequency for inverter',
            unit: 'Hz',
        },
    },
    'mppt.x60ChgType': {
        common: {
            desc: 'XT60 paddle status',
            states: {
                0: 'Not detected',
                1: 'MPPT',
                2: 'Adapter',
            },
        },
    },
    'bms_bmsStatus.soh': {
        common: {
            desc: 'Health status SoH',
            unit: '%',
        },
    },
    'inv.errCode': {
        common: {
            desc: 'Global error code',
        },
    },
    'bms_emsStatus.openUpsFlag': {
        common: {
            desc: 'UPS mode enable flag',
        },
    },
    'bms_emsStatus.minDsgSoc': {
        common: {
            desc: 'Minimum discharge SoC',
            unit: '%',
        },
    },
    'mppt.dcdc12vWatts': {
        common: {
            desc: 'DC 12 V 30 A output power',
            unit: 'W',
        },
    },
    'pd.usbqcUsedTime': {
        common: {
            desc: 'USB QC use time',
            unit: 'sec.',
        },
    },
    'pd.dcOutState': {
        common: {
            desc: 'DC button status',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'bms_bmsStatus.remainTime': {
        common: {
            desc: 'Time remaining',
        },
    },
    'bms_emsStatus.emsIsNormalFlag': {
        common: {
            desc: 'EMS status',
            states: {
                0: 'sleep',
                1: 'normal',
            },
        },
    },
    'mppt.inWatts': {
        common: {
            desc: 'PV input power',
            unit: 'W',
        },
    },
    'pd.usbUsedTime': {
        common: {
            desc: 'USB use time',
            unit: 'sec.',
        },
    },
    'pd.mpptUsedTime': {
        common: {
            desc: 'MPPT use time',
            unit: 'sec.',
        },
    },
    /*
    'inv.reserved': {
        common: {
            desc: 'Reserve 8 bytes',
        },
    },
    */
    'mppt.mpptTemp': {
        common: {
            desc: 'MPPT temperature',
            unit: '°C',
        },
    },
    'pd.wifiRssi': {
        common: {
            desc: 'Wi-Fi signal strength',
        },
    },
    'bms_bmsStatus.amp': {
        common: {
            desc: 'Current',
            unit: 'mA',
        },
    },
    'inv.invType': {
        common: {
            desc: 'PSDR model code (corresponds to dip Switch and high-low voltage switch)',
        },
    },
    'bms_emsStatus.lcdShowSoc': {
        common: {
            desc: 'SoC value displayed on LCD',
            unit: '%',
        },
    },
    'inv.cfgAcOutVol': {
        common: {
            desc: 'Output voltage configured for the inverter',
            unit: 'V',
        },
    },
    'bms_emsStatus.bmsModel': {
        common: {
            desc: 'BMS model',
        },
    },
    'pd.errCode': {
        common: {
            desc: 'Global error code',
        },
    },
    'pd.carWatts': {
        common: {
            desc: 'Car output power',
            unit: 'W',
        },
    },
    'pd.usb2Watts': {
        common: {
            desc: 'Normal USB2 output power',
            unit: 'W',
        },
    },
    'mppt.dcChgCurrent': {
        common: {
            desc: 'DC maximum charging current',
            unit: 'mA',
        },
    },
    'bms_emsStatus.dsgRemainTime': {
        common: {
            desc: 'Remaining discharging time',
            unit: 'min.',
        },
    },
    'inv.sysVer': {
        common: {
            desc: 'System version',
        },
    },
};
