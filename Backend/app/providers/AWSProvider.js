/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The AWS Provider
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWSREGION });
const AWSProvider = {
    KMS: new AWS.KMS(
        { region: process.env.AWSREGION }
    )
}
module.exports = AWSProvider