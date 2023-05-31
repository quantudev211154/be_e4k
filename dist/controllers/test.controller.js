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
exports.deleteTestById = exports.getTestById = exports.findTestByQuestion = exports.getAllTests = exports.createNewTest = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
const tests_model_1 = require("../models/tests.model");
function createNewTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, test } = req.body;
            if (!userId || !test)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findById(userId);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            const newTest = yield new tests_model_1.TestSchema(Object.assign(Object.assign({}, test), { score: test.level === tests_model_1.ETestLevel.EASY ? constants_1.EASY_TEST_SCORE : constants_1.MEDIUM_TEST_SCORE, creator: userId })).save();
            return utils_1.HelperUtil.returnSuccessfulResult(res, { newTest });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.createNewTest = createNewTest;
function getAllTests(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = req.query.page;
            if (!page)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const tests = yield tests_model_1.TestSchema.find({ isDeleted: false })
                .limit(constants_1.TEST_PER_PAGE)
                .skip(constants_1.TEST_PER_PAGE * parseInt(page) - constants_1.TEST_PER_PAGE);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { tests });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.getAllTests = getAllTests;
function findTestByQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = req.params.question;
            if (!question)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const filter = {
                question: { $regex: ".*" + question + ".*", $options: "i" },
                isDeleted: false,
            };
            const tests = yield tests_model_1.TestSchema.find(filter).limit(5);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { tests });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.findTestByQuestion = findTestByQuestion;
function getTestById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testId = req.params.id;
            if (!testId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const test = yield tests_model_1.TestSchema.findById(testId);
            if (!test)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_TEST_NOT_FOUND);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { test });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.getTestById = getTestById;
function deleteTestById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testId = req.params.id;
            const userId = req.body.userId;
            if (!testId || !userId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const test = yield tests_model_1.TestSchema.findById(testId);
            if (!test)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_TEST_NOT_FOUND);
            const deletedTest = yield tests_model_1.TestSchema.findByIdAndUpdate(testId, {
                isDeleted: true,
                deletedBy: userId,
            });
            return utils_1.HelperUtil.returnSuccessfulResult(res, { deletedTest });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.deleteTestById = deleteTestById;
