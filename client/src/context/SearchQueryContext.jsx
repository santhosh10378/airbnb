import { createContext, useState, useContext } from "react";

const SearchQueryContext = createContext();

const initialFilter = {
  placeType: "any",
  minBedrooms: 1,
  minBeds: 1,
  minBathrooms: 1,
  minPrice: 800,
  maxPrice: 25000,
};

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState({
    ...initialFilter,
  });

  const { noOfAdults, noOfChildren, noOfInfants, ...other } = searchQuery;

  const searchData = {
    ...other,
    noOfGuests: noOfAdults + noOfChildren + noOfInfants,
  };

  const updateSearchQuery = (data) => {
    setSearchQuery((prev) => ({ ...prev, ...data }));
  };

  const filterSearchQuery = (key) => {
    setSearchQuery((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const resetSearchQuery = () => {
    setSearchQuery({ ...initialFilter });
  };

  return (
    <SearchQueryContext.Provider
      value={{
        searchQuery,
        updateSearchQuery,
        filterSearchQuery,
        resetSearchQuery,
        searchData,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);
  if (context === undefined) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }

  const {
    searchQuery,
    updateSearchQuery,
    filterSearchQuery,
    resetSearchQuery,
    searchData,
  } = context;
  return {
    searchQuery,
    updateSearchQuery,
    filterSearchQuery,
    resetSearchQuery,
    searchData,
  };
};
