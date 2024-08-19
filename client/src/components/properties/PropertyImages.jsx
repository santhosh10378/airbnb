const PropertyImages = ({ property }) => {
  const images = property?.images || [];

  return (
    <div className="flex items-center justify-center h-[350px] gap-4">
      {/* Main Image */}
      <div className="flex-[2] w-full h-full rounded-xl overflow-hidden">
        <img
          src={images[0]}
          alt={`Main property image`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) =>
            (e.currentTarget.src = "/path/to/placeholder-image.jpg")
          }
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex-[0.7] w-full h-full grid grid-cols-1 grid-rows-3 gap-4">
        {images.slice(1, 4).map((image, index) => (
          <div key={index} className="w-full h-full rounded-xl overflow-hidden">
            <img
              src={image}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) =>
                (e.currentTarget.src = "/path/to/placeholder-image.jpg")
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImages;
