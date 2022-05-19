/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * The patient controller handles all patient operations
 *
 * @author  sjohny@korewireless.com
 * @since   2021-07-29
 */

const patientService = require("../services/PatientService");
const { responseObj } = require("../providers/UtilityProvider");
const { handleError } = require("../exceptions/Error");
const constants = require("../constants/Constants");
const messages = require("../languages/Messages");
const {
  createPatientRequest,
  editPatientRequest,
  deletePatientRequest
} = require("../rules/patient/PatientFormValidator");
const LOGGER = require("../constants/LoggerConstants");
const Logger = require("../providers/Logger");

const patientController = {
  /**
   * function to create patient
   * @param  request
   * @param  response
   * @param  next
   * @returns patientObj
   */
  async createPatient(request, response, next) {
    const { headers, currentUser, body } = request;
    const patient = body;

    const language = headers["Content-language"]
      ? headers["Content-language"]
      : constants.DEFAULT_LANG;
    try {
      patient.created_by = currentUser.email;
      patient.updated_by = currentUser.email;
      await createPatientRequest.validate(patient);
      const patientObj = await patientService.createPatientService(patient);
      return responseObj(
        constants.STATUS.CREATED,
        patientObj ? patientObj : {},
        response
      );
    } catch (error) {
      Logger.error(LOGGER.TYPES.PNT, LOGGER.MESSAGES.ERROR.PATIENT_CREATE, { patient, error });
      return handleError(error, language, response);
    }
  },

  /**
   * function to edit patient
   * @param request
   * @param response
   * @param next
   * @returns patientObj
   */
  async editPatient(request, response, next) {
    const { headers, currentUser, body } = request;
    const patient = body;
    const language = headers["Content-language"]
      ? headers["Content-language"]
      : constants.DEFAULT_LANG;
    try {
      patient.updated_by = currentUser.email;
      await editPatientRequest.validate(patient);
      const patientObj = await patientService.editPatientService(patient);
      return responseObj(
        constants.STATUS.SUCCESS,
        patientObj ? { message: messages[language].UPDATED_SUCCESS } : {},
        response
      );
    } catch (error) {
      Logger.error(LOGGER.TYPES.PNT, LOGGER.MESSAGES.ERROR.PATIENT_EDIT, { patient, error });
      return handleError(error, language, response);
    }
  },

  /**
   * function to delete patient
   * @param  request 
   * @param  response 
   * @param  next 
   * @returns isDeleted
   */
  async deletePatient(request, response, next) {
    const { headers, body } = request;
    const patient = body;
    const language = headers["Content-language"]
      ? headers["Content-language"]
      : constants.DEFAULT_LANG;
    try {
      await deletePatientRequest.validate(patient);
      const isDeleted = await patientService.deletePatientService(patient);
      return responseObj(
        constants.STATUS.SUCCESS,
        isDeleted ? { message: messages[language].DELETED_SUCCESS } : {}, response
      );
    } catch (error) {
      Logger.error(LOGGER.TYPES.PNT, LOGGER.MESSAGES.ERROR.PATIENT_DELETE, { patient, error });
      return handleError(error, language, response);
    }
  },

  /**
   * function to list patients
   * @param request 
   * @param response 
   * @param next 
   * @returns patientObj
   */
  async listPatient(request, response, next) {
    const { query, headers } = request;
    const patient = query;
    const language = headers["Content-language"]
      ? headers["Content-language"]
      : constants.DEFAULT_LANG;
    try {
      const patientObj = await patientService.listPatientService({ patient });
      return responseObj(
        constants.STATUS.SUCCESS, patientObj, response
      );
    } catch (error) {
      Logger.error(LOGGER.TYPES.PNT, LOGGER.MESSAGES.ERROR.PATIENT_LIST, { patient, error });
      return handleError(error, language, response);
    }
  },
};
module.exports = patientController;
