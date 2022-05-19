/**
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The key service handles operations related to key creation , 
 * get Public Key and list all keys. 
 *
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-29
 */


const KMSProvider = require("../providers/KMSProvider")
const KeyDetailRepository = require("../repostories/KeyDetailRepository")
const KMSConstants = require("../constants/KMSConstants")
const Logger = require("../providers/Logger")
const LoggerConstants = require("../constants/LoggerConstants")
const serviceException = require("../exceptions/ServiceError")
const ErrorType = require("../exceptions/ErrorType")
const constants = require("../constants/Constants")
const { KEYDETAIL_ATTRIBUTES } = require("../models/KeyDetailModel")
const { Op } = require("sequelize");

const keyService = {

    /**
     * Function to create a key in KMS
     * @param { "CustomerMasterKeySpec": "RSA_2048",
                "Description": "Key Generate Test",
                "KeyUsage": "ENCRYPT_DECRYPT",
                "alias" : Alias name for key} payload 
     * @returns if key creation suucess, the entry from DB
     */
    async createKeyService(payload) {

        try {

            Logger.info(LoggerConstants.TYPES.KMS, "keyService : createKeyService() ", payload)

            const data = await KeyDetailRepository.getKeyDetail(
                { where: { key_alias: payload.alias }, attributes: [KEYDETAIL_ATTRIBUTES.ID] }
            )

            Logger.info(LoggerConstants.TYPES.KMS, "Any Existing key alias from DB in service", data)

            if (data != null)
                throw serviceException(ErrorType.KEY_ALIAS_ALREADY_EXISTS, "The key with same alias exists", null)


            const keyInfo = await KMSProvider.createRSAKeyPair({
                "CustomerMasterKeySpec": KMSConstants.KEY_SPEC.RSA_2048,
                "Description": payload.description || "",
                "KeyUsage": payload.key_usage,
                "MultiRegion": KMSConstants.MULTIREGION,
                "Origin": KMSConstants.ORIGIN,
                "Tags": KMSConstants.TAGS
            });


            if (process.env.KEY_CREATION == "enabled") {

                await KMSProvider.setPolicy(keyInfo.KeyId);

                await KMSProvider.setAliasName(keyInfo.KeyId, process.env.NODE_ENV + "-" + payload.alias);

            }

            Logger.info(LoggerConstants.TYPES.KMS, "key details  response from KMS in service", keyInfo)

            return await KeyDetailRepository.addKeyDetailData(
                {
                    key_id: keyInfo.KeyId,
                    key_arn: keyInfo.Arn,
                    encryption_algorithm: KMSConstants.ENCRYPTION_ALGORITHM.RSAES_OAEP_SHA_256,
                    status: KMSConstants.STATUS.UNASSIGNED,
                    key_alias: payload.alias,
                    key_creation_date: keyInfo.CreationDate,
                    key_type: KMSConstants.KEY_TYPE.ASYMMETRIC,
                    description: keyInfo.Description,
                    key_spec: keyInfo.CustomerMasterKeySpec,
                    key_usage: keyInfo.KeyUsage,
                    key_state: keyInfo.KeyState,
                    attached_policy: KMSConstants.ATTACHED_POLICY,
                    created_by: payload.username
                }

            )
                ;
        }
        catch (error) {
            throw error;
        }

    },

    /**
     * 
     * @param {keyId : KeyId of Key} keyParams 
     * @returns  the Public Key from KMS
     */


    async getPublicKeyService(keyParams) {

        try {
            Logger.info(LoggerConstants.TYPES.KMS, "keyService : getPublicKeyService() ", keyParams)

            const publicKey = await KMSProvider.getpublicKey(keyParams.keyId)
            return await KMSProvider.generateKey(publicKey.PublicKey);
        }
        catch (error) {
            throw serviceException(ErrorType.KMS_ERROR, error.message, null);
        }
    },

    /**
     * Function to return all keys f users, based upon the condition
     * @param {limit : 10, offset : 0, sort_by: the cloumn to sort, sort_order : asc} params 
     * @returns List of all keys
     */

    async getAllKeys(params) {
        try {
            Logger.info(LoggerConstants.TYPES.KMS, "keyService : getAllKeys() ", params)

            const attributes = [KEYDETAIL_ATTRIBUTES.ID, KEYDETAIL_ATTRIBUTES.KEY_ALIAS, KEYDETAIL_ATTRIBUTES.KEY_ID, KEYDETAIL_ATTRIBUTES.STATUS, KEYDETAIL_ATTRIBUTES.KEY_SPEC,
            KEYDETAIL_ATTRIBUTES.KEY_USAGE, KEYDETAIL_ATTRIBUTES.CREATED_TIME]

            const { limit = constants.DB.LIMIT, offset = 0, nopaging = 0, sort_by = KEYDETAIL_ATTRIBUTES.KEY_ID, sort_order = constants.DB.SORT.ASC, filter_by = {},
                search_by = false, search_value = "" } = params;

            const order = [[sort_by, sort_order.toLowerCase().trim()]]

            let where = {
                created_by: params.username, ...filter_by
            }
            where = await this.createKeySearchObject({ where, search_by, search_value })

            const conditions = {
                where: where, attributes: attributes, order, limit: null, offset: null, col: "id", distinct: true, subQuery: false
            };
            if (nopaging == 0) { conditions.limit = parseInt(limit); conditions.offset = parseInt(offset); }

            Logger.info(LoggerConstants.TYPES.KMS, "keyService : getAllKeys() : conditions", conditions)

            return await KeyDetailRepository.getAllKeyDetails(conditions);
        } catch (error) {
            throw error;
        }
    },

    async createKeySearchObject(payload) {

        const { where, search_by = false, search_value = "" } = payload;
        const searchByMap = [KEYDETAIL_ATTRIBUTES.KEY_ALIAS, KEYDETAIL_ATTRIBUTES.KEY_ID, KEYDETAIL_ATTRIBUTES.STATUS, KEYDETAIL_ATTRIBUTES.KEY_SPEC,
        KEYDETAIL_ATTRIBUTES.KEY_USAGE];
        if (search_by && search_by === "any" && search_value != "") {
            where[Op.or] = [
                { key_id: { [Op.like]: `%${search_value}%` } },
                { key_alias: { [Op.like]: `%${search_value}%` } },
                { status: { [Op.like]: `%${search_value}%` } },
                { key_usage: { [Op.like]: `%${search_value}%` } },
                { key_spec: { [Op.like]: `%${search_value}%` } },
            ];
        } else if (search_by && search_by !== null && search_value != "" && searchByMap.includes(search_by)) {
            where[search_by] = { [Op.like]: `%${search_value}%` };

        }
        Logger.info(LoggerConstants.TYPES.KMS, "created type model search object", { where });
        return where;
    }
}


module.exports = keyService;