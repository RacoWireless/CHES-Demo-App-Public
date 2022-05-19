/**
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The key controller handles operations related to key creation , 
 * get Public Key and list all keys. 
 *
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-29
 */
const constants = require("../constants/Constants")
const { responseObj } = require("../providers/UtilityProvider");
const { handleError } = require("../exceptions/Error");
const { createKeyRequest,
    getPublicKeyRequest,
    getAllKeyRequest } = require("../rules/key/KeyFormValidator")
const keyService = require("../services/KeyService")
const Logger = require("../providers/Logger")
const LoggerConstants = require("../constants/LoggerConstants")

let keyController = {
    /**
     * Function to Create a Key in KMs and store details in DB
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createKey(request, response, next) {
        const { headers, body } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        try {
            const keyDetails = JSON.parse(JSON.stringify({ ...body, username: headers['username'], email: headers['email'] }));
            await createKeyRequest.validate(keyDetails);
            const keyObj = await keyService.createKeyService(keyDetails);
            return responseObj(constants.STATUS.SUCCESS, keyObj, response);
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.KMS, "KeyController : createKey", error);
            return handleError(error, language, response);
        }
    },

    /**
     * Function to get the Public Key
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     * @returns 
     */
    async getPublicKey(request, response, next) {
        const { query, headers } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        const queryParams = JSON.parse(JSON.stringify({ ...query, username: headers['username'], email: headers['email'] }));
        try {
            await getPublicKeyRequest.validate(queryParams);
            const publicKey = await keyService.getPublicKeyService(queryParams);
            return responseObj(constants.STATUS.SUCCESS, publicKey, response);
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.KMS, "KeyController : getPublicKey", error);
            return handleError(error, language, response);
        }
    },

    /**
     * Function to return all keys, of a user
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     * @returns 
     */
    async getAllKeys(request, response, next) {
        const { query, headers } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        const queryParams = JSON.parse(JSON.stringify({ ...query, username: headers['username'], email: headers['email'] }));
        try {
            await getAllKeyRequest.validate(queryParams);
            Logger.info(LoggerConstants.TYPES.KMS, "Key Controller -getAllKeys", queryParams);
            const keyObjs = await keyService.getAllKeys(queryParams);
            return responseObj(constants.STATUS.SUCCESS, keyObjs, response);
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.KMS, "KeyController : getAllKeys", error);
            return handleError(error, language, response);
        }
    }

}


module.exports = keyController;