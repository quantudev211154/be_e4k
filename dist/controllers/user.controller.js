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
exports.updateUserInfo = exports.findPlayerByPhone = exports.register = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, username } = req.body;
            if (!phone || !username)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findOne({
                phone,
            });
            if (existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_EXISTED_USER);
            const newUser = yield new models_1.UserSchema({
                phone,
                username,
            }).save();
            newUser.password = undefined;
            return utils_1.HelperUtil.returnSuccessfulResult(res, { newUser }, constants_1.APIMessage.SUC_NEW_USER_CREATED);
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.register = register;
function findPlayerByPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const phone = req.params.phone;
            if (!phone)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findOne({ phone });
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER);
            existUser.password = undefined;
            return utils_1.HelperUtil.returnSuccessfulResult(res, { user: existUser }, constants_1.APIMessage.SUC_NEW_USER_CREATED);
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.findPlayerByPhone = findPlayerByPhone;
function updateUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, username, password } = req.body;
            if (!phone)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_USER_PHONE);
            if (!username && !password)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findOne({ phone });
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER);
            const updater = Object.assign(Object.assign({}, (username ? { username } : {})), (password ? { password } : {}));
            const updatedUser = yield models_1.UserSchema.findOneAndUpdate({ phone }, updater);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { updatedUser }, constants_1.APIMessage.SUC_UPDATED_USER);
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.updateUserInfo = updateUserInfo;
