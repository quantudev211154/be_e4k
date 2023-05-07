import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { LessionController } from "../controllers";

const router = express.Router();

/**
 *@swagger
 * tags:
 *      name: lession/player
 *      description: Contains all API for lession (PLAYER side)
 */

/**
 * @swagger
 * /lession/player/{courseId}:
 *   get:
 *     summary: Get all lessions by courseId
 *     tags: [lession/player]
 *     description: Player enters phone => check is player exist? => if exist, let's call this API
 *     parameters:
 *        - in: path
 *          name: courseId
 *          schema:
 *            type: string
 *          required: true
 *          description: CourseId
 *     responses:
 *       200:
 *         description: Player info (without password), accessToken, refreshToken
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
 *                      lessions:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                title: string
 *                                example: 64571ef57733e42b4241a925
 *                              title:
 *                                type: string
 *                                example: Chuong test so 1
 *                              description:
 *                                type: string
 *                                example: Test chuong so 1 thoi
 *                              rounds:
 *                                type: array
 *                                items:
 *                                  type: object
 *                                  properties:
 *                                    playType:
 *                                        type: integer
 *                                        example: 1
 *                                    score:
 *                                        type: integer
 *                                        example: 10
 *       500:
 *         description: Missing phone | login for invalid purpose (such as phone was registered as Admin right, but login as player)
 */
router.get(
  "/player/:courseId",
  checkAuth,
  LessionController.getAllLessionByCourseId
);

router.get(
  "/:courseId/:lessionId",
  checkAuth,
  LessionController.getLessionById
);
router.post("/", checkAuth, LessionController.createNewLession);

export default router;
