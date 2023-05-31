"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.checkAuth, controllers_1.TestBankController.getAllTests);
router.post("/", auth_middleware_1.checkAuth, controllers_1.TestBankController.createNewTest);
exports.default = router;
