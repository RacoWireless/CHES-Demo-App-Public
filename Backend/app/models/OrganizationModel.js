/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * This one defines model for organization
 *
 * @author  nsabeesh@korewireless.com
 * @since   2021-08-02
 */
const sequelize = require("../providers/DBProvider");
const DataTypes = require("sequelize");

const orgModel = sequelize.define("organization", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    organization_name: {
        type: DataTypes.INTEGER,
        allowNull: true,
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


const ORG_ATTRIBUTES = {
    ID: "id",
    ORGANIZATION_ID: "organization_id",
    ORGANIZATION_NAME: "organization_name",
    CREATED_TIME: "created_time",
    UPDATED_TIME: "updated_time",
    CREATED_BY: "created_by",
    UPDATED_BY: "updated_by"
};

module.exports = { orgModel, ORG_ATTRIBUTES };