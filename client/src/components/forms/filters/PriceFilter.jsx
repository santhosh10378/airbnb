import { useSearchQuery } from "../../../context/SearchQueryContext";
import Input from "../../elements/Input";

const PriceFilter = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  return (
    <div className="flex items-center justify-between gap-5 w-full">
      <Input
        type="number"
        value={searchQuery.minPrice}
        onChange={(e) => updateSearchQuery({ minPrice: e.target.value })}
        label="Minimum"
        placeholder="Set minimum price"
        id="minPice"
        inputClass="md:text-base"
      />

      <div>-</div>

      <Input
        type="number"
        value={searchQuery.maxPrice}
        onChange={(e) => updateSearchQuery({ maxPrice: e.target.value })}
        label="Maximum"
        placeholder="Set maximum price"
        id="maxPrice"
        inputClass="md:text-base"
      />
    </div>
  );
};

export default PriceFilter;
