import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import {
  APIMessage,
  EASY_TEST_SCORE,
  MEDIUM_TEST_SCORE,
  TEST_PER_PAGE,
} from "../constants";
import { UserSchema } from "../models";
import { ETestLevel, TestSchema } from "../models/tests.model";

export async function createNewTest(req: Request, res: Response) {
  try {
    const { userId, test } = req.body;

    if (!userId || !test)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    const newTest = await new TestSchema({
      ...test,
      score:
        test.level === ETestLevel.EASY ? EASY_TEST_SCORE : MEDIUM_TEST_SCORE,
      creator: userId,
    }).save();

    return HelperUtil.returnSuccessfulResult(res, { newTest });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}

export async function getAllTests(req: Request, res: Response) {
  try {
    const page = req.query.page;

    if (!page)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const tests = await TestSchema.find({ isDeleted: false })
      .limit(TEST_PER_PAGE)
      .skip(TEST_PER_PAGE * parseInt(page as string) - TEST_PER_PAGE);

    return HelperUtil.returnSuccessfulResult(res, { tests });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}
