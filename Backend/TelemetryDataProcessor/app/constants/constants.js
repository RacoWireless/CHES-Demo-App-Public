/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Constants
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */


module.exports = {

  RSA_ENCRYPTION_ALGORITHM: "RSAES_OAEP_SHA_256", //  | RSAES_OAEP_SHA_1 | RSAES_OAEP_SHA_256,

  AES_ALGORITHM: 'aes-256-gcm',

  LOG_TYPE: { PROCESS_KAFKA_DATA: "PROCESS_KAFKA_DATA" },

  STATUS: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CREATED: 201,
    DELETED: 204
  },

  PROCESS_TYPE: {
    KITUSER: "KITUSER",
    ORG: "ORG",
    KEY_NOT_EXIST:"KEY_NOT_EXIST"
  }

}