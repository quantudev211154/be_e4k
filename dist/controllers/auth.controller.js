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
exports.logout = exports.register = exports.login = exports.checkSSO = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const models_1 = require("../models");
const auth_util_1 = require("../utils/auth.util");
const argon2_1 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
function checkSSO(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const refreshToken = req.cookies[process.env.E4K_REFRESH_TOKEN_NAME];
            if (!refreshToken)
                return utils_1.HelperUtil.returnUnauthorizedResult(res);
            const decoded = (0, jsonwebtoken_1.verify)(refreshToken, process.env.E4K_REFRESH_TOKEN_SECRET);
            const existUser = yield models_1.UserSchema.findById(decoded.userId);
            if (!existUser || existUser.tokenVersion !== decoded.tokenVersion)
                return utils_1.HelperUtil.returnUnauthorizedResult(res);
            (0, auth_util_1.sendRefreshToken)(res, existUser);
            (0, auth_util_1.removeAdminSensitiveAttributes)(existUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                user: existUser,
                accessToken: utils_1.AuthUtil.createToken("accessToken", existUser),
            });
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.checkSSO = checkSSO;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, password } = req.body;
            if (!phone || !password)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_USER_PHONE);
            const existUser = yield models_1.UserSchema.findOne({ phone });
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_LOGIN_FAILED);
            const isValidPassword = yield (0, argon2_1.verify)(existUser.password, password);
            if (!isValidPassword)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_LOGIN_FAILED);
            (0, auth_util_1.sendRefreshToken)(res, existUser);
            (0, auth_util_1.removeAdminSensitiveAttributes)(existUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                user: existUser,
                accessToken: utils_1.AuthUtil.createToken("accessToken", existUser),
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, phone, password, username, role } = req.body;
            if (!phone || !password || !username || !role)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const requestCreator = yield models_1.UserSchema.findById(userId);
            if ((requestCreator === null || requestCreator === void 0 ? void 0 : requestCreator.role) !== models_1.EUserRole.ADMIN)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_PERMISSION);
            const existUser = yield models_1.UserSchema.findOne({
                phone,
            });
            if (existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_EXIST_ADMIN);
            const hashedPassword = yield (0, argon2_1.hash)(password);
            const newUser = yield new models_1.UserSchema({
                phone,
                password: hashedPassword,
                username,
                role,
            }).save();
            newUser.password = undefined;
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                newUser,
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.register = register;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (!id)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existAdmin = yield models_1.UserSchema.findById(id);
            if (!existAdmin)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_EXIST_ADMIN);
            yield models_1.UserSchema.findByIdAndUpdate(id, {
                tokenVersion: existAdmin.tokenVersion + 1,
            });
            return utils_1.HelperUtil.returnSuccessfulResult(res, {
                message: "Admin logged out",
            });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.logout = logout;
