import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema, DiarySchema, UserSchema } from "../models";

/**
 * FOR PLAYER
 */
export async function updateDiaryForPlayer(req: Request, res: Response) {
  try {
    const { userId, courseId, lessionId, roundId, score } = req.body;

    if (!userId || !courseId || !lessionId || !roundId || !score)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existCourse = await CourseSchema.findById(courseId);

    if (!existCourse)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_COURSE_FOUND);

    const existCourseInDiaryFilter = {
      user: userId,
    };

    Promise.all([
      UserSchema.findById(userId),
      DiarySchema.findOne(existCourseInDiaryFilter),
    ]).then(async ([user, existCourseInDiary]) => {
      if (user && existCourseInDiary) {
        const userUpdater = {
          weeklyScore: user?.weeklyScore + score,
          golds: user.golds ? user.golds + score / 2 : score / 2,
        };
        const userUpdate = UserSchema.findByIdAndUpdate(userId, userUpdater);

        if (!existCourseInDiary) {
          const newDiarySchema = new DiarySchema({
            user: userId,
            courses: [
              {
                course: courseId,
                lessions: [
                  {
                    lession: lessionId,
                    rounds: [
                      {
                        roundId,
                        score,
                      },
                    ],
                  },
                ],
              },
            ],
          }).save();

          Promise.all([userUpdate, newDiarySchema]).then(
            ([userUpdated, updatedCourseInDiary]) => {
              return HelperUtil.returnSuccessfulResult(res, {
                updatedCourseInDiary,
              });
            }
          );
        } else {
          for (let i = 0; i < existCourseInDiary.courses.length; ++i) {
            const currentCourse = existCourseInDiary.courses[i];

            if (currentCourse.course == courseId) {
              for (let j = 0; j < currentCourse.lessions.length; ++j) {
                const currentLession = currentCourse.lessions[j];

                if (currentLession.lession == lessionId) {
                  currentLession.rounds.push({ roundId, score });
                }
              }
            }
          }

          Promise.all([userUpdate, existCourseInDiary.save()]).then(
            ([userUpdated, updatedCourseInDiary]) => {
              return HelperUtil.returnSuccessfulResult(res, {
                updatedCourseInDiary,
              });
            }
          );
        }
      }
    });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
