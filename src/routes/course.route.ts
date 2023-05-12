import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { CourseController } from "../controllers";

const router = express.Router();

/**
 *@swagger
 * tags:
 *      name: course/player
 *      description: Contains all API for course (PLAYER side)
 */

/**
 * @swagger
 * /course/player:
 *   get:
 *     summary: Get all course (without lession)
 *     tags: [course/player]
 *     description: Call this API (must provide accessToken)
 *     responses:
 *       200:
 *         description: All published course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status from server
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 64571ee67733e42b4241a91f
 *                                  title:
 *                                      type: string
 *                                      example: Test 1
 *                                  description:
 *                                      type: string
 *                                      example: hoa hoc de test thoi
 *                                  createdAt:
 *                                      type: Date
 *                                      example: 2023-05-07T03:45:42.746Z
 *                                  currentLevel:
 *                                      type: integer
 *                                      example: 0
 *                                  totalLevel:
 *                                      type: integer
 *                                      example: 1
 *       500:
 *         description: Missing phone or username | Phone was used by another player
 */
router.get("/player", checkAuth, CourseController.getAllCourseForPlayer);

router.get(
  "/search",
  checkAuth,
  CourseController.searchCourseByKeywordForAdmin
);
router.get("/", checkAuth, CourseController.getCourseByTypeForAdmin);
router.get("/:id", checkAuth, CourseController.getCourseByCourseId);
router.post("/", checkAuth, CourseController.createDraftCourse);
router.put("/", checkAuth, CourseController.editCourseForAdmin);
router.delete("/:id", checkAuth, CourseController.deleteCourseByCourseId);

export default router;
