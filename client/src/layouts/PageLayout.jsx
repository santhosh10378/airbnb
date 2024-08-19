import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import ContextManager from "../context/ContextManager";
import usePageInfo from "../hooks/usePageInfo";

import Container from "./Container";
import Logo from "../components/header/Logo";
import UserMenu from "../components/header/UserMenu";
import Filters from "../components/header/Filters";
import MobileSearchbar from "../components/header/MobileSearchbar";
import DesktopSearchbar from "../components/header/DesktopSearchbar";
import PrimaryMobileNav from "../components/header/navigations/PrimaryMobileNav";
import SinglePropertyNav from "../components/header/navigations/SinglePropertyNav";
import QucikFilters from "../components/header/QucikFilters";
import ModalManager from "../components/modals/modal-managers/ModalManager";

const PageLayout = () => {
  const { isSinglePropertyPage, isHomePage } = usePageInfo();

  return (
    <ContextManager>
      <header className="bg-white h-[80px] w-full fixed top-0 left-0 border-b z-30">
        <Container>
          <div className="flex items-center justify-between gap-3 lg:gap-0 w-full h-full">
            <Logo />
            <DesktopSearchbar />
            <MobileSearchbar />
            <UserMenu />
            <div className="md:hidden">
              <Filters />
            </div>
          </div>
          {isSinglePropertyPage ? <SinglePropertyNav /> : <PrimaryMobileNav />}
        </Container>
      </header>

      <main
        className={twMerge(
          "min-h-screen h-screen",
          isHomePage ? "pt-[180px]" : "pt-[100px]"
        )}
      >
        {isHomePage && <QucikFilters />}
        <Outlet />
        <ModalManager />
      </main>
    </ContextManager>
  );
};

export default PageLayout;
