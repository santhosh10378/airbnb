import { Controller } from "react-hook-form";
import Input from "../../elements/Input";

const Specifications = ({ control, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Controller
          name="noOfBedrooms"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              id="noOfBedrooms"
              label="Number of Bedrooms"
              placeholder="Enter the number of bedrooms"
              {...field}
              error={errors.noOfBedrooms?.message}
              ariaLabel="Number of Bedrooms"
            />
          )}
        />
        <Controller
          name="noOfBathrooms"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              id="noOfBathrooms"
              label="Number of Bathrooms"
              placeholder="Enter the number of bathrooms"
              {...field}
              error={errors.noOfBathrooms?.message}
              ariaLabel="Number of Bathrooms"
            />
          )}
        />
        <Controller
          name="noOfBeds"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              id="noOfBeds"
              label="Number of Beds"
              placeholder="Enter the number of beds"
              {...field}
              error={errors.noOfBeds?.message}
              ariaLabel="Number of Beds"
            />
          )}
        />
        <Controller
          name="noOfGuests"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              id="noOfGuests"
              label="Number of Guests"
              placeholder="Enter the number of guests"
              {...field}
              error={errors.noOfGuests?.message}
              ariaLabel="Number of Guests"
            />
          )}
        />
      </div>
    </>
  );
};

export default Specifications;
