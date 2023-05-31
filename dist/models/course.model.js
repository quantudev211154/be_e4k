"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = exports.ECourseLevel = exports.ECLRStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
/**
 * Course, lession and round status use one enum (same properties): Published (player can play) or draft
 */
var ECLRStatus;
(function (ECLRStatus) {
    ECLRStatus["PUBLISHED"] = "PUBLISHED";
    ECLRStatus["DRAFT"] = "DRAFT";
})(ECLRStatus = exports.ECLRStatus || (exports.ECLRStatus = {}));
var ECourseLevel;
(function (ECourseLevel) {
    ECourseLevel["EASY"] = "EASY";
    ECourseLevel["MEDIUM"] = "MEDIUM";
    ECourseLevel["HARD"] = "HARD";
})(ECourseLevel = exports.ECourseLevel || (exports.ECourseLevel = {}));
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    position: {
        type: Number,
        require: false,
        default: null,
    },
    level: {
        type: String,
        require: false,
        enum: ECourseLevel,
        default: ECourseLevel.EASY,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    type: {
        type: String,
        enum: ECLRStatus,
        require: false,
        default: ECLRStatus.DRAFT,
    },
    lessions: [
        {
            title: {
                type: String,
                require: false,
                default: "",
            },
            description: {
                type: String,
                require: false,
                default: "",
            },
            type: {
                type: String,
                enum: ECLRStatus,
                require: false,
                default: ECLRStatus.DRAFT,
            },
            position: {
                type: Number,
                require: false,
                default: null,
            },
            rounds: {
                type: [Object],
                require: false,
                default: [],
            },
            creator: {
                type: mongoose_1.Schema.Types.ObjectId,
                require: true,
                ref: "User",
            },
        },
    ],
    isDeleted: {
        type: Boolean,
        require: false,
        default: false,
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false,
        ref: "User",
        default: null,
    },
}, {
    collection: "courses",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
exports.CourseSchema = mongoose_1.default.model("Course", courseSchema);
