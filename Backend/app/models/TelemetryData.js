const sequelize = require("../providers/DBProvider");
const { DataTypes } = require('sequelize');


const TelemetryData = sequelize.define('TelemetryData', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  telemetry_encrypted_key: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  telemetry_encrypted_data: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  telemetry_decrypted_data: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  decrypted_data: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  payload_creation: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  mac_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_reading: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  iv: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kit_user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kit_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kafka_topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  gateway_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cert_date: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  device_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updated_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  updated_by: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "telemetry_data",
  timestamps: false
});

module.exports = { TelemetryData };