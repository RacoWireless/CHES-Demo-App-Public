/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * This validator handles Key api inputs
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30
 */
const yup = require("yup");


const createKeyRequest = yup.object().shape({
    key_spec: yup.string().required(),
    description: yup.string().optional(),
    key_usage: yup.string().required(),
    alias: yup.string().matches("^[a-zA-Z0-9:/_-]+$").required(),
    username: yup.string().required(),
    email: yup.string().required()
});

const getPublicKeyRequest = yup.object().shape({
    keyId: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required()
});

const getAllKeyRequest = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    limit: yup.number().optional(),
    offset: yup.number().optional(),
    sort_by: yup.string().optional(),
    sort_order: yup.string().optional(),
    search_by: yup.string().optional(),
    search_value: yup.string().optional()
});


module.exports = {
    createKeyRequest,
    getPublicKeyRequest,
    getAllKeyRequest
};
