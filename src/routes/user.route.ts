import express from "express";
import { UserController } from "../controllers";
import { checkAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", checkAuth, UserController.getAllUsers);
router.get("/search", checkAuth, UserController.searchUserByNameOrPhone);
router.get("/:phone", checkAuth, UserController.findUserByPhone);
router.post("/", checkAuth, UserController.register);
router.put("/change-pwd", checkAuth, UserController.changePassword);
router.put("/", checkAuth, UserController.updateUserInfo);
router.delete("/:id", checkAuth, UserController.deleteUser);

export default router;
