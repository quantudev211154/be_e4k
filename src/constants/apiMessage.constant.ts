/**
 * For all APIs
 */
export const ERR_MISSING_PARAMS = "Some params is missing";

/**
 * For auth route
 */
export const ERR_LOGIN_FAILED = "Phone number or password is incorrect";

/**
 * For user route
 */
export const SUC_NEW_USER_CREATED = "New user is created successfully";
export const SUC_UPDATED_USER = "Use is updated";

export const ERR_EXISTED_PHONE_NUMBER = "This phone is used by another one.";
export const ERR_NOT_FOUND_USER_BY_PHONE_NUMBER =
  "The user with phone number like this is not exist";
export const ERR_MISSING_USER_PHONE =
  " Please provide the phone number of user";

/**
 * For admin route
 */
export const ERR_EXIST_ADMIN = "This phone was registerd by another admin";
export const ERR_NO_EXIST_ADMIN = "This admin is not exist";