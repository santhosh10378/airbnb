const CloseIcon = ({ className, fill = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke="currentcolor"
      strokeWidth="3"
      aria-hidden="true"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={className}
    >
      <path d="M6 6l20 20m0-20L6 26"></path>
    </svg>
  );
};

export default CloseIcon;
