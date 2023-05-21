import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { TestBankController } from "../controllers";

const router = express.Router();

router.get("/", checkAuth, TestBankController.getAllTests);
router.post("/", checkAuth, TestBankController.createNewTest);

export default router;
