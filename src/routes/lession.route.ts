import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { LessionController } from "../controllers";

const router = express.Router();

router.get(
  "/:courseId/:lessionId",
  checkAuth,
  LessionController.getLessionById
);
router.post("/", checkAuth, LessionController.createNewLession);

export default router;
