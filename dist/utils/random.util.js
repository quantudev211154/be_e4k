"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUUID = void 0;
const uuid_1 = require("uuid");
function generateRandomHEXAColor() {
    return ("#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7));
}
function generateRandomUUID() {
    return `${(0, uuid_1.v4)()}`;
}
exports.generateRandomUUID = generateRandomUUID;
