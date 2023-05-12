import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { CourseSchema, DiarySchema, ECLRStatus } from "../models";
import { APIMessage } from "../constants";

export async function getCourseByTypeForAdmin(req: Request, res: Response) {
  try {
    const { courseType } = req.query;

    if (!courseType)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const filter = {
      type: courseType,
      isDeleted: false,
    };
    const courses = await CourseSchema.find(filter);

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

export async function editCourseForAdmin(req: Request, res: Response) {
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

/**
 * FOR PLAYER
 */

export async function getAllCourseForPlayer(req: Request, res: Response) {
  try {
    let courses: any;

    const filter = {
      type: ECLRStatus.PUBLISHED,
      isDeleted: false,
    };
    const foundCourses = await CourseSchema.find(filter).select([
      "-lessions.rounds",
      "-level",
      "-creator",
      "-isDeleted",
      "-deletedBy",
      "-updatedAt",
      "-type",
    ]);

    courses = [...foundCourses];

    for (let i = 0; i < courses.length; ++i) {
      const diary = await DiarySchema.findOne({
        "courses.course": courses[i]._id,
      });
      let currentLevel = 0;

      if (!diary) {
        currentLevel = 0;
      } else {
        const targetCourseInDiary = diary.courses.find(
          (item) => item._id === courses[i]._id
        );

        if (!targetCourseInDiary) currentLevel = 0;
        else currentLevel = targetCourseInDiary.lessions.length;
      }

      const courseLessionNumber = courses[i].lessions.length;

      courses[i] = {
        ...courses[i]._doc,
        currentLevel,
        totalLevel: courseLessionNumber,
      };

      courses[i].lessions = undefined;
    }

    return HelperUtil.returnSuccessfulResult(res, { courses });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function searchCourseByKeywordForAdmin(
  req: Request,
  res: Response
) {
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
