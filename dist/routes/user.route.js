"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.checkAuth, controllers_1.UserController.getAllUsers);
router.get("/search", auth_middleware_1.checkAuth, controllers_1.UserController.searchUserByNameOrPhone);
router.get("/:phone", auth_middleware_1.checkAuth, controllers_1.UserController.findUserByPhone);
router.post("/", auth_middleware_1.checkAuth, controllers_1.UserController.register);
router.put("/", auth_middleware_1.checkAuth, controllers_1.UserController.updateUserInfo);
router.delete("/:id", auth_middleware_1.checkAuth, controllers_1.UserController.deleteUser);
exports.default = router;
