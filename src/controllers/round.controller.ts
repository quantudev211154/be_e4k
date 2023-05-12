import { Request, Response } from "express";
import { HelperUtil, RandomUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema, DiarySchema, UserSchema } from "../models";
import {
  PLAY_TYPE_1,
  PLAY_TYPE_2,
  PLAY_TYPE_3,
  PLAY_TYPE_4,
  PLAY_TYPE_5,
  PLAY_TYPE_6,
  ROUND_TYPE_1_INIT_VALUE,
  ROUND_TYPE_2_INIT_VALUE,
  ROUND_TYPE_3_INIT_VALUE,
  ROUND_TYPE_4_INIT_VALUE,
  ROUND_TYPE_5_INIT_VALUE,
  ROUND_TYPE_6_INIT_VALUE,
} from "../constants/round.constant";

function convertNewRoundByRoundType(round: any) {
  let convertedRound: any = undefined;
  const roundPlayType = round.playType;

  if (roundPlayType === PLAY_TYPE_1) {
    convertedRound = {
      ...ROUND_TYPE_1_INIT_VALUE,
      ...round,
    };
  } else if (roundPlayType === PLAY_TYPE_2) {
    convertedRound = {
      ...ROUND_TYPE_2_INIT_VALUE,
      ...round,
    };
  } else if (roundPlayType === PLAY_TYPE_3) {
    convertedRound = {
      ...ROUND_TYPE_3_INIT_VALUE,
      ...round,
    };
  } else if (roundPlayType === PLAY_TYPE_4) {
    convertedRound = {
      ...ROUND_TYPE_4_INIT_VALUE,
      ...round,
    };
  } else if (roundPlayType === PLAY_TYPE_5) {
    convertedRound = {
      ...ROUND_TYPE_5_INIT_VALUE,
      ...round,
    };
  } else if (roundPlayType === PLAY_TYPE_6) {
    convertedRound = {
      ...ROUND_TYPE_6_INIT_VALUE,
      ...round,
    };
  }

  convertedRound.roundId = RandomUtil.generateRandomUUID();

  return convertedRound;
}

export async function createNewRound(req: Request, res: Response) {
  try {
    const { courseId, lessionId } = req.params;
    const { round } = req.body;

    if (!courseId || !lessionId || !round)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const course = await CourseSchema.findById(courseId);

    if (!course)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    const courseFilter = {
      _id: courseId,
      "lessions._id": lessionId,
    };
    const courseUpdater = {
      $push: { "lessions.$.rounds": convertNewRoundByRoundType(round) },
    };

    const updatedCourse = await CourseSchema.findOneAndUpdate(
      courseFilter,
      courseUpdater,
      { new: true }
    );

    return HelperUtil.returnSuccessfulResult(res, { course: updatedCourse });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
