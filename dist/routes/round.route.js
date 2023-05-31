"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.checkAuth, controllers_1.RoundController.getAllRoundsByCourseIdAndLessionId);
router.get("/:courseId/:lessionId/:roundId", controllers_1.RoundController.getRoundByRoundId);
router.post("/:courseId/:lessionId", auth_middleware_1.checkAuth, controllers_1.RoundController.createNewRound);
router.delete("/:courseId/:lessionId/:roundId", auth_middleware_1.checkAuth, controllers_1.RoundController.deleteRound);
exports.default = router;
