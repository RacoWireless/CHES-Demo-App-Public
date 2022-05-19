const SchemaConstants = require("./SchemaConstants");

module.exports = [

  {
    DEVICE: {
      device_type: "Thermometer - Ear",
      make: "ForaCare Ear Thermometer"
    },
    SCHEMA: [
      {
        KEY: "entry.2.resource.code.coding.0.display",
        VALUE: "entry.2.resource.valueQuantity.value",
        UNIT: "entry.2.resource.valueQuantity.unit"
      },
      {
        KEY: "",
        DEFAULT: "timestamp",
        VALUE: "timestamp",
        UNIT: ""

      }
    ],
    TYPE: "Thermometer - Ear : ForaCare Ear Thermometer",
    TEMPLATE: "ForaCareEarThermometer-IR20BBLE.json"
  },
  {
    DEVICE: {
      device_type: "Thermometer",
      make: "ForaCare"
    },
    SCHEMA: SchemaConstants.Thermometer,
    TYPE: "Thermometer - Ear : ForaCare Ear Thermometer",
    TEMPLATE: "ForaCareEarThermometer-IR20BBLE.json"
  },

  {
    DEVICE: {
      device_type: "Blood Pressure Meter",
      make: "A&D BPM",
    },
    SCHEMA: SchemaConstants.Blood_Pressure_Meter,
    TYPE: "Blood Pressure Meter : A&D BPM",
    TEMPLATE: "A&DBPM-UA-651BLE.json"
  },


  {
    DEVICE: {
      device_type: "Pulse Oximeter",
      make: "Nonin 3230"
    },
    SCHEMA: SchemaConstants.Pulse_Oximeter,
    TYPE: "Nonin 3230 : Pulse Oximeter",
    TEMPLATE: "Nonin3230-111309-001.json"

  },

  {
    DEVICE: {
      device_type: "Weight Scale",
      make: "Scale A&D Scale"
    },
    SCHEMA: SchemaConstants.Weight_Scale,
    TYPE: "Weight Scale : Scale A&D Scale",
    TEMPLATE: "ScaleA&DScale-UC-352BLE.json"
  },
  {
    DEVICE: {
      device_type: "Glucose Meter",
      make: "Trividea True Metrix Air"
    },
    SCHEMA: SchemaConstants.Glucose_Meter,
    TYPE: "Glucose Meter : Trividea True Metrix Air Meter",
    TEMPLATE: "TrivideaTrueMetrixAirMeter-REA4H01-10.json"
  },
  {
    DEVICE: {
      device_type: "Spirometer",
      make: "Vitalograph Lung Monitoring BT Smart"
    },
    SCHEMA: [
      {
        KEY: "entry.2.resource.component.0.code.coding.0.display",
        VALUE: "entry.2.resource.component.0.valueQuantity.value",
        UNIT: "entry.2.resource.component.0.valueQuantity.unit"
      },
      {
        KEY: "entry.2.resource.component.1.code.coding.0.display",
        VALUE: "entry.2.resource.component.1.valueQuantity.value",
        UNIT: "entry.2.resource.component.1.valueQuantity.unit"
      },
      {
        KEY: "entry.2.resource.component.2.code.coding.0.display",
        VALUE: "entry.2.resource.component.2.valueQuantity.value",
        UNIT: "entry.2.resource.component.2.valueQuantity.unit"
      },
      {
        KEY: "entry.2.resource.component.3.code.coding.0.display",
        VALUE: "entry.2.resource.component.3.valueQuantity.value",
        UNIT: "entry.2.resource.component.3.valueQuantity.unit"
      },
      {
        KEY: "entry.2.resource.component.4.code.coding.0.display",
        VALUE: "entry.2.resource.component.4.valueQuantity.value",
        UNIT: "entry.2.resource.component.4.valueQuantity.unit"
      },
      {
        KEY: "",
        DEFAULT: "timestamp",
        VALUE: "timestamp",
        UNIT: ""

      }
    ],
    TYPE: "Spirometer : Vitalograph Lung Monitoring BT Smart",
    TEMPLATE: ""
  },
  {
    DEVICE: { device_type: "Weight Scale", make: "Indie Health" },
    SCHEMA: SchemaConstants.Weight_Scale,
    TYPE: "Weight Scale 51-102:Indie Health",
    TEMPLATE: "IndieHealth-WeightScale51-102.json"
  },
  {
    DEVICE: { device_type: "Blood Pressure Meter", make: "Indie Health" },
    SCHEMA: SchemaConstants.Blood_Pressure_Meter,
    TYPE: "Blood Pressure Meter:Indie Health",
    TEMPLATE: "IndieHealth-BPM51-1490.json"
  },
  {
    DEVICE: { device_type: "Pulse Oximeter", make: "Indie Health" },
    SCHEMA: SchemaConstants.Pulse_Oximeter,
    TYPE: "Pulse Oximeter:Indie Health",
    TEMPLATE: "IndieHealth-Pulse Oximeter 51-300MD.json"
  },
  {
    DEVICE: { device_type: "Glucose Meter", make: "Indie Health" },
    SCHEMA: SchemaConstants.Glucose_Meter,
    TYPE: "Glucose Meter:Indie Health",
    TEMPLATE: "IndieHealth-Glucose meter Oh Care Lite Smart.json"
  },
  {
    DEVICE: { device_type: "Thermometer", make: "Indie Health" },
    SCHEMA: SchemaConstants.Thermometer,
    TYPE: "Glucose Meter:Indie Health",
    TEMPLATE: "IndieHealth-Glucose meter Oh Care Lite Smart.json"
  }
  /*
      {
          DEVICE: {
              device_type: "",
              make: ""
          },
          SCHEMA: [
              {
                  KEY: "",
                  VALUE: "",
                  UNIT: ""
              },
              {
                  KEY: "",
                  DEFAULT: "timestamp",
                  VALUE: "timestamp",
                  UNIT: ""
  
              }
          ],
          TYPE: "",
          TEMPLATE: ""
      },
  */
]