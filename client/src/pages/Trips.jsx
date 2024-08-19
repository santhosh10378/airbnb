import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import Container from "../layouts/Container";
import EmptyState from "../components/common/EmptyState";
import AllTrips from "../components/properties/AllTrips";

const Trips = () => {
  const { user } = useAuth();

  const {
    data: tripsData,
    loading: tripsLoading,
    error: tripsError,
    fetchData: fetchTripsData,
  } = useFetch(`/bookings?userId=${user?.id}`);

  return (
    <>
      <Helmet>
        <title>Your Trips | Your Website Name</title>
        <meta
          name="description"
          content="View and manage your travel adventures, from upcoming vacations to completed journeys. Stay organized and keep track of all your trips."
        />
        <meta
          name="keywords"
          content="travel, trips, vacations, travel management, bookings"
        />
        <meta property="og:title" content="Your Trips" />
        <meta
          property="og:description"
          content="View and manage your travel adventures, from upcoming vacations to completed journeys. Stay organized and keep track of all your trips."
        />
        <meta
          property="og:image"
          content="URL-to-default-thumbnail-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com/trips" />
      </Helmet>

      <Container>
        {tripsLoading && <EmptyState />}

        {!tripsLoading && tripsError && (
          <EmptyState
            title="Error"
            subtitle="Something went wrong while fetching your trips."
          />
        )}

        {!tripsLoading && !tripsError && tripsData?.length > 0 && (
          <div className="space-y-5 pb-24">
            <div>
              <h2>Explore Your Travel Adventures</h2>
              <p className=" text-gray-600">
                Keep track of all your trips, from upcoming vacations to
                completed journeys. Manage your travel plans efficiently and
                stay organized with your trip details.
              </p>
            </div>
            <AllTrips trips={tripsData} fetchData={fetchTripsData} />
          </div>
        )}

        {!tripsLoading && !tripsError && tripsData?.length === 0 && (
          <EmptyState
            title="No Trips Found"
            subtitle="You don't have any trips scheduled or completed yet. Check back later or start planning your next adventure!"
          />
        )}
      </Container>
    </>
  );
};

export default Trips;
