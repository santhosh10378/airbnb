import { createUser, getUserByEmail } from "../services/user.services.js";
import {
  comparePasswords,
  hashPassword,
  removePassword,
} from "../utils/passwordUtils.js";
import { generateToken } from "../utils/tokenUtils.js";
import { createError } from "../utils/createError.js";

export const registerUser = async (email, password, firstName) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw createError(400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      firstName,
    });

    return removePassword(newUser);
  } catch (error) {
    throw createError(500, `Failed to register user - ${error?.message}`);
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw createError(400, "Invalid email or password");
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      throw createError(400, "Invalid email or password");
    }

    return removePassword(user);
  } catch (error) {
    throw createError(500, `Failed to authenticate user - ${error?.message}`);
  }
};

export const generateAuthToken = (userId) => {
  try {
    return generateToken(userId, "1hr");
  } catch (error) {
    throw createError(
      500,
      `Failed to generate authentication token - ${error?.message}`
    );
  }
};

export const setAuthTokenCookie = (res, authToken) => {
  try {
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    throw createError(
      500,
      `Failed to set authentication token cookie - ${error?.message}`
    );
  }
};

export const clearAuthTokenCookie = (res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
  } catch (error) {
    throw createError(
      500,
      `Failed to clear authentication token cookie - ${error?.message}`
    );
  }
};
