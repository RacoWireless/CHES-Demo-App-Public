/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The  Error Handler
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

const constants = require("../constants/Constants")
const messages = require("../languages/Messages")
const responseObj = require("../providers/UtilityProvider").responseObj;

const Error = {
  /**
   * function to return errors
   */
  async handleError(error, language = null, response = null, statusCode = null) {
    return responseObj(statusCode ? statusCode : constants.STATUS.BAD_REQUEST, { error: Error.errorMap(error, language) }, response);

  },


  /**
   * supporting function to map errors
   */
  errorMap(error, language) {
    try {
      const map = {
        "SequelizeUniqueConstraintError": messages[language].SEQ_CONSTRAINT_ERROR,
        "SequelizeDatabaseError": messages[language].SEQ_DATABASE_ERROR,
        "ValidationError": messages[language].SEQ_VALIDATION_ERROR,
        "ReferenceError": messages[language].SEQ_REFERNCE_ERROR,
        "Error": messages[language].SEQ_ERROR,
        "min": messages[language].MIN_FIELD,
        "max": messages[language].MAX_FIELD,
        "typeError": messages[language].TYPE_ERROR,
        "DUPLICATE_FIELD_ERROR": messages[language].DUPLICATE_FIELD,
        "INVALID_SORT_ORDER": messages[language].INVALID_SORT_ORDER,
        "NO_PATIENT_FOUND": messages[language].NO_PATIENT_FOUND,
        "KEY_ALIAS_ALREADY_EXISTS": messages[language].KEY_ALIAS_ALREADY_EXISTS,
        "INVALID_TOKEN": messages[language].INVALID_TOKEN,
        "UNKNOWN_KEYID": messages[language].UNKNOWN_KEYID,
        "ACCESS_KEY_EXPIRED": messages[language].ACCESS_KEY_EXPIRED,
        "KEY_ISSUER_INVALID": messages[language].KEY_ISSUER_INVALID,
        "TOKEN_IS_NOT_ID_KEY": messages[language].TOKEN_IS_NOT_ID_KEY,
        "JsonWebTokenError": messages[language].JSON_WEB_TOKEN_ERROR,
        "REQUIRED_FIELD_MISSING": messages[language].REQUIRED_FIELD_MISSING,
        "required": messages[language].REQUIRED_FIELD_MISSING,
        "TokenExpiredError": messages[language].TOKENEXPIREDERROR,
        "ALREADY_EXISTS": messages[language].ALREADY_EXISTS,
        "KMS_ERROR": messages[language].KMS_ERROR
      };

      // if (error.name == "ValidationError")
      //     return map[error.name] || messages[language].ERROR;

      if (error.type && error.path) {
        return (map[error.type] && map[error.type].replace("#FIELD#", error.path || "").replace("_", " ")) || messages[language].ERROR;
      } else if (error.type) {
        return map[error.type] || messages[language].ERROR;
      } else {
        return map[error.name] || messages[language].ERROR;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Error;