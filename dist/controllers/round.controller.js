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
exports.getRoundByRoundId = exports.deleteRound = exports.getAllRoundsByCourseIdAndLessionId = exports.createNewRound = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
const round_constant_1 = require("../constants/round.constant");
function convertNewRoundByRoundType(round) {
    let convertedRound = undefined;
    const roundPlayType = round.playType;
    if (roundPlayType === round_constant_1.PLAY_TYPE_1) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_1_INIT_VALUE), round);
    }
    else if (roundPlayType === round_constant_1.PLAY_TYPE_2) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_2_INIT_VALUE), round);
    }
    else if (roundPlayType === round_constant_1.PLAY_TYPE_3) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_3_INIT_VALUE), round);
    }
    else if (roundPlayType === round_constant_1.PLAY_TYPE_4) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_4_INIT_VALUE), round);
    }
    else if (roundPlayType === round_constant_1.PLAY_TYPE_5) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_5_INIT_VALUE), round);
    }
    else if (roundPlayType === round_constant_1.PLAY_TYPE_6) {
        convertedRound = Object.assign(Object.assign({}, round_constant_1.ROUND_TYPE_6_INIT_VALUE), round);
    }
    convertedRound.roundId = utils_1.RandomUtil.generateRandomUUID();
    return convertedRound;
}
function createNewRound(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, lessionId } = req.params;
            const { round } = req.body;
            if (!courseId || !lessionId || !round)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const course = yield models_1.CourseSchema.findById(courseId);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const courseFilter = {
                _id: courseId,
                "lessions._id": lessionId,
            };
            const courseUpdater = {
                $push: { "lessions.$.rounds": convertNewRoundByRoundType(round) },
            };
            const updatedCourse = yield models_1.CourseSchema.findOneAndUpdate(courseFilter, courseUpdater, { new: true });
            return utils_1.HelperUtil.returnSuccessfulResult(res, { course: updatedCourse });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.createNewRound = createNewRound;
function getAllRoundsByCourseIdAndLessionId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, lessionId } = req.query;
            if (!courseId || !lessionId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const course = yield models_1.CourseSchema.findById(courseId);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const existLession = course.lessions.find((lession) => lession._id.toString() == lessionId);
            if (!existLession)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_LESSION_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                rounds: existLession.rounds,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getAllRoundsByCourseIdAndLessionId = getAllRoundsByCourseIdAndLessionId;
function deleteRound(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, lessionId, roundId } = req.params;
            if (!courseId || !lessionId || !roundId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const course = yield models_1.CourseSchema.findById(courseId);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const existLession = course.lessions.find((lession) => lession._id.toString() == lessionId);
            if (!existLession)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_LESSION_FOUND);
            existLession.rounds = existLession.rounds.filter((round) => round.roundId !== roundId);
            yield course.save();
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                rounds: existLession.rounds,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.deleteRound = deleteRound;
function getRoundByRoundId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, lessionId, roundId } = req.params;
            if (!courseId || !lessionId || !roundId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const course = yield models_1.CourseSchema.findById(courseId);
            if (!course)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_COURSE_FOUND);
            const existLession = course.lessions.find((lession) => lession._id.toString() == lessionId);
            if (!existLession)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_LESSION_FOUND);
            const targetRound = existLession.rounds.find((round) => round.roundId === roundId);
            if (!targetRound)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_ROUND_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                round: targetRound,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getRoundByRoundId = getRoundByRoundId;
