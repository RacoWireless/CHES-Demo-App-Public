/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The data processor for data from Kafka
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-04 
 */

require('dotenv').config();

const app = require("./app/app")
// const constants = require("./app/constants")

exports.handler = async (event, context, callback) => {

    try {
        const response = await app.processAndStoreData(event)

        callback(null, response);
    }

    catch (err) {
        callback(new Error("[BadRequest] " + err.message));
    }
}