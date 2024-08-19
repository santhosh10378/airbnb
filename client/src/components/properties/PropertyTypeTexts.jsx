import React from "react";
import { propertyTypes, placeTypes } from "../../data/dummy";

const PropertyTypeTexts = ({ property }) => {
  const propertyType = propertyTypes.find(
    (type) => type.slug === property?.propertyType
  );
  const placeType = placeTypes.find(
    (type) => type.slug === property?.placeTypes
  );

  return (
    <div className="font-semibold text-lg">
      <span className="">{`${propertyType?.name} in `}</span>
      <span>{`${property?.city}, ${property?.country} `}</span>
      <span>{`(${placeType?.name}) `}</span>
    </div>
  );
};

export default PropertyTypeTexts;
