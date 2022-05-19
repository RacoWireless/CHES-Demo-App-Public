/**
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The config controller handles config creation and update, 
 *
 * @author  nsabeesh@korewireless.com
 * @since   2021-08-02
 */
const constants = require("../constants/Constants")
const responseObj = require("../providers/UtilityProvider").responseObj;
const handleError = require("../exceptions/Error").handleError;
const Logger = require("../providers/Logger")
const LoggerConstants = require("../constants/LoggerConstants")
const KMSConstants = require("../constants/KMSConstants")
const { createOrgSpecificConfigReq, createPatientSpecificConfigReq, getConfigReq } = require("../rules/config/ConfigFormValidator");
const serviceException = require("../exceptions/ServiceError");
const errorType = require("../exceptions/ErrorType");
const configService = require("../services/ConfigService");
let configController = {
    /**
     * create or update config
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     * @returns 
     */
    async createCofiguration(request, response, next) {
        const { headers, currentUser, query, body } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        const { reqType } = JSON.parse(JSON.stringify({ ...query }));
        try {
            if (reqType == KMSConstants.ENCRYPTION_KEY_TYPE.ORGANIZATION) {
                await createOrgSpecificConfigReq.validate(body);
            } else if (reqType == KMSConstants.ENCRYPTION_KEY_TYPE.PATIENT) {
                await createPatientSpecificConfigReq.validate(body);
            } else {
                throw serviceException(errorType.REQUIRED_FIELD_MISSING, "reqType missing", "reqType");
            }
            const configObj = await configService.createConfigService({ config: body, currentUser });
            return responseObj(
                constants.STATUS.CREATED,
                configObj ? configObj : {},
                response
            );
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.CONFIG, LoggerConstants.MESSAGES.ERROR.CONFIG_CREATE, error);
            return handleError(error, language, response);
        }
    },
    // get configuration
    async getCofiguration(request, response, next) {
        const { headers, currentUser } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        const query = JSON.parse(JSON.stringify({ ...request.query }));
        try {
            await getConfigReq.validate(query);
            const configObj = await configService.getConfigService({ config: query, currentUser });
            return responseObj(
                constants.STATUS.SUCCESS,
                configObj ? configObj : {},
                response
            );
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.CONFIG, LoggerConstants.MESSAGES.ERROR.CONFIG_GET, error);
            return handleError(error, language, response);
        }
    },
    async getAssignedOrgorPatient(request, response, next) {
        const { headers } = request;
        const language = headers["Content-language"] || constants.DEFAULT_LANG;
        const params = JSON.parse(JSON.stringify({ ...request.params }));
        try {
            const configObj = await configService.getAssignedOrgorPatient({ key: params });
            return responseObj(
                constants.STATUS.SUCCESS,
                configObj ? configObj : {},
                response
            );
        }
        catch (error) {
            Logger.error(LoggerConstants.TYPES.CONFIG, LoggerConstants.MESSAGES.ERROR.CONFIG_GET, error);
            return handleError(error, language, response);
        }
    },
}


module.exports = configController;