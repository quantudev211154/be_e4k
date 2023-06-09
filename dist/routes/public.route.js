"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
/**
 * For admin side
 */
/**
 *@swagger
 * tags:
 *      name: public/player
 *      description: Contains all PUBLIC routes that player side (android version) can use
 */
/**
 * @swagger
 * /public/player/search?phone={phone}:
 *   get:
 *     summary: Get some info of user
 *     tags: [public/player]
 *     description: Get _id, phone, username of player but no need to login (no need token)
 *     parameters:
 *         - in: path
 *           name: phone
 *           schema:
 *              type: string
 *           required: true
 *           description: The phone number of player
 *           example: '0358434916'
 *     responses:
 *       200:
 *         description: Some basic info of player
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
 *                   description: Player basic info
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
 *       403:
 *         description: Phone was registered for ADMIN role, but API calls check user API for PLAYER role
 *       500:
 *         description: Missing phone or username | Phone was used by another player
 */
router.get("/player/search", controllers_1.PublicController.searchUserByPhone);
exports.default = router;
