module.exports = {

  Blood_Pressure_Meter: [
    {
      KEY: "entry.2.resource.component.0.code.coding.1.display",
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
      KEY: "",
      DEFAULT: "timestamp",
      VALUE: "timestamp",
      UNIT: ""

    }
  ],
  Pulse_Oximeter: [
    {
      KEY: "entry.2.resource.code.coding.0.display",
      VALUE: "entry.2.resource.valueQuantity.value",
      UNIT: "entry.2.resource.valueQuantity.unit"
    },
    {
      KEY: "entry.3.resource.code.coding.0.display",
      VALUE: "entry.3.resource.valueQuantity.value",
      UNIT: "entry.3.resource.valueQuantity.unit"
    },
    {
      KEY: "entry.4.resource.code.coding.0.display",
      VALUE: "entry.4.resource.valueQuantity.value",
      UNIT: "entry.4.resource.valueQuantity.unit"
    },
    {
      KEY: "",
      DEFAULT: "timestamp",
      VALUE: "timestamp",
      UNIT: ""

    }
  ],

  Weight_Scale: [
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
  Glucose_Meter:
    [
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

  Thermometer: [
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
  ]

}