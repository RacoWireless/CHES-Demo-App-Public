/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Key Details Repository
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

const { keyDetailsDataModel } = require("../models/KeyDetailModel")
const { getCurrentTimestamp } = require("../providers/UtilityProvider");

const KeyDetailRepository = {

    /**
     * Function to add key entry in the DB table 'key_details'
     * @param {     key_id: Key id of the Key,
                    key_arn: AWS Arn of the Key,
                    encryption_algorithm: KMSConstants.ENCRYPTION_ALGORITHM.RSAES_OAEP_SHA_256,
                    status: KMSConstants.STATUS.UNASSIGNED,
                    key_creation_date:Creation Date,
                    key_type: KMSConstants.KEY_TYPE.ASYMMETRIC,
                    description:Description,
                    key_spec: Customer Master Key Spec,
                    key_usage: Key Usage,
                    key_state: Key State,
                    attached_policy: KMSConstants.ATTACHED_POLICY,
                    created_by: "userId"}  
     * @returns  DB Entry
     */
    async addKeyDetailData(keyDetails) {
        try {
            const currentTimestamp = await getCurrentTimestamp();
            keyDetails.created_time = currentTimestamp;
            keyDetails.updated_time = currentTimestamp;
            const result = await keyDetailsDataModel.create(keyDetails);
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Function to get a single key entry from DB
     * @param {where: { key_alias: payload.alias }, attributes: ["id"]} condition 
     * @returns if key exists {"id":30} else null 
     */

    async getKeyDetail(condition) {
        try {
            return await keyDetailsDataModel.findOne(condition);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Function to return all keys created by a user
     * @param { where: {
                    created_by: "userId"
                }, attributes: attributes, order, limit: null, offset: null, col: "id", distinct: true, subQuery: false
           } condition 
     * @returns  List of all keys
     */
    async getAllKeyDetails(condition) {
        try {
            return await keyDetailsDataModel.findAndCountAll(condition);
        } catch (error) {
            throw error;
        }
    },
    /**
     * function to edit key
     * @param  payload
     * @returns result
     */
    async updateKey(payload = null) {
        try {
            const { updateData, conditions, transaction = null } = payload;
            const currentTimestamp = await getCurrentTimestamp();
            updateData.updated_time = currentTimestamp;
            const result = await keyDetailsDataModel.update(updateData, {
                where: conditions,
                transaction,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = KeyDetailRepository