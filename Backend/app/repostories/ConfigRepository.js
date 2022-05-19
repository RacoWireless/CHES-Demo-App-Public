/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * The config repository handles config management and communicate with db
 *
 * @author  nsabeesh@korewireless.com
 * @since   2021-08-02
 */
const { configModel } = require("../models/ConfigModel");
const { getCurrentTimestamp } = require("../providers/UtilityProvider");
const sequelize = require("../providers/DBProvider");
const { QueryTypes } = require('sequelize');

const configRepository = {
  /**
   * function to create config
   * @param  payload
   * @returns result
   */
  async createConfig(payload = null) {
    try {
      const { insertObj, transaction = null } = payload;
      const currentTimestamp = await getCurrentTimestamp();
      insertObj.created_time = currentTimestamp;
      insertObj.updated_time = currentTimestamp;
      const result = await configModel.create(insertObj, { transaction });
      return result;
    } catch (error) {
      throw error;
    }
  },
  /**
   * function to get config
   * @param payload
   * @returns
   */
  async getConfig(payload = null) {
    try {
      const { condition } = payload;
      return await configModel.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  /**
* function to delete config
* @param  payload 
* @returns result
*/
  async deleteConfig(payload = null) {
    try {
      const { condition, transaction = null } = payload;
      const result = await configModel.destroy(condition, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },
  /**
* function to update config
* @param  payload 
* @returns result
*/
  async updateConfig(payload = null) {
    try {
      const { updateData, condition, transaction = null } = payload;
      const currentTimestamp = await getCurrentTimestamp();
      updateData.updated_time = currentTimestamp;
      const result = await configModel.update(updateData, {
        where: condition,
        transaction,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  /**
  * function to get config
  * @param payload
  * @returns
  */
  async getAssignedOrgorPatient(payload = null) {
    try {
      const data = await sequelize.query(
        'SELECT t1.key_id,t2.organization_name,t3.patient_id FROM encryption_key_association t1  LEFT JOIN organization t2 ON t2.id = t1.organization_id LEFT JOIN patient_info t3 ON t3.id = t1.patient_id WHERE	t1.key_id = ' + payload,
        {
          type: QueryTypes.SELECT
        }
      );
      return data;
    }
    catch (error) {
      throw error;
    }
  },
};
module.exports = configRepository;
