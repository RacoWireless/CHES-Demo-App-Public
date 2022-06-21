/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The KMSProvider, defined API for KMS
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */
const kms = require("./AWSProvider").KMS
const policy = require("../../config/KeyPolicy")
const KMSConstants = require("../constants/KMSConstants")
const Logger = require("../providers/Logger")
const LoggerConstants = require("../constants/LoggerConstants")

const KMSProvider = {

    /**
     * Function to create a key in KMS
     * @param { "CustomerMasterKeySpec": KMSConstants.KEY_SPEC.RSA_2048,
                "Description": payload.Description,
                "KeyUsage": payload.KeyUSage,
                "alias": payload.alias,
                "MultiRegion": KMSConstants.MULTIREGION,
                "Origin": KMSConstants.ORIGIN,
                "Tags": KMSConstants.TAGS } params 

     * @returns  KeyMetadata: {
                    AWSAccountId: '123456789',
                    KeyId: '3234523cef-57da-4a9c-8aab-bd1ac034343a7862',
                    Arn: 'arn:aws:kms:ap-south-1:123456789:key/3234523cef-57da-4a9c-8aab-bd1ac034343a7862',
                    CreationDate: 2021-07-19T03:48:26.845Z,
                    Enabled: true,
                    Description: 'Key Generate Test',
                    KeyUsage: 'ENCRYPT_DECRYPT',
                    KeyState: 'Enabled',
                    Origin: 'AWS_KMS',
                    KeyManager: 'CUSTOMER',
                    CustomerMasterKeySpec: 'RSA_2048',
                    EncryptionAlgorithms: [ 'RSAES_OAEP_SHA_1', 'RSAES_OAEP_SHA_256' ],
                    MultiRegion: false
                }
     */
    async createRSAKeyPair(params) {

        return new Promise((resolve, reject) => {

            if (process.env.KEY_CREATION == "disabled")
                resolve(KMSConstants.DUMMY_RESPONSE());
            else
                kms.createKey(params, function (err, data) {

                    Logger.info(LoggerConstants.TYPES.KMS, "KMSProvider=>createRSAKeyPair", { params: params, error: err, data: data })

                    if (err)
                        reject(err); // an error occurred
                    else
                        resolve(data.KeyMetadata);           // successful response
                });
        });

    },

    /**
     * Function to set alias name for created key in KMS
     * @param {keyId} keyId 
     * @param {Alias name to assigned} aliasName 
     * @returns success / Error
     */

    async setAliasName(keyId, aliasName) {

        return new Promise((resolve, reject) => {
            var params = {
                AliasName: "alias/" + aliasName, // The alias to create. Aliases must begin with 'alias/'. Do not use aliases that begin with 'alias/aws' because they are reserved for use by AWS.
                TargetKeyId: keyId// The identifier of the CMK whose alias you are creating. You can use the key ID or the Amazon Resource Name (ARN) of the CMK.
            }

            kms.createAlias(params, function (err, data) {

                Logger.info(LoggerConstants.TYPES.KMS, "KMSProvider=>setAliasName", { params: params, error: err, data: data })

                if (err)
                    reject(err);// an error occurred
                else
                    resolve(data);       // successful response
            });
        });



    },


    /**
     * Function to get the public key from AWS KMS of a key
     * @param {*} keyId 
     * @returns  {
                KeyId: 'arn:aws:kms:ap-south-1:123456789:key/352b8342ccef-57da-434a9c-834aab-bd1343ac03a7862',
                PublicKey: <Buffer 30 82>
                CustomerMasterKeySpec: 'RSA_2048',
                KeyUsage: 'ENCRYPT_DECRYPT',
                EncryptionAlgorithms: [ 'RSAES_OAEP_SHA_1', 'RSAES_OAEP_SHA_256' ]
            }
     */

    async getpublicKey(keyId) {

        return new Promise((resolve, reject) => {
            const params = {
                KeyId: keyId, /* required */
            };
            kms.getPublicKey(params, function (err, data) {

                Logger.info(LoggerConstants.TYPES.KMS, "KMSProvider=>getpublicKey", { params: params, error: err, data: data })

                if (err)
                    reject(err); // an error occurred
                else
                    resolve(data);
            });
        });

    },

    /**
     * Function to format the public key returned from KMS
     * @param {} data 
     * @returns 
     */
    async generateKey(data) {
        return "-----BEGIN PUBLIC KEY-----\n"
            + data.toString("base64") +
            "\n-----END PUBLIC KEY-----";


    },


    /**
     * Function to set policy for the Key created in KMS
     *  attaches a key policy to the specified CMK
     * @param {*} keyId 
     * @returns 
     */
    async setPolicy(keyId) {
        return new Promise((resolve, reject) => {

            var params = {
                KeyId: keyId, // The identifier of the CMK to attach the key policy to. You can use the key ID or the Amazon Resource Name (ARN) of the CMK.
                Policy: JSON.stringify(policy),
                PolicyName: "default"// The name of the key policy.
            };
            kms.putKeyPolicy(params, function (err, data) {

                Logger.info(LoggerConstants.TYPES.KMS, "KMSProvider=>setPolicy", { params: params, error: err, data: data })

                if (err)
                    reject(err); // an error occurred
                else
                    resolve(data);           // successful response
            });
        });
    }

}


module.exports = KMSProvider
