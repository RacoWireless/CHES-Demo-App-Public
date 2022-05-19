/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * Utility functions provider class
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

const moment = require("moment");


module.exports = {

    /**
    * function to create current timestamp
    */
    async getCurrentTimestamp() {
        return Math.floor(moment.utc().valueOf() / 1000);
    },
    /**
     * function to convert  timestamp
     */
    async convertDatetimeToEpoch(datetime = null) {
        return datetime ? Math.floor(moment.utc(datetime).valueOf() / 1000) : null;
    },

    /**
    *  function to return response 
    */
    async responseObj(statusCode = null, message = null, response = null) {
        return response ? response.status(statusCode).send(message) : { statusCode: statusCode, data: message };
    }
}
