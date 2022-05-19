/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The DB Provider
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */

const { Sequelize } = require('sequelize');
const mysql2 = require("mysql2");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    port: parseInt(process.env.DB_PORT),
    logging: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize