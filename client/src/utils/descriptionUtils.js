import { formatDate } from "./dateUtils";

export const getWhereDescription = (searchQuery) =>
  searchQuery.location || "I'm flexible";

export const getWhenDescription = (searchQuery) => {
  const { startDate, endDate } = searchQuery;

  if (
    !startDate ||
    !endDate ||
    isNaN(new Date(startDate)) ||
    isNaN(new Date(endDate))
  ) {
    return "Add dates";
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const getWhoDescription = (searchQuery) => {
  const { noOfAdults, noOfChildren, noOfInfants } = searchQuery;

  if (
    (noOfAdults || 0) === 0 &&
    (noOfChildren || 0) === 0 &&
    (noOfInfants || 0) === 0
  ) {
    return "Add guests";
  }

  return `${noOfAdults} ${noOfAdults === 1 ? "adult" : "adults"}, 
          ${noOfChildren} ${noOfChildren === 1 ? "child" : "children"}, 
          ${noOfInfants} ${noOfInfants === 1 ? "infant" : "infants"}`;
};
