import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const removePassword = (user) => {
  if (!user) return null;
  const { password, ...otherDetails } = user;
  return otherDetails;
};
