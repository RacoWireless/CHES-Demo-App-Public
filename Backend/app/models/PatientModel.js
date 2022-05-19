/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * This one defines model for patient_info
 *
 * @author  sjohny@korewireless.com
 * @since   2021-07-29
 */
const sequelize = require("../providers/DBProvider");
const DataTypes = require("sequelize");

const patientModel = sequelize.define(
  "patient_info",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shared_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: "created_time",
    updatedAt: "updated_time",
    freezeTableName: true,
  }
);


const PATIENT_ATTRIBUTES = {
  ID: "id",
  PATIENT_ID: "patient_id",
  SHARED_USER_ID: "shared_user_id",
  CREATED_TIME: "created_time",
  UPDATED_TIME: "updated_time",
  CREATED_BY: "created_by",
  UPDATED_BY: "updated_by"
};

module.exports = { patientModel, PATIENT_ATTRIBUTES };