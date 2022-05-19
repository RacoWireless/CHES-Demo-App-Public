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
const patientRepository = require("../repostories/PatientRepository");
const { PATIENT_ATTRIBUTES } = require("../models/PatientModel");
const { Op } = require("sequelize");
const serviceException = require("../exceptions/ServiceError");
const errorType = require("../exceptions/ErrorType");
const constants = require("../constants/Constants");
const configRepository = require("../repostories/ConfigRepository");
const KMSConstants = require("../constants/KMSConstants");
const KeyDetailRepository = require("../repostories/KeyDetailRepository");

const patientService = {
  /**
   * function to create patient
   * @param patient
   * @returns patientObj
   */
  async createPatientService(patient) {
    try {
      const isPatientIdExists = await patientRepository.validatePatient({
        where: { patient_id: patient.patient_id },
      });
      if (isPatientIdExists)
        throw serviceException(
          errorType.DUPLICATE_FIELD_ERROR,
          "Patient ID already exists",
          "patient id"
        );
      // const isSharedIdExists = await patientRepository.validatePatient({
      //   where: { shared_user_id: patient.shared_user_id },
      // });
      // if (isSharedIdExists)
      //   throw serviceException(
      //     errorType.DUPLICATE_FIELD_ERROR,
      //     "Shared user ID already exists",
      //     "shared user id"
      //   );
      const patientObj = await patientRepository.createPatient({
        insertObj: patient,
      });
      return patientObj;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to edit patient
   * @param patient
   * @returns updatedPatientObj
   */
  async editPatientService(patient) {
    try {
      const patientObj = await patientRepository.getPatient({
        condition: {
          where: { id: patient.id },
          attributes: [PATIENT_ATTRIBUTES.ID, PATIENT_ATTRIBUTES.PATIENT_ID],
        },
      });
      if (!patientObj) {
        throw serviceException(
          errorType.NO_PATIENT_FOUND,
          "Patient not found",
          null
        );
      }
      const isPatientIdExists = await patientRepository.validatePatient({
        where: { patient_id: patient.patient_id, id: { [Op.not]: patient.id } },
      });
      if (isPatientIdExists)
        throw serviceException(
          errorType.DUPLICATE_FIELD_ERROR,
          "Patient ID already exists",
          "patient id"
        );
      // const isSharedIdExists = await patientRepository.validatePatient({
      //   where: {
      //     shared_user_id: patient.shared_user_id,
      //     id: { [Op.not]: patient.id },
      //   },
      // });
      // if (isSharedIdExists)
      //   throw serviceException(
      //     errorType.DUPLICATE_FIELD_ERROR,
      //     "Shared user ID already exists",
      //     "shared user id"
      //   );
      const updatedPatientObj = await patientRepository.updatePatient({
        updateData: patient,
        conditions: { id: patient.id },
        transaction: null,
      });
      return updatedPatientObj;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to delete patient
   * @param  patient
   * @returns patientDeleteObj
   */
  async deletePatientService(patient) {
    try {
      const patientObj = await patientRepository.getPatient({
        condition: {
          where: { id: patient.id },
          attributes: [PATIENT_ATTRIBUTES.ID, PATIENT_ATTRIBUTES.PATIENT_ID],
        },
      });
      if (!patientObj) {
        throw serviceException(
          errorType.NO_PATIENT_FOUND,
          "Patient not found",
          null
        );
      }
      const configInfo = await configRepository.getConfig({
        condition: { where: { patient_id: patient.id } },
      });
      await configRepository.deleteConfig({
        condition: { where: { patient_id: patient.id } },
      });
      const patientDeleteObj = await patientRepository.deletePatient({
        condition: { where: { id: patient.id } },
      });
      if (configInfo) {
        const configuration = await configRepository.getConfig({ condition: { where: { key_id: configInfo.key_id, patient_id: { [Op.not]: patient.id } } } });
        if (!configuration) await KeyDetailRepository.updateKey({ updateData: { status: KMSConstants.STATUS.UNASSIGNED }, conditions: { id: configInfo.key_id } })
      }
      return patientDeleteObj;
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to list patients
   * @param payload 
   * @returns patientObj
   */
  async listPatientService(payload = null) {
    try {
      const { patient } = payload;
      const data = {
        attributes: [
          PATIENT_ATTRIBUTES.ID,
          PATIENT_ATTRIBUTES.PATIENT_ID,
          PATIENT_ATTRIBUTES.SHARED_USER_ID,
        ],
      };
      const {
        limit = constants.DB.LIMIT,
        offset = 0,
        nopaging = 0,
        search_by = false,
        search_value = "",
        sort_by = PATIENT_ATTRIBUTES.ID,
        sort_order = constants.DB.SORT.ASC,
      } = patient;
      const where = await patientService.createPatientSearchObject({
        search_by,
        search_value,
      });
      if (
        !["asc", "desc"].includes(sort_order.toString().toLowerCase().trim())
      ) {
        throw new serviceException(
          errorType.INVALID_SORT_ORDER,
          "Invalid order for sorting",
          null
        );
      }
      const order = [[sort_by, sort_order.toLowerCase().trim()]];
      const conditions = {
        where,
        attributes: data.attributes,
        order,
        include: [],
        limit: null,
        offset: null,
        col: "id",
        distinct: true,
        subQuery: false,
      };
      if (nopaging == 0) {
        conditions.limit = parseInt(limit);
        conditions.offset = parseInt(offset);
      }
      return await patientRepository.listPatient({ condition: conditions });
    } catch (error) {
      throw error;
    }
  },

  /**
   * function to create patient search object
   * @param payload 
   * @returns where
   */
  async createPatientSearchObject(payload = null) {
    const { search_by = false, search_value = "" } = payload;
    let where = {};
    const searchByMap = [
      PATIENT_ATTRIBUTES.PATIENT_ID,
      PATIENT_ATTRIBUTES.SHARED_USER_ID,
    ];
    if (search_by && search_by === "any" && search_value != "") {
      where[Op.or] = [
        { patient_id: { [Op.like]: `%${search_value}%` } },
        { shared_user_id: { [Op.like]: `%${search_value}%` } },
      ];
    } else if (
      search_by &&
      search_by !== null &&
      search_value != "" &&
      searchByMap.includes(search_by)
    ) {
      where[search_by] = { [Op.like]: `%${search_value}%` };
    }
    return where;
  },
};
module.exports = patientService;
