import { twMerge } from "tailwind-merge";
import { amenities, amenityCategories } from "../../../data/dummy";
import Button from "../../elements/Button";
import { useState } from "react";
import Checkbox from "../../elements/Checkbox";
import { useSearchQuery } from "../../../context/SearchQueryContext";

const AmenitiesFilter = () => {
  const [show, setShow] = useState(false);
  const sliceSize = show ? amenityCategories.length : 1;

  const { searchQuery, updateSearchQuery } = useSearchQuery();

  const addOrRemoveAmenities = (checked, value) => {
    let updatedAmenities = searchQuery.amenities
      ? [...searchQuery.amenities]
      : [];

    if (checked) {
      updatedAmenities = [...updatedAmenities, value];
    } else {
      updatedAmenities = updatedAmenities.filter(
        (amenity) => amenity !== value
      );
    }

    updateSearchQuery({ amenities: updatedAmenities });
  };

  return (
    <div className="flex flex-col gap-5">
      {amenityCategories.slice(0, sliceSize).map((category, i) => (
        <div key={category.slug} className="">
          <h4
            className={twMerge("font-medium mb-3", i === 0 ? "mt-3" : "mt-10")}
          >
            {category.name}
          </h4>

          <div className="grid grid-cols-2 gap-x-1 gap-y-6">
            {amenities
              .filter((item) => item.amenityCategorySlug === category.slug)
              .map((amenity) => (
                <Checkbox
                  key={amenity.slug}
                  label={amenity.name}
                  value={amenity.slug}
                  onChange={(e) =>
                    addOrRemoveAmenities(e.target.checked, e.target.value)
                  }
                  checked={searchQuery.amenities?.includes(amenity.slug)}
                />
              ))}
          </div>
        </div>
      ))}

      <Button
        onClick={() => setShow((prev) => !prev)}
        variant="secondary-link"
        className="text-base"
      >
        {show ? "Show less" : "Show more"}
      </Button>
    </div>
  );
};

export default AmenitiesFilter;
