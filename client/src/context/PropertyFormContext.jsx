import { createContext, useContext, useState } from "react";

const PropertyFormContext = createContext();

const initialState = {
  title: "",
  description: "",
  price: "",
  extraGuestCharge: "",
  currency: "",
  propertyType: "",
  placeType: "",
  noOfBedrooms: "",
  noOfBathrooms: "",
  noOfBeds: "",
  noOfGuests: "",
  country: "",
  state: "",
  city: "",
  address: "",
  zipCode: "",
  latitude: "",
  longitude: "",
  amenities: [],
  nearbyActivities: [],
  images: [],
};

export const PropertyFormProvider = ({ children }) => {
  const [propertyForm, setPropertyForm] = useState(initialState);

  const updatePropertyForm = (field, value) => {
    setPropertyForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const resetPropertyForm = () => setPropertyForm(initialState);

  return (
    <PropertyFormContext.Provider
      value={{ propertyForm, updatePropertyForm, resetPropertyForm }}
    >
      {children}
    </PropertyFormContext.Provider>
  );
};

export const usePropertyForm = () => useContext(PropertyFormContext);
