import express from "express";
import { PublicController } from "../controllers";

const router = express.Router();

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
 *     summary: Get
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
 *       500:
 *         description: Missing phone or username | Phone was used by another player
 */
router.get("/player/search", PublicController.searchUserByPhone);

export default router;
