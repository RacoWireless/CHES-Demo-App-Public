/*
* Copyright © KORE Wireless. All rights reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
*/
/**
 * The constants handles constant variables and objects
 * 
 * @author  nsabeesh@korewireless.com
 * @since   2021-07-29 
 */

const constants = {
    API_BASE: "",
    DEFAULT_LANG: "en",
    VERSION: "v1",
    STATUS: {
        SUCCESS: 200,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        CONFLICT: 409,
        NOT_MODIFIED: 304,
        BAD_REQUEST: 400,
        UNPROCESSABLE_ENTITY: 422,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        CREATED: 201,
        DELETED: 204
    },
    METHODS: {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    },
    REQUEST_HEADER: {
        HEADERS: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    },
    DB: {
        STATUS: {
            ACTIVE: "Active",
            IN_ACTIVE: "inactive",
            DELETED: "deleted",
            NEW: "new",
            FAILED: "failed"
        },
        LIMIT: 50,
        SORT: {
            ASC: "asc",
            DESC: "desc"
        }

    },
    UPDATED_BY: "CHES",
    CREATED_BY: "CHES"
};

module.exports = constants;