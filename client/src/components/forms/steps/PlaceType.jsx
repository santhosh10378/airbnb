import { Controller } from "react-hook-form";
import ButtonRadio from "../../elements/ButtonRadio";
import { placeTypes } from "../../../data/dummy";

const PlaceType = ({ control, errors }) => {
  return (
    <div>
      {/* <label className="block mb-2">Property Type</label> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {placeTypes.map((placeType) => (
          <div key={placeType.slug} className="relative">
            <Controller
              name="placeType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <ButtonRadio
                    label={placeType.name}
                    value={placeType.slug}
                    checked={field.value === placeType.slug}
                    onChange={(e) => field.onChange(e.target.value)}
                    icon={placeType.icon}
                  />
                  {/* Display error if exists */}
                  {errors.placeType && (
                    <span className="absolute text-red-500 text-xs mt-1">
                      {errors.placeType.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        ))}
      </div>
      {/* Display a general error message if any */}
      {errors.placeType && (
        <span className="block text-red-500 text-xs mt-2">
          {errors.placeType.message}
        </span>
      )}
    </div>
  );
};

export default PlaceType;
