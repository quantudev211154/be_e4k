import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { TestBankController } from "../controllers";

const router = express.Router();

router.get("/:id", checkAuth, TestBankController.getTestById);
router.get("/", checkAuth, TestBankController.getAllTests);
router.get(
  "/search/:question",
  checkAuth,
  TestBankController.findTestByQuestion
);
router.post("/", checkAuth, TestBankController.createNewTest);
router.delete("/:id", checkAuth, TestBankController.deleteTestById);

export default router;
