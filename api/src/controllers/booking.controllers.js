import {
  createBooking,
  getBookings,
  getBookingById,
  buildBookingWhereClause,
  confirmBookingById,
  cancelBookingById,
} from "../services/booking.services.js";
import { createError } from "../utils/createError.js";

export const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBooking({ ...req.body, userId: req.user.id });
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    next(createError(500, `Failed to create booking - ${error?.message}`));
  }
};

export const getBookingsController = async (req, res, next) => {
  try {
    const whereClause = buildBookingWhereClause(req.query);
    const bookings = await getBookings(whereClause);
    res.status(200).json(bookings);
  } catch (error) {
    next(createError(500, `Failed to retrieve bookings - ${error?.message}`));
  }
};

export const getBookingByIdController = async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    next(createError(500, `Failed to retrieve booking - ${error?.message}`));
  }
};

export const confirmBookingController = async (req, res, next) => {
  try {
    const booking = await confirmBookingById(req.params.id, req.user.id);
    res
      .status(200)
      .json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    next(createError(500, `Failed to confirm booking - ${error?.message}`));
  }
};

export const cancelBookingController = async (req, res, next) => {
  try {
    const booking = await cancelBookingById(req.params.id, req.user.id);
    res
      .status(200)
      .json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    next(createError(500, `Failed to confirm booking - ${error?.message}`));
  }
};
