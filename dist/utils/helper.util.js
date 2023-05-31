"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUnauthorizedResult = exports.returnErrorResult = exports.returnSuccessfulResult = void 0;
function returnSuccessfulResult(response, data, message, code) {
    return response.status(code ? code : 200).json(Object.assign({ success: true, data }, (message ? { message } : {})));
}
exports.returnSuccessfulResult = returnSuccessfulResult;
function returnErrorResult(response, error, code) {
    return response.status(code ? code : 500).json({
        success: false,
        error,
    });
}
exports.returnErrorResult = returnErrorResult;
function returnUnauthorizedResult(response, message) {
    response.clearCookie(process.env.E4K_REFRESH_TOKEN_NAME);
    return response.status(401).json({
        success: false,
        message: message ? message : "Unauthorized error",
    });
}
exports.returnUnauthorizedResult = returnUnauthorizedResult;
