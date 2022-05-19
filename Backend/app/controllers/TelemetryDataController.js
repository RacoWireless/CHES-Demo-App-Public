/**
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * @author  akodappana@korewireless.com
 * @since   2021-08-03
 */

const LOGGER = require("../constants/LoggerConstants");
const Logger = require("../providers/Logger");
const TelemetryDataRepository = require("../repostories/TelemetryDataRepository");

/**
 * 
 * @param {*} args sort_by, sort_order, search_by, search_value, global_search, offset, limit
 * @returns 
 */
async function getTelemetryData(args = {}) {
  try {
    const result = await TelemetryDataRepository.getTelemetryData({
      ...args
    });
    const parsed = result.rows.map(x => {
      return {
        ...x.dataValues,
        telemetry_data: JSON.parse(x.get("telemetry_decrypted_data") || "{}")?.telemetry ?? {}
      }
    });
    result.rows = parsed;
    return result;
  } catch (error) {
    Logger.error(LOGGER.TYPES.TEL, LOGGER.MESSAGES.ERROR.TELEMETRY, { error });
    throw new Error(error);
  }
}
module.exports = { getTelemetryData };
