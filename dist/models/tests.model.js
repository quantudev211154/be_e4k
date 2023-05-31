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
exports.TestSchema = exports.ETestLevel = exports.ETestAttachmentType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants");
var ETestAttachmentType;
(function (ETestAttachmentType) {
    ETestAttachmentType["NONE"] = "NONE";
    ETestAttachmentType["IMAGE"] = "IMAGE";
    ETestAttachmentType["AUDIO"] = "AUDIO";
})(ETestAttachmentType = exports.ETestAttachmentType || (exports.ETestAttachmentType = {}));
var ETestLevel;
(function (ETestLevel) {
    ETestLevel["EASY"] = "EASY";
    ETestLevel["MEDIUM"] = "MEDIUM";
})(ETestLevel = exports.ETestLevel || (exports.ETestLevel = {}));
const testSchema = new mongoose_1.Schema({
    level: {
        type: String,
        require: false,
        enum: ETestLevel,
        default: ETestLevel.EASY,
    },
    question: {
        type: String,
        require: true,
    },
    attachment: {
        type: String,
        require: false,
        default: "",
    },
    attachmentType: {
        type: String,
        require: true,
        enum: ETestAttachmentType,
    },
    correctAnswer: {
        type: String,
        require: true,
    },
    answers: [
        {
            answerId: {
                type: String,
                require: true,
            },
            content: {
                type: String,
                require: true,
            },
        },
    ],
    score: {
        type: Number,
        require: false,
        default: constants_1.EASY_TEST_SCORE,
    },
    isDeleted: {
        type: Boolean,
        require: false,
        default: false,
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false,
        default: null,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
    },
}, {
    collection: "tests",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
exports.TestSchema = mongoose_1.default.model("Tests", testSchema);
