/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The fn to define error messages in french
 * 
 * @author  nsabeesh@korewireless.com
 * @since   2021-06-14 
 */
const fr = {
  PAYLOAD_FIELD_MISSING: "required payload field #FIELD# was missing.",
  DATA_FIELD_MISSING: "required data field #FIELD# was missing.",
  ADDED_SUCCESS: "Record added successfully",
  UNAUTHORISED: "Inavlid token, please relogin",
  UPDATED_SUCCESS: "Record updated successfully",
  SEQ_CONSTRAINT_ERROR: "duplicate entry for one of the field",
  SEQ_DATABASE_ERROR: "Server Error, Please contact administrator",
  SEQ_VALIDATION_ERROR: "validation error occcured, please check inputs",
  SEQ_REFERNCE_ERROR: "Server Error, Please contact administrator",
  SEQ_ERROR: "Server Error, Please contact adminisatrator",
  ERROR: "Server Error, Please contact administrator",
  MIN_FIELD: "Minimum value required for #FIELD#",
  MAX_FIELD: "Maximum value exceed for #FIELD#",
  DUPLICATE_FIELD: "#FIELD# already exists",
  FIELD_ALREADY_EXISTS: "#FIELD# already exists",
  NOTMATCH_FIELD: "Format of the #FIELD# is not matching",
  NO_PATIENT_FOUND: "No patient found",
  TYPE_ERROR: "#FIELD# type doesn't matched",
  INVALID_SORT_ORDER: "Invalid order for sorting",
  KEY_ALIAS_ALREADY_EXISTS: "The Key with same Alias already exists",
  INVALID_TOKEN: "Requested token is invalid",
  UNKNOWN_KEYID: "Claim made for unknown kid",
  ACCESS_KEY_EXPIRED: "Access Token is expired or invalid",
  TOKENEXPIREDERROR: "Token Expired, Please Login Again",
  KEY_ISSUER_INVALID: "Claim issuer is invalid",
  TOKEN_IS_NOT_ID_KEY: "Token is not ID Token",
  JSON_WEB_TOKEN_ERROR: "Provided Token is Invalid",
  REQUIRED_FIELD_MISSING: "#FIELD# missing",
  ALREADY_EXISTS: "already exists",
  KMS_ERROR: "Key Doesn't exists in KMS/ AWS KMS doesn't Responded",
  DELETED_SUCCESS: "Record deleted successfully",
};

module.exports = fr;