import { useState, useMemo } from "react";
import useBookingAPIs from "../../hooks/useBookingAPIs";
import PropertiesGrid from "../../layouts/PropertiesGrid";
import PropertyCard from "./PropertyCard";
import Button from "../elements/Button";

const AllTrips = ({ trips, fetchData }) => {
  const { cancelBooking } = useBookingAPIs();
  const [activeTab, setActiveTab] = useState("all");

  const filterTrips = useMemo(() => {
    const filterByCriteria = (isApproved, isCancelled) =>
      trips?.filter(
        (trip) =>
          (isApproved === null || trip.isApproved === isApproved) &&
          (isCancelled === null || trip.isCancelled === isCancelled)
      );

    return {
      all: trips,
      approvedNotCancelled: filterByCriteria(true, false),
      approvedAndCancelled: filterByCriteria(true, true),
      notApprovedAndCancelled: filterByCriteria(false, true),
      notApproved: filterByCriteria(false, false),
    };
  }, [trips]);

  const filteredTrips = filterTrips[activeTab] || filterTrips.all;

  const handleCancel = async (tripId) => {
    await cancelBooking({ id: tripId });
    await fetchData();
  };

  return (
    <div className="space-y-7">
      <nav aria-label="Trip Filter Tabs" className="mb-4 flex gap-3 flex-wrap">
        {Object.keys(filterTrips).map((key) => {
          const buttonText = {
            all: "All Trips",
            approvedNotCancelled: "Approved and Not Cancelled",
            approvedAndCancelled: "Approved and Cancelled",
            notApprovedAndCancelled: "Not Approved and Cancelled",
            notApproved: "Not Approved",
          };

          return (
            <Button
              key={key}
              className="p-2 px-4 rounded-full"
              variant={
                activeTab === key ? "secondary-gradient" : "secondary-outlined"
              }
              onClick={() => setActiveTab(key)}
              ariaPressed={activeTab === key}
              ariaLabel={`Filter trips by ${buttonText[key]}`}
            >
              {buttonText[key]}
            </Button>
          );
        })}
      </nav>

      <PropertiesGrid>
        {filteredTrips?.map((trip) => (
          <div key={trip.id} className="w-full flex flex-col gap-4">
            <PropertyCard property={trip?.property} trip={trip} />
            {!trip.isCancelled && (
              <Button
                variant="primary"
                className="p-2 w-full"
                onClick={() => handleCancel(trip.id)}
                aria-label={`Cancel trip ${trip.id}`}
              >
                Cancel Trip
              </Button>
            )}
          </div>
        ))}
      </PropertiesGrid>
    </div>
  );
};

export default AllTrips;
