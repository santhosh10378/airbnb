import {
  registerUser,
  authenticateUser,
  generateAuthToken,
  setAuthTokenCookie,
  clearAuthTokenCookie,
} from "../services/auth.services.js";
import { createError } from "../utils/createError.js";

export const signUp = async (req, res, next) => {
  const { email, password, firstName } = req.body;

  if (!email || !password || !firstName) {
    return next(
      createError(400, "Email, password, and firstName are required")
    );
  }

  try {
    const userWithoutPassword = await registerUser(email, password, firstName);
    const authToken = generateAuthToken(userWithoutPassword.id);

    setAuthTokenCookie(res, authToken);
    res.status(201).json({
      message: "Sign-up successful",
      user: userWithoutPassword,
      authToken,
    });
  } catch (error) {
    next(createError(500, `Failed to sign up - ${error?.message}`));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "Email and password are required"));
  }

  try {
    const userWithoutPassword = await authenticateUser(email, password);
    const authToken = generateAuthToken(userWithoutPassword.id);

    setAuthTokenCookie(res, authToken);
    res
      .status(200)
      .json({
        message: "Sign-in successful",
        user: userWithoutPassword,
        authToken,
      });
  } catch (error) {
    next(createError(500, `Failed to sign in - ${error?.message}`));
  }
};

export const signOut = async (req, res, next) => {
  try {
    clearAuthTokenCookie(res);
    res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    next(createError(500, `Failed to sign out - ${error?.message}`));
  }
};
