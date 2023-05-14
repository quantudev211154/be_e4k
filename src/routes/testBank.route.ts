import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { TestBankController } from "../controllers";

const router = express.Router();

router.post("/admin", checkAuth, TestBankController.addTestToTestBank);

export default router;
