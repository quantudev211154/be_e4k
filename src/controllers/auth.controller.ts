import { Request, Response } from "express";
import { AuthUtil, HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { UserSchema } from "../models";
import { sendRefreshToken } from "../utils/auth.util";
import { hash, verify } from "argon2";

export async function login(req: Request, res: Response) {
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

    const isValidPassword = await verify(
      existUser.password as string,
      password
    );

    if (!isValidPassword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_LOGIN_FAILED);

    existUser.password = undefined;
    sendRefreshToken(res, existUser);

    return HelperUtil.returnSuccessfulResult(res, {
      user: existUser,
      accessToken: AuthUtil.createToken("accessToken", existUser),
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { phone, password, username } = req.body;

    if (!phone || !password || !username)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existAdmin = await UserSchema.findOne({
      phone,
    });

    if (existAdmin)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXIST_ADMIN);

    const hashedPassword = await hash(password);

    const newAdmin = await new UserSchema({
      phone,
      password: hashedPassword,
      username,
    }).save();

    newAdmin.password = undefined;

    return HelperUtil.returnSuccessfulResult(res, {
      newAdmin,
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function logout(req: Request, res: Response) {
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
