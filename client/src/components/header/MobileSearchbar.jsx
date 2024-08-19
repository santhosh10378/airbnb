import { SearchIcon } from "../../assets";
import { useModal } from "../../context/ModalContext";

const MobileSearchbar = () => {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal("SearchModal")}
      className="md:hidden rounded-full p-2 px-4 flex items-center gap-3 border w-full shadow cursor-pointer transition hover:shadow-sm"
      role="button"
      aria-label="Open search modal"
    >
      <SearchIcon className="size-5" />

      <div className="flex flex-col gap-[1px]">
        <p className="font-semibold text-sm" aria-hidden="true">
          Where to?
        </p>
        <p className="text-xs text-gray-500" aria-hidden="true">
          <span>Anywhere</span> • <span>Any week</span> •{" "}
          <span>Add guests</span>
        </p>
      </div>
    </div>
  );
};

export default MobileSearchbar;
