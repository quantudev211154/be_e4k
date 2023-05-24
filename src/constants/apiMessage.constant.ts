/**
 * For all APIs
 */
export const ERR_MISSING_PARAMS = "Some params is missing";
export const ERR_NO_PERMISSION = "No permission to do this request";
export const ERR_AUTH_TOKEN_NOT_FOUND = "Auth token not found";
/**
 * For auth route
 */
export const ERR_LOGIN_FAILED = "Phone number or password is incorrect";
export const ERR_LOGIN_DENIED = "This phone was registerd for other role";

/**
 * For user route
 */
export const SUC_NEW_USER_CREATED = "New user is created successfully";
export const SUC_UPDATED_USER = "User is updated";

export const ERR_EXISTED_USER = "This phone is used by another player.";
export const ERR_NOT_FOUND_USER_BY_PHONE_NUMBER =
  "The user with phone number like this is not exist";
export const ERR_MISSING_USER_PHONE =
  " Please provide the phone number of user";

/**
 * For admin route
 */
export const ERR_EXIST_ADMIN = "This phone was registerd by another admin";
export const ERR_NO_EXIST_ADMIN = "This admin is not exist";

/**
 * For Course route
 */
export const ERR_NO_COURSE_FOUND = "No course found";

export const ERR_INVALID_LOGIN_TYPE =
  "Phone was registered for ADMIN role. Can not use this phone for PLAYER role.";

export const ERR_NO_LESSION_FOUND = "No lession found";

export const ERR_NO_USER_FOUND = "No user found";

export const ERR_UNEXPECTED = "Un expected error";

export const ERR_OLD_PASSWORD_INCORRECT = "Old password is incorrect";

export const ERR_NO_ROUND_FOUND = "No round found";
