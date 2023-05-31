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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCourseByKeyword = exports.deleteCourseByCourseId = exports.editCourse = exports.createDraftCourse = exports.getCourseByCourseId = exports.getCourseByType = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
function getCourseByType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseType } = req.query;
            if (!courseType)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const filter = {
                type: courseType,
                isDeleted: false,
            };
            const courses = yield models_1.CourseSchema.find(filter).sort({ position: 1 });
            return utils_1.HelperUtil.returnSuccessfulResult(res, { courses });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getCourseByType = getCourseByType;
function getCourseByCourseId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.id;
            const course = yield models_1.CourseSchema.findById(courseId);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { course });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getCourseByCourseId = getCourseByCourseId;
function createDraftCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, userId, level } = req.body;
            if (!title || !description || !userId || !level)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const courseWithHighestPosition = yield models_1.CourseSchema.find().sort({
                position: -1,
            });
            const createdCourse = yield new models_1.CourseSchema({
                title,
                description,
                creator: userId,
                level,
                position: courseWithHighestPosition
                    ? courseWithHighestPosition.length
                    : 0,
            }).save();
            return utils_1.HelperUtil.returnSuccessfulResult(res, { newCourse: createdCourse }, constants_1.APIMessage.SUC_NEW_USER_CREATED);
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.createDraftCourse = createDraftCourse;
function editCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { course } = req.body;
            console.log(course.type);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const { _id } = course, rest = __rest(course, ["_id"]);
            const editedCourse = yield models_1.CourseSchema.findByIdAndUpdate(_id, Object.assign({}, rest), { new: true });
            return utils_1.HelperUtil.returnSuccessfulResult(res, { editedCourse });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.editCourse = editCourse;
function deleteCourseByCourseId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.id;
            const targetCourse = yield models_1.CourseSchema.findByIdAndDelete(courseId);
            if (!targetCourse)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                deletedCourse: targetCourse,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.deleteCourseByCourseId = deleteCourseByCourseId;
function searchCourseByKeyword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { keyword } = req.query;
            if (!keyword)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const filter = {
                title: { $regex: ".*" + keyword + ".*", $options: "i" },
                isDeleted: false,
            };
            const courses = yield models_1.CourseSchema.find(filter).limit(5);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { courses });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.searchCourseByKeyword = searchCourseByKeyword;
