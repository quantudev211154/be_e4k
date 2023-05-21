import express from "express";
import { AuthController } from "../controllers";
import { checkAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/checkSSO", AuthController.checkSSO);
router.post("/login", AuthController.login);
router.post("/register", checkAuth, AuthController.register);
router.post("/logout", AuthController.logout);

export default router;
