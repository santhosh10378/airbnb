import { useCallback } from "react";
import { requestData } from "../utils/apiCalls";

const useBookingAPIs = () => {
  const createBooking = useCallback(
    async ({
      data,
      successMessage = "Booking created successfully!",
      errorMessage = "Failed to create booking.",
      multipart = false,
    }) => {
      try {
        const url = "/bookings";
        return await requestData({
          method: "post",
          url,
          data,
          successMessage,
          errorMessage,
          multipart,
        });
      } catch (error) {
        console.error("Create Booking Error:", error);
        throw error;
      }
    },
    []
  );

  const confirmBooking = useCallback(
    async ({
      id,
      successMessage = "Booking confirmed successfully!",
      errorMessage = "Failed to confirm booking.",
    }) => {
      try {
        const url = `/bookings/${id}/confirm`;
        return await requestData({
          method: "put",
          url,
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Confirm Booking Error:", error);
        throw error;
      }
    },
    []
  );

  const cancelBooking = useCallback(
    async ({
      id,
      successMessage = "Booking canceled successfully!",
      errorMessage = "Failed to cancel booking.",
    }) => {
      try {
        const url = `/bookings/${id}/cancel`;
        return await requestData({
          method: "put",
          url,
          successMessage,
          errorMessage,
        });
      } catch (error) {
        console.error("Cancel Booking Error:", error);
        throw error;
      }
    },
    []
  );

  return {
    createBooking,
    confirmBooking,
    cancelBooking,
  };
};

export default useBookingAPIs;
