/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The KMSProvider, defined API for KMS
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-08-06 
 */
const kms = require("./AWSProvider").KMS
const Logger = require("./Logger")
const Config = require("../constants/constants");
const crypto = require('crypto');

const { unzip } = require('zlib');

const decryptGatewayDataProvider = {
    /**
     * Function to decrypt the AES Key using KMS key
     * @param {*} encryptedAESKey 
     * @param {*} keyId 
     * @returns 
     */

    async decryptAESKey(encryptedAESKey, keyId) {
        return new Promise((resolve, reject) => {
            const params = {
                CiphertextBlob: Buffer.from(encryptedAESKey, "hex"),
                KeyId: keyId,
                EncryptionAlgorithm: Config.RSA_ENCRYPTION_ALGORITHM
            };

            kms.decrypt(params, (err, decryptedAESKey) => {
                if (err) {
                    reject({ error: err, message: "RSA Decryption Failed" });
                } else {
                    this.aesKey = Buffer.from(JSON.parse(JSON.stringify(decryptedAESKey.Plaintext)).data)
                    resolve(this.aesKey);
                }
            });

        });
    },

    /**
     * Function to decrypt the data using AES Key
     * @param {*} encryptedData 
     * @param {*} decryptedAESKey 
     * @returns 
     */
    async getdecryptedData(encryptedData, decryptedAESKey, iv, authTag) {

        return new Promise((resolve, reject) => {
            try {
                const decipher = crypto.createDecipheriv(Config.AES_ALGORITHM, decryptedAESKey, iv);

                decipher.setAuthTag(authTag);
                
                let decrypted = decipher.update(Buffer.from(encryptedData, 'utf8'));

                decrypted = Buffer.concat([decrypted, decipher.final()]);

                resolve(decrypted);
            }

            catch (err) {
                reject({ error: err, message: "AES Decryption Failed" });
            }
        });

    },
    
    /**
     * Function to Unzip the data
     * @param {*} compressedData 
     * @returns 
     */
    async unzipData(compressedData) {

        return new Promise((resolve, reject) => {
            unzip(compressedData, (err, buffer) => {
                if (err) {
                    resolve(compressedData.toString());
                    // reject({ error: err, message: "UnCompressing the data Failed" });
                }
                else
                    resolve(buffer.toString());
            });
        });

    },

    /**
     * The Function to procees the data in pipeline 
     * @param {*} keyId 
     * @param {*} encryptedAESKey 
     * @param {*} encryptedData 
     * @returns 
     */

    async processData(keyId, encryptedAESKey, encryptedData, iv, authTag) {
        return new Promise((resolve, reject) => {
            this.decryptAESKey(encryptedAESKey, keyId)
                .then((aesKey) => {

                    return this.getdecryptedData(encryptedData, aesKey, iv,  authTag);
                })
                .then((decryptedData) => {

                    return this.unzipData(decryptedData);
                })
                .then((data) => {

                    return resolve(data);
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

}


module.exports = decryptGatewayDataProvider