import jwt from "jsonwebtoken";
import { envVariables } from "../lib/envVariables.js";

const { JWT_SECRET, REFRESH_SECRET } = envVariables();

export const generateToken = (userId, expiresIn) => {
  if (expiresIn) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn });
  } else {
    return jwt.sign({ userId }, REFRESH_SECRET);
  }
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
