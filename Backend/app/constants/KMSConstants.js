/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The Constants for KMS
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */
const KMSConstants = {
    ENCRYPTION_ALGORITHM: {
        RSAES_OAEP_SHA_256: "RSAES_OAEP_SHA_256",
        RSAES_OAEP_SHA_1: "RSAES_OAEP_SHA_1"
    },
    STATUS: {
        ASSIGNED: "Assigned",
        UNASSIGNED: "Unassigned"
    },
    KEYSTATE: {
        ENABLED: "Enabled",
        DISABLED: "Disabled"
    },
    KEY_TYPE: {
        ASYMMETRIC: "Asymmetric",
        SYMMETRIC: "Symmetric"
    },
    KEY_SPEC: {
        RSA_2048: "RSA_2048"
    },
    KEY_USAGE: {
        ENCRYPT_DECRYPT: "ENCRYPT_DECRYPT"
    },
    MULTIREGION: false,
    TAGS: [
        {
            "TagKey": "ENV",
            "TagValue": process.env.NODE_ENV
        },
        {
            "TagKey": "SOURCE",
            "TagValue": "ches-demo-cloud"
        }
    ],
    ORIGIN: "AWS_KMS",
    ATTACHED_POLICY: "default",
    ENCRYPTION_KEY_TYPE: {
        ORGANIZATION: "organization",
        PATIENT: "patient"
    },
    DUMMY_RESPONSE: function () {
        const keyId = "9d234431390-9951-4893-a8e8-" + (Math.random() + 1).toString(36).substring(2);
        return {
            "AWSAccountId": "123456789",
            "KeyId": keyId,
            "Arn": "arn:aws:kms:" + process.env.AWSREGION + ":123456789:key/" + keyId,
            "CreationDate": new Date().toISOString(),
            "Enabled": true,
            "Description": "Key Generate Test",
            "KeyUsage": "DUMMY",
            "KeyState": "Enabled",
            "Origin": "AWS_KMS",
            "KeyManager": "CUSTOMER",
            "CustomerMasterKeySpec": "RSA_2048",
            "EncryptionAlgorithms": [
                "RSAES_OAEP_SHA_1",
                "RSAES_OAEP_SHA_256"
            ],
            "MultiRegion": false
        }
    }
}

module.exports = KMSConstants;
