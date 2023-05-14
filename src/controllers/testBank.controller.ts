import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { UserSchema } from "../models";
import { TestBankSchema } from "../models/testBank.model";

export async function addTestToTestBank(req: Request, res: Response) {
  try {
    const { userId, round } = req.body;

    if (!userId || !round)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    const newTest = await new TestBankSchema({
      creator: userId,
      round,
    }).save();

    return HelperUtil.returnSuccessfulResult(res, { newTest });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}
