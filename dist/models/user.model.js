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
exports.UserSchema = exports.EUserLevel = exports.EUserIsDeleted = exports.EUserRole = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var EUserRole;
(function (EUserRole) {
    EUserRole["ADMIN"] = "ADMIN";
    EUserRole["MANAGER"] = "MANAGER";
    EUserRole["PLAYER"] = "PLAYER";
})(EUserRole = exports.EUserRole || (exports.EUserRole = {}));
var EUserIsDeleted;
(function (EUserIsDeleted) {
    EUserIsDeleted[EUserIsDeleted["FALSE"] = 0] = "FALSE";
    EUserIsDeleted[EUserIsDeleted["TRUE"] = 1] = "TRUE";
})(EUserIsDeleted = exports.EUserIsDeleted || (exports.EUserIsDeleted = {}));
var EUserLevel;
(function (EUserLevel) {
    EUserLevel["NEWBIE"] = "NEWBIE";
    EUserLevel["STARTER"] = "STARTER";
})(EUserLevel = exports.EUserLevel || (exports.EUserLevel = {}));
const userSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    /**
     * Only for admin
     */
    password: {
        type: String,
        require: false,
        default: null,
    },
    weeklyScore: {
        type: Number,
        require: false,
        default: 0,
    },
    tokenVersion: {
        type: Number,
        require: false,
        default: 0,
    },
    role: {
        type: String,
        require: false,
        enum: EUserRole,
        default: EUserRole.PLAYER,
    },
    level: {
        type: String,
        require: true,
        enum: EUserLevel,
    },
    isDeleted: {
        type: Boolean,
        require: false,
        enum: EUserIsDeleted,
        default: EUserIsDeleted.FALSE,
    },
    golds: {
        type: Number,
        require: false,
        default: 0,
    },
    hearts: {
        type: Number,
        require: false,
        default: 0,
    },
    lastClaimdDate: {
        type: Date,
        require: false,
        default: "",
    },
    claimCount: {
        type: Number,
        require: false,
        default: 0,
    },
}, {
    collection: "users",
    timestamps: { createdAt: "registerDate", updatedAt: "updatedAt" },
});
exports.UserSchema = mongoose_1.default.model("User", userSchema);
