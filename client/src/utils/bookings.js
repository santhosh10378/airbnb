import { calculateDaysBetween, generateDateRangeArray } from "./dateUtils";

export const getBookingDetails = (guestInfo, property, dates) => {
  const { startDate, endDate } = dates;
  const {
    noOfAdults = 0,
    noOfChildren = 0,
    noOfInfants = 0,
    extraAdultGuests = 0,
    extraChildGuests = 0,
  } = guestInfo;

  const dayDifference = calculateDaysBetween(startDate, endDate);

  const totalGuests = noOfAdults + noOfChildren + noOfInfants;
  const totalExtraGuests = extraAdultGuests + extraChildGuests;

  const basePrice = dayDifference * (property?.price ?? 0);
  const extraCharges = totalExtraGuests * (property?.extraGuestCharge ?? 0);
  const totalPrice = basePrice + extraCharges;

  return {
    dayDifference,
    totalGuests,
    totalExtraGuests,
    basePrice,
    extraCharges,
    totalPrice,
    startDate,
    endDate,
  };
};

export const getBookingUnavailableDates = (bookings) => {
  return bookings.flatMap(({ startDate, endDate }) =>
    generateDateRangeArray(startDate, endDate)
  );
};

export const getBookingAvailableDates = (allUnavailableDates) => {
  let firstAvailableDate = new Date();
  let secondAvailableDate = new Date(firstAvailableDate);

  // Find the first available date
  for (let i = 0; i < allUnavailableDates.length; i++) {
    if (
      allUnavailableDates.some(
        (date) => date.toDateString() === firstAvailableDate.toDateString()
      )
    ) {
      firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);
      i = -1; // Restart the loop to check the new date
    }
  }

  secondAvailableDate.setDate(firstAvailableDate.getDate() + 1);

  // Find the second available date
  for (let i = 0; i < allUnavailableDates.length; i++) {
    if (
      allUnavailableDates.some(
        (date) => date.toDateString() === secondAvailableDate.toDateString()
      ) ||
      generateDateRangeArray(firstAvailableDate, secondAvailableDate).some(
        (date) =>
          allUnavailableDates.some(
            (unavailableDate) =>
              unavailableDate.toDateString() === date.toDateString()
          )
      )
    ) {
      firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);
      secondAvailableDate.setDate(firstAvailableDate.getDate() + 1);
      i = -1; // Restart the loop to check the new date range
    }
  }

  return { firstAvailableDate, secondAvailableDate };
};
