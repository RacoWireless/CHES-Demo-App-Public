/**
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
/**
 * @author  akodappana@korewireless.com
 * @since   2021-08-03
 */
const { Op } = require("sequelize");
const { TelemetryData } = require("../models/TelemetryData");

/**
 * function for search sort of telemetry data
 * @param {*} args sort_by, sort_order, search_by, search_value, global_search, offset, limit
 * @returns
 */
async function getTelemetryData({
  offset,
  limit,
  sort_by: sortBy,
  sort_order: sortOrder,
  search_by: searchBy,
  search_value: searchValue,
  userId,
}) {
  let searchParams = getSearchPredicate(searchBy, searchValue);

  const telemetryData = await TelemetryData.findAndCountAll({
    offset,
    limit,
    where: { kit_user_id : userId, ...searchParams },
    order: [[sortBy, sortOrder]],
  });
  return telemetryData;
}
/**
 * function to generate search condition
 */
function getSearchPredicate(searchBy, searchValue) {
  let searchParams = null;

  if (searchBy=="any" && searchValue) {
    // global search
    const globalSearchValue = [
      "telemetry_decrypted_data",
      "mac_address",
      "last_reading",
      "device_type",
      "make",
      "model",
      "reason_code"
    ].reduce((acc, current) => {
      acc[current] = {
        [Op.like]: "%" + searchValue + "%",
      };
      return acc;
    }, {});
    searchParams = {
      [Op.or]: { ...globalSearchValue },
    };
  }else if (searchBy && searchBy!="any" && searchValue) {
    // column based search
    searchParams = {
      [searchBy]: {
        [Op.like]: "%" + searchValue + "%",
      },
    };
  }
  return searchParams;
}

const TelemetryDataRepository = { getTelemetryData };
module.exports = TelemetryDataRepository;
