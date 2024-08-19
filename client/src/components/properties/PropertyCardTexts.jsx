import { formatCurrency } from "../../utils/currencyUtils";
import { formatDateRangeText } from "../../utils/formatters";

const PropertyCardTexts = ({ property, trip, booking }) => {
  const formattedTripDate = trip
    ? formatDateRangeText({
        startDate: trip?.startDate,
        endDate: trip?.endDate,
      })
    : "";

  const formattedBookingDate = booking
    ? formatDateRangeText({
        startDate: booking?.startDate,
        endDate: booking?.endDate,
      })
    : "";

  const price = trip ? trip?.totalPrice : property?.price;
  const priceText = formatCurrency({ amount: price });
  const nightText = trip || booking ? "" : "night";

  return (
    <figcaption className="flex flex-col gap-1" role="doc-info">
      <h3
        className="truncate"
        id={`property-${property.id}-title`}
        aria-label={`Property located in ${property.city}, ${property.country}`}
      >
        {`${property.city}, ${property.country}`}
      </h3>
      <p
        className="truncate text-sm text-secondary-600"
        aria-label={`Title of the property: ${property.title}`}
      >
        {property.title}
      </p>
      {trip && (
        <p
          className="truncate text-sm text-secondary-600"
          aria-label={`Trip dates from ${formattedTripDate}`}
        >
          {formattedTripDate}
        </p>
      )}
      {booking && (
        <p
          className="truncate text-sm text-secondary-600"
          aria-label={`Booking dates from ${formattedBookingDate}`}
        >
          {formattedBookingDate}
        </p>
      )}
      <p className="text-lg font-semibold">
        {priceText}
        {nightText && (
          <span className="text-sm text-secondary-600"> {nightText}</span>
        )}
      </p>
    </figcaption>
  );
};

export default PropertyCardTexts;
