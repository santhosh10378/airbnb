import { Link, useLocation } from "react-router-dom";
import usePageInfo from "../../../hooks/usePageInfo";

const PrimaryMobileNav = () => {
  const { pathname } = useLocation();
  const { navLinks } = usePageInfo();

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="md:hidden fixed bg-white z-10 bottom-0 left-0 w-full h-[60px] border-t"
    >
      <ul className="bg-white w-full h-full flex items-center justify-center gap-1">
        {navLinks
          .filter((navItem) => navItem.isMobile)
          .map((route, index) => (
            <li
              key={index}
              className={`${
                pathname === route.pathname ||
                route?.subroutes?.includes(pathname)
                  ? "text-primary-500 font-semibold"
                  : "text-secondary-600"
              } w-full transition hover:text-primary-500`}
              aria-current={pathname === route.pathname ? "page" : undefined}
            >
              <Link
                to={route.pathname}
                className="w-full flex flex-col gap-1 items-center justify-center cursor-pointer"
                aria-label={route.label}
              >
                <route.icon className="size-5" aria-hidden="true" />
                <p className="text-xs">{route.label}</p>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default PrimaryMobileNav;
