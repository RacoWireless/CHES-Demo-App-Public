/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The en to define error messages in english
 * 
 * @author  junnikrishnan@korewireless.com
 * @since   2021-07-30 
 */

/**
 * service exception template function
 */
function serviceException(type, message, path) {
    const error = new Error(message);
    error.type = type;
    error.path = path;
    return error;
}

serviceException.prototype = Object.create(Error.prototype);


module.exports = serviceException;