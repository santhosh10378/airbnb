import { Controller } from "react-hook-form";
import Input from "../../elements/Input";
import AutoAddressComplete from "../../common/AutoAddressComplete";
import { useEffect, useState } from "react";
import LocationMap from "../../common/LocationMap";

const Location = ({ control, errors, setValue }) => {
  const [address, setAddress] = useState({});

  useEffect(() => {
    setValue("address", address?.address);
    setValue("latitude", address?.latitude);
    setValue("longitude", address?.longitude);
    setValue("city", address?.city);
    setValue("state", address?.state);
    setValue("country", address?.country);
    setValue("zipCode", address?.zipCode);
  }, [JSON.stringify(address)]);
  return (
    <>
      <div className="flex flex-col gap-5">
        <AutoAddressComplete setAddress={setAddress} />
      </div>

      <span className="my-8 text-center text-gray-600">or enter manually</span>

      <div className="flex flex-col gap-5">
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="country"
              label="Country"
              placeholder="Enter the country"
              {...field}
              error={errors.country?.message}
              ariaLabel="Country"
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="state"
              label="State"
              placeholder="Enter the state"
              {...field}
              error={errors.state?.message}
              ariaLabel="State"
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="city"
              label="City"
              placeholder="Enter the city"
              {...field}
              error={errors.city?.message}
              ariaLabel="City"
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="address"
              label="Address"
              placeholder="Enter the address"
              {...field}
              error={errors.address?.message}
              ariaLabel="Address"
            />
          )}
        />
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="zipCode"
              label="Zip Code"
              placeholder="Enter the zip code"
              {...field}
              error={errors.zipCode?.message}
              ariaLabel="Zip Code"
            />
          )}
        />
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="latitude"
              label="Latitude"
              placeholder="Enter the latitude"
              {...field}
              error={errors.latitude?.message}
              ariaLabel="Latitude"
            />
          )}
        />
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="longitude"
              label="Longitude"
              placeholder="Enter the longitude"
              {...field}
              error={errors.longitude?.message}
              ariaLabel="Longitude"
            />
          )}
        />
      </div>

      <div className="mt-10">
        <LocationMap
          latitude={address.latitude}
          longitude={address.longitude}
        />
      </div>
    </>
  );
};

export default Location;
