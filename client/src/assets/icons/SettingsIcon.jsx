const SettingsIcon = ({ className, fill = "none" }) => {
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
      <path d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 108 0 4 4 0 00-8 0zM17 6a4 4 0 108 0 4 4 0 00-8 0zm0 20a4 4 0 108 0 4 4 0 00-8 0zm0 0H3"></path>
    </svg>
  );
};

export default SettingsIcon;
