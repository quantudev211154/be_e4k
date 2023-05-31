"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/search", auth_middleware_1.checkAuth, controllers_1.CourseController.searchCourseByKeyword);
router.get("/", auth_middleware_1.checkAuth, controllers_1.CourseController.getCourseByType);
router.get("/:id", auth_middleware_1.checkAuth, controllers_1.CourseController.getCourseByCourseId);
router.post("/", auth_middleware_1.checkAuth, controllers_1.CourseController.createDraftCourse);
router.put("/", auth_middleware_1.checkAuth, controllers_1.CourseController.editCourse);
router.delete("/:id", auth_middleware_1.checkAuth, controllers_1.CourseController.deleteCourseByCourseId);
exports.default = router;
