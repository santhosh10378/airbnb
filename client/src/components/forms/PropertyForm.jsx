import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "../../schemas/propertySchema";
import useMultiStepForm from "../../hooks/useMultiStepForm";

import GeneralInformation from "./steps/GeneralInformation";
import Prices from "./steps/Prices";
import PropertyType from "./steps/PropertyType";
import PlaceType from "./steps/PlaceType";
import Specifications from "./steps/Specifications";
import Location from "./steps/Location";
import Activities from "./steps/Activities";
import Amenities from "./steps/Amenities";
import Images from "./steps/Images";
import Button from "../elements/Button";
import usePropertyAPIs from "../../hooks/usePropertyAPIs";

const PropertyForm = () => {
  // Initialize useForm with validation schema and default values
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      extraGuestCharge: 0,
      currency: "",
      propertyType: "",
      placeType: "",
      noOfBedrooms: 0,
      noOfBathrooms: 0,
      noOfBeds: 0,
      noOfGuests: 0,
      country: "",
      state: "",
      city: "",
      address: "",
      zipCode: "",
      latitude: "",
      longitude: "",
      amenities: [],
      nearbyActivities: [],
      images: [],
    },
  });

  // Define steps for the multi-step form
  const steps = [
    <fieldset className="flex flex-col gap-3" key="general-info">
      <legend className="text-xl font-semibold">General Information</legend>
      <GeneralInformation
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="prices">
      <legend className="text-xl font-semibold">Prices</legend>
      <Prices
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="property-type">
      <legend className="text-xl font-semibold">Property Type</legend>
      <PropertyType
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="place-type">
      <legend className="text-xl font-semibold">Place Type</legend>
      <PlaceType
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="specifications">
      <legend className="text-xl font-semibold">Specifications</legend>
      <Specifications
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="location">
      <legend className="text-xl font-semibold">Location</legend>
      <Location
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="amenities">
      <legend className="text-xl font-semibold">Amenities</legend>
      <Amenities
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="activities">
      <legend className="text-xl font-semibold">Activities</legend>
      <Activities
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
    <fieldset className="flex flex-col gap-3" key="images">
      <legend className="text-xl font-semibold">Images</legend>
      <Images
        errors={errors}
        control={control}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>,
  ];

  console.log(errors); // For debugging

  // Custom hook for managing multi-step form navigation
  const { currentStep, nextStep, prevStep, isLastStep, isFirstStep } =
    useMultiStepForm(steps.length);

  const { createProperty } = usePropertyAPIs();

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("onSubmit");

    try {
      const formData = new FormData();

      // Append form data to FormData
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}`, item);
            } else {
              formData.append(`${key}[${index}]`, item.toString());
            }
          });
        } else if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key].toString());
        }
      });

      // Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await createProperty({ data: formData });

      // Uncomment to reset the form after submission
      // reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  h-full">
      <div className="flex-[4.3] max-h-full overflow-y-auto px-5 pb-5">
        {steps[currentStep]}
      </div>
      <div className="flex-[1] border-t py-3 px-5">
        <div className="flex justify-between gap-3">
          {!isFirstStep && (
            <Button
              variant="primary-outlined"
              className="w-full"
              type="button"
              onClick={prevStep}
            >
              Previous
            </Button>
          )}
          {!isLastStep && (
            <Button
              variant="primary-gradient"
              className="w-full"
              type="button"
              onClick={nextStep}
            >
              Next
            </Button>
          )}
          {isLastStep && (
            <Button variant="primary-gradient" className="w-full" type="submit">
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;
