import { formatDate } from "./dateUtils";

export const formatCount = (count, singularTerm, pluralTerm) => {
  if (count === 0) return "";
  return `${count} ${count > 1 ? pluralTerm : singularTerm}`;
};

export const formatDateRangeText = ({ startDate, endDate }) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start === "Invalid date" || end === "Invalid date") {
    return "Invalid date range";
  }

  return `${start} - ${end}`;
};
