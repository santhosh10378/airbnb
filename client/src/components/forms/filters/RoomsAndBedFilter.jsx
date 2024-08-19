import { useSearchQuery } from "../../../context/SearchQueryContext";
import Button from "../../elements/Button";

const RoomsAndBedFilter = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Bedrooms</h4>
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hidden">
          {numbers.map((number) => (
            <Button
              key={number}
              onClick={() => updateSearchQuery({ minBedrooms: number })}
              variant={
                searchQuery.minBedrooms === number
                  ? "secondary-gradient"
                  : "secondary-outlined"
              }
              className="w-full rounded-full min-w-[75px] md:w-auto"
            >
              {number === 8 ? `${number}+` : number}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Beds</h4>
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hidden">
          {numbers.map((number) => (
            <Button
              key={number}
              onClick={() => updateSearchQuery({ minBeds: number })}
              variant={
                searchQuery.minBeds === number
                  ? "secondary-gradient"
                  : "secondary-outlined"
              }
              className="w-full rounded-full min-w-[75px] md:w-auto"
            >
              {number === 8 ? `${number}+` : number}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Bathrooms</h4>
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hidden">
          {numbers.map((number) => (
            <Button
              key={number}
              onClick={() => updateSearchQuery({ minBathrooms: number })}
              variant={
                searchQuery.minBathrooms === number
                  ? "secondary-gradient"
                  : "secondary-outlined"
              }
              className="w-full rounded-full min-w-[75px] md:w-auto"
            >
              {number === 8 ? `${number}+` : number}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsAndBedFilter;
