package org.browseright.api

class AppInterface {
    public static def codes = [
        OK: 200,
        
        MISSING_BAD_PARAMS: 400,
        SET_PASSWORD_FIRST: 401,
        BAD_LOGIN_INFO: 402,
        LOGIN_FIRST: 403,
        NOT_AVAILABLE: 404,
        UPGRADE_APP: 406,
        HIT_RATE_LIMIT: 429,
        
        UNABLE_TO_PERFORM_ACTION: 450,
        
        SERVER_ERROR: 500
    ]
}