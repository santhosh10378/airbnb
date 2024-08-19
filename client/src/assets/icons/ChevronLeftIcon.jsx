const ChevronLeftIcon = ({ fill = "none", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke="currentcolor"
      strokeWidth="4"
      aria-hidden="true"
      display="block"
      overflow="visible"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={className}
    >
      <path d="M20 28L8.7 16.7a1 1 0 010-1.4L20 4"></path>
    </svg>
  );
};

export default ChevronLeftIcon;
