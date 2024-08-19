const SearchIcon = ({ className, fill = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke="currentcolor"
      strokeWidth="2.667"
      aria-hidden="true"
      display="block"
      overflow="visible"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M19 19l11 11"></path>
    </svg>
  );
};

export default SearchIcon;
