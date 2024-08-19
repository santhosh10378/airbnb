const MenuIcon = ({ className, fill = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke="currentcolor"
      strokeWidth="3"
      aria-hidden="true"
      display="block"
      overflow="visible"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={className}
    >
      <path d="M2 16h28M2 24h28M2 8h28"></path>
    </svg>
  );
};

export default MenuIcon;
