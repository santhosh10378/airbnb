import { Controller } from "react-hook-form";
import ButtonRadio from "../../elements/ButtonRadio";
import { propertyTypes } from "../../../data/dummy";

const PropertyType = ({ control, errors }) => {
  return (
    <div>
      {/* <label className="block mb-2">Property Type</label> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {propertyTypes.map((propertyType) => (
          <div key={propertyType.slug} className="relative">
            <Controller
              name="propertyType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <ButtonRadio
                    label={propertyType.name}
                    value={propertyType.slug}
                    checked={field.value === propertyType.slug}
                    onChange={(e) => field.onChange(e.target.value)}
                    icon={propertyType.icon}
                  />
                  {/* Display error if exists */}
                  {errors.propertyType && (
                    <span className="absolute text-red-500 text-xs mt-1">
                      {errors.propertyType.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        ))}
      </div>
      {/* Display a general error message if any */}
      {errors.propertyType && (
        <span className="block text-red-500 text-xs mt-2">
          {errors.propertyType.message}
        </span>
      )}
    </div>
  );
};

export default PropertyType;
