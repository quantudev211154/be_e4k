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
exports.createNewLession = exports.getLessionById = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
function getLessionById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, lessionId } = req.params;
            if (!courseId || !lessionId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const course = yield models_1.CourseSchema.findById(courseId);
            const lessions = course === null || course === void 0 ? void 0 : course.lessions.find((lession) => lession._id.toString() == lessionId);
            if (!lessions)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_LESSION_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                lessions,
                courseName: course === null || course === void 0 ? void 0 : course.title,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getLessionById = getLessionById;
function createNewLession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, courseId, userId } = req.body;
            if (!title || !description || !courseId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existCourse = yield models_1.CourseSchema.findById(courseId);
            if (!existCourse)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const newLession = {
                title,
                description,
                creator: userId,
                position: existCourse.lessions.length,
            };
            const courseUpdater = { $push: { lessions: newLession } };
            const updatedCourse = yield models_1.CourseSchema.findByIdAndUpdate(courseId, courseUpdater, { new: true });
            const latestLession = updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.lessions[updatedCourse.lessions.length - 1];
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                updatedCourse,
                latestLession,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.createNewLession = createNewLession;
