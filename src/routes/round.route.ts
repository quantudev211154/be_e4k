import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { RoundController } from "../controllers";

const router = express.Router();

router.get("/", checkAuth, RoundController.getAllRoundsByCourseIdAndLessionId);
router.get("/:courseId/:lessionId/:roundId", RoundController.getRoundByRoundId);
router.post("/:courseId/:lessionId", checkAuth, RoundController.createNewRound);
router.delete(
  "/:courseId/:lessionId/:roundId",
  checkAuth,
  RoundController.deleteRound
);

export default router;
