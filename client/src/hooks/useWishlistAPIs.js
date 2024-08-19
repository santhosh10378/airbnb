import { useCallback } from "react";
import { requestData } from "../utils/apiCalls";

const useWishlistAPIs = () => {
  const createWishlist = useCallback(
    async ({
      data,
      successMessage = "Wishlist created successfully!",
      errorMessage = "Failed to create wishlist.",
      multipart = false,
    }) => {
      try {
        const url = "/wishlists";
        return await requestData({
          method: "post",
          url,
          data,
          successMessage,
          errorMessage,
          multipart,
        });
      } catch (error) {
        console.error("Create Wishlist Error:", error);
        throw error;
      }
    },
    []
  );

  const updateWishlist = useCallback(
    async ({
      wishlistId,
      data,
      successMessage = "Wishlist updated successfully!",
      errorMessage = "Failed to update wishlist.",
      multipart = false,
    }) => {
      try {
        const url = `/wishlists/${wishlistId}`;
        return await requestData({
          method: "put",
          url,
          data,
          successMessage,
          errorMessage,
          multipart,
        });
      } catch (error) {
        console.error("Update Wishlist Error:", error);
        throw error;
      }
    },
    []
  );

  const deleteWishlist = useCallback(
    async ({
      wishlistId,
      successMessage = "Wishlist deleted successfully!",
      errorMessage = "Failed to delete wishlist.",
    }) => {
      try {
        const url = `/wishlists/${wishlistId}`;
        return await requestData({
          method: "delete",
          url,
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Delete Wishlist Error:", error);
        throw error;
      }
    },
    []
  );

  const addPropertyToWishlist = useCallback(
    async ({
      wishlistId,
      propertyId,
      successMessage = "Property added to wishlist!",
      errorMessage = "Failed to add property to wishlist.",
    }) => {
      try {
        const url = `/wishlists/${wishlistId}/add-property`;
        return await requestData({
          method: "put",
          url,
          data: { propertyId },
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Add Property to Wishlist Error:", error);
        throw error;
      }
    },
    []
  );

  const removePropertyFromWishlist = useCallback(
    async ({
      wishlistId,
      propertyId,
      successMessage = "Property removed from wishlist!",
      errorMessage = "Failed to remove property from wishlist.",
    }) => {
      try {
        const url = `/wishlists/${wishlistId}/remove-property`;
        return await requestData({
          method: "put",
          url,
          data: { propertyId },
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Remove Property from Wishlist Error:", error);
        throw error;
      }
    },
    []
  );

  return {
    createWishlist,
    updateWishlist,
    deleteWishlist,
    addPropertyToWishlist,
    removePropertyFromWishlist,
  };
};

export default useWishlistAPIs;
