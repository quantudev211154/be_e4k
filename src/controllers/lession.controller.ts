import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema } from "../models";

export async function getLessionById(req: Request, res: Response) {
  try {
    const { courseId, lessionId } = req.params;

    if (!courseId || !lessionId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const course = await CourseSchema.findById(courseId);

    const lessions = course?.lessions.find(
      (lession) => lession._id.toString() == lessionId
    );

    if (!lessions)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_LESSION_FOUND);

    return HelperUtil.returnSuccessfulResult(res, { lessions });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function createNewLession(req: Request, res: Response) {
  try {
    const { title, description, courseId, userId } = req.body;

    if (!title || !description || !courseId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existCourse = await CourseSchema.findById(courseId);

    if (!existCourse)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    const newLession = {
      title,
      description,
      creator: userId,
    };

    const courseUpdater = { $push: { lessions: newLession } };

    const updatedCourse = await CourseSchema.findByIdAndUpdate(
      courseId,
      courseUpdater,
      { new: true }
    );

    const latestLession =
      updatedCourse?.lessions[updatedCourse.lessions.length - 1];

    return HelperUtil.returnSuccessfulResult(res, {
      updatedCourse,
      latestLession,
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function getAllLessionByCourseId(req: Request, res: Response) {
  try {
    const { courseId } = req.params;

    if (!courseId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const course = await CourseSchema.findById(courseId).select([
      "-lessions.level",
      "-lessions.type",
      "-lessions.creator",
    ]);

    if (!course)
      HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    const lession = course?.lessions;

    return HelperUtil.returnSuccessfulResult(res, { lession });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
