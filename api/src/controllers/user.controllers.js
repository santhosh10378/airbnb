import { updateUser, deleteUser } from "../services/user.services.js";
import { createError } from "../utils/createError.js";

export const getUserController = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(createError(500, `Failed to get user - ${error?.message}`));
  }
};

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await updateUser(userId, req.user.id, updateData);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(createError(500, `Failed to update user - ${error?.message}`));
  }
};

export const deleteUserController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId, req.user.id);
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    next(createError(500, `Failed to delete user - ${error?.message}`));
  }
};
