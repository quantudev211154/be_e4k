import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { DiaryController } from "../controllers";

const router = express.Router();

export default router;
