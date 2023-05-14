import { Request, Response } from "express";
import { AuthUtil, HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { EUserRole, UserSchema } from "../models";
import {
  removeAdminSensitiveAttributes,
  removePlayerSensitiveAttributes,
  sendRefreshToken,
} from "../utils/auth.util";
import { hash, verify } from "argon2";
import { Secret, verify as JWTVerify } from "jsonwebtoken";
import { TAuthPayload } from "../types/auth.type";

export async function checkSSOForAdmin(req: Request, res: Response) {
  try {
    const refreshToken =
      req.cookies[process.env.E4K_REFRESH_TOKEN_NAME as string];

    if (!refreshToken) return HelperUtil.returnUnauthorizedResult(res);

    const decoded = JWTVerify(
      refreshToken,
      process.env.E4K_REFRESH_TOKEN_SECRET as Secret
    ) as TAuthPayload;

    const existUser = await UserSchema.findById(decoded.userId);

    if (!existUser || existUser.tokenVersion !== decoded.tokenVersion)
      return HelperUtil.returnUnauthorizedResult(res);

    sendRefreshToken(res, existUser);

    removeAdminSensitiveAttributes(existUser);

    return HelperUtil.returnSuccessfulResult(res, {
      user: existUser,
      accessToken: AuthUtil.createToken("accessToken", existUser),
    });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}

export async function loginForAdmin(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_MISSING_USER_PHONE
      );

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_LOGIN_FAILED);

    const isValidPassword = verify(existUser.password as string, password);

    if (!isValidPassword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_LOGIN_FAILED);

    sendRefreshToken(res, existUser);

    removeAdminSensitiveAttributes(existUser);

    return HelperUtil.returnSuccessfulResult(res, {
      user: existUser,
      accessToken: AuthUtil.createToken("accessToken", existUser),
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function registerForAdmin(req: Request, res: Response) {
  try {
    const { userId, phone, password, username, role } = req.body;

    if (!phone || !password || !username || !role)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const requestCreator = await UserSchema.findById(userId);

    if (requestCreator?.role !== EUserRole.ADMIN)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_PERMISSION);

    const existUser = await UserSchema.findOne({
      phone,
    });

    if (existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXIST_ADMIN);

    const hashedPassword = await hash(password);

    const newUser = await new UserSchema({
      phone,
      password: hashedPassword,
      username,
      role,
    }).save();

    newUser.password = undefined;

    return HelperUtil.returnSuccessfulResult(res, {
      newUser,
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function logoutForAdmin(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existAdmin = await UserSchema.findById(id);

    if (!existAdmin)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_EXIST_ADMIN);

    await UserSchema.findByIdAndUpdate(id, {
      tokenVersion: (existAdmin.tokenVersion as number) + 1,
    });

    return HelperUtil.returnSuccessfulResult(res, {
      message: "Admin logged out",
    });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

/**
 * For player side
 */

export async function loginForPlayer(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existPlayer = await UserSchema.findOne({ phone });

    if (!existPlayer)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

    if (existPlayer.role === EUserRole.ADMIN)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_LOGIN_DENIED);

    const isValidPassword = await verify(
      existPlayer.password as string,
      password
    );

    if (!isValidPassword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_LOGIN_FAILED);

    const accessToken = AuthUtil.createToken("accessToken", existPlayer);
    const refreshToken = AuthUtil.createToken("refreshToken", existPlayer);

    removePlayerSensitiveAttributes(existPlayer);

    return HelperUtil.returnSuccessfulResult(res, {
      player: existPlayer,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function registerForPlayer(req: Request, res: Response) {
  try {
    const { phone, username, password } = req.body;

    if (!phone || !username || !password)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existPlayer = await UserSchema.findOne({ phone });

    if (existPlayer)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXISTED_USER);

    const hashedPassword = await hash(password);

    const newPlayer = await new UserSchema({
      phone,
      username,
      hearts: 5,
      golds: 500,
      password: hashedPassword,
    }).save();

    const accessToken = AuthUtil.createToken("accessToken", newPlayer);
    const refreshToken = AuthUtil.createToken("refreshToken", newPlayer);

    removePlayerSensitiveAttributes(newPlayer);

    return HelperUtil.returnSuccessfulResult(res, {
      player: newPlayer,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function logoutForPlayer(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existPlayer = await UserSchema.findById(id);

    if (!existPlayer)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_EXIST_ADMIN);

    await UserSchema.findByIdAndUpdate(id, {
      tokenVersion: (existPlayer.tokenVersion as number) + 1,
    });

    return HelperUtil.returnSuccessfulResult(res, {
      message: "Player logged out",
    });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function checkSSOForPlayer(req: Request, res: Response) {
  try {
    const refreshToken = req.body.refreshToken as string;

    if (!refreshToken) return HelperUtil.returnUnauthorizedResult(res);

    const decoded = JWTVerify(
      refreshToken,
      process.env.E4K_REFRESH_TOKEN_SECRET as Secret
    ) as TAuthPayload;

    const existPlayer = await UserSchema.findById(decoded.userId);

    if (!existPlayer || existPlayer.tokenVersion !== decoded.tokenVersion)
      return HelperUtil.returnUnauthorizedResult(res);

    sendRefreshToken(res, existPlayer);

    removePlayerSensitiveAttributes(existPlayer);

    return HelperUtil.returnSuccessfulResult(res, {
      player: existPlayer,
      accessToken: AuthUtil.createToken("accessToken", existPlayer),
    });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}
