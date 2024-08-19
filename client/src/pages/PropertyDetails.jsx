import { Helmet } from "react-helmet";
import { ChevronLeftIcon } from "../assets";
import useFetch from "../hooks/useFetch";
import usePageInfo from "../hooks/usePageInfo";
import Container from "../layouts/Container";
import Button from "../components/elements/Button";
import PropertyWishlist from "../components/properties/PropertyWishlist";
import PropertyAmenities from "../components/properties/PropertyAmenities";
import PropertyDescription from "../components/properties/PropertyDescription";
import PropertyImages from "../components/properties/PropertyImages";
import PropertyCounts from "../components/properties/PropertyCounts";
import ImgCarousel from "../components/properties/ImgCarousel";
import PropertyReservation from "../components/properties/PropertyReservation";
import PropertyTypeTexts from "../components/properties/PropertyTypeTexts";
import EmptyState from "../components/common/EmptyState";

const PropertyDetails = () => {
  const { params, goBack } = usePageInfo();
  const { data, loading, error } = useFetch(`/properties/${params?.id}`);

  if (loading) {
    return (
      <Container>
        <EmptyState
          title="Loading..."
          subtitle="Fetching property details."
          desc="Please wait while we load the property details."
        />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyState
          title="Error"
          subtitle="Unable to fetch property details."
          desc="There was an issue retrieving the property details. Please try again later."
        />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <EmptyState
          title="Not Found"
          subtitle="The requested property could not be found."
          desc="It appears that the property you are looking for does not exist."
        />
      </Container>
    );
  }

  const title = data?.title || "Property Details";
  const description = `Explore details for the property at ${data?.title}. View images, amenities, and specifications.`;
  const imageUrl =
    data?.images?.[0]?.url || "URL-to-default-thumbnail-image.jpg";
  const propertyUrl = `https://yourwebsite.com/properties/${params?.id}`;

  return (
    <>
      <Helmet>
        <title>{title} | Your Website Name</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="property details, property specifications, property amenities, real estate"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={propertyUrl} />
      </Helmet>

      <Container>
        <div className="flex flex-col gap-3 pb-28 md:pb-14 w-full h-auto">
          <section className="flex flex-col gap-3">
            <Button
              onClick={goBack}
              className="lg:hidden p-[4px]"
              variant="primary-ghost"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
          </section>

          <section className="flex items-start gap-10">
            <div className="flex-[2] flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                <div className="hidden md:block">
                  <PropertyImages property={data} />
                </div>
                <div className="md:hidden rounded-2xl overflow-hidden">
                  <ImgCarousel property={data} />
                </div>
                <div className="flex items-center justify-between">
                  <PropertyCounts property={data} />
                  <PropertyWishlist property={data} />
                </div>

                <PropertyTypeTexts property={data} />

                <hr />
              </div>

              <PropertyDescription property={data} />
              <hr />
              <PropertyAmenities property={data} />
            </div>
            <div className="flex-[1] hidden lg:block sticky top-[100px]">
              <PropertyReservation />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};

export default PropertyDetails;
