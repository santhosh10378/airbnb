import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import usePageInfo from "../../hooks/usePageInfo";
import useFetch from "../../hooks/useFetch";
import { getNextDay } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/currencyUtils";
import Button from "../elements/Button";
import useBookingAPIs from "../../hooks/useBookingAPIs";
import { ChevronLeftIcon } from "../../assets";
import { useSearchQuery } from "../../context/SearchQueryContext";
import PropertyReservationGuests from "./PropertyReservationGuests";
import {
  getBookingAvailableDates,
  getBookingDetails,
  getBookingUnavailableDates,
} from "../../utils/bookings";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

const PropertyReservation = () => {
  const { params, refreshPage } = usePageInfo();
  const { createBooking } = useBookingAPIs();
  const { data: property } = useFetch(`/properties/${params?.id}`);
  const { data: bookings, fetchData: fetchBookings } = useFetch(
    `/bookings?propertyId=${params?.id}&availableDates=true`
  );
  const [unavailableDates, setUnavailableDates] = useState([]);
  const { searchQuery } = useSearchQuery();
  const [openGuestInfo, setOpenGuestInfo] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    noOfAdults: searchQuery.noOfAdults || 1,
    noOfChildren: searchQuery.noOfChildren || 0,
    noOfInfants: searchQuery.noOfInfants || 0,
    extraAdultGuests: 0,
    extraChildGuests: 0,
    extraInfantGuests: 0,
  });
  const { user } = useAuth();
  const { openModal } = useModal();

  const today = new Date();
  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: getNextDay(today),
      key: "selection",
    },
  ]);

  const {
    dayDifference,
    totalGuests,
    totalExtraGuests,
    basePrice,
    extraCharges,
    totalPrice,
    startDate,
    endDate,
  } = getBookingDetails(guestInfo, property, date[0]);

  const onSubmit = async () => {
    const data = {
      propertyId: params?.id,
      startDate,
      endDate,
      totalPrice,
      nightlyPrice: property?.price,
      currency: "INR",
      extraGuestCharge: property.extraGuestCharge,
      noOfAdults: guestInfo.noOfAdults,
      noOfChildren: guestInfo.noOfChildren,
      noOfInfants: guestInfo.noOfInfants,
    };

    if (!user) {
      openModal("LoginModal");
    } else {
      await createBooking({ data });
      await fetchBookings();
    }

    refreshPage();
  };

  useEffect(() => {
    if (bookings?.length) {
      const allUnavailableDates = getBookingUnavailableDates(bookings);
      setUnavailableDates(allUnavailableDates);

      const { firstAvailableDate, secondAvailableDate } =
        getBookingAvailableDates(allUnavailableDates);

      setDate([
        {
          startDate: firstAvailableDate,
          endDate: secondAvailableDate,
          key: "selection",
        },
      ]);
    }
  }, [JSON.stringify(bookings)]);

  return (
    <div className="rounded-2xl border w-full">
      <div className="p-4 py-4 flex items-center justify-between relative">
        <p>
          <span className="text-xl font-semibold">
            {formatCurrency({ amount: property?.price })}
          </span>
          <span className="text-sm text-gray-600"> night</span>
        </p>
        <Button
          onClick={() => setOpenGuestInfo((prev) => !prev)}
          variant="secondary-outlined"
          className="rounded-xl items-center gap-3 p-2 px-3"
          aria-label="Select number of guests"
        >
          <p className="text-[12px] font-bold">GUESTS</p>
          <p className="font-normal text-gray-600">
            {`${totalGuests || 0} guest${totalGuests > 1 ? "s" : ""}`}
          </p>
          <div style={{ transform: "rotate(270deg)" }}>
            <ChevronLeftIcon className="size-3" />
          </div>
        </Button>

        {openGuestInfo && (
          <PropertyReservationGuests
            guestInfo={guestInfo}
            setGuestInfo={setGuestInfo}
            property={property}
          />
        )}
      </div>

      <hr />

      <div>
        <DateRange
          editableDateInputs
          onChange={(item) => setDate([item.selection])}
          ranges={date}
          minDate={today}
          rangeColors={["black"]}
          direction="vertical"
          showDateDisplay={false}
          disabledDates={unavailableDates}
        />
      </div>

      <hr />

      <div className="p-4 flex flex-col gap-4">
        <Button
          onClick={onSubmit}
          variant="primary-gradient"
          className="w-full"
          aria-label="Reserve property"
        >
          Reserve
        </Button>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{`${formatCurrency({
            amount: basePrice,
          })} × ${dayDifference} ${dayDifference > 1 ? "nights" : "night"}`}</p>
          <p className="text-sm font-semibold">
            {formatCurrency({ amount: basePrice })}
          </p>
        </div>

        {extraCharges > 0 && (
          <div className="flex flex-col gap-1">
            <h4 className="font-medium">Extra Charges</h4>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{`${formatCurrency({
                amount: property?.extraGuestCharge,
              })} × ${totalExtraGuests} ${
                totalExtraGuests > 1 ? "guests" : "guest"
              }`}</p>
              <p className="text-sm font-semibold">
                {formatCurrency({ amount: extraCharges })}
              </p>
            </div>
          </div>
        )}

        <hr />

        <div className="flex items-center justify-between">
          <p className="text-xl  font-medium">Total</p>
          <p className="text-xl font-semibold">
            {formatCurrency({ amount: totalPrice })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyReservation;
