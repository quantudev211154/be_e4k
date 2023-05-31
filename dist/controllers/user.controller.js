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
exports.changePassword = exports.searchUserByNameOrPhone = exports.deleteUser = exports.getAllUsers = exports.updateUserInfo = exports.findUserByPhone = exports.register = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
const auth_util_1 = require("../utils/auth.util");
const argon2_1 = require("argon2");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, username, role } = req.body;
            if (!phone || !username || !role)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findOne({
                phone,
            });
            if (existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_EXISTED_USER);
            const hashedPassword = yield (0, argon2_1.hash)(phone);
            const newUser = yield new models_1.UserSchema({
                phone,
                username,
                role,
                password: hashedPassword,
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
function findUserByPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const phone = req.params.phone;
            if (!phone)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findOne({ phone });
            if (!existUser)
                return utils_1.HelperUtil.returnSuccessfulResult(res, { user: null });
            existUser.password = undefined;
            return utils_1.HelperUtil.returnSuccessfulResult(res, { user: existUser }, constants_1.APIMessage.SUC_NEW_USER_CREATED);
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.findUserByPhone = findUserByPhone;
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
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFilter = {
                $or: [{ role: models_1.EUserRole.ADMIN }, { role: models_1.EUserRole.MANAGER }],
                isDeleted: false,
            };
            const users = yield models_1.UserSchema.find(userFilter).select([
                "-password",
                "-weeklyScore",
                "-tokenVersion",
                "-level",
                "-isDeleted",
                "-golds",
                "-hearts",
                "-lastClaimdDate",
                "-claimCount",
            ]);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { users });
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_USER_PHONE);
            const existUser = yield models_1.UserSchema.findById(id);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            if (existUser.role !== models_1.EUserRole.ADMIN)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_USER_HAS_NO_PERMISSION);
            const userUpdater = {
                isDeleted: true,
            };
            const updatedUser = yield models_1.UserSchema.findByIdAndUpdate(id, userUpdater, {
                new: true,
            });
            (0, auth_util_1.removeAdminSensitiveAttributes)(updatedUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { updatedUser });
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.deleteUser = deleteUser;
function searchUserByNameOrPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { keyword } = req.query;
            if (!keyword)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const filter = {
                $and: [
                    { $or: [{ role: models_1.EUserRole.ADMIN }, { role: models_1.EUserRole.MANAGER }] },
                    {
                        $or: [
                            { phone: { $regex: ".*" + keyword + ".*", $options: "i" } },
                            { username: { $regex: ".*" + keyword + ".*", $options: "i" } },
                        ],
                    },
                ],
            };
            const users = yield models_1.UserSchema.find(filter)
                .limit(5)
                .select([
                "-password",
                "-weeklyScore",
                "-tokenVersion",
                "-level",
                "-isDeleted",
                "-golds",
                "-hearts",
                "-lastClaimdDate",
                "-claimCount",
            ]);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { users });
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.searchUserByNameOrPhone = searchUserByNameOrPhone;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { oldPassword, newPassword, userId } = req.body;
            if (!oldPassword || !newPassword)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            let existUser = yield models_1.UserSchema.findById(userId);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            const isOldPasswordValid = yield (0, argon2_1.verify)(existUser.password, oldPassword);
            if (!isOldPasswordValid)
                return utils_1.HelperUtil.returnErrorResult(res, "Old password does not match");
            const hashed = yield (0, argon2_1.hash)(newPassword);
            const newUser = yield models_1.UserSchema.findByIdAndUpdate(userId, {
                password: hashed,
            });
            (0, auth_util_1.removeAdminSensitiveAttributes)(newUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { newUser });
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.changePassword = changePassword;
