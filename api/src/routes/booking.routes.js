import express from "express";
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  confirmBookingController,
  cancelBookingController,
} from "../controllers/booking.controllers.js";
import { verifyAuthToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAuthToken, createBookingController);
router.get("/", getBookingsController);
router.get("/:id", verifyAuthToken, getBookingByIdController);
router.put("/:id/confirm", verifyAuthToken, confirmBookingController);
router.put("/:id/cancel", verifyAuthToken, cancelBookingController);

export default router;
