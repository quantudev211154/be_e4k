import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { RoundController } from "../controllers";

const router = express.Router();

router.post("/:courseId/:lessionId", checkAuth, RoundController.createNewRound);

export default router;
