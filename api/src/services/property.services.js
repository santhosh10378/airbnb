import { createError } from "../utils/createError.js";
import { prisma } from "../config/prisma.config.js";
import { getImagesFromS3 } from "../utils/fileUtils.js";
import { removePassword } from "../utils/passwordUtils.js";
import { toArray, toNumber } from "../utils/typeUtils.js";

export const validateAndConvertPropertyData = (data) => {
  const {
    title,
    description,
    price,
    currency,
    extraGuestCharge,
    propertyType,
    placeType,
    noOfBedrooms,
    noOfBathrooms,
    noOfBeds,
    noOfGuests,
    country,
    state,
    city,
    address,
    zipCode,
    latitude,
    longitude,
    amenities,
    nearbyActivities,
  } = data;

  const convertedProperty = {
    title,
    description,
    price: toNumber(price),
    propertyType,
    placeType,
    noOfBedrooms: toNumber(noOfBedrooms),
    noOfBathrooms: toNumber(noOfBathrooms),
    noOfBeds: toNumber(noOfBeds),
    noOfGuests: toNumber(noOfGuests),
    country,
    state,
    city,
    address,
    zipCode,
    latitude,
    longitude,
    currency,
    amenities: toArray(amenities),
    nearbyActivities: toArray(nearbyActivities),
    extraGuestCharge: toNumber(extraGuestCharge),
  };

  if (
    !convertedProperty.title &&
    !convertedProperty.price &&
    !convertedProperty.currency
  ) {
    throw createError(400, "Title, currency and price are required");
  }

  return convertedProperty;
};

export const buildPropertyWhereClause = (queryParams) => {
  console.log(queryParams);
  const {
    location = "",
    minGuests = 1,
    maxGuests = 10,
    minBedrooms = 0,
    maxBedrooms = 10,
    minBathrooms = 0,
    maxBathrooms = 10,
    minBeds = 0,
    maxBeds = 10,
    minPrice = 0,
    maxPrice = 10000000000,
    startDate,
    endDate,
    placeType = "entire",
    page = 1,
    pageSize = 10,
    hostId,
    propertyType = "any",
  } = queryParams;

  const parsedQueryParams = {
    minPrice: parseFloat(minPrice),
    maxPrice: parseFloat(maxPrice),
    minBedrooms: parseInt(minBedrooms, 10),
    maxBedrooms: parseInt(maxBedrooms, 10),
    minBathrooms: parseInt(minBathrooms, 10),
    maxBathrooms: parseInt(maxBathrooms, 10),
    minBeds: parseInt(minBeds, 10),
    maxBeds: parseInt(maxBeds, 10),
    minGuests: parseInt(minGuests, 10),
    maxGuests: parseInt(maxGuests, 10),
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  };

  if (Object.values(parsedQueryParams).some(isNaN)) {
    throw createError(400, "Invalid query parameters");
  }

  const where = {
    ...(location && {
      OR: [
        { address: { contains: location, mode: "insensitive" } },
        { city: { contains: location, mode: "insensitive" } },
        { state: { contains: location, mode: "insensitive" } },
        { country: { contains: location, mode: "insensitive" } },
      ],
    }),
    ...(["entire", "any"].includes(placeType) ? {} : { placeType }),
    ...(propertyType !== "any" && { propertyType }),
    ...(hostId && { hostId }),
    price: {
      gte: parsedQueryParams.minPrice,
      lte: parsedQueryParams.maxPrice,
    },
    noOfGuests: {
      gte: parsedQueryParams.minGuests,
      lte: parsedQueryParams.maxGuests,
    },
    noOfBedrooms: {
      gte: parsedQueryParams.minBedrooms,
      lte: parsedQueryParams.maxBedrooms,
    },
    noOfBathrooms: {
      gte: parsedQueryParams.minBathrooms,
      lte: parsedQueryParams.maxBathrooms,
    },
    noOfBeds: {
      gte: parsedQueryParams.minBeds,
      lte: parsedQueryParams.maxBeds,
    },
  };

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    where.AND = [
      {
        bookings: {
          none: {
            OR: [
              {
                startDate: { lte: end },
                endDate: { gte: start },
              },
            ],
          },
        },
      },
    ];
  }

  Object.keys(where).forEach((key) => {
    if (where[key] === undefined || where[key] === null) {
      delete where[key];
    }
  });

  const skip = (parsedQueryParams.page - 1) * parsedQueryParams.pageSize;
  const take = parsedQueryParams.pageSize;

  return { where, skip, take };
};

export const authorizeHost = (propertyHostId, userHostId) => {
  if (propertyHostId !== userHostId) {
    throw createError(403, "Unauthorized");
  }
};

export const createProperty = async (data) => {
  try {
    const property = await prisma.property.create({
      data,
      include: {
        host: true,
      },
    });

    if (
      !property.host.hostingStartedAt ||
      property.host.hostingStartedAt === null ||
      property.host.hostingStartedAt === undefined
    ) {
      await prisma.user.update({
        where: { id: property.hostId },
        data: {
          hostingStartedAt: new Date(),
        },
      });
    }

    return property;
  } catch (error) {
    throw createError(500, `Error creating property - ${error.message}`);
  }
};

export const getProperties = async (whereClause = {}) => {
  const { where, skip, take } = whereClause;
  console.log({ where, skip, take });
  try {
    return await prisma.property.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take,
    });
  } catch (error) {
    throw createError(500, `Error fetching properties - ${error?.message}`);
  }
};

export const getPropertyById = async (id) => {
  if (!id) {
    throw createError(400, "Property ID is required");
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        host: true,
      },
    });

    if (!property) {
      throw createError(404, "Property not found");
    }

    return property;
  } catch (error) {
    throw createError(500, `Error fetching property by ID - ${error.message}`);
  }
};

export const getPropertyImages = async (property) => {
  const images = await getImagesFromS3(property.images);
  return {
    ...property,
    images,
    host: removePassword(property.host),
  };
};

export const getPropertiesImages = async (properties) => {
  return await Promise.all(
    properties.map(async (property) => {
      const images = await getImagesFromS3(property.images);
      return {
        ...property,
        images,
        host: removePassword(property.host),
      };
    })
  );
};

export const updateProperty = async (id, data) => {
  try {
    return await prisma.property.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw createError(500, `Error updating property - ${error.message}`);
  }
};

export const deleteProperty = async (id) => {
  try {
    return await prisma.property.delete({
      where: { id },
    });
  } catch (error) {
    throw createError(500, `Error deleting property - ${error.message}`);
  }
};
