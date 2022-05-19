/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * This one defines model for patient_info
 *
 * @author  nsabeesh@korewireless.com
 * @since   2021-08-02
 */
const sequelize = require("../providers/DBProvider");
const DataTypes = require("sequelize");

const configModel = sequelize.define("encryption_key_association", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    key_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "key_details", key: "id" }
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "patient_info", key: "id" }
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "organization", key: "id" }
    },
    effective_date: {
        type: DataTypes.INTEGER,
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
    { timestamps: false, createdAt: "created_time", updatedAt: "updated_time", freezeTableName: true }
);


const CONFIG_ATTRIBUTES = {
    ID: "id",
    PATIENT_ID: "patient_id",
    KEY_ID: "key_id",
    ORGANIZATION_ID: "organization_id",
    EFFECTIVE_DATE: "effective_date",
    CREATED_TIME: "created_time",
    UPDATED_TIME: "updated_time",
    CREATED_BY: "created_by",
    UPDATED_BY: "updated_by"
};

module.exports = { configModel, CONFIG_ATTRIBUTES };