// Formats a date according to the specified locale and options
export const formatDate = (date, locale = "en-US", options = {}) => {
  if (!date) return "Invalid date";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date passed to formatDate:", date);
    return "Invalid date";
  }

  // Default formatting options if none are provided
  const defaultOptions = { year: "numeric", month: "short", day: "numeric" };

  // Merge default options with custom options
  const formatOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat(locale, formatOptions).format(parsedDate);
};

// Calculates the number of days between two dates
export const calculateDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = end - start;
  const daysDifference = differenceInMilliseconds / millisecondsPerDay;

  return Math.round(daysDifference);
};

// Calculates the absolute difference in days between two dates
export const getAbsoluteDaysDifference = (date1, date2) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const timeDifference = Math.abs(endDate - startDate);
  const daysDifference = Math.ceil(timeDifference / millisecondsPerDay);

  return daysDifference;
};

// Resets the date range to start from today and end on the following day
export const initializeDateRange = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return { startDate: today, endDate: tomorrow };
};

// Generates an array of all dates between two given dates
export const generateDateRangeArray = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dates = [];

  for (
    let current = start;
    current <= end;
    current.setDate(current.getDate() + 1)
  ) {
    dates.push(new Date(current));
  }

  return dates;
};

export const findNextAvailableDate = (unavailableDates) => {
  let currentDate = new Date();

  while (isDateUnavailable(currentDate, unavailableDates)) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return currentDate;
};

export const isDateUnavailable = (date, unavailableDates) => {
  return unavailableDates.some(
    (unavailableDate) => unavailableDate.toDateString() === date.toDateString()
  );
};

export const getNextDay = (today) => {
  let nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  return nextDay;
};
