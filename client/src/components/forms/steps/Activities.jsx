import { Controller } from "react-hook-form";
import ButtonBox from "../../elements/ButtonBox";
import { nearByActivityCategory } from "../../../data/dummy";

const nearbyActivities = [
  { slug: "hiking", label: "Hiking" },
  { slug: "skiing", label: "Skiing" },
  { slug: "cycling", label: "Cycling" },
  { slug: "swimming", label: "Swimming" },
  { slug: "surfing", label: "Surfing" },
  { slug: "shopping", label: "Shopping" },
  { slug: "restaurants", label: "Restaurants" },
  { slug: "cafes", label: "Cafes" },
  { slug: "bars", label: "Bars" },
  { slug: "museums", label: "Museums" },
  { slug: "parks", label: "Parks" },
  { slug: "nightlife", label: "Nightlife" },
  { slug: "golfing", label: "Golfing" },
  { slug: "fishing", label: "Fishing" },
  { slug: "boating", label: "Boating" },
  { slug: "bird_watching", label: "Bird Watching" },
  { slug: "sightseeing", label: "Sightseeing" },
  { slug: "wine_tasting", label: "Wine Tasting" },
  { slug: "spa_treatments", label: "Spa Treatments" },
  { slug: "live_music", label: "Live Music" },
  { slug: "theater", label: "Theater" },
  { slug: "historical_sites", label: "Historical Sites" },
  { slug: "botanical_gardens", label: "Botanical Gardens" },
  { slug: "water_parks", label: "Water Parks" },
  { slug: "zoos", label: "Zoos" },
  { slug: "aquariums", label: "Aquariums" },
];

const Activities = ({ control, errors }) => {
  return (
    <div>
      {/* <label className="block mb-2">Nearby Activities</label> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {nearbyActivities.map((activity) => (
          <div key={activity.slug} className="relative">
            <Controller
              name={`nearbyActivities.${activity.slug}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <ButtonBox
                  label={activity.label}
                  value={activity.slug}
                  checked={field.value || false}
                  onChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            {errors?.nearbyActivities?.[activity.slug] && (
              <span className="absolute text-red-500 text-xs">
                {errors.nearbyActivities[activity.slug]?.message}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
