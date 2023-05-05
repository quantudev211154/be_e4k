import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { CourseController } from "../controllers";

const router = express.Router();

router.get("/", checkAuth, CourseController.getAllCourse);
router.get("/:id", checkAuth, CourseController.getCourseByCourseId);
router.post("/", checkAuth, CourseController.createDraftCourse);
router.put("/", checkAuth, CourseController.editCourse);
router.delete("/:id", checkAuth, CourseController.deleteCourseByCourseId);

export default router;
