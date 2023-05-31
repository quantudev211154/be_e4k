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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserScroreAndClaimCount = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const models_1 = require("../models");
const configs_1 = require("../configs");
function resetUserScroreAndClaimCount() {
    const scheduledTask = node_cron_1.default.schedule("0 0 * * MON", () => __awaiter(this, void 0, void 0, function* () {
        configs_1.sys.log("- - - USER SCHEDULED TASK IS RUNNING - - -");
        const filter = {
            role: models_1.EUserRole.PLAYER,
            isDeleted: false,
        };
        const updaters = {
            lastClaimdDate: null,
            claimCount: 0,
            weeklyScore: 0,
        };
        yield models_1.UserSchema.updateMany(filter, updaters);
        configs_1.sys.log("- - - USER SCHEDULED TASK DONE - - -");
    }));
    scheduledTask.start();
}
exports.resetUserScroreAndClaimCount = resetUserScroreAndClaimCount;
