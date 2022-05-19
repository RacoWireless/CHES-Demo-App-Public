/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * The configuration service handles configuration management
 * @author  sjohny@korewireless.com
 * @since   2021-07-30
 */
const serviceException = require("../exceptions/ServiceError");
const errorType = require("../exceptions/ErrorType");
const sequelize = require("../providers/DBProvider");
const KMSConstants = require("../constants/KMSConstants");
const configRepository = require("../repostories/ConfigRepository");
const KeyDetailRepository = require("../repostories/KeyDetailRepository");

const configService = {
    /**
     * function to create config
     * @param config
     * @returns configObj
     */
    async createConfigService(payload) {
        const { config, currentUser } = payload;
        try {
            let configObject = {};
            if (config.organization_id != null) {
                const isExists = await configRepository.getConfig({ condition: { where: { organization_id: config.organization_id } } });
                if (isExists) {
                    if (await configRepository.getConfig({ condition: { where: { organization_id: config.organization_id, key_id: config.key_id } } })) {
                        throw serviceException(errorType.ALREADY_EXISTS, "Already exists", null);
                    };
                    configObject = await configRepository.updateConfig({
                        updateData: { key_id: config.key_id, updated_by: currentUser.email },
                        condition: { id: isExists.id }
                    });
                }
                else {
                    config.created_by = currentUser.email;
                    config.updated_by = currentUser.email;
                    configObject = await configRepository.createConfig({ insertObj: config });
                }
                // throw serviceException(errorType.ALREADY_EXISTS,"Already exists",null);
            } else if (config.patient_id != null) {
                const isExists = await configRepository.getConfig({ condition: { where: { patient_id: config.patient_id } } });
                if (isExists) {
                    if (await configRepository.getConfig({ condition: { where: { patient_id: config.patient_id, key_id: config.key_id } } })) {
                        throw serviceException(errorType.ALREADY_EXISTS, "Already exists", null);
                    }
                    configObject = await configRepository.updateConfig({
                        updateData: { key_id: config.key_id, updated_by: currentUser.email },
                        condition: { id: isExists.id }
                    });
                }
                // throw serviceException(errorType.ALREADY_EXISTS,"Already exists",null);
                else {
                    config.created_by = currentUser.email;
                    config.updated_by = currentUser.email;
                    configObject = await configRepository.createConfig({ insertObj: config });
                }
            }
            if (configObject) {
                await KeyDetailRepository.updateKey({ updateData: { status: KMSConstants.STATUS.ASSIGNED }, conditions: { id: config.key_id } })
            }
            return configObject;

        } catch (error) {
            throw error;
        }
    },
    /**
     * get config
     * @param {*} payload 
     * @returns 
     */
    async getConfigService(payload) {
        const { config } = payload;
        try {
            let configObject = {}
            if (config.organization_id != null) {
                configObject = await configRepository.getConfig({ condition: { where: { organization_id: config.organization_id } } });
            } else if (config.patient_id != null) {
                configObject = await configRepository.getConfig({ condition: { where: { patient_id: config.patient_id } } });
            }
            return configObject;
        } catch (error) {
            throw error;
        }
    },
    /**
     * get assigned org or patient
     * @param {*} payload 
     * @returns 
     */
    async getAssignedOrgorPatient(payload) {
        const { key } = payload;
        try {
            let configObject = {}
            if (key.key_id != null) {
                configObject = await configRepository.getAssignedOrgorPatient(key.key_id);
            }
            return configObject;
        } catch (error) {
            throw error;
        }
    },
};
module.exports = configService;
