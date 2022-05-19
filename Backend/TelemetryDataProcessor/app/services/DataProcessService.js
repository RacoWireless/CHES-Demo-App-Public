/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Main App
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-12 
 */
const Logger = require("../providers/Logger")
const constants = require("../constants/constants");
const telemetryDataRepository = require("../repositories/TelemetryDataRepository")
const decryptGatewayDataProvider = require("../providers/DecryptGatewayDataProvider")
const flatten = require('flat')
const _ = require('underscore');
const FHIRKeys = require("../constants/FHIRKeyConstants")
const FHIRSchema = require("../constants/FHIRSchemaConstants")
const JSONKeyMapping = require("../constants/JSONKeyConstants")

const DataProcessService = {

/**
 * descrypt telemetry data payload and store insert into DB
 */
  async decryptAndStore(payload, pType) {

    const { keyId, userId, topic, records } = payload
    var insertObj = {
      telemetry_encrypted_data: records.telemetry,
      telemetry_encrypted_key: records.key,
      payload_creation: isNaN(records.payloadCreation)? Date.parse(records.payloadCreation):records.payloadCreation,
      mac_address: records.mac,
      last_reading: isNaN(records.telemetryReadingOn)? Date.parse(records.telemetryReadingOn):records.telemetryReadingOn, 
      iv: records.iv,
      kit_user_id: records.kitUser,
      kit_id: records.mKitId,
      kafka_topic: topic,
      hash: records.hash,
      device_type: records.deviceType,
      model: records.model,
      make: records.make,
      gateway_id: records.gatewayId,
      reason_code: records.reasonCode,
      cert_date: isNaN(records.certDate)? Date.parse(records.certDate):records.certDate,
      serial_number: records.pSerialNumber ? records.pSerialNumber : null,
      created_by: userId,
      updated_by: userId
    }

    try {
      if (pType == constants.PROCESS_TYPE.KEY_NOT_EXIST) {
        Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>decryptAndStore: ", { message: "Key doesn't Exist" })
          insertObj.decrypted_data = JSON.stringify({ message: "Key doesn't Exist" })
          insertObj.telemetry_decrypted_data = JSON.stringify({
            "telemetry": { message: "Key doesn't Exist" }
          })
          await telemetryDataRepository.insertTelemetryData(insertObj)
          return {
            statusCode: constants.STATUS.SUCCESS,
            body: JSON.stringify({
              message: 'Data Receieved'
            }),
          };
      }

      const encryptedKey = Buffer.from(records.key, 'base64');
      const cipherText = Buffer.from(records.telemetry, "base64").toString("hex");
      const telemetry = Buffer.from(cipherText.substring(0, cipherText.length - 32), 'hex');
      const authTag = Buffer.from(cipherText.substr(cipherText.length - 32), 'hex');
      const iv = Buffer.from(records.iv, 'base64');

      insertObj.decrypted_data
        = await decryptGatewayDataProvider.processData(keyId, encryptedKey, telemetry, iv, authTag)

      if (_.has(JSON.parse(insertObj.decrypted_data), "telemetry"))
        insertObj.telemetry_decrypted_data = insertObj.decrypted_data
      else
        insertObj.telemetry_decrypted_data = JSON.stringify(await this.transformFHIRtoSimpleJSON({
          device_type: insertObj.device_type,
          make: insertObj.make
        }, insertObj.decrypted_data));


      insertObj.telemetry_decrypted_data = await this.transformJSONUnits(
        {
          device_type: insertObj.device_type,
          make: insertObj.make
        }, insertObj.telemetry_decrypted_data
      )

      await telemetryDataRepository.insertTelemetryData(insertObj)

      return {
        statusCode: constants.STATUS.SUCCESS,
        body: JSON.stringify({
          message: 'Data Receieved'
        }),
      };
    }
    catch (error) {
      if (_.has(error, "message") && (error.message == "RSA Decryption Failed" ||
        error.message == "AES Decryption Failed" || error.message == "UnCompressing the data Failed")) {
        Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>decryptAndStore: ", error)
        if (pType == constants.PROCESS_TYPE.KITUSER) {
          dbResponse = await telemetryDataRepository.getOrganizationKeyIdOfTelemetryData();

          Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "Trying app=>processAndStoreData[OrganizationSpecific]:KeyID", dbResponse);

          if (typeof dbResponse !== "undefined" && Array.isArray(dbResponse) && dbResponse.length >= 1) {

            return await DataProcessService.decryptAndStore({ keyId: dbResponse[0]["keyId"], userId: dbResponse[0]["userId"], topic, records }, constants.PROCESS_TYPE.ORG)

          }
          else{
            Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>decryptAndStore: ", error)
          insertObj.decrypted_data = JSON.stringify(error)
          insertObj.telemetry_decrypted_data = JSON.stringify({
            "telemetry": { message: 'Invalid Encryption Key' }
          })
          await telemetryDataRepository.insertTelemetryData(insertObj)
          throw error;
          }
        }
        else {
          Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>decryptAndStore: ", error)
          insertObj.decrypted_data = JSON.stringify(error)
          insertObj.telemetry_decrypted_data = JSON.stringify({
            "telemetry": { message: 'Invalid Encryption Key' }
          })
          await telemetryDataRepository.insertTelemetryData(insertObj)
          throw error;
        }

      } else {
        Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>decryptAndStore: ", error)
        throw error;
      }

    }
  },


  async transformFHIRtoSimpleJSON(schema_type, data) {
    const flattenData = flatten(JSON.parse(data));
    let outData = {};
    for (schema of FHIRSchema) {
      if (_.isEqual(schema_type, schema.DEVICE)) {
        Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>transformFHIRtoSimpleJSON : Schema Used", schema);
        for (x of schema.SCHEMA) {
          let key = ((_.has(flattenData, x.KEY)) ? flattenData[x.KEY] : x.DEFAULT)
          if (!_.isUndefined(key)) {
            key = FHIRKeys.has(key) ? FHIRKeys.get(key) : key;
            outData[key] = ((_.has(flattenData, x.VALUE)) ? flattenData[x.VALUE] : "") + " " +
              ((_.has(flattenData, x.UNIT)) ? flattenData[x.UNIT] : "")
          }
        }
        outData = { "telemetry": outData }
        Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>transformFHIRtoSimpleJSON : Transformed Data", outData);
        break;
      }

    }
    return outData;
  },

  async transformJSONUnits(schema_type, data) {
    const inData = JSON.parse(data).telemetry
    let outData = inData;

    for (keyMapping of JSONKeyMapping) {
      if (_.isEqual(schema_type, keyMapping.DEVICE)) {
        Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>transformJSONUnits : Schema Used", keyMapping);
        for (x of keyMapping.MAPPING) {
          if (_.has(inData, x.REPLACE_FOR) && inData[x.REPLACE_FOR].includes(x.OLD_UNIT)) {
            if (_.has(x, "CONVERSION"))
              outData[x.REPLACE_FOR] = x.CONVERSION(inData[x.REPLACE_FOR]
                .replace(x.OLD_UNIT, "")) + " " + x.NEW_UNIT;

            else
              outData[x.REPLACE_FOR] = inData[x.REPLACE_FOR]
                .replace(x.OLD_UNIT, x.NEW_UNIT);
          }
        }
        Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "DataProcessService=>transformJSONUnits : Transformed Data", outData);
        break;
      }

    }
    outData = { "telemetry": outData }
    return JSON.stringify(outData);
  }
}


module.exports = DataProcessService;