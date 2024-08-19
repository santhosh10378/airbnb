import { formatCount } from "../../utils/formatters";

const PropertyCounts = ({ property }) => {
  const guestDescription = formatCount(
    property?.noOfGuests ?? 0,
    "guest",
    "guests"
  );
  const bedroomDescription = formatCount(
    property?.noOfBedrooms ?? 0,
    "bedroom",
    "bedrooms"
  );
  const bedDescription = formatCount(property?.noOfBeds ?? 0, "bed", "beds");
  const bathroomDescription = formatCount(
    property?.noOfBathrooms ?? 0,
    "bathroom",
    "bathrooms"
  );

  return (
    <ul
      className="flex items-center gap-1 text-secondary-600"
      role="list"
      aria-label="Property features"
    >
      {bedroomDescription && (
        <li aria-label={bedroomDescription}>{`${bedroomDescription} •`}</li>
      )}
      {bedDescription && (
        <li aria-label={bedDescription}>{`${bedDescription} •`}</li>
      )}
      {bathroomDescription && (
        <li aria-label={bathroomDescription}>{`${bathroomDescription} •`}</li>
      )}
      {guestDescription && (
        <li aria-label={guestDescription}> {`${guestDescription}`}</li>
      )}
    </ul>
  );
};

export default PropertyCounts;
