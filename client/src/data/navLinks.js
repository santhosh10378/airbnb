import {
  HeartIcon,
  LogoIcon,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
} from "../assets";

export const navLinks = [
  {
    pathname: "/",
    label: "Explore",
    icon: SearchIcon,
    isMobile: true,
    isDesk: false,
  },
  {
    pathname: "/account/wishlists",
    label: "Wishlists",
    subroutes: ["/account/wishlists/"],
    icon: HeartIcon,
    isMobile: true,
    isDesk: true,
  },
  {
    pathname: "/account/properties",
    label: "Manage Properties",
    isMobile: false,
    isDesk: true,
  },
  {
    pathname: "/account/trips",
    label: "Trips",
    icon: LogoIcon,
    isMobile: true,
    isDesk: true,
  },
  {
    pathname: "/account/messages",
    label: "Messages",
    icon: MessageIcon,
    isMobile: true,
    isDesk: true,
  },
  {
    pathname: "/account/profile",
    subroutes: ["/account/properties"],
    label: "Profile",
    icon: ProfileIcon,
    isMobile: true,
    isDesk: true,
  },
];
