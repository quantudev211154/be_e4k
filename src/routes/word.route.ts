import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { WordController } from "../controllers";

const router = express.Router();

router.get("/", checkAuth, WordController.getAllWords);
router.post("/", checkAuth, WordController.addNewWord);

export default router;
