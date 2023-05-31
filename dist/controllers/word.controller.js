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
exports.updateWord = exports.searchWordsByKeyWord = exports.addNewWord = exports.getWordById = exports.getAllWords = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
function getAllWords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = req.query.page;
            if (!page)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const words = yield models_1.WordSchema.find()
                .limit(constants_1.WordConstant.WORDS_PER_PAGE)
                .skip(constants_1.WordConstant.WORDS_PER_PAGE * parseInt(page) -
                constants_1.WordConstant.WORDS_PER_PAGE);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { words });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getAllWords = getAllWords;
function getWordById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordId = req.params.wordId;
            if (!wordId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const word = yield models_1.WordSchema.findById(wordId);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { word });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getWordById = getWordById;
function addNewWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { engVer, vieVers, images, audios, userId } = req.body;
            if (!engVer || !vieVers || vieVers.length === 0)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const newWord = yield new models_1.WordSchema(Object.assign(Object.assign({ engVer,
                vieVers, creator: userId }, (images ? { images } : {})), (audios ? { audios } : {}))).save();
            return utils_1.HelperUtil.returnSuccessfulResult(res, { newWord });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.addNewWord = addNewWord;
function searchWordsByKeyWord(req, res) {
    try {
        const { keyword } = req.body;
        if (!keyword)
            return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
        Promise.all([
            models_1.WordSchema.findOne({ engVer: keyword }),
            models_1.WordSchema.find({
                engVer: { $regex: ".*" + keyword + ".*", $options: "i" },
            }).limit(3),
        ]).then(([equalWords, relativeWords]) => {
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                words: equalWords ? [equalWords, ...relativeWords] : relativeWords,
            });
        });
    }
    catch (error) {
        return utils_1.HelperUtil.returnErrorResult(res, error);
    }
}
exports.searchWordsByKeyWord = searchWordsByKeyWord;
function updateWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { engVer, vieVers, images, audios, userId } = req.body;
            const wordId = req.params.wordId;
            if (!wordId || !engVer || !vieVers || vieVers.length === 0)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const updater = Object.assign(Object.assign({ engVer,
                vieVers, creator: userId }, (images ? { images } : {})), (audios ? { audios } : {}));
            const word = yield models_1.WordSchema.findByIdAndUpdate(wordId, updater, {
                new: true,
            });
            return utils_1.HelperUtil.returnSuccessfulResult(res, { word });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.updateWord = updateWord;
