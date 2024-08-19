import usePropertyAPIs from "../../hooks/usePropertyAPIs";
import PropertiesGrid from "../../layouts/PropertiesGrid";
import Button from "../elements/Button";
import PropertyCard from "./PropertyCard";

const MyProperties = ({ properties, fetchData }) => {
  const { deleteProperty } = usePropertyAPIs();

  const handleUpdate = async () => {
    await fetchData();
  };

  const handleDelete = async (propertyId) => {
    await deleteProperty(propertyId);
    await fetchData();
  };

  return (
    <div aria-labelledby="properties-list">
      <PropertiesGrid>
        {properties?.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-col gap-4"
            aria-labelledby={`property-${item.id}-title`}
          >
            <PropertyCard property={item} />
            <div className="w-full flex flex-col gap-2">
              <Button
                variant="secondary-gradient"
                className="p-2 w-full"
                onClick={() => handleUpdate(item.id)}
                ariaLabel={`Update property ${item.title}`}
              >
                Update Property
              </Button>
              <Button
                variant="primary"
                className="p-2 w-full"
                onClick={() => handleDelete(item.id)}
                ariaLabel={`Delete property ${item.title}`}
              >
                Delete Property
              </Button>
            </div>
          </div>
        ))}
      </PropertiesGrid>
    </div>
  );
};

export default MyProperties;
