import { createContext, useContext, useState } from "react";

const BookingFormContext = createContext();

const initialState = {
  startDate: "",
  endDate: "",
  totalPrice: "",
  nightlyPrice: "",
  extraGuestCharge: "",
  currency: "",
  noOfAdults: "",
  noOfChildren: "",
  noOfInfants: "",
  propertyId: "",
};

export const BookingFormProvider = ({ children }) => {
  const [bookingForm, setBookingForm] = useState(initialState);

  const updateBookingForm = (field, value) => {
    setBookingForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const resetBookingForm = () => setBookingForm(initialState);

  return (
    <BookingFormContext.Provider
      value={{ bookingForm, updateBookingForm, resetBookingForm }}
    >
      {children}
    </BookingFormContext.Provider>
  );
};

export const useBookingForm = () => useContext(BookingFormContext);
