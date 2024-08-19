import { createError } from "../utils/createError.js";
import { prisma } from "../config/prisma.config.js";
import { getImagesFromS3 } from "../utils/fileUtils.js";

export const authorizeBookingUser = (userId, tokenUserId, hostId) => {
  const isBookingUser = userId === tokenUserId;
  const isBookingHost = hostId === tokenUserId;
  return { isBookingUser, isBookingHost };
};

export const authorizeBookingUserOrHost = (booking, tokenUserId, property) => {
  const { isBookingUser, isBookingHost } = authorizeBookingUser(
    booking.userId,
    tokenUserId,
    property.hostId
  );

  if (!isBookingUser && !isBookingHost) {
    throw createError(403, "Unauthorized");
  }
};

export const validateBookingData = (data) => {
  const {
    propertyId,
    startDate,
    endDate,
    totalPrice,
    nightlyPrice,
    userId,
    currency,
  } = data;

  if (
    !userId &&
    !propertyId &&
    !startDate &&
    !endDate &&
    !totalPrice &&
    !nightlyPrice &&
    !currency
  ) {
    throw createError(400, "Missing required fields");
  }

  if (isNaN(totalPrice) || isNaN(nightlyPrice)) {
    throw createError(400, "Price values must be numbers");
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw createError(400, "End date must be after start date");
  }
};

export const buildBookingWhereClause = (query) => {
  const {
    userId,
    hostId,
    propertyId,
    isApproved,
    isCancelled,
    availableDates,
  } = query;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  } else if (hostId) {
    whereClause.property = { hostId: hostId };
  }

  if (propertyId) {
    whereClause.propertyId = propertyId;

    if (availableDates) {
      whereClause.AND = [
        {
          OR: [
            // Include dates from approved and not cancelled bookings
            { AND: [{ isApproved: true }, { isCancelled: false }] },
            // Include dates from not approved and not cancelled bookings
            { AND: [{ isApproved: false }, { isCancelled: false }] },
          ],
        },
      ];
    }
  }

  if (isApproved !== undefined) {
    whereClause.isApproved = isApproved;
  }

  if (isCancelled !== undefined) {
    whereClause.isCancelled = isCancelled;
  }

  return whereClause;
};

export const createBooking = async (data) => {
  try {
    validateBookingData(data);
    const booking = await prisma.booking.create({
      data,
    });
    return booking;
  } catch (error) {
    throw createError(500, `Failed to create booking - ${error?.message}`);
  }
};

export const getBookings = async (whereClause) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: {
        startDate: "asc",
      },
      include: {
        property: true,
      },
    });

    const processedBookings = await Promise.all(
      bookings.map(async (booking) => {
        if (booking.property?.images?.length > 0) {
          booking.property.images = await getImagesFromS3(
            booking.property.images
          );
        }
        return booking;
      })
    );

    return processedBookings;
  } catch (error) {
    throw createError(500, `Failed to get bookings - ${error?.message}`);
  }
};

export const getBookingById = async (id) => {
  if (!id) {
    throw createError(400, "Booking ID is required");
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });

    if (!booking) {
      throw createError(404, "Booking not found");
    }

    return booking;
  } catch (error) {
    throw createError(500, `Failed to get booking by ID - ${error?.message}`);
  }
};

export const confirmBookingById = async (id, tokenUserId) => {
  try {
    const booking = await getBookingById(id);

    const { isBookingHost } = authorizeBookingUser(
      booking.userId,
      tokenUserId,
      booking.property.hostId
    );

    if (!isBookingHost) {
      throw createError(403, "Unauthorized");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });

    return updatedBooking;
  } catch (error) {
    throw createError(500, `Failed to confirm booking - ${error?.message}`);
  }
};

export const cancelBookingById = async (id, tokenUserId) => {
  try {
    const booking = await getBookingById(id);

    authorizeBookingUserOrHost(booking, tokenUserId, booking.property);

    const canceldBooking = await prisma.booking.update({
      where: { id },
      data: {
        isCancelled: true,
      },
    });
    return canceldBooking;
  } catch (error) {
    throw createError(500, `Failed to delete booking - ${error?.message}`);
  }
};
