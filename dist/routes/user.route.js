"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/admin/:phone", auth_middleware_1.checkAuth, controllers_1.UserController.findPlayerByPhone);
router.post("/admin/", auth_middleware_1.checkAuth, controllers_1.UserController.register);
router.put("/admin", auth_middleware_1.checkAuth, controllers_1.UserController.updateUserInfo);
/**
 *@swagger
 * tags:
 *      name: user/player
 *      description: Contains all PUBLIC routes that player side (android version) can use
 */
/**
 * @swagger
 * /user/player:
 *   put:
 *     summary: Update username for player
 *     tags: [user/player]
 *     description: Call this API to update username (must provide accessToken)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username of player
 *                 example: 'Quan Tu HEHEHE'
 *     responses:
 *       200:
 *         description: User info updated
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
 *                      updatedUser:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 644ea83e19b58c0a59a4e788
 *                              phone:
 *                                  type: string
 *                                  example: '0358434916'
 *                              username:
 *                                  type: string
 *                                  example: Pham Quan Tu HIHIHI
 *                              weeklyScore:
 *                                  type: integer
 *                                  example: 0
 *                              registerDate:
 *                                  type: Date
 *                                  example: 2023-04-30T17:41:18.167Z
 *                              golds:
 *                                  type: integer
 *                                  example: 0
 *                              hearts:
 *                                  type: integer
 *                                  example: 0
 *       500:
 *         description: Missing username or userId | Phone was used by another player
 */
router.put("/player", auth_middleware_1.checkAuth, controllers_1.UserController.updateUsernameForPlayer);
exports.default = router;
