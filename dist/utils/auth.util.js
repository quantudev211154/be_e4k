"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlayerSensitiveAttributes = exports.removeAdminSensitiveAttributes = exports.sendRefreshToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function createToken(type, user) {
    return (0, jsonwebtoken_1.sign)(Object.assign({ userId: user._id, phone: user.phone, role: user.role }, (type === "refreshToken" ? { tokenVersion: user.tokenVersion } : {})), type === "accessToken"
        ? process.env.E4K_ACCESS_TOKEN_SECRET
        : process.env.E4K_REFRESH_TOKEN_SECRET, { expiresIn: type === "accessToken" ? "1d" : "3d" });
}
exports.createToken = createToken;
function sendRefreshToken(res, user) {
    return res.cookie(process.env.E4K_REFRESH_TOKEN_NAME, createToken("refreshToken", user), {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
    });
}
exports.sendRefreshToken = sendRefreshToken;
function removeAdminSensitiveAttributes(admin) {
    admin.password = undefined;
    admin.isDeleted = undefined;
    admin.tokenVersion = undefined;
    admin.updatedAt = undefined;
    admin.weeklyScore = undefined;
}
exports.removeAdminSensitiveAttributes = removeAdminSensitiveAttributes;
function removePlayerSensitiveAttributes(player) {
    player.password = undefined;
    player.isDeleted = undefined;
    player.tokenVersion = undefined;
    player.updatedAt = undefined;
    player.role = undefined;
}
exports.removePlayerSensitiveAttributes = removePlayerSensitiveAttributes;
