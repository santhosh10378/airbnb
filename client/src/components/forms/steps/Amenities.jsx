import { Controller } from "react-hook-form";
import ButtonBox from "../../elements/ButtonBox";
import { amenities, amenityCategories } from "../../../data/dummy";

const Amenities = ({ control, errors }) => {
  return (
    <div>
      {/* <label className="block mb-2">Amenities</label> */}
      <div className="">
        {amenityCategories.map((category) => (
          <>
            <h3>{category.name}</h3>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2 mb-8">
              {amenities
                .filter(
                  (amenity) => amenity.amenityCategorySlug === category.slug
                )
                .map((amenity) => (
                  <div key={amenity.slug} className="relative">
                    <Controller
                      name={`amenities.${amenity.slug}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <>
                          <ButtonBox
                            label={amenity.name}
                            value={amenity.slug}
                            checked={field.value || false}
                            onChange={(checked) => field.onChange(checked)}
                            icon={amenity.icon}
                          />
                          {errors?.amenities?.[amenity.slug] && (
                            <span className="absolute text-red-500 text-xs">
                              {errors.amenities[amenity.slug]?.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
