import { createError } from "../utils/createError.js";
import {
  createWishlist,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
  addPropertyToWishlist,
  removePropertyFromWishlist,
  checkWishlistOwnership,
  getWishlists,
} from "../services/wishlist.services.js";

export const createWishlistController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      return next(createError(400, "Wishlist name is required"));
    }

    const wishlist = await createWishlist(userId, name);
    res
      .status(201)
      .json({ message: "Wishlist created successfully", wishlist });
  } catch (error) {
    next(createError(500, `Failed to create wishlist - ${error.message}`));
  }
};

export const getWishlistController = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const wishlist = await getWishlistById(wishlistId);
    await checkWishlistOwnership(req.user.id, wishlistId);
    res.status(200).json(wishlist);
  } catch (error) {
    next(createError(500, `Failed to retrieve wishlist - ${error.message}`));
  }
};

export const getAllWishlistsController = async (req, res, next) => {
  try {
    const wishlists = await getWishlists(req.user.id);
    res.status(200).json(wishlists);
  } catch (error) {
    next(createError(500, `Failed to retrieve wishlist - ${error.message}`));
  }
};

export const updateWishlistController = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const data = req.body;

    await checkWishlistOwnership(req.user.id, wishlistId);

    const updatedWishlist = await updateWishlist(wishlistId, data);
    res
      .status(200)
      .json({ message: "Wishlist updated successfully", updatedWishlist });
  } catch (error) {
    next(createError(500, `Failed to update wishlist - ${error.message}`));
  }
};

export const deleteWishlistController = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;

    await checkWishlistOwnership(req.user.id, wishlistId);

    await deleteWishlist(wishlistId);
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    next(createError(500, `Failed to delete wishlist - ${error.message}`));
  }
};

export const addPropertyToWishlistController = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const { propertyId } = req.body;

    await checkWishlistOwnership(req.user.id, wishlistId);

    const updatedWishlist = await addPropertyToWishlist(wishlistId, propertyId);
    res.status(200).json({
      message: "Property added to wishlist successfully",
      updatedWishlist,
    });
  } catch (error) {
    next(
      createError(500, `Failed to add property to wishlist - ${error.message}`)
    );
  }
};

export const removePropertyFromWishlistController = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const { propertyId } = req.body;

    console.log({ wishlistId, propertyId });

    await checkWishlistOwnership(req.user.id, wishlistId);

    const updatedWishlist = await removePropertyFromWishlist(
      wishlistId,
      propertyId
    );
    res.status(200).json({
      message: "Property removed from wishlist successfully",
      updatedWishlist,
    });
  } catch (error) {
    next(
      createError(
        500,
        `Failed to remove property from wishlist - ${error.message}`
      )
    );
  }
};
