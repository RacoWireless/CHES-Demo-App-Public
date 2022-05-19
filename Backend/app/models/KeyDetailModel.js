/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The model for KeyDetails
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */
const sequelize = require('../providers/DBProvider');
const { DataTypes } = require('sequelize');

const keyDetailsDataModel = sequelize.define('key_details', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    key_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key_arn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    encryption_algorithm: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_alias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key_creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    key_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_spec: {
        type: DataTypes.STRING,
        allowNull: true
    },

    key_usage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attached_policy: {
        type: DataTypes.STRING,
        allowNull: true
    },

    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    createdAt: "created_time",
    updatedAt: "updated_time",
    freezeTableName: true,
});



const KEYDETAIL_ATTRIBUTES = {
    ID: "id",
    KEY_ID: "key_id",
    KEY_ARN: "key_arn",
    ENCRYPTION_ALGORITHM: "encryption_algorithm",
    STATUS: "status",
    KEY_ALIAS: "key_alias",
    KEY_CREATION_DATE: "key_creation_date",
    KEY_TYPE: "key_type",
    DESCRIPTION: "description",
    KEY_SPEC: "key_spec",
    KEY_USAGE: "key_usage",
    KEY_STATE: "key_state",
    ATTACHED_POLICY: "attached_policy",
    CREATED_TIME: "created_time",
    UPDATED_TIME: "updated_time",
    CREATED_BY: "created_by"
};

module.exports = { keyDetailsDataModel, KEYDETAIL_ATTRIBUTES }