import { SettingsIcon } from "../../assets";
import { useModal } from "../../context/ModalContext";
import Button from "../elements/Button";

const Filters = () => {
  const { openModal } = useModal();

  return (
    <Button
      ariaLabel="Open Filters"
      variant="secondary-outlined"
      className="rounded-full md:rounded-xl md:px-5 w-max md:py-4 flex items-center gap-2"
      onClick={() => openModal("FiltersModal")}
    >
      <SettingsIcon className="size-5 md:size-4 text-secondary-700" />
      <span className="hidden md:block">Filters</span>
    </Button>
  );
};

export default Filters;
