import express from "express";
import {
  createWishlistController,
  getWishlistController,
  updateWishlistController,
  deleteWishlistController,
  addPropertyToWishlistController,
  removePropertyFromWishlistController,
  getAllWishlistsController,
} from "../controllers/wishlist.controllers.js";
import { verifyAuthToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAuthToken, createWishlistController);
router.get("/", verifyAuthToken, getAllWishlistsController);
router.get("/:wishlistId", verifyAuthToken, getWishlistController);
router.put("/:wishlistId", verifyAuthToken, updateWishlistController);
router.delete("/:wishlistId", verifyAuthToken, deleteWishlistController);
router.put(
  "/:wishlistId/add-property",
  verifyAuthToken,
  addPropertyToWishlistController
);
router.put(
  "/:wishlistId/remove-property",
  verifyAuthToken,
  removePropertyFromWishlistController
);

export default router;
