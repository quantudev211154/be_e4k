import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { WordController } from "../controllers";

const router = express.Router();

router.get("/", checkAuth, WordController.getAllWords);
router.get("/:wordId", checkAuth, WordController.getWordById);
router.post("/", checkAuth, WordController.addNewWord);
router.post("/search", checkAuth, WordController.searchWordsByKeyWord);
router.put("/:wordId", checkAuth, WordController.updateWord);

export default router;
