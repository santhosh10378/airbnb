import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(50, "Title should not exceed 50 characters."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(300, "Description should not exceed 300 characters."),
  price: z
    .string()
    .min(1, "Price is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format."),
  extraGuestCharge: z.string().optional(),
  currency: z.string().optional(),
  propertyType: z.string().optional(),
  placeType: z.string().optional(),
  noOfBedrooms: z.string().optional(),
  noOfBathrooms: z.string().optional(),
  noOfBeds: z.string().optional(),
  noOfGuests: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  nearbyActivities: z.array(z.string()).optional(),
  images: z.any().optional(),
});
