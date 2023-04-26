"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const constants_1 = require("../constants");
function default_1() {
    mongoose_1.default
        .connect(process.env.DB_URL, {
        maxPoolSize: constants_1.DBConstant.DB_MAX_POOL_SIZE,
        dbName: "e4k",
    })
        .then(() => {
        _1.sys.log("Connected to Mongo Database");
    })
        .catch((err) => _1.sys.warn(err));
}
exports.default = default_1;
