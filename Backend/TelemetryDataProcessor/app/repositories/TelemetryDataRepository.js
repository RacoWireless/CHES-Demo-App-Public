/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The telemetry Data Provider
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */

const { TelemetryData } = require("../models/TelemetryData");
const { getCurrentTimestamp } = require("../providers/UtilityProvider");
const { QueryTypes } = require('sequelize');
const sequelize = require("../providers/DBProvider");
const Logger = require("../providers/Logger")
const constants = require("../constants/constants");


const telemetryDataRepository = {
    /**
     * function to insert new telemetry record
     * @param  payload
     * @returns result
     */
    async insertTelemetryData(payload = null) {
        try {
            const transaction = null;
            const currentTimestamp = await getCurrentTimestamp();
            payload.created_time = currentTimestamp;
            payload.updated_time = currentTimestamp;
            const result = await TelemetryData.create(payload, { transaction });
            return result;
        } catch (error) {
            Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "telemetryDataRepository=>insertTelemetryData", error)
            throw error;
        }
    },

    /**
     *Function to get Key Id and user of kituserID 
     * @param {*} kitUserId 
     * @returns 
     */


    async getKeyIdOfTelemetryData(kitUserId) {

        try {
            const data = await sequelize.query(
                'SELECT kd.key_arn as keyId,eka.created_by as userId FROM patient_info as pi inner join encryption_key_association as eka on (eka.patient_id = pi.id) inner join key_details as kd on (kd.id = eka.key_id) WHERE pi.shared_user_id = :kitUserId;',
                {
                    replacements: { kitUserId: kitUserId },
                    type: QueryTypes.SELECT
                }
            );
            return data;
        }
        catch (error) {
            Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "telemetryDataRepository=>getKeyIdOfTelemetryData", error)
            throw error;
        }

    },

    async getOrganizationKeyIdOfTelemetryData() {

        try {
            const data = await sequelize.query(
                'SELECT kd.key_arn as keyId,eka.created_by as userId FROM encryption_key_association as eka inner join key_details as kd on (kd.id = eka.key_id) WHERE eka.patient_id IS NULL;',
                {
                    type: QueryTypes.SELECT
                }
            );
            return data;
        }
        catch (error) {
            Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "telemetryDataRepository=>getOrganizationKeyIdOfTelemetryData", error)
            throw error;
        }

    }

}


module.exports = telemetryDataRepository;