import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import Container from "../layouts/Container";
import EmptyState from "../components/common/EmptyState";
import AllBookings from "../components/properties/AllBookings";

const Bookings = () => {
  const { user } = useAuth();

  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    fetchData: fetchBookingsData,
  } = useFetch(`/bookings?hostId=${user?.id}`);

  return (
    <>
      <Helmet>
        <title>Manage Your Property Bookings | Your Website Name</title>
        <meta
          name="description"
          content="View and manage all bookings for your properties in one place. Check the status of your reservations, handle cancellations, and confirm new bookings with ease."
        />
        <meta
          name="keywords"
          content="property bookings, manage bookings, reservations, property management"
        />
        <meta property="og:title" content="Manage Your Property Bookings" />
        <meta
          property="og:description"
          content="View and manage all bookings for your properties in one place. Check the status of your reservations, handle cancellations, and confirm new bookings with ease."
        />
        <meta
          property="og:image"
          content="URL-to-default-thumbnail-image.jpg"
        />
        <meta
          property="og:url"
          content="https://yourwebsite.com/account/bookings"
        />
      </Helmet>

      <Container>
        {bookingsLoading && <EmptyState />}

        {!bookingsLoading && bookingsError && (
          <EmptyState
            title="Error"
            subtitle="Something went wrong while fetching your bookings."
          />
        )}

        {!bookingsLoading && !bookingsError && bookingsData?.length > 0 && (
          <div className="space-y-5 pb-24">
            <div>
              <h2>Manage Your Property Bookings</h2>
              <p className="text-gray-600">
                View and manage all bookings for your properties in one place.
                Check the status of your reservations, handle cancellations, and
                confirm new bookings with ease.
              </p>
            </div>
            <AllBookings
              bookings={bookingsData}
              fetchData={fetchBookingsData}
            />
          </div>
        )}

        {!bookingsLoading && !bookingsError && bookingsData?.length === 0 && (
          <EmptyState
            title="No Bookings Found"
            subtitle="You don't have any bookings yet. Start accepting reservations to manage them here."
          />
        )}
      </Container>
    </>
  );
};

export default Bookings;
