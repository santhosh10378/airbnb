import { useNavigate } from "react-router-dom";
import ImgCarousel from "./ImgCarousel";
import PropertyWishlist from "./PropertyWishlist";
import PropertyCardTexts from "./PropertyCardTexts";

const PropertyCard = ({ property, refetchData, booking, trip, ariaLabel }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <article
      className="w-full flex flex-col gap-2 relative group"
      role="article"
      aria-labelledby={`property-${property.id}-title`}
      aria-label={ariaLabel}
    >
      <div
        onClick={handleCardClick}
        className="rounded-2xl overflow-hidden cursor-pointer transition-all"
        role="button"
        aria-label={`View details for ${property.title}`}
      >
        <ImgCarousel property={property} />
      </div>

      <div className="absolute right-3 top-3">
        <PropertyWishlist property={property} />
      </div>

      <PropertyCardTexts
        property={property}
        refetchData={refetchData}
        booking={booking}
        trip={trip}
      />
    </article>
  );
};

export default PropertyCard;
