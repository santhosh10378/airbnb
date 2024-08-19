import { useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AutoAddressComplete = ({ setAddress }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const autocompleteRef = useRef(null);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (place.geometry) {
      const addressComponents = place.address_components;
      const getAddressComponent = (type) =>
        addressComponents.find((component) => component.types.includes(type))
          ?.long_name || "";

      setAddress({
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        city: getAddressComponent("locality"),
        state: getAddressComponent("administrative_area_level_1"),
        country: getAddressComponent("country"),
        zipCode: getAddressComponent("postal_code"),
      });
    }
  };

  return (
    <div>
      {isLoaded && (
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            className="w-full mt-1 border-2 rounded-lg p-2 outline-none"
            placeholder="Select location"
          />
        </Autocomplete>
      )}
    </div>
  );
};

export default AutoAddressComplete;
