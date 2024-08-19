import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import Button from "../elements/Button";
import useWishlistAPIs from "../../hooks/useWishlistAPIs";
import WishlistCard from "../wishlists/WishlistCard";

const CreateFavoriteForm = () => {
  const { fetchUser, user } = useAuth();
  const { closeModal, openModal, setModalContent, modalContent } = useModal();
  const { addPropertyToWishlist } = useWishlistAPIs({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createFav = async (wishlistId) => {
    if (!modalContent?.propertyId) return;

    setLoading(true);
    setError("");

    try {
      await addPropertyToWishlist({
        propertyId: modalContent.propertyId,
        wishlistId,
      });

      closeModal();
      await fetchUser();
    } catch (error) {
      setError("Failed to add property to wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 h-[84vh] md:h-[280px] overflow-y-auto p-5 border-y">
        {user?.wishlists?.length ? (
          user.wishlists.map((wishlist) => (
            <div
              key={wishlist.id}
              onClick={() => createFav(wishlist.id)}
              role="button"
              aria-label={`Add to ${wishlist.name} wishlist`}
              className="cursor-pointer"
            >
              <WishlistCard wishlist={wishlist} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No wishlists available.</p>
        )}
      </div>

      <div className="p-3">
        <Button
          onClick={() => {
            openModal("CreateWishListModal");
            setModalContent(modalContent);
          }}
          variant="secondary-gradient"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create new wishlist"}
        </Button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateFavoriteForm;
