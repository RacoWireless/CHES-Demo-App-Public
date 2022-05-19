/**
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The user controller handles authentication and all user operations
 * 
 * @author  mamal@korewireless.com
 * @since   2021-07-17 
 */

const AwsConfig = require("../providers/CognitoProvider");

let userController = {
  //user login function 
  // TODO : Refractoring needed
  async signin(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    await AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }
        res.json({ statusCode: 201, 'status': true, 'data': AwsConfig.decodeJWTToken(token) });
      },
      onFailure: (err) => {
        res.json({ statusCode: 400, 'status': false, 'error': err.message || JSON.stringify(err) });
      },
    });
  }
}
module.exports = userController;