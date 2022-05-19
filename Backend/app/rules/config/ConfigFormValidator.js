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
const createOrgSpecificConfigReq = yup.object().shape({
  organization_id: yup.number().required(),
  key_id: yup.number().required(),
  effective_date: yup.number().required()
});

const createPatientSpecificConfigReq = yup.object().shape({
  patient_id: yup.number().required(),
  key_id: yup.number().required(),
  effective_date: yup.number().required()
});

const getConfigReq = yup.object().shape({
  patient_id: yup.number().nullable(),
  key_id: yup.number().nullable(),
});

module.exports = {
  createOrgSpecificConfigReq,
  createPatientSpecificConfigReq,
  getConfigReq
};
