import { Helmet } from "react-helmet";
import useFetch from "../hooks/useFetch";
import usePageInfo from "../hooks/usePageInfo";
import Container from "../layouts/Container";
import PropertiesGrid from "../layouts/PropertiesGrid";
import EmptyState from "../components/common/EmptyState";
import PropertyCard from "../components/properties/PropertyCard";
import Button from "../components/elements/Button";

const Home = () => {
  const { search, navigate } = usePageInfo();
  const { data, loading, error } = useFetch(`/properties${search}`);

  return (
    <Container>
      <Helmet>
        <title>Find the Best Properties | Your Website Name</title>
        <meta
          name="description"
          content="Discover a wide range of properties that fit your needs. From cozy apartments to luxurious homes, find your ideal place to stay with us."
        />
        <meta
          name="keywords"
          content="properties, real estate, apartments, homes, rentals"
        />
        <meta
          property="og:title"
          content="Find the Best Properties | Your Website Name"
        />
        <meta
          property="og:description"
          content="Discover a wide range of properties that fit your needs. From cozy apartments to luxurious homes, find your ideal place to stay with us."
        />
        <meta property="og:image" content="URL-to-your-thumbnail-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/home" />
      </Helmet>

      {loading ? (
        <EmptyState
          title="Loading..."
          subtitle="We are fetching properties for you."
          desc="Please wait a moment while we load the data."
        />
      ) : error ? (
        <EmptyState
          title="Error"
          subtitle="Something went wrong."
          desc="We couldn't fetch the properties. Please try again later."
        />
      ) : data?.length > 0 ? (
        <div className="pb-24">
          <PropertiesGrid>
            {data.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </PropertiesGrid>
        </div>
      ) : (
        <EmptyState
          title="No Properties Found"
          subtitle="We couldn't find any properties matching your search."
          desc="Try adjusting your filters or check back later to see updated listings."
        >
          <Button
            onClick={() => navigate("/")}
            variant="primary-outlined"
            className="px-7"
          >
            Remove filters
          </Button>
        </EmptyState>
      )}
    </Container>
  );
};

export default Home;
