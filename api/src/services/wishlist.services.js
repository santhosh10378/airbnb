import { prisma } from "../config/prisma.config.js";
import { createError } from "../utils/createError.js";
import { getPropertiesImages, getPropertyById } from "./property.services.js";

export const checkWishlistOwnership = async (userId, wishlistId) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
    });

    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }

    if (wishlist.userId !== userId) {
      throw createError(
        403,
        "You do not have permission to access this wishlist"
      );
    }

    return true;
  } catch (error) {
    throw createError(500, `Authorization check failed - ${error.message}`);
  }
};

export const createWishlist = async (userId, name) => {
  try {
    return await prisma.wishlist.create({
      data: {
        userId,
        name,
      },
    });
  } catch (error) {
    throw createError(500, `Failed to create wishlist - ${error.message}`);
  }
};

export const getWishlists = async (userId) => {
  try {
    return await prisma.wishlist.findMany({
      where: { userId },
    });
  } catch (error) {
    throw createError(500, `Failed to retrieve wishlist - ${error.message}`);
  }
};

export const getWishlistById = async (wishlistId) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
      include: { properties: true },
    });

    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }

    wishlist.properties = await getPropertiesImages(wishlist.properties);

    return wishlist;
  } catch (error) {
    throw createError(500, `Failed to retrieve wishlist - ${error.message}`);
  }
};

export const updateWishlist = async (wishlistId, data) => {
  try {
    return await prisma.wishlist.update({
      where: { id: wishlistId },
      data,
    });
  } catch (error) {
    throw createError(500, `Failed to update wishlist - ${error.message}`);
  }
};

export const deleteWishlist = async (wishlistId) => {
  try {
    await prisma.wishlist.delete({
      where: { id: wishlistId },
    });
  } catch (error) {
    throw createError(500, `Failed to delete wishlist - ${error.message}`);
  }
};

export const addPropertyToWishlist = async (wishlistId, propertyId) => {
  try {
    const property = await getPropertyById(propertyId);

    return await prisma.wishlist.update({
      where: { id: wishlistId },
      data: {
        propertyIds: {
          push: propertyId,
        },
        coverImage: property.images[0],
      },
    });
  } catch (error) {
    throw createError(
      500,
      `Failed to add property to wishlist - ${error.message}`
    );
  }
};

export const removePropertyFromWishlist = async (wishlistId, propertyId) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
      include: { properties: true },
    });

    const remainingProperties = wishlist.properties.filter(
      (property) => property.id !== propertyId
    );

    let coverImage = null;

    if (remainingProperties.length > 0) {
      coverImage =
        remainingProperties[remainingProperties.length - 1].images[0];
    }

    return await prisma.wishlist.update({
      where: { id: wishlistId },
      data: {
        propertyIds: {
          set: remainingProperties.map((property) => property.id),
        },
        coverImage,
      },
    });
  } catch (error) {
    throw createError(
      500,
      `Failed to remove property from wishlist - ${error.message}`
    );
  }
};
