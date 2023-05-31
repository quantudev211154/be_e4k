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
exports.checkAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils");
const models_1 = require("../models");
const constants_1 = require("../constants");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return utils_1.HelperUtil.returnUnauthorizedResult(res, constants_1.APIMessage.ERR_AUTH_TOKEN_NOT_FOUND);
        try {
            const { userId, phone } = (0, jsonwebtoken_1.verify)(token, process.env.E4K_ACCESS_TOKEN_SECRET);
            const existUser = yield models_1.UserSchema.findById(userId);
            if (!existUser || existUser.phone !== phone)
                return utils_1.HelperUtil.returnUnauthorizedResult(res);
            req.body.userId = userId;
            return next();
        }
        catch (error) {
            console.log(error);
            return utils_1.HelperUtil.returnUnauthorizedResult(res);
        }
    });
}
exports.checkAuth = checkAuth;
