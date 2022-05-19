/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The en to define error messages in english
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */


const LOGGER = {
    TYPES: {
        KMS: "CHES-DEMO-CLOUD-KMS",
        PNT: "CHES-DEMO-CLOUD-PATIENT",
        AUTH: "CHES-DEMO-CLOUD-AUTH",
        TEL: "CHES-DEMO-CLOUD-TELEMETRY-DATA",
        CONFIG: "CHES-DEMO-CLOUD-CONFIG"
    },
    MESSAGES: {
        ERROR: {
            PATIENT_EDIT: "Update patient failed",
            PATIENT_CREATE: "Create patient failed",
            PATIENT_DELETE: "Delete patient failed",
            PATIENT_LIST: "List patients failed",
            TELEMETRY: "List telemetry data failed",
            CONFIG_CREATE: "Create config failed",
            CONFIG_GET: "Get config failed",
            PATIENT_LIST: "List patients failed"
        }
    }

};

module.exports = LOGGER