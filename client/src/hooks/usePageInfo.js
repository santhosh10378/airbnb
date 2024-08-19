import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  HeartIcon,
  LogoIcon,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
} from "../assets";

const usePageInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const refreshPage = useCallback(() => {
    try {
      navigate(pathname, { replace: true });
    } catch (error) {
      console.error("Failed to refresh page:", error);
    }
  }, [navigate, pathname]);

  const goBack = useCallback(() => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Failed to go back:", error);
    }
  }, [navigate]);

  const goForward = useCallback(() => {
    try {
      navigate(1);
    } catch (error) {
      console.error("Failed to go forward:", error);
    }
  }, [navigate]);

  const pageChecks = {
    isHomePage: pathname === "/",
    isSinglePropertyPage: pathname.startsWith("/properties/"),
    isAccountPage: pathname.startsWith("/account/"),
    isMessagesPage: pathname.startsWith("/account/messages"),
    isTripsPage: pathname.startsWith("/account/trips"),
    isWishlistsPage: pathname.startsWith("/account/wishlists"),
    isMypropertiesPage: pathname.startsWith("/account/properties"),
    isProfilePage: pathname.startsWith("/account/profile"),
  };

  const navLinks = [
    {
      pathname: "/",
      subroutes: [],
      label: "Explore",
      icon: SearchIcon,
      isMobile: true,
      isDesk: false,
    },
    {
      pathname: "/account/wishlists",
      label: "Wishlists",
      subroutes: [`/account/wishlists/${params.id}`],
      icon: HeartIcon,
      isMobile: true,
      isDesk: true,
    },
    {
      pathname: "/account/trips",
      subroutes: [],
      label: "Trips",
      icon: LogoIcon,
      isMobile: true,
      isDesk: true,
    },
    {
      pathname: "/account/bookings",
      subroutes: [],
      label: "Manage Bookings",
      icon: LogoIcon,
      isMobile: false,
      isDesk: true,
    },

    {
      pathname: "/account/properties",
      subroutes: [],
      label: "Manage Properties",
      isMobile: false,
      isDesk: true,
    },
    {
      pathname: "/account/messages",
      subroutes: [],
      label: "Messages",
      icon: MessageIcon,
      isMobile: true,
      isDesk: true,
    },
    {
      pathname: "/account/profile",
      subroutes: ["/account/properties", "/account/bookings"],
      label: "Profile",
      icon: ProfileIcon,
      isMobile: true,
      isDesk: true,
    },
  ];

  return {
    ...pageChecks,
    navLinks,
    refreshPage,
    goBack,
    goForward,
    pathname,
    params,
    search,
    searchParams,
    navigate,
    setSearchParams,
  };
};

export default usePageInfo;
