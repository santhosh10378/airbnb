import { twMerge } from "tailwind-merge";
import { useSearchQuery } from "../../../context/SearchQueryContext";
import Button from "../../elements/Button";

const filterOptions = [
  { value: "any", label: "Any type" },
  { value: "shared-room", label: "Shared room" },
  { value: "private-room", label: "Private room" },
  { value: "entire", label: "Entire home" },
];

const PlaceTypeFilter = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  return (
    <div className="flex items-center justify-center mx-auto w-full md:w-full text-sm md:text-base font-medium">
      {filterOptions.map(({ value, label }, i) => (
        <Button
          key={value}
          onClick={() => updateSearchQuery({ placeType: value })}
          variant={
            searchQuery.placeType === value
              ? "secondary-gradient"
              : "secondary-outlined"
          }
          className={twMerge(
            "w-full p-5 rounded-none",
            i === 0 || i === filterOptions.length - 1
              ? `${i === 0 ? "rounded-l-xl" : "rounded-r-xl"}`
              : "rounded-none"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default PlaceTypeFilter;
