"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_USER_HAS_NO_PERMISSION = exports.ERR_NO_ROUND_FOUND = exports.ERR_OLD_PASSWORD_INCORRECT = exports.ERR_UNEXPECTED = exports.ERR_NO_USER_FOUND = exports.ERR_NO_LESSION_FOUND = exports.ERR_INVALID_LOGIN_TYPE = exports.ERR_NO_COURSE_FOUND = exports.ERR_NO_EXIST_ADMIN = exports.ERR_EXIST_ADMIN = exports.ERR_MISSING_USER_PHONE = exports.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER = exports.ERR_EXISTED_USER = exports.SUC_UPDATED_USER = exports.SUC_NEW_USER_CREATED = exports.ERR_LOGIN_DENIED = exports.ERR_LOGIN_FAILED = exports.ERR_AUTH_TOKEN_NOT_FOUND = exports.ERR_NO_PERMISSION = exports.ERR_MISSING_PARAMS = void 0;
/**
 * For all APIs
 */
exports.ERR_MISSING_PARAMS = "Some params is missing";
exports.ERR_NO_PERMISSION = "No permission to do this request";
exports.ERR_AUTH_TOKEN_NOT_FOUND = "Auth token not found";
/**
 * For auth route
 */
exports.ERR_LOGIN_FAILED = "Phone number or password is incorrect";
exports.ERR_LOGIN_DENIED = "This phone was registerd for other role";
/**
 * For user route
 */
exports.SUC_NEW_USER_CREATED = "New user is created successfully";
exports.SUC_UPDATED_USER = "User is updated";
exports.ERR_EXISTED_USER = "This phone is used by another player.";
exports.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER = "The user with phone number like this is not exist";
exports.ERR_MISSING_USER_PHONE = " Please provide the phone number of user";
/**
 * For admin route
 */
exports.ERR_EXIST_ADMIN = "This phone was registerd by another admin";
exports.ERR_NO_EXIST_ADMIN = "This admin is not exist";
/**
 * For Course route
 */
exports.ERR_NO_COURSE_FOUND = "No course found";
exports.ERR_INVALID_LOGIN_TYPE = "Phone was registered for ADMIN role. Can not use this phone for PLAYER role.";
exports.ERR_NO_LESSION_FOUND = "No lession found";
exports.ERR_NO_USER_FOUND = "No user found";
exports.ERR_UNEXPECTED = "Un expected error";
exports.ERR_OLD_PASSWORD_INCORRECT = "Old password is incorrect";
exports.ERR_NO_ROUND_FOUND = "No round found";
exports.ERR_USER_HAS_NO_PERMISSION = "No permission to do";
