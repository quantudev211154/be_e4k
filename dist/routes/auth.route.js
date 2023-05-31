"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/checkSSO", controllers_1.AuthController.checkSSO);
router.post("/login", controllers_1.AuthController.login);
router.post("/register", auth_middleware_1.checkAuth, controllers_1.AuthController.register);
router.post("/logout", controllers_1.AuthController.logout);
exports.default = router;
