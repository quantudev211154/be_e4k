import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { EUserRole, UserSchema } from "../models";
import { TPublicUser } from "../types/user.type";

export async function searchUserByPhone(req: Request, res: Response) {
  try {
    const phone = req.query.phone as string;

    if (!phone)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_MISSING_USER_PHONE
      );

    const existUser = await UserSchema.findOne({ phone });

    if (existUser && existUser?.role !== EUserRole.PLAYER)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_INVALID_LOGIN_TYPE,
        403
      );

    if (!existUser)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

    const result: TPublicUser = {
      _id: existUser.id,
      phone: existUser.phone,
      username: existUser.username,
    };

    return HelperUtil.returnSuccessfulResult(res, { user: result });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
