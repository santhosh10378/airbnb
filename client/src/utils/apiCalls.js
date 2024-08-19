import { toast } from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

const authToken = localStorage.getItem("authToken");

export const requestData = async ({
  method,
  url,
  data,
  successMessage = "Success",
  errorMessage = "Something went wrong!",
  multipart = false,
  toastNotify = true,
}) => {
  try {
    const options = {
      headers: {
        "Content-Type": multipart ? "multipart/form-data" : "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    let res;
    switch (method) {
      case "get":
        res = await axiosInstance.get(url);
        break;
      case "post":
        res = await axiosInstance.post(url, data, options);
        break;
      case "put":
        res = await axiosInstance.put(url, data, options);
        break;
      case "delete":
        res = await axiosInstance.delete(url, { data, ...options });
        break;
      default:
        throw new Error("Invalid method");
    }
    toastNotify && toast.success(successMessage);
    return res;
  } catch (err) {
    console.error(`Error with ${method.toUpperCase()} request:`, err);

    toastNotify && toast.error(errorMessage);

    throw err;
  }
};
