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
exports.buyHearts = exports.getUserInfo = exports.updateUsernameForPlayer = exports.updateUserInfo = exports.findPlayerByPhone = exports.register = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
const auth_util_1 = require("../utils/auth.util");
const user_constant_1 = require("../constants/user.constant");
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
function updateUsernameForPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, userId } = req.body;
            if (!username || !userId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findById(userId);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            existUser.username = username;
            const updatedUser = yield existUser.save();
            (0, auth_util_1.removePlayerSensitiveAttributes)(updatedUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { updatedUser });
        }
        catch (error) {
            utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.updateUsernameForPlayer = updateUsernameForPlayer;
function getUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            if (!userId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const user = yield models_1.UserSchema.findById(userId);
            if (!user)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            (0, auth_util_1.removePlayerSensitiveAttributes)(user);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { user });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.getUserInfo = getUserInfo;
function buyHearts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            const hearts = parseInt(req.body.hearts);
            if (!hearts || !userId)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_MISSING_PARAMS);
            const existUser = yield models_1.UserSchema.findById(userId);
            if (!existUser)
                return utils_1.HelperUtil.returnErrorResult(res, constants_1.APIMessage.ERR_NO_USER_FOUND);
            if (existUser.hearts === 5)
                return utils_1.HelperUtil.returnErrorResult(res, "Hearts of this user is hit maximum. Can not buy more.");
            let updatedUser;
            const userGolds = existUser.golds;
            const userHearts = existUser.hearts;
            if (hearts === user_constant_1.MINIMUM_HEARTS_BUY_QTY) {
                if (userGolds < user_constant_1.GOLD_FOR_BUY_3_HEARTS) {
                    return utils_1.HelperUtil.returnErrorResult(res, "No enough golds to buy hearts.");
                }
                const userUpdater = {
                    hearts: user_constant_1.MINIMUM_HEARTS_BUY_QTY + userHearts > user_constant_1.MAXIMUM_HEARTS
                        ? user_constant_1.MAXIMUM_HEARTS
                        : user_constant_1.MINIMUM_HEARTS_BUY_QTY + userHearts,
                    golds: userGolds - user_constant_1.GOLD_FOR_BUY_3_HEARTS,
                };
                updatedUser = yield models_1.UserSchema.findByIdAndUpdate(userId, userUpdater, {
                    new: true,
                });
            }
            else if (hearts === user_constant_1.MAXIMUM_HEARTS) {
                if (userGolds < user_constant_1.GOLD_FOR_BUY_5_HEARTS)
                    return utils_1.HelperUtil.returnErrorResult(res, "No enough golds to buy hearts.");
                const userUpdater = {
                    hearts: user_constant_1.MAXIMUM_HEARTS,
                    golds: userGolds - user_constant_1.GOLD_FOR_BUY_5_HEARTS,
                };
                updatedUser = yield models_1.UserSchema.findByIdAndUpdate(userId, userUpdater, {
                    new: true,
                });
            }
            (0, auth_util_1.removePlayerSensitiveAttributes)(updatedUser);
            return utils_1.HelperUtil.returnSuccessfulResult(res, { updatedUser });
        }
        catch (error) {
            return utils_1.HelperUtil.returnErrorResult(res, error);
        }
    });
}
exports.buyHearts = buyHearts;
