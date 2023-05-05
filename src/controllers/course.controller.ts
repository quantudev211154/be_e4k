import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { CourseSchema } from "../models";
import { APIMessage } from "../constants";

export async function getAllCourse(req: Request, res: Response) {
  try {
    const courses = await CourseSchema.find({});

    return HelperUtil.returnSuccessfulResult(res, { courses });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function getCourseByCourseId(req: Request, res: Response) {
  try {
    const courseId = req.params.id as string;

    const course = await CourseSchema.findById(courseId);

    if (!course)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    return HelperUtil.returnSuccessfulResult(res, { course });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function createDraftCourse(req: Request, res: Response) {
  try {
    const { title, description, userId } = req.body;

    console.log(title, description, userId);

    if (!title || !description)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const createdCourse = await new CourseSchema({
      title,
      description,
      creator: userId,
    }).save();

    return HelperUtil.returnSuccessfulResult(
      res,
      { newCourse: createdCourse },
      APIMessage.SUC_NEW_USER_CREATED
    );
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function editCourse(req: Request, res: Response) {}

export async function deleteCourseByCourseId(req: Request, res: Response) {
  try {
    const courseId = req.params.id as string;

    const targetCourse = await CourseSchema.findByIdAndDelete(courseId);

    if (!targetCourse)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    return HelperUtil.returnSuccessfulResult(res, {
      deletedCourse: targetCourse,
    });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
