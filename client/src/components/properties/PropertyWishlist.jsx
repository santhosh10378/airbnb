import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import useWishlistAPIs from "../../hooks/useWishlistAPIs";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { HeartIcon } from "../../assets";

const PropertyWishlist = ({ property }) => {
  const { user, fetchUser } = useAuth();
  const { openModal, setModalContent } = useModal();
  const [isFavorited, setIsFavorited] = useState(false);

  const { removePropertyFromWishlist } = useWishlistAPIs();

  const handleWishlistClick = async (event) => {
    event.stopPropagation();

    if (!user) {
      openModal("LoginModal");
      return;
    }

    if (isFavorited) {
      const wishlistId = user.wishlists.find((wishlist) =>
        wishlist.propertyIds.includes(property?.id)
      )?.id;

      if (wishlistId) {
        await removePropertyFromWishlist({
          wishlistId,
          propertyId: property.id,
        });
        await fetchUser();
      }
    } else {
      setModalContent({ propertyId: property?.id });
      openModal("CreateFavoriteModal");
    }
  };

  const favoriteColor = isFavorited ? "#FF385C" : "rgb(0 0 0 / 0.4)";

  useEffect(() => {
    const userFavorites =
      user?.wishlists?.flatMap((wishlist) => wishlist.propertyIds) || [];
    setIsFavorited(userFavorites.includes(property?.id));
  }, [user?.wishlists, property?.id]);

  return (
    <div
      onClick={handleWishlistClick}
      className="cursor-pointer hover:scale-110 transition-all"
      aria-label={`Add or remove ${property?.title} from wishlist`}
    >
      <HeartIcon
        className={twMerge("size-6 text-white")}
        fill={favoriteColor}
      />
    </div>
  );
};

export default PropertyWishlist;
