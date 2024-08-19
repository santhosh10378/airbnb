import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const baseURL = `${backendURL}/api`;
const authToken = localStorage.getItem("authToken");

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});
