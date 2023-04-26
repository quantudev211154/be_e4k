"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.WordRouter = exports.UserRouter = exports.DiaryRouter = exports.CourseRouter = void 0;
var course_route_1 = require("./course.route");
Object.defineProperty(exports, "CourseRouter", { enumerable: true, get: function () { return __importDefault(course_route_1).default; } });
var diary_route_1 = require("./diary.route");
Object.defineProperty(exports, "DiaryRouter", { enumerable: true, get: function () { return __importDefault(diary_route_1).default; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var word_route_1 = require("./word.route");
Object.defineProperty(exports, "WordRouter", { enumerable: true, get: function () { return __importDefault(word_route_1).default; } });
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
