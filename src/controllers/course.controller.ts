import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { CourseSchema } from "../models";
import { APIMessage } from "../constants";

export async function getCourseByType(req: Request, res: Response) {
  try {
    const { courseType } = req.query;

    if (!courseType)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const filter = {
      type: courseType,
      isDeleted: false,
    };
    const courses = await CourseSchema.find(filter).sort({ position: 1 });

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
    const { title, description, userId, level } = req.body;

    if (!title || !description || !userId || !level)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const courseWithHighestPosition = await CourseSchema.find().sort({
      position: -1,
    });

    const createdCourse = await new CourseSchema({
      title,
      description,
      creator: userId,
      level,
      position: courseWithHighestPosition
        ? courseWithHighestPosition.length
        : 0,
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

export async function editCourse(req: Request, res: Response) {
  try {
    const { course } = req.body;

    console.log(course.type);

    if (!course)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const { _id, ...rest } = course;

    const editedCourse = await CourseSchema.findByIdAndUpdate(
      _id,
      { ...rest },
      { new: true }
    );

    return HelperUtil.returnSuccessfulResult(res, { editedCourse });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

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

export async function searchCourseByKeyword(req: Request, res: Response) {
  try {
    const { keyword } = req.query;

    if (!keyword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const filter = {
      title: { $regex: ".*" + keyword + ".*", $options: "i" },
      isDeleted: false,
    };
    const courses = await CourseSchema.find(filter).limit(5);

    return HelperUtil.returnSuccessfulResult(res, { courses });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
