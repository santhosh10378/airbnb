import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import usePageInfo from "../../hooks/usePageInfo";
import Button from "../elements/Button";

const UserLinks = () => {
  const { navLinks } = usePageInfo();
  const { openModal } = useModal();
  const { user, logoutUser } = useAuth();

  const handleAirbnb = () => {
    if (user) {
      openModal("NewPropertyModal");
    } else {
      openModal("LoginModal");
    }
  };

  return (
    <nav
      aria-label="User Navigation"
      className="w-full flex items-center justify-end "
    >
      {user ? (
        <ul className="w-[70%] bg-white shadow-custom-shadow-1 rounded-xl overflow-hidden ">
          {/* Button for adding new property */}
          <li>
            <Button
              variant="primary-ghost"
              className="w-full rounded-none"
              onClick={handleAirbnb}
              aria-label="Airbnb your home"
            >
              <span className="w-full text-left">Airbnb your home</span>
            </Button>
          </li>

          {/* Navigation links */}
          {navLinks
            .filter((item) => item.isDesk)
            .map((link, index) => (
              <li key={link.pathname}>
                <Button variant="primary-ghost" className="w-full rounded-none">
                  <Link
                    to={link.pathname}
                    className="w-full text-left"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </Button>
                {(index === 1 || index === 4) && <hr />}
              </li>
            ))}

          {/* Sign Out button */}
          <li>
            <Button
              onClick={logoutUser}
              variant="primary-ghost"
              className="w-full text-left rounded-none"
              ariaLabel="Sign out"
            >
              <span className="text-red-500 w-full text-left">Sign Out</span>
            </Button>
          </li>
        </ul>
      ) : (
        <ul className="w-[50%] bg-white shadow-custom-shadow-1 rounded-xl overflow-hidden ">
          {/* Sign Up button */}
          <li>
            <Button
              onClick={() => openModal("RegisterModal")}
              variant="primary-ghost"
              className="w-full text-left rounded-none"
              ariaLabel="Sign up"
            >
              <span className="w-full text-left">Sign Up</span>
            </Button>
          </li>
          {/* Sign In button */}
          <li>
            <Button
              onClick={() => openModal("LoginModal")}
              variant="primary-ghost"
              className="w-full text-left rounded-none"
              ariaLabel="Sign in"
            >
              <span className="w-full text-left">Sign In</span>
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default UserLinks;
