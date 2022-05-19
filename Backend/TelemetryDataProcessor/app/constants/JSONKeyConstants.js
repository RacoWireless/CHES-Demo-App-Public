module.exports = [

  {
    DEVICE: {
      device_type: "Thermometer - Ear",
      make: "ForaCare Ear Thermometer"
    },
    MAPPING: [
      {
        REPLACE_FOR: "temperature",
        OLD_UNIT: "Cel",
        NEW_UNIT: "\xB0C"
      },
      {
        REPLACE_FOR: "temperature",
        OLD_UNIT: "degF",
        NEW_UNIT: "\xB0F"
      }
    ],

    TYPE: "Thermometer - Ear : ForaCare Ear Thermometer"

  },
  {
    DEVICE: {
      device_type: "Thermometer",
      make: "ForaCare"
    },
    MAPPING: [
      {
        REPLACE_FOR: "temperature",
        OLD_UNIT: "Cel",
        NEW_UNIT: "\xB0C"
      },
      {
        REPLACE_FOR: "temperature",
        OLD_UNIT: "degF",
        NEW_UNIT: "\xB0F"
      }
    ],

    TYPE: "Thermometer - Ear : ForaCare"

  },
  {
    DEVICE: {
      device_type: "Blood Pressure Meter",
      make: "A&D BPM",
    },
    MAPPING: [
      {
        REPLACE_FOR: "systolic",
        OLD_UNIT: "mmHg",
        NEW_UNIT: "SYS"
      },
      {
        REPLACE_FOR: "diastolic",
        OLD_UNIT: "mmHg",
        NEW_UNIT: "DIA"
      },
      {
        REPLACE_FOR: "pulseRate",
        OLD_UNIT: "beats/minute",
        NEW_UNIT: "Pulse"
      }
    ],
    TYPE: "Blood Pressure Meter : A&D BPM"


  }

  ,

  {
    DEVICE: {
      device_type: "Pulse Oximeter",
      make: "Nonin 3230"
    },
    MAPPING: [
      {
        REPLACE_FOR: "spO2",
        OLD_UNIT: "%",
        NEW_UNIT: "% SpO2"
      },
      {
        REPLACE_FOR: "pulseRate",
        OLD_UNIT: "beats/minute",
        NEW_UNIT: "Pulse"
      },
      {
        REPLACE_FOR: "pulseAmplitudeIndex",
        OLD_UNIT: "percent",
        NEW_UNIT: "% PAI"
      }
    ],
    TYPE: "Nonin 3230 : Pulse Oximeter"

  }

  ,

  {
    DEVICE: {
      device_type: "Weight Scale",
      make: "Scale A&D Scale"
    },
    MAPPING: [
      {
        REPLACE_FOR: "weight",
        OLD_UNIT: "lb_av",
        NEW_UNIT: "lb"
      }
    ],
    TYPE: "Weight Scale : Scale A&D Scale"


  }

  ,

  {
    DEVICE: {
      device_type: "Weight Scale",
      make: "Indie Health"
    },
    MAPPING: [
      {
        REPLACE_FOR: "weight",
        OLD_UNIT: "lb_av",
        NEW_UNIT: "lb"
      }
    ],
    TYPE: "Weight Scale : Indie Health"


  }
  ,

  {
    DEVICE: {
      device_type: "Glucose Meter",
      make: "Trividea True Metrix Air"
    },
    MAPPING: [

    ],
    TYPE: "Glucose Meter : Trividea True Metrix Air Meter"


  }

  ,

  {
    DEVICE: {
      device_type: "Spirometer",
      make: "Vitalograph Lung Monitoring BT Smart"
    },
    MAPPING: [
      {
        REPLACE_FOR: "PEF",
        OLD_UNIT: "L/min",
        NEW_UNIT: "L/min PEF"
      },
      {
        REPLACE_FOR: "FEV1",
        OLD_UNIT: "L",
        NEW_UNIT: "L FEV1"
      },
      {
        REPLACE_FOR: "FEF25-75",
        OLD_UNIT: "L/s",
        NEW_UNIT: "L/s FEF25-75"
      },
      {
        REPLACE_FOR: "PEFPersonalBest",
        OLD_UNIT: "L/min",
        NEW_UNIT: "L/min PEFPersonalBest"
      },
      {
        REPLACE_FOR: "FEV1%",
        OLD_UNIT: "%",
        NEW_UNIT: "% FEV1%"
      }
    ],
    TYPE: "Nonin 3230 : Pulse Oximeter"
    // 299.00L/min PEF   2.06L FEV1 4.47L/s FEF 25-75 0.00L/min PEFPersonalBest 0.00% FEV1%
  }


]


/**
 *     {
        REPLACE_FOR: "glucose",
        OLD_UNIT: "kg/L",
        NEW_UNIT: "mg/dl",
        CONVERSION: function (val) {
          return String(parseInt(Number(val) * 100000));
        }
      }
 *
 */
