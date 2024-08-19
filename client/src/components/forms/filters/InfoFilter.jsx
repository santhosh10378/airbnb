import { MinusIcon, PlusIcon } from "../../../assets";
import { useSearchQuery } from "../../../context/SearchQueryContext";
import Button from "../../elements/Button";

const items = [
  {
    label: "Adults",
    description: "Ages 13 or above",
    type: "noOfAdults",
  },
  { label: "Children", description: "Ages 2–12", type: "noOfChildren" },
  { label: "Infants", description: "Under 2", type: "noOfInfants" },
];

const InfoFilter = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  const handleChange = (type, amount) => {
    if (searchQuery[type]) {
      updateSearchQuery({ [type]: searchQuery[type] + amount });
    } else {
      updateSearchQuery({ [type]: amount });
    }
  };

  return (
    <div className="bg-white flex flex-col gap-5 cursor-pointer transition rounded-2xl p-5 shadow-custom-shadow-2">
      <h2>Who’s coming?</h2>
      <div>
        {items.map(({ label, description, type }, i) => (
          <div key={type} className="flex flex-col gap-5">
            {i !== 0 && <hr className="mt-5" />}
            <div className="flex items-center justify-between gap-1">
              <div>
                <h3>{label}</h3>
                <p className="text-secondary-500 font-medium text-sm">
                  {description}
                </p>
              </div>
              <div className="flex items-center gap-3 text-secondary-500">
                <Button
                  onClick={() => handleChange(type, -1)}
                  disabled={
                    searchQuery[type] <= 0 ||
                    (type === "noOfAdults" && searchQuery.noOfAdults <= 1)
                  }
                  variant="secondary-outlined"
                  className="rounded-full p-2"
                >
                  <MinusIcon className="size-3" />
                </Button>
                <input
                  type="text"
                  value={searchQuery[type] || 0}
                  readOnly
                  className="w-5 text-secondary-800 text-center border-none bg-transparent"
                />
                <Button
                  onClick={() => handleChange(type, 1)}
                  variant="secondary-outlined"
                  className="rounded-full p-2"
                >
                  <PlusIcon className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoFilter;
