import { useState } from "react";
import { motion } from "framer-motion";

import { useModal } from "../../context/ModalContext";
import { useSearchQuery } from "../../context/SearchQueryContext";
import {
  getWhenDescription,
  getWhereDescription,
  getWhoDescription,
} from "../../utils/descriptionUtils";

import SearchIcon2 from "../../assets/icons/SearchIcon2";
import usePageInfo from "../../hooks/usePageInfo";
import Button from "../elements/Button";
import InfoFilter from "./filters/InfoFilter";
import LocationFilter from "./filters/LocationFilter";
import DateFilter from "./filters/DateFilter";

const MobileSearchForm = () => {
  const { searchData, resetSearchQuery, searchQuery } = useSearchQuery();
  const { setSearchParams } = usePageInfo();
  const { closeModal } = useModal();

  const descriptions = {
    Where: getWhereDescription(searchQuery),
    When: getWhenDescription(searchQuery),
    Who: getWhoDescription(searchQuery),
  };

  const filters = [
    { id: 1, label: "Where", component: <LocationFilter /> },
    { id: 2, label: "When", component: <DateFilter /> },
    { id: 3, label: "Who", component: <InfoFilter /> },
  ];

  const [openedId, setOpenedId] = useState(filters[0].id);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchData);
    closeModal();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-t pb-36 flex flex-col justify-between h-full md:max-h-[80vh] bg-secondary-100 overflow-y-auto"
      aria-label="Mobile Search Form"
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex flex-col gap-5 p-3 pt-6"
      >
        {filters.map(({ id, label, component }) =>
          openedId === id ? (
            <div key={id}>{component}</div>
          ) : (
            <div
              key={id}
              onClick={() => setOpenedId(id)}
              className="bg-white cursor-pointer transition rounded-2xl p-5 shadow-custom-shadow-2 flex items-center justify-between gap-1"
              role="button"
              aria-label={`Select ${label}`}
            >
              <p className="font-medium text-secondary-600">{label}</p>
              <p className="text-secondary-900 font-medium">
                {descriptions[label]}
              </p>
            </div>
          )
        )}
      </motion.div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="absolute bottom-0 left-0 bg-white w-full p-6 py-3 flex items-center justify-between border-t"
      >
        <Button
          variant="secondary-link"
          type="button"
          onClick={resetSearchQuery}
          aria-label="Clear all selections"
        >
          Clear all
        </Button>
        <Button
          variant="primary-gradient"
          type="submit"
          className="px-5 gap-3"
          aria-label="Submit search"
        >
          <SearchIcon2 className="size-3" />
          <span>Search</span>
        </Button>
      </motion.div>
    </form>
  );
};

export default MobileSearchForm;
