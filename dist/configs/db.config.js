"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_constant_1 = require("../constants/db.constant");
const _1 = require(".");
function default_1() {
    mongoose_1.default
        .connect(process.env.DB_URL, {
        maxPoolSize: db_constant_1.DB_MAX_POOL_SIZE,
        dbName: "e4k",
    })
        .then(() => {
        _1.sys.log("Connected to Mongo Database");
    })
        .catch((err) => _1.sys.warn(err));
}
exports.default = default_1;
