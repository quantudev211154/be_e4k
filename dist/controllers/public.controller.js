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
exports.searchUserByPhone = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
function searchUserByPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const phone = req.query.phone;
            if (!phone)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_USER_PHONE);
            const existUser = yield models_1.UserSchema.findOne({ phone });
            if (existUser && (existUser === null || existUser === void 0 ? void 0 : existUser.role) !== models_1.EUserRole.PLAYER)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_INVALID_LOGIN_TYPE, 403);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER);
            const result = {
                _id: existUser.id,
                phone: existUser.phone,
                username: existUser.username,
            };
            return utils_1.HelperUtil.returnSuccessfulResult(res, { user: result });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.searchUserByPhone = searchUserByPhone;
