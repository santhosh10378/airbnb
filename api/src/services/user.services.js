import { prisma } from "../config/prisma.config.js";
import { getFileFromS3 } from "../lib/s3Actions.js";
import { createError } from "../utils/createError.js";
import { removePassword } from "../utils/passwordUtils.js";

export const checkUserAuthorization = (userId, authUserId) => {
  if (userId !== authUserId) {
    throw createError(403, "Unauthorized to access this user");
  }
};

export const handleNotFound = (entity, entityName = "Entity") => {
  if (!entity) {
    throw createError(404, `${entityName} not found`);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        wishlists: true,
      },
    });

    handleNotFound(user, "User");

    const userWithWishListImages = await Promise.all(
      user.wishlists.map(async (wishlist) => {
        if (wishlist.coverImage) {
          wishlist.coverImage = await getFileFromS3(wishlist.coverImage);
        }
        return wishlist;
      })
    );

    user.wishlists = userWithWishListImages;

    return removePassword(user);
  } catch (error) {
    throw createError(500, `Failed to get user by ID - ${error?.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    throw createError(500, `Failed to get user by email - ${error?.message}`);
  }
};

export const createUser = async (data) => {
  try {
    const user = await prisma.user.create({
      data,
    });

    return removePassword(user);
  } catch (error) {
    throw createError(500, `Failed to create user - ${error?.message}`);
  }
};

export const updateUser = async (userId, authUserId, updateData) => {
  try {
    checkUserAuthorization(userId, authUserId);

    await getUserById(userId);

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return removePassword(user);
  } catch (error) {
    throw createError(500, `Failed to update user - ${error?.message}`);
  }
};

export const deleteUser = async (userId, authUserId) => {
  try {
    checkUserAuthorization(userId, authUserId);

    await getUserById(userId);

    const user = await prisma.user.delete({
      where: { id: userId },
    });

    return removePassword(user);
  } catch (error) {
    throw createError(500, `Failed to delete user - ${error?.message}`);
  }
};
