import { createError } from "../utils/createError.js";
import { getUserById } from "../services/user.services.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const verifyAuthToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Authentication token is required"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "Authentication token is required"));
    }

    const decoded = verifyToken(token);

    const user = await getUserById(decoded.userId);

    if (!user) {
      return next(createError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("verifyAuthToken failed error");
    next(createError(401, `Invalid or expired token - ${error.message}`));
  }
};
