import express from "express";
import { UserController } from "../controllers";
import { checkAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:phone", checkAuth, UserController.findPlayerByPhone);
router.post("/", checkAuth, UserController.register);
router.put("/", checkAuth, UserController.updateUserInfo);

export default router;
