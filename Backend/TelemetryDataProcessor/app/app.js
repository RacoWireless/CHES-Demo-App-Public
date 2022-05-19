/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Main App
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */
const Logger = require("./providers/Logger")
const constants = require("./constants/constants");
const telemetryDataRepository = require("./repositories/TelemetryDataRepository")
const decryptGatewayDataProvider = require("./providers/DecryptGatewayDataProvider");
const DataProcessService = require("./services/DataProcessService");

const app = {
  /**
   * Function to decrypt the data from Kafka and store the data in DB
   * @param {*} data 
   * @returns 
   */
  async processAndStoreData(data) {

    Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "app=>processAndStoreData", data);

    const { records, topic } = { records: (data.records) || data.data || data, topic: data.topic || 'telemetry-org' }
    records.key = records.encryptedKey || records.key;
    records.mKitId = records.mKitId || records.kitId;
    records.mac = records.macAddress || records.mac;
    records.kitUser = records.kitUserId || records.kitUser;
    records.telemetryReadingOn = records.telemetryReadingTime || records.telemetryReadingOn;
    records.deviceType = records.device_type || records.deviceType;
    records.reasonCode = records.reasonCode || "OK";

    try {
      let dbResponse = await telemetryDataRepository.getKeyIdOfTelemetryData(records.kitUser)

      Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "app=>processAndStoreData[kitUserSpecific]:KeyID", dbResponse);

      if (typeof dbResponse !== "undefined" && Array.isArray(dbResponse) && dbResponse.length >= 1) {

        return await DataProcessService.decryptAndStore({ keyId: dbResponse[0]["keyId"], userId: dbResponse[0]["userId"], topic, records }, constants.PROCESS_TYPE.KITUSER)

      }
      else {

        dbResponse = await telemetryDataRepository.getOrganizationKeyIdOfTelemetryData();

        Logger.info(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "app=>processAndStoreData[OrganizationSpecific]:KeyID", dbResponse);

        if (typeof dbResponse !== "undefined" && Array.isArray(dbResponse) && dbResponse.length >= 1) {

          return await DataProcessService.decryptAndStore({ keyId: dbResponse[0]["keyId"], userId: dbResponse[0]["userId"], topic, records }, constants.PROCESS_TYPE.ORG)

        }
        else {
          Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "app=>processAndStoreData: KeyId Doesn't Exist", null)
          return await DataProcessService.decryptAndStore({ keyId: null, userId: "DEMO CLOUD", topic, records }, constants.PROCESS_TYPE.KEY_NOT_EXIST)
        }
      }
    }
    catch (error) {
      Logger.error(constants.LOG_TYPE.PROCESS_KAFKA_DATA, "app=>processAndStoreData", error)
      throw error;
    }

  }

}


module.exports = app;