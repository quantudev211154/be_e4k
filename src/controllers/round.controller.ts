import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema } from "../models";
import {
  PLAY_TYPE_1,
  ROUND_TYPE_1_INIT_VALUE,
} from "../constants/round.constant";

function convertNewRoundByRoundType(round: any) {
  let convertedRound: any = undefined;

  if (round.playType === PLAY_TYPE_1) {
    convertedRound = {
      ...ROUND_TYPE_1_INIT_VALUE,
      ...round,
    };
  }

  console.log(convertedRound);

  return convertedRound;
}

export async function createNewRound(req: Request, res: Response) {
  try {
    const { courseId, lessionId } = req.params;
    const { round } = req.body;

    console.log(round);

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
