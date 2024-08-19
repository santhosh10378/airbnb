import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FaLocationArrow } from "react-icons/fa6";

const libraries = ["places"];

const LocationMap = ({ longitude, latitude, loadingText }) => {
  const [map, setMap] = useState(null);

  const position = {
    lat: latitude || 17.7041,
    lng: longitude || 83.2977,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-2xl">
      <div
        onClick={() => map && map.panTo(position)}
        className="absolute right-3 top-16 cursor-pointer z-10 bg-primary-500 text-white rounded-full p-2"
      >
        <FaLocationArrow />
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={position}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={position} />
        </GoogleMap>
      ) : loadError ? (
        <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-center">
          <p>Error loading map. Please try again later.</p>
        </div>
      ) : (
        <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-center">
          {loadingText || "Loading map..."}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
