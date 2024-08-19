import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import useUserAPIs from "../hooks/useUserAPIs";
import { axiosInstance } from "../config/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { createUser, authenticateUser, disauthenticateUser } = useUserAPIs();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/users/profile");
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user data", err);
      setError("Failed to fetch user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(
    async (credentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await createUser({
          data: credentials,
        });
        localStorage.setItem("authToken", response.data.authToken);
        fetchUser();
      } catch (err) {
        setError("Registration failed");
      } finally {
        setLoading(false);
      }
    },
    [createUser, fetchUser]
  );

  const loginUser = useCallback(
    async (credentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticateUser({
          data: credentials,
          successMessage: "Logged in successfully!",
          errorMessage: "Login failed",
        });
        localStorage.setItem("authToken", response.data.authToken);
        fetchUser();
      } catch (err) {
        setError("Login failed");
      } finally {
        setLoading(false);
      }
    },
    [authenticateUser, fetchUser]
  );

  const logoutUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await disauthenticateUser({
        successMessage: "Logged out successfully!",
        errorMessage: "Logout failed",
      });
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  }, [disauthenticateUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
