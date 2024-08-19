import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import Container from "../layouts/Container";
import EmptyState from "../components/common/EmptyState";
import MyProperties from "../components/properties/MyProperties";

const ManageProperties = () => {
  const { user } = useAuth();
  const { data, loading, error, fetchData } = useFetch(
    `/properties?hostId=${user?.id}`
  );

  return (
    <Container>
      <Helmet>
        <title>Manage Your Properties | Your Website Name</title>
        <meta
          name="description"
          content="Manage your properties efficiently with our easy-to-use platform. View, edit, or add new properties to your listing."
        />
        <meta
          name="keywords"
          content="manage properties, property listings, real estate management, host properties"
        />
        <meta
          property="og:title"
          content="Manage Your Properties | Your Website Name"
        />
        <meta
          property="og:description"
          content="Manage your properties efficiently with our easy-to-use platform. View, edit, or add new properties to your listing."
        />
        <meta property="og:image" content="URL-to-your-thumbnail-image.jpg" />
        <meta
          property="og:url"
          content="https://yourwebsite.com/manage-properties"
        />
      </Helmet>

      {loading && (
        <EmptyState
          title="Loading..."
          subtitle="We are fetching your properties."
          desc="Please wait a moment while we load your properties."
        />
      )}

      {!loading && error && (
        <EmptyState
          title="Error"
          subtitle="Something went wrong while fetching properties."
        />
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="space-y-5 pb-24">
          <MyProperties properties={data} fetchData={fetchData} />
        </div>
      )}

      {!loading && !error && data?.length === 0 && (
        <EmptyState
          title="No Properties Found"
          subtitle="You haven't added any properties yet. Please add some properties to manage them."
        />
      )}
    </Container>
  );
};

export default ManageProperties;
