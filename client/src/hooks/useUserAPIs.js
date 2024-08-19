import { useCallback } from "react";
import { requestData } from "../utils/apiCalls";

const useUserAPIs = () => {
  const createUser = useCallback(
    async ({
      data,
      successMessage = "Registered successfully!",
      errorMessage = "Failed to Register.",
      multipart = false,
    }) => {
      const url = `/users`;
      return await requestData({
        method: "post",
        url,
        data,
        successMessage,
        errorMessage,
        multipart,
      });
    },
    []
  );

  const authenticateUser = useCallback(
    async ({
      data,
      successMessage = "Logged in!",
      errorMessage = "Failed to Login",
    }) => {
      const url = `/auth/sign-in`;
      return await requestData({
        method: "post",
        url,
        data,
        successMessage,
        errorMessage,
      });
    },
    []
  );

  const disauthenticateUser = useCallback(
    async ({
      successMessage = "Logged out",
      errorMessage = "Failed to log out user.",
    }) => {
      const url = `/auth/sign-out`;
      return await requestData({
        method: "post",
        url,
        successMessage,
        errorMessage,
      });
    },
    []
  );

  const updateUser = useCallback(
    async ({
      userId,
      data,
      successMessage = "User updated successfully!",
      errorMessage = "Failed to update user.",
      multipart = false,
    }) => {
      const url = `/users/${userId}`;
      return await requestData({
        method: "put",
        url,
        data,
        successMessage,
        errorMessage,
        multipart,
      });
    },
    []
  );

  const deleteUser = useCallback(
    async ({
      userId,
      successMessage = "User deleted successfully!",
      errorMessage = "Failed to delete user.",
    }) => {
      const url = `/users/${userId}`;
      return await requestData({
        method: "delete",
        url,
        successMessage,
        errorMessage,
      });
    },
    []
  );

  return {
    createUser,
    authenticateUser,
    disauthenticateUser,
    updateUser,
    deleteUser,
  };
};

export default useUserAPIs;
