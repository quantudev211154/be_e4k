import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { APIMessage } from "../constants";
import { CourseSchema, DiarySchema, UserSchema } from "../models";

/**
 * FOR PLAYER
 */
export async function updateDiaryForPlayer(req: Request, res: Response) {
  try {
    const { userId, courseId, lessionId, roundId, score, hearts } = req.body;

    if (!userId || !courseId || !lessionId || !roundId || !score || !hearts)
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
    ])
      .then(async ([user, existCourseInDiary]) => {
        if (user) {
          const userUpdater = {
            weeklyScore: user?.weeklyScore + score,
            golds: user.golds
              ? Math.round(user.golds + score / 2)
              : Math.round(score / 2),
            hearts,
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

              if (currentCourse.course.toString() == courseId.toString()) {
                const existLessionInCourseDiary = currentCourse.lessions.find(
                  (lession) => lession.lession.toString() == lessionId
                );

                if (!existLessionInCourseDiary) {
                  currentCourse.lessions.push({
                    lession: lessionId,
                    isCompleted:
                      existCourse.lessions.find(
                        (lession) => lession._id.toString() == lessionId
                      )?.rounds.length === 1
                        ? true
                        : false,
                    rounds: [{ roundId, score }],
                  });
                } else {
                  for (let j = 0; j < currentCourse.lessions.length; ++j) {
                    const currentLession = currentCourse.lessions[j];

                    if (
                      currentLession.lession.toString() == lessionId.toString()
                    ) {
                      currentLession.rounds.push({ roundId, score });
                    }

                    const lessionInExistCourse = existCourse.lessions.find(
                      (lession) =>
                        lession._id.toString() ==
                        currentLession.lession.toString()
                    );

                    if (
                      lessionInExistCourse &&
                      currentLession.rounds.length >=
                        lessionInExistCourse.rounds.length
                    )
                      currentLession.isCompleted = true;
                  }
                }
              }

              const completedCourseInDiary = currentCourse.lessions.filter(
                (lession) => lession.isCompleted
              );

              if (
                completedCourseInDiary.length >= currentCourse.lessions.length
              )
                currentCourse.isCompleted = true;
            }

            Promise.all([userUpdate, existCourseInDiary.save()]).then(
              ([userUpdated, updatedCourseInDiary]) => {
                return HelperUtil.returnSuccessfulResult(res, {
                  updatedCourseInDiary,
                });
              }
            );
          }
        } else {
          return HelperUtil.returnErrorResult(res, APIMessage.ERR_UNEXPECTED);
        }
      })
      .catch((err) => {
        return HelperUtil.returnErrorResult(res, APIMessage.ERR_UNEXPECTED);
      });
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
