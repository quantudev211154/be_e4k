import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema, DiarySchema } from "../models";

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

export async function getAllLessionByCourseIdForPlayer(
  req: Request,
  res: Response
) {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    if (!courseId || !userId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const course = await CourseSchema.findById(courseId).select([
      "-lessions.level",
      "-lessions.type",
      "-lessions.creator",
    ]);

    if (!course)
      HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    if (course) {
      const lessions: any = [];

      for (let i = 0; i < course.lessions.length; ++i) {
        let currentLession = course.lessions[i] as any;
        currentLession = {
          ...currentLession._doc,
          totalRounds: currentLession.rounds.length,
        };

        const diaryFilter = {
          user: userId,
        };
        const diary = await DiarySchema.findOne(diaryFilter);

        if (diary) {
          const courseInDiary = diary.courses.find(
            (course) => course.course.toString() == courseId
          );

          if (courseInDiary) {
            const lessionInDiary = courseInDiary.lessions.find(
              (lession) => lession.lession.toString() == currentLession._id
            );

            if (lessionInDiary) {
              const roundsInDiary = lessionInDiary.rounds;
              const newRounds = [];

              for (let j = 0; j < currentLession.rounds.length; ++j) {
                const isPlayed = roundsInDiary.find(
                  (round) => round.roundId === currentLession.rounds[j].roundId
                );

                if (isPlayed) {
                  newRounds.push({
                    ...currentLession.rounds[j],
                    isPlayed: true,
                  });
                }
              }

              currentLession = {
                ...currentLession,
                rounds: newRounds,
                playedRounds: lessionInDiary.rounds.length,
              };
            }
          }
        } else {
          currentLession = {
            ...currentLession,
            playedRounds: 0,
          };
        }

        lessions.push(currentLession);
      }

      return HelperUtil.returnSuccessfulResult(res, { lession: lessions });
    }
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
