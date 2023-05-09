import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema } from "../models";
import {
  PLAY_TYPE_1,
  PLAY_TYPE_2,
  PLAY_TYPE_3,
  PLAY_TYPE_4,
  ROUND_TYPE_1_INIT_VALUE,
  ROUND_TYPE_2_INIT_VALUE,
  ROUND_TYPE_3_INIT_VALUE,
  ROUND_TYPE_4_INIT_VALUE,
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
  }

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

    for (let i = 0; i < course.lessions.length; ++i) {
      if (course.lessions[i]._id.toString() == lessionId) {
        const newRound = convertNewRoundByRoundType(round);

        course.lessions[i].rounds = [...course.lessions[i].rounds, newRound];
      }
    }

    await course.save();

    return HelperUtil.returnSuccessfulResult(res, { course });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
