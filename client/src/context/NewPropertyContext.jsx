import { createContext, useContext, useState } from "react";

const NewPropertyContext = createContext();

export const NewPropertyFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    propertyType: "",
    placeType: "entire",
    noOfBedrooms: 0,
    noOfBathrooms: 0,
    noOfBeds: 0,
    noOfGuests: 0,
    country: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    amenities: [],
    nearbyActivities: [],
    media: [],
    images: [],
  });

  const updateForm = (key, newData) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: newData,
      };
    });
  };

  return (
    <NewPropertyContext.Provider value={{ formData, setFormData, updateForm }}>
      {children}
    </NewPropertyContext.Provider>
  );
};

export const useNewPropertyForm = () => {
  const context = useContext(NewPropertyContext);
  if (!context) {
    throw new Error(
      "useNewPropertyForm must be used within a NewPropertyFormProvider"
    );
  }
  const { formData, setFormData, updateForm } = context;

  return { formData, setFormData, updateForm };
};
