/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * The patient repository handles patient management and communicate with db
 *
 * @author  sjohny@korewireless.com
 * @since   2021-07-29
 */
const { patientModel, PATIENT_ATTRIBUTES } = require("../models/PatientModel");
const { getCurrentTimestamp } = require("../providers/UtilityProvider");

const patientRepository = {
  /**
   * function to create patient
   * @param  payload
   * @returns result
   */
  async createPatient(payload = null) {
    try {
      const { insertObj, transaction = null } = payload;
      const currentTimestamp = await getCurrentTimestamp();
      insertObj.created_time = currentTimestamp;
      insertObj.updated_time = currentTimestamp;
      const result = await patientModel.create(insertObj, { transaction });
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to edit patient
   * @param  payload
   * @returns result
   */
  async updatePatient(payload = null) {
    try {
      const { updateData, conditions, transaction = null } = payload;
      const currentTimestamp = await getCurrentTimestamp();
      updateData.updated_time = currentTimestamp;
      const result = await patientModel.update(updateData, {
        where: conditions,
        transaction,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to validate patient
   * @param payload
   * @returns
   */
  async validatePatient(payload = null) {
    try {
      const { where } = payload;
      const include = [];
      const condition = { where, raw: true, attributes: [PATIENT_ATTRIBUTES.ID], include };
      return await patientModel.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to get patient
   * @param payload
   * @returns
   */
  async getPatient(payload = null) {
    try {
      const { condition } = payload;
      return await patientModel.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to delete patient
   * @param  payload 
   * @returns 
   */
  async deletePatient(payload = null) {
    try {
      const { condition, transaction = null } = payload;
      const result = await patientModel.destroy(condition, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to list patient details
   * @param payload 
   * @returns Patients
   */
  async listPatient(payload = null) {
    try {
      const { condition } = payload;
      return await patientModel.findAndCountAll(condition);
    } catch (error) {
      throw error;
    }
  }
};
module.exports = patientRepository;
