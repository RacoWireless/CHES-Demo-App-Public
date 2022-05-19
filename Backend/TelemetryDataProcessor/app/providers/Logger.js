/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The default Logger
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */
const winston = require("winston");

const myformat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
);
const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: myformat
        })
    ],
});


const Logger = {

    info(label, msg, data) {
        Logger.log("info", label, msg, data);
    }
    ,
    error(label, msg, data) {
        Logger.log("error", label, msg, data);
    },

    log(level, label, msg, data, user) {
        const body = JSON.stringify({
            label: label,
            message: msg,
            timestamp: new Date().getTime(),
            data: data,
            user: user || ""
        });
        logger.log(level, body);
    }
}

module.exports = Logger;