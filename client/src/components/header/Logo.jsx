import { Link } from "react-router-dom";
import { LogoFullIcon, LogoIcon } from "../../assets";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex-none lg:flex-1 text-primary-500 hidden md:flex"
      aria-label="Homepage"
    >
      <LogoFullIcon className="hidden xl:block w-[102px] h-auto" />
      <LogoIcon className="hidden md:block xl:hidden w-[32px] h-auto" />
    </Link>
  );
};

export default Logo;
