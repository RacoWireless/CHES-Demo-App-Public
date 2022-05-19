/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * This validator handles Patient api inputs
 * @author  sjohny@korewireless.com
 * @since   2021-07-30
 */
const yup = require("yup");
const createPatientRequest = yup.object().shape({
  patient_id: yup.string().required(),
  shared_user_id: yup.string().required(),
  created_by: yup.string().required(),
  updated_by: yup.string().required(),
});

const editPatientRequest = yup.object().shape({
  id: yup.number().required(),
  patient_id: yup.string().required(),
  shared_user_id: yup.string().required(),
  updated_by: yup.string().required(),
});

const getPatientRequest = yup.object().shape({
  id: yup.number().required(),
});

const deletePatientRequest = yup.object().shape({
  id: yup.number().required()
});

module.exports = {
  createPatientRequest,
  editPatientRequest,
  getPatientRequest,
  deletePatientRequest
};
