import {
  createProperty,
  buildPropertyWhereClause,
  getProperties,
  getPropertyById,
  getPropertyImages,
  updateProperty,
  deleteProperty,
  authorizeHost,
  getPropertiesImages,
  validateAndConvertPropertyData,
} from "../services/property.services.js";
import { createError } from "../utils/createError.js";
import { deleteImagesFromS3, uploadImagesToS3 } from "../utils/fileUtils.js";

export const createPropertyController = async (req, res, next) => {
  try {
    const convertedPropertyData = validateAndConvertPropertyData(req.body);

    const images = await uploadImagesToS3(req.files);

    const newProperty = await createProperty({
      ...convertedPropertyData,
      images,
      hostId: req.user.id,
    });

    const property = await getPropertyById(newProperty.id);
    const propertyWithImages = await getPropertyImages(property);

    res.status(201).json({
      message: "Property created successfully",
      property: propertyWithImages,
    });
  } catch (error) {
    next(createError(500, `Failed to create property - ${error.message}`));
  }
};

export const getPropertiesController = async (req, res, next) => {
  try {
    const whereClause = buildPropertyWhereClause(req.query);
    const properties = await getProperties(whereClause);
    const propertiesWithImages = await getPropertiesImages(properties);
    res.status(200).json(propertiesWithImages);
  } catch (error) {
    next(createError(500, `Failed to fetch properties - ${error?.message}`));
  }
};

export const getPropertyByIdController = async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    const propertyWithImages = await getPropertyImages(property);
    res.status(200).json(propertyWithImages);
  } catch (error) {
    next(createError(500, `Failed to fetch property - ${error?.message}`));
  }
};

export const updatePropertyController = async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    authorizeHost(property.hostId, req.user.id);
    const updatedProperty = await updateProperty(property.id, req.body);
    res
      .status(200)
      .json({ message: "Property updated successfully", updatedProperty });
  } catch (error) {
    next(createError(500, `Failed to update property - ${error?.message}`));
  }
};

export const deletePropertyController = async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    authorizeHost(property.hostId, req.user.id);
    const deletedProperty = await deleteProperty(property.id);
    await deleteImagesFromS3(deletedProperty.images);

    res
      .status(200)
      .json({ message: "Property deleted successfully", deletedProperty });
  } catch (error) {
    next(createError(500, `Failed to delete property - ${error?.message}`));
  }
};
