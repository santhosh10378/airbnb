import { useSearchQuery } from "../../context/SearchQueryContext";
import PlaceTypeFilter from "./filters/PlaceTypeFilter";
import FilterHeading from "./filters/FilterHeading";
import Button from "../elements/Button";
import { useMemo } from "react";
import { useModal } from "../../context/ModalContext";
import RoomsAndBedFilter from "./filters/RoomsAndBedFilter";
import PriceFilter from "./filters/PriceFilter";
import AmenitiesFilter from "./filters/AmenitiesFilter";
import usePageInfo from "../../hooks/usePageInfo";

const placeTypeLabels = {
  any: "places",
  "shared-room": "shared rooms",
  "private-room": "private rooms",
  entire: "homes",
};

const FiltersForm = () => {
  const { resetSearchQuery, searchData, searchQuery } = useSearchQuery();
  const { setSearchParams, navigate } = usePageInfo();
  const { closeModal } = useModal();

  const BtnText = useMemo(
    () => placeTypeLabels[searchQuery.placeType] || "places",
    [searchQuery.placeType]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/")
    setSearchParams(searchData);
    closeModal();
  };

  const renderFilterSection = (title, subtitle, FilterComponent) => (
    <section className="space-y-5">
      <FilterHeading title={title} subtitle={subtitle} />
      <FilterComponent />
    </section>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="relative border-t w-full flex flex-col  h-full"
      aria-label="Filters Form"
      role="form"
    >
      <div className="h-[calc(100%-130px)] overflow-y-auto">
        <div className="p-6 flex flex-col gap-10">
          {renderFilterSection(
            "Type of Place",
            "Search for rooms, entire homes, or any type of place.",
            PlaceTypeFilter
          )}
          <hr />
          {renderFilterSection(
            "Price Range",
            "Filter by nightly prices before fees and taxes.",
            PriceFilter
          )}
          <hr />
          {renderFilterSection(
            "Rooms and Beds",
            "Choose the number of bedrooms and beds that suit your needs.",
            RoomsAndBedFilter
          )}
          <hr />
          {renderFilterSection(
            "Amenities",
            "Select the amenities that matter most to you.",
            AmenitiesFilter
          )}
        </div>
      </div>
      <div className="h-[130px] border-t py-3">
        <div className=" bg-white w-full px-6 flex items-center justify-between ">
          <Button
            variant="primary-link"
            type="button"
            onClick={resetSearchQuery}
          >
            Clear All
          </Button>
          <Button variant="secondary-gradient" type="submit">
            Show {BtnText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FiltersForm;
