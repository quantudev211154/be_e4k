import express from "express";
import { AuthController } from "../controllers";

/**
 *@swagger
 * tags:
 *      name: auth/admin
 *      description: Contains all authentication route for ADMIN (login, register, logout)
 */

const router = express.Router();

/**
 * For admin side
 */
router.post("/admin/login", AuthController.loginForAdmin);
router.post("/admin/register", AuthController.registerForAdmin);
router.post("/admin/logout", AuthController.logoutForAdmin);

/**
 *@swagger
 * tags:
 *      name: auth/player
 *      description: Contains all authentication route for PLAYER (login, register, logout)
 */

/**
 * @swagger
 * /auth/player/login:
 *   post:
 *     summary: Login for player
 *     tags: [auth/player]
 *     description: Player enters phone => check is player exist? => if exist, let's call this API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone of player.
 *                 example: '0358434916'
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
 *                   description: Player info
 *                   properties:
 *                      _id:
 *                          type: string
 *                          example: 644ea83e19b58c0a59a4e788
 *                      phone:
 *                          type: string
 *                          example: 0358434916
 *                      username:
 *                          type: string
 *                          example: Test player
 *                      weeklyScore:
 *                          type: integer
 *                          example: 0
 *                      level:
 *                          type: integer
 *                          example: 0
 *                      tokenVersion:
 *                          type: integer
 *                          example: 0
 *                      role:
 *                          type: string
 *                          example: PLAYER
 *                      registerDate:
 *                          type: Date
 *                          example: 2023-04-30T17:41:18.167Z
 *                      updatedAt:
 *                          type: Date
 *                          example: 2023-04-30T18:11:51.673Z
 *                 accessToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *                 refreshToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwidG9rZW5WZXJzaW9uIjoyLCJpYXQiOjE2ODI4Nzg4MDgsImV4cCI6MTY4MzEzODAwOH0.v-GbmDFFev-rAz8TWZfo4zFX1nJn6Tzl4wiaerKUOYA.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *       500:
 *         description: Missing phone | login for invalid purpose (such as phone was registered as Admin right, but login as player)
 */
router.post("/player/login", AuthController.loginForPlayer);

/**
 * @swagger
 * /auth/player/register:
 *   post:
 *     summary: Register new account for new player
 *     tags: [auth/player]
 *     description: Let's make user enter phone and username => call this API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone of new player.
 *                 example: '0358434920'
 *               username:
 *                 type: string
 *                 description: The username of new player.
 *                 example: User test GGG
 *     responses:
 *       200:
 *         description: New player info (without password), accessToken, refreshToken
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
 *                   description: Player info
 *                   properties:
 *                      _id:
 *                          type: string
 *                          example: 644ea83e19b58c0a59a4e788
 *                      phone:
 *                          type: string
 *                          example: 0358434916
 *                      username:
 *                          type: string
 *                          example: Test player
 *                      weeklyScore:
 *                          type: integer
 *                          example: 0
 *                      level:
 *                          type: integer
 *                          example: 0
 *                      tokenVersion:
 *                          type: integer
 *                          example: 0
 *                      role:
 *                          type: string
 *                          example: PLAYER
 *                      registerDate:
 *                          type: Date
 *                          example: 2023-04-30T17:41:18.167Z
 *                      updatedAt:
 *                          type: Date
 *                          example: 2023-04-30T18:11:51.673Z
 *                 accessToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *                 refreshToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwidG9rZW5WZXJzaW9uIjoyLCJpYXQiOjE2ODI4Nzg4MDgsImV4cCI6MTY4MzEzODAwOH0.v-GbmDFFev-rAz8TWZfo4zFX1nJn6Tzl4wiaerKUOYA.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *       500:
 *         description: Missing phone or username | Phone was used by another player
 */
router.post("/player/register", AuthController.registerForPlayer);

/**
 * @swagger
 * /auth/player/logout:
 *   post:
 *     summary: Logout user
 *     tags: [auth/player]
 *     description: Create token to upper one and reject all token request with token.tokenVersion != player.tokenVersion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The id of player
 *                 example: '644ea83e19b58c0a59a4e788'
 *     responses:
 *       200:
 *         description: Player's logout status
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
 *                   description: Player info
 *                   properties:
 *                      _id:
 *                          type: string
 *                          example: 644ea83e19b58c0a59a4e788
 *                      phone:
 *                          type: string
 *                          example: 0358434916
 *                      username:
 *                          type: string
 *                          example: Test player
 *                      weeklyScore:
 *                          type: integer
 *                          example: 0
 *                      level:
 *                          type: integer
 *                          example: 0
 *                      tokenVersion:
 *                          type: integer
 *                          example: 0
 *                      role:
 *                          type: string
 *                          example: PLAYER
 *                      registerDate:
 *                          type: Date
 *                          example: 2023-04-30T17:41:18.167Z
 *                      updatedAt:
 *                          type: Date
 *                          example: 2023-04-30T18:11:51.673Z
 *                 accessToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *                 refreshToken:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwidG9rZW5WZXJzaW9uIjoyLCJpYXQiOjE2ODI4Nzg4MDgsImV4cCI6MTY4MzEzODAwOH0.v-GbmDFFev-rAz8TWZfo4zFX1nJn6Tzl4wiaerKUOYA.eyJ1c2VySWQiOiI2NDRlYTgzZTE5YjU4YzBhNTlhNGU3ODgiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNjgyODc4ODA4LCJleHAiOjE2ODI4ODA2MDh9.9uiHTAYLtKjcYJPjtA5stSGKNXwnScDJvMOMnYW2u74
 *       500:
 *         description: Missing phone or username | Phone was used by another player
 */
router.post("/player/logout", AuthController.logoutForPlayer);

export default router;
