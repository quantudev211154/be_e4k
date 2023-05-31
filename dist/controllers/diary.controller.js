"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDiaryForPlayer = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
/**
 * FOR PLAYER
 */
function updateDiaryForPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, courseId, lessionId, roundId, score, hearts } = req.body;
            if (!userId || !courseId || !lessionId || !roundId || !score || !hearts)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existCourse = yield models_1.CourseSchema.findById(courseId);
            if (!existCourse)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const existCourseInDiaryFilter = {
                user: userId,
            };
            Promise.all([
                models_1.UserSchema.findById(userId),
                models_1.DiarySchema.findOne(existCourseInDiaryFilter),
            ])
                .then(([user, existCourseInDiary]) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (user) {
                    const userUpdater = {
                        weeklyScore: (user === null || user === void 0 ? void 0 : user.weeklyScore) + score,
                        golds: user.golds
                            ? Math.round(user.golds + score / 2)
                            : Math.round(score / 2),
                        hearts,
                    };
                    const userUpdate = models_1.UserSchema.findByIdAndUpdate(userId, userUpdater);
                    if (!existCourseInDiary) {
                        const newDiarySchema = new models_1.DiarySchema({
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
                        Promise.all([userUpdate, newDiarySchema]).then(([userUpdated, updatedCourseInDiary]) => {
                            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                                updatedCourseInDiary,
                            });
                        });
                    }
                    else {
                        for (let i = 0; i < existCourseInDiary.courses.length; ++i) {
                            const currentCourse = existCourseInDiary.courses[i];
                            if (currentCourse.course.toString() == courseId.toString()) {
                                const existLessionInCourseDiary = currentCourse.lessions.find((lession) => lession.lession.toString() == lessionId);
                                if (!existLessionInCourseDiary) {
                                    currentCourse.lessions.push({
                                        lession: lessionId,
                                        isCompleted: ((_a = existCourse.lessions.find((lession) => lession._id.toString() == lessionId.toString())) === null || _a === void 0 ? void 0 : _a.rounds.length) === 1
                                            ? true
                                            : false,
                                        rounds: [{ roundId, score }],
                                    });
                                }
                                else {
                                    for (let j = 0; j < currentCourse.lessions.length; ++j) {
                                        const currentLession = currentCourse.lessions[j];
                                        if (currentLession.lession.toString() == lessionId.toString()) {
                                            currentLession.rounds.push({ roundId, score });
                                        }
                                        const lessionInExistCourse = existCourse.lessions.find((lession) => lession._id.toString() ==
                                            currentLession.lession.toString());
                                        if (lessionInExistCourse &&
                                            currentLession.rounds.length >=
                                                lessionInExistCourse.rounds.length)
                                            currentLession.isCompleted = true;
                                    }
                                }
                            }
                            const completedCourseInDiary = currentCourse.lessions.filter((lession) => lession.isCompleted);
                            if (completedCourseInDiary.length >= currentCourse.lessions.length)
                                currentCourse.isCompleted = true;
                        }
                        Promise.all([userUpdate, existCourseInDiary.save()]).then(([userUpdated, updatedCourseInDiary]) => {
                            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                                updatedCourseInDiary,
                            });
                        });
                    }
                }
                else {
                    return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_UNEXPECTED);
                }
            }))
                .catch((err) => {
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_UNEXPECTED);
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.updateDiaryForPlayer = updateDiaryForPlayer;
