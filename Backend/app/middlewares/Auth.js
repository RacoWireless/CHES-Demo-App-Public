/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Auth using Coginto
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

const { promisify } = require('util');
const Axios = require('axios');
const jwkToPem = require('jwk-to-pem');
const jsonwebtoken = require('jsonwebtoken');
const authException = require('../exceptions/ServiceError');
const CogintoConstant = require('../constants/CognitoConstants');
const Logger = require('../providers/Logger');
const LoggerConstants = require("../constants/LoggerConstants")
const constants = require("../constants/Constants")
const errorType = require('../exceptions/ErrorType');
const { responseObj } = require("../providers/UtilityProvider");
const { handleError, errorMap } = require("../exceptions/Error");

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const Auth = {
  /**
   * function to get public keys
   */
  async getPublicKeys() {
    let cacheKeys;

    const publicKeys = await Axios.default.get(CogintoConstant.URL);

    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {});

    return cacheKeys;

  },


  /**
   * function to validate user id token
   * @param {token?: string;} request 
   * @returns  {  readonly userName: string;
                  readonly clientId: string;
                  readonly isValid: boolean;
                  readonly error?: any;
               }
   */


  async validateUserIDToken(request, response, next) {

    try {
      const { headers } = request;
      Logger.info(LoggerConstants.TYPES.AUTH, "Auth : validateUserIDToken", headers)

      const token = headers.authorization;
      const tokenSections = (token || '').split('.');
      if (tokenSections.length < 2) {
        throw authException(errorType.INVALID_TOKEN, 'Requested token is invalid');
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');

      const header = JSON.parse(headerJSON);

      const keys = await Auth.getPublicKeys();

      const key = keys[header.kid];

      if (key === undefined) {
        throw authException(errorType.UNKNOWN_KEYID, 'Claim made for unknown kid');
      }
      const claim = await verifyPromised(token, key.pem);

      const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw authException(errorType.ACCESS_KEY_EXPIRED, 'Claim is expired or invalid');
      }
      if (claim.iss !== CogintoConstant.COGINTO_ISSUER) {
        throw authException(errorType.KEY_ISSUER_INVALID, 'Claim issuer is invalid');
      }
      if (claim.token_use !== CogintoConstant.TOKEN_USE.ID) {
        throw authException(errorType.TOKEN_IS_NOT_ID_KEY, 'Claim use is not ID');
      }

      Logger.info(LoggerConstants.TYPES.AUTH, "Auth : validateUserIDToken : claim confirmed", claim)

      request.headers.username = claim["cognito:username"];
      request.headers.email = claim.email
      request.currentUser = {
        username: claim["cognito:username"],
        email: claim.email
      };

      next();

    } catch (error) {
      const language = request.headers["Content-language"] || constants.DEFAULT_LANG;
      Logger.error(LoggerConstants.TYPES.AUTH, "Auth : validateUserIDToken ", error)
      if (error.name == errorType.TOKENEXPIREDERROR || error.type == errorType.ACCESS_KEY_EXPIRED)
        return responseObj(constants.STATUS.UNAUTHORIZED, { tokenExpired: true, error: errorMap(error, language) }, response);
      else
        return handleError(error, language, response, constants.STATUS.UNAUTHORIZED);

    }
  }

}


module.exports = Auth;