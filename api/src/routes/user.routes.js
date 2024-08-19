import express from "express";
import {
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controllers.js";
import { verifyAuthToken } from "../middlewares/auth.middleware.js";
import { multerFileUpload } from "../config/multer.config.js";

const router = express.Router();

router.get("/profile", verifyAuthToken, getUserController);
router.put(
  "/:userId",
  verifyAuthToken,
  multerFileUpload.single("image"),
  updateUserController
);
router.delete("/:userId", verifyAuthToken, deleteUserController);

export default router;
