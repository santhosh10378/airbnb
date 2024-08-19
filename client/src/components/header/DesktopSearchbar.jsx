import { SearchV2Icon } from "../../assets";
import { useModal } from "../../context/ModalContext";

const DesktopSearchbar = () => {
  const { openModal } = useModal();

  return (
    <div
      className="hidden md:flex items-center justify-center text-sm"
      role="search"
      aria-label="Search bar"
    >
      <div
        onClick={() => openModal("SearchModal")}
        className="flex border py-2 rounded-full items-center font-semibold transition cursor-pointer hover:shadow"
        role="button"
        aria-label="Open search modal"
      >
        <p className="px-4">Anywhere</p>
        <p className="px-4 border-x">Anyweek</p>
        <div className="flex items-center gap-2 px-4 pr-2">
          <p className="text-secondary-500 font-normal">Add guests</p>
          <div className="rounded-full bg-primary-500 text-white p-2 flex items-center justify-center">
            <SearchV2Icon className="size-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchbar;
