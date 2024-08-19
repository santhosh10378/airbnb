import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { MenuIcon } from "../../assets";
import Avatar from "../common/Avatar";
import Button from "../elements/Button";
import UserLinks from "./UserLinks";
import { useAuth } from "../../context/AuthContext";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleAirbnb = () => {
    if (user) {
      openModal("NewPropertyModal");
    } else {
      openModal("LoginModal");
    }
  };

  return (
    <div className="flex-[1] hidden md:flex items-center justify-end">
      <div className="flex items-center justify-end gap-2 relative">
        <Button
          onClick={handleAirbnb}
          variant="primary-ghost"
          className="rounded-full"
          ariaLabel="List your home on Airbnb"
        >
          Airbnb your home
        </Button>

        <Button
          onClick={handleMenuToggle}
          variant="secondary-outlined"
          className="rounded-full"
          ariaLabel="User menu"
        >
          <MenuIcon className="size-5 text-secondary-800" />
          <Avatar />
        </Button>

        {isMenuOpen && (
          <div
            onClick={handleMenuToggle}
            className="absolute top-[110%] right-0 w-full"
            role="menu"
            aria-label="User menu options"
          >
            <UserLinks />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
