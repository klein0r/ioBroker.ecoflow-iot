export const knownStates: Record<string, ioBroker.PartialStateObject> = {
    'pd.wattsInSum': {
        common: {
            desc: 'Total input power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'bms_emsStatus.maxChargeSoc': {
        common: {
            desc: 'Maximum charging SOC',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'bms_bmsStatus.designCap': {
        common: {
            desc: 'Design capacity',
            type: 'number',
            role: 'state',
            unit: 'mAh',
        },
    },
    'bms_bmsStatus.fullCap': {
        common: {
            desc: 'Full capacity',
            type: 'number',
            role: 'state',
            unit: 'mAh',
        },
    },
    'bms_bmsStatus.temp': {
        common: {
            desc: 'Temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'bms_bmsStatus.f32ShowSoc': {
        common: {
            desc: 'Battery level SOC',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'pd.beepMode': {
        common: {
            desc: 'BEEP mode',
            type: 'number',
            role: 'state',
            states: {
                0: 'normal',
                1: 'silent',
            },
        },
    },
    'bms_bmsStatus.outputWatts': {
        common: {
            desc: 'Output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.typec2Watts': {
        common: {
            desc: 'Type-C 2 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'inv.outputWatts': {
        common: {
            desc: 'Discharging power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'bms_bmsStatus.vol': {
        common: {
            desc: 'Voltage',
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'bms_emsStatus.chgVol': {
        common: {
            desc: 'Charging voltage',
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'inv.invOutFreq': {
        common: {
            desc: 'Output frequency',
            type: 'number',
            role: 'state',
            unit: 'Hz',
        },
    },
    'mppt.inAmp': {
        common: {
            desc: 'PV input current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'mppt.inVol': {
        common: {
            desc: 'PV input voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'inv.fanState': {
        common: {
            desc: 'Fan status',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.cfgAcEnabled': {
        common: {
            desc: 'AC switch',
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'inv.outTemp': {
        common: {
            desc: 'Temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.usb1Watts': {
        common: {
            desc: 'Common USB1 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'mppt.dcdc12vAmp': {
        common: {
            desc: 'DC 12 V 30 A output current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'inv.invOutVol': {
        common: {
            desc: 'Inverter actual output voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    /*
    'pd.extRj45Port': {
        common: {
            desc: 'RJ45 port: 0: NULL; 1: RC(BLE_CTL)',
            type: 'number',
            role: 'state',
        },
    },
    */
    'bms_emsStatus.chgAmp': {
        common: {
            desc: 'Charging current',
            type: 'number',
            role: 'state',
            unit: 'A',
        },
    },
    /*
    'bms_bmsStatus.errCode': {
        common: {
            desc: 'Global error code',
            type: 'number',
            role: 'state',
        },
    },
    */
    'inv.inputWatts': {
        common: {
            desc: 'Charging power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'mppt.cfgAcOutVol': {
        common: {
            desc: 'Output voltage configured for the inverter',
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'bms_emsStatus.chgState': {
        common: {
            desc: 'Charging status',
            type: 'number',
            role: 'state',
        },
    },
    'bms_bmsStatus.inputWatts': {
        common: {
            desc: 'Input power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'bms_emsStatus.openBmsIdx': {
        common: {
            desc: 'Battery pack enabling status',
            type: 'number',
            role: 'state',
        },
    },
    'pd.typec2Temp': {
        common: {
            desc: 'Type-C 2 temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.carUsedTime': {
        common: {
            desc: 'CAR use time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'pd.typec1Watts': {
        common: {
            desc: 'Type-C 1 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.chgDsgState': {
        common: {
            desc: 'Charging status on screen',
            type: 'number',
            role: 'state',
            states: {
                1: 'discharging',
                2: 'charging',
            },
        },
    },
    'inv.chgPauseFlag': {
        common: {
            desc: 'PV charging pause flag',
            type: 'number',
            role: 'state',
        },
    },
    'inv.acInFreq': {
        common: {
            desc: 'Inverter input frequency',
            type: 'number',
            role: 'state',
            unit: 'Hz',
        },
    },
    'mppt.carStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'pd.soc': {
        common: {
            desc: 'Display SOC',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'inv.invOutAmp': {
        common: {
            desc: 'Inverter output current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'bms_emsStatus.fanLevel': {
        common: {
            desc: 'Fan level',
            type: 'number',
            role: 'state',
        },
    },
    'mppt.cfgAcOutFreq': {
        common: {
            desc: 'Output frequency configured for the inverter',
            type: 'number',
            role: 'state',
            unit: 'Hz',
        },
    },
    'mppt.carOutVol': {
        common: {
            desc: 'Car charger output voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'inv.dcInVol': {
        common: {
            desc: 'DC input voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    /*
    'pd.ext3p8Port': {
        common: {
            desc: '3+8 ports: 0: NULL; 1: CC; 2: PR; 3: SP (BC)',
            type: 'number',
            role: 'state',
        },
    },
    */
    'mppt.cfgAcXboost': {
        common: {
            desc: 'X-Boost switch',
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'pd.dsgPowerDC': {
        common: {
            desc: 'Cumulative DC discharge capacity',
            type: 'number',
            role: 'state',
            unit: 'Wh',
        },
    },
    'inv.dcInAmp': {
        common: {
            desc: 'DC input current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'pd.typecUsedTime': {
        common: {
            desc: 'Type-C use time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'mppt.carOutAmp': {
        common: {
            desc: 'Car charger output current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'bms_bmsStatus.remainCap': {
        common: {
            desc: 'Remaining capacity',
            type: 'number',
            role: 'state',
            unit: 'mAh',
        },
    },
    'pd.brightLevel': {
        common: {
            desc: 'LCD brightness level',
            type: 'number',
            role: 'state',
        },
    },
    'inv.dcInTemp': {
        common: {
            desc: 'DC temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'bms_emsStatus.maxAvailNum': {
        common: {
            desc: 'Maximum available quantity',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.maxCloseOilEb': {
        common: {
            desc: 'Disable SOC of Smart Generator',
            type: 'number',
            role: 'state',
        },
    },
    'mppt.dcdc12vVol': {
        common: {
            desc: 'DC 12 V 30 A output voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'pd.wattsOutSum': {
        common: {
            desc: 'Total output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'mppt.scrStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'mppt.carOutWatts': {
        common: {
            desc: 'Car charger output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'bms_emsStatus.f32LcdShowSoc': {
        common: {
            desc: 'SoC value displayed on LCD',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'inv.cfgAcEnabled': {
        common: {
            desc: 'AC switch',
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.outVol': {
        common: {
            desc: 'PV output voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'bms_emsStatus.paraVolMax': {
        common: {
            desc: 'Maximum voltage when two devices work in parallel',
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'mppt.chgType': {
        common: {
            desc: 'Actual charging type',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
        },
    },
    */
    'inv.acDipSwitch': {
        common: {
            desc: 'AC fast/slow charging dip switch',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'inv.standbyMins': {
        common: {
            desc: 'Auto shutdown when there is no load',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'inv.dischargeType': {
        common: {
            desc: 'Discharging type',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.chgState': {
        common: {
            desc: 'Charging status',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    /*
    'bms_emsStatus.bmsWarState': {
        common: {
            desc: 'BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag',
            type: 'number',
            role: 'state',
        },
    },
    */
    'mppt.carState': {
        common: {
            desc: 'Car charger switch status',
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'mppt.dischargeType': {
        common: {
            desc: 'Discharging type',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.dcInUsedTime': {
        common: {
            desc: 'DC charging time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'bms_bmsStatus.sysVer': {
        common: {
            desc: 'System version',
            type: 'number',
            role: 'state',
        },
    },
    'mppt.carTemp': {
        common: {
            desc: 'Car charging temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.model': {
        common: {
            desc: 'Product model',
            type: 'number',
            role: 'state',
        },
    },
    'bms_bmsStatus.minCellVol': {
        common: {
            desc: 'Minimum cell voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'mppt.outWatts': {
        common: {
            desc: 'PV output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.wifiAutoRcvy': {
        common: {
            desc: 'Wi-Fi mode on power on',
            type: 'number',
            role: 'state',
            states: {
                0: 'Default mode (STA)',
                1: 'Restore last usage mode (STA/AP)',
            },
        },
    },
    'pd.remainTime': {
        common: {
            desc: 'Time remaining before full charging / full discharge (if negative)',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'bms_bmsStatus.maxCellVol': {
        common: {
            desc: 'Maximum cell voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'bms_bmsStatus.type': {
        common: {
            desc: 'BMS type',
            type: 'number',
            role: 'state',
            states: {
                1: 'lithium battery',
                2: 'oil-powered',
            },
        },
    },
    'bms_bmsStatus.maxCellTemp': {
        common: {
            desc: 'Maximum cell temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'mppt.outAmp': {
        common: {
            desc: 'PV output current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    /*
    'pd.ext4p8Port': {
        common: {
            desc: '4+8 ports; only supports left port status identification: 0: NULL; 1: Extra battery; 2: Smart generator',
            type: 'number',
            role: 'state',
        },
    },
    */
    'bms_bmsStatus.cellId': {
        common: {
            desc: 'Cell material LI/LFP/LA, battery capacity type',
            type: 'number',
            role: 'state',
            states: {
                1: '2.5 Ah per battery',
                2: '2.0 Ah per battery',
            },
        },
    },
    'bms_bmsStatus.minMosTemp': {
        common: {
            desc: 'Minimum MOS temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'mppt.chgPauseFlag': {
        common: {
            desc: 'PV charging pause flag',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.minOpenOilEb': {
        common: {
            desc: 'Enable SOC of Smart Generator',
            type: 'number',
            role: 'state',
        },
    },
    'mppt.acStandbyMins': {
        common: {
            desc: 'Auto shutdown when there is no load',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'mppt.powStandbyMin': {
        common: {
            desc: 'Auto shutdown when there is no load',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'inv.chargerType': {
        common: {
            desc: 'Charger type',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            unit: 'Wh',
        },
    },
    'pd.carTemp': {
        common: {
            desc: 'CAR temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'bms_bmsStatus.bqSysStatReg': {
        common: {
            desc: 'BQ hardware protection register',
            type: 'number',
            role: 'state',
        },
    },
    'inv.acInAmp': {
        common: {
            desc: 'Inverter input current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'bms_emsStatus.chgRemainTime': {
        common: {
            desc: 'Remaining charging time',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'pd.dsgPowerAC': {
        common: {
            desc: 'Cumulative AC power discharged',
            type: 'number',
            role: 'state',
            unit: 'Wh',
        },
    },
    'bms_bmsStatus.openBmsIdx': {
        common: {
            desc: 'Battery pack enabling status',
            type: 'number',
            role: 'state',
        },
    },
    'pd.qcUsb2Watts': {
        common: {
            desc: 'qc_usb2 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.wireWatts': {
        common: {
            desc: 'Wireless charging output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'bms_bmsStatus.num': {
        common: {
            desc: 'BMS number',
            type: 'number',
            role: 'state',
        },
    },
    'pd.chgPowerAC': {
        common: {
            desc: 'Cumulative AC charge (wall socket)',
            type: 'number',
            role: 'state',
            unit: 'Wh',
        },
    },
    'pd.lcdOffSec': {
        common: {
            desc: 'LCD screen timeout',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'bms_bmsStatus.soc': {
        common: {
            desc: 'Battery level',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'inv.acInVol': {
        common: {
            desc: 'Inverter input voltage',
            type: 'number',
            role: 'state',
            unit: 'mV',
        },
    },
    'inv.FastChgWatts': {
        common: {
            desc: 'Maximum charging power for AC',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'inv.SlowChgWatts': {
        common: {
            desc: 'Minimum charging power for AC',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'mppt.beepState': {
        common: {
            desc: 'Buzzer status',
            type: 'number',
            role: 'state',
            states: {
                0: 'Default',
                1: 'Silent mode',
            },
        },
    },
    'pd.sysVer': {
        common: {
            desc: 'System version: 0x0102002F = V1.2.0.47',
            type: 'number',
            role: 'state',
        },
    },
    'mppt.dc24vTemp': {
        common: {
            desc: 'DCDC 24 V temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'bms_emsStatus.chgCmd': {
        common: {
            desc: 'Charge command',
            type: 'number',
            role: 'state',
        },
    },
    'bms_bmsStatus.tagChgAmp': {
        common: {
            desc: 'Target charging current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'bms_bmsStatus.maxMosTemp': {
        common: {
            desc: 'Maximum MOS temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'mppt.cfgChgWatts': {
        common: {
            desc: 'AC maximum charging power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.qcUsb1Watts': {
        common: {
            desc: 'qc_usb1 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    /*
    'pd.reserved': {
        common: {
            desc: 'Reserve 2 bytes',
            type: 'number',
            role: 'state',
        },
    },
    */
    'bms_bmsStatus.minCellTemp': {
        common: {
            desc: 'Minimum cell temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.chgPowerDC': {
        common: {
            desc: 'Cumulative DC charge (adapter)',
            type: 'number',
            role: 'state',
            unit: 'Wh',
        },
    },
    'pd.standbyMin': {
        common: {
            desc: 'Standby auto shutdown time',
            type: 'number',
            role: 'state',
            unit: 'min.',
            min: 0,
            max: 5999,
        },
    },
    'mppt.swVer': {
        common: {
            desc: 'MPPT version number',
            type: 'number',
            role: 'state',
        },
    },
    'inv.cfgAcOutFreq': {
        common: {
            desc: 'Configured output frequency for inverter',
            type: 'number',
            role: 'state',
            unit: 'Hz',
        },
    },
    'mppt.x60ChgType': {
        common: {
            desc: 'XT60 paddle status',
            type: 'number',
            role: 'state',
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
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'inv.errCode': {
        common: {
            desc: 'Global error code',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.openUpsFlag': {
        common: {
            desc: 'UPS mode enable flag',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.minDsgSoc': {
        common: {
            desc: 'Minimum discharge SoC',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'mppt.dcdc12vWatts': {
        common: {
            desc: 'DC 12 V 30 A output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.usbqcUsedTime': {
        common: {
            desc: 'USB QC use time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'pd.dcOutState': {
        common: {
            desc: 'DC button status',
            type: 'number',
            role: 'state',
            states: {
                0: 'off',
                1: 'on',
            },
        },
    },
    'bms_bmsStatus.remainTime': {
        common: {
            desc: 'Time remaining',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.emsIsNormalFlag': {
        common: {
            desc: 'EMS status',
            type: 'number',
            role: 'state',
            states: {
                0: 'sleep',
                1: 'normal',
            },
        },
    },
    'mppt.inWatts': {
        common: {
            desc: 'PV input power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.usbUsedTime': {
        common: {
            desc: 'USB use time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    'pd.mpptUsedTime': {
        common: {
            desc: 'MPPT use time',
            type: 'number',
            role: 'state',
            unit: 'sec.',
        },
    },
    /*
    'inv.reserved': {
        common: {
            desc: 'Reserve 8 bytes',
            type: 'number',
            role: 'state',
        },
    },
    */
    'mppt.mpptTemp': {
        common: {
            desc: 'MPPT temperature',
            type: 'number',
            role: 'state',
            unit: '°C',
        },
    },
    'pd.wifiRssi': {
        common: {
            desc: 'Wi-Fi signal strength',
            type: 'number',
            role: 'state',
        },
    },
    'bms_bmsStatus.amp': {
        common: {
            desc: 'Current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'inv.invType': {
        common: {
            desc: 'PSDR model code (corresponds to dip Switch and high-low voltage switch)',
            type: 'number',
            role: 'state',
        },
    },
    'bms_emsStatus.lcdShowSoc': {
        common: {
            desc: 'SoC value displayed on LCD',
            type: 'number',
            role: 'state',
            unit: '%',
        },
    },
    'inv.cfgAcOutVol': {
        common: {
            desc: 'Output voltage configured for the inverter',
            type: 'number',
            role: 'state',
            unit: 'V',
        },
    },
    'bms_emsStatus.bmsModel': {
        common: {
            desc: 'BMS model',
            type: 'number',
            role: 'state',
        },
    },
    'pd.errCode': {
        common: {
            desc: 'Global error code',
            type: 'number',
            role: 'state',
        },
    },
    'pd.carWatts': {
        common: {
            desc: 'Car output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'pd.usb2Watts': {
        common: {
            desc: 'Normal USB2 output power',
            type: 'number',
            role: 'state',
            unit: 'W',
        },
    },
    'mppt.dcChgCurrent': {
        common: {
            desc: 'DC maximum charging current',
            type: 'number',
            role: 'state',
            unit: 'mA',
        },
    },
    'bms_emsStatus.dsgRemainTime': {
        common: {
            desc: 'Remaining discharging time',
            type: 'number',
            role: 'state',
            unit: 'min.',
        },
    },
    'inv.sysVer': {
        common: {
            desc: 'System version',
            type: 'number',
            role: 'state',
        },
    },
};
