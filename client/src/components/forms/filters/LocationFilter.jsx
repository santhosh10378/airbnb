import SearchIcon2 from "../../../assets/icons/SearchIcon2";
import { useSearchQuery } from "../../../context/SearchQueryContext";

const LocationFilter = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  return (
    <div className="bg-white flex flex-col gap-5 cursor-pointer transition rounded-2xl p-5 shadow-custom-shadow-2 ">
      <h2>Where to?</h2>

      <div className="border border-secondary-300 rounded-lg p-2 pl-5 flex items-center gap-x-1">
        <SearchIcon2 className="size-4 text-secondary-500" />

        <input
          type="text"
          value={searchQuery.location}
          onChange={(e) => updateSearchQuery({ location: e.target.value })}
          placeholder="Search destinations"
          className="w-full placeholder:text-secondary-500 placeholder:font-medium outline-none p-3"
        />
      </div>
    </div>
  );
};

export default LocationFilter;
