import { useCallback } from "react";
import { requestData } from "../utils/apiCalls";

const usePropertyAPIs = () => {
  const createProperty = useCallback(
    async ({
      data,
      successMessage = "Property created successfully!",
      errorMessage = "Failed to create property.",
      multipart = true,
    }) => {
      try {
        const url = "/properties";
        return await requestData({
          method: "post",
          url,
          data,
          successMessage,
          errorMessage,
          multipart,
        });
      } catch (error) {
        console.error("Create Property Error:", error);
        throw error;
      }
    },
    []
  );

  const updateProperty = useCallback(
    async ({
      id,
      data,
      successMessage = "Property updated successfully!",
      errorMessage = "Failed to update property.",
      multipart = true,
    }) => {
      try {
        const url = `/properties/${id}`;
        return await requestData({
          method: "put",
          url,
          data,
          successMessage,
          errorMessage,
          multipart,
        });
      } catch (error) {
        console.error("Update Property Error:", error);
        throw error;
      }
    },
    []
  );

  const deleteProperty = useCallback(
    async ({
      id,
      successMessage = "Property deleted successfully!",
      errorMessage = "Failed to delete property.",
    }) => {
      try {
        const url = `/properties/${id}`;
        return await requestData({
          method: "delete",
          url,
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Delete Property Error:", error);
        throw error;
      }
    },
    []
  );

  return {
    createProperty,
    updateProperty,
    deleteProperty,
  };
};

export default usePropertyAPIs;
