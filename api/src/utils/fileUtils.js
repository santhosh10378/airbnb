import {
  deleteFileFromS3,
  getFileFromS3,
  uploadFileToS3,
} from "../lib/s3Actions.js";
import { createError } from "./createError.js";

const handleS3Operation = async (images, operation, operationName) => {
  if (!images || images.length === 0) {
    return [];
  }

  try {
    return await Promise.all(images.map((image) => operation(image)));
  } catch (error) {
    throw createError(500, `Error ${operationName} images: ${error.message}`);
  }
};

export const getImagesFromS3 = async (images) => {
  return await handleS3Operation(images, getFileFromS3, "retrieving");
};

export const uploadImagesToS3 = async (images) => {
  return await handleS3Operation(images, uploadFileToS3, "uploading");
};

export const deleteImagesFromS3 = async (images) => {
  return await handleS3Operation(images, deleteFileFromS3, "deleting");
};
