import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { UserSchema } from "../models";
import { APIMessage } from "../constants";

export async function register(req: Request, res: Response) {
  try {
    const { phone, username } = req.body;

    if (!phone || !username)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({
      phone,
    });

    if (existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXISTED_USER);

    const newUser = await new UserSchema({
      phone,
      username,
    }).save();

    newUser.password = undefined;

    return HelperUtil.returnSuccessfulResult(
      res,
      { newUser },
      APIMessage.SUC_NEW_USER_CREATED
    );
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function findPlayerByPhone(req: Request, res: Response) {
  try {
    const phone = req.params.phone as string;

    if (!phone)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

    existUser.password = undefined;

    return HelperUtil.returnSuccessfulResult(
      res,
      { user: existUser },
      APIMessage.SUC_NEW_USER_CREATED
    );
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function updateUserInfo(req: Request, res: Response) {
  try {
    const { phone, username, password } = req.body;

    if (!phone)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_MISSING_USER_PHONE
      );

    if (!username && !password)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

    const updater = {
      ...(username ? { username } : {}),
      ...(password ? { password } : {}),
    };

    const updatedUser = await UserSchema.findOneAndUpdate({ phone }, updater);

    return HelperUtil.returnSuccessfulResult(
      res,
      { updatedUser },
      APIMessage.SUC_UPDATED_USER
    );
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}
