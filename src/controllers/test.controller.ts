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

export async function findTestByQuestion(req: Request, res: Response) {
  try {
    const question = req.params.question;

    if (!question)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const filter = {
      question: { $regex: ".*" + question + ".*", $options: "i" },
      isDeleted: false,
    };

    const tests = await TestSchema.find(filter).limit(5);

    return HelperUtil.returnSuccessfulResult(res, { tests });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}

export async function getTestById(req: Request, res: Response) {
  try {
    const testId = req.params.id;

    if (!testId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const test = await TestSchema.findById(testId);

    if (!test)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_TEST_NOT_FOUND);

    return HelperUtil.returnSuccessfulResult(res, { test });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}

export async function deleteTestById(req: Request, res: Response) {
  try {
    const testId = req.params.id;
    const userId = req.body.userId;

    if (!testId || !userId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const test = await TestSchema.findById(testId);

    if (!test)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_TEST_NOT_FOUND);

    const deletedTest = await TestSchema.findByIdAndUpdate(testId, {
      isDeleted: true,
      deletedBy: userId,
    });

    return HelperUtil.returnSuccessfulResult(res, { deletedTest });
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}
