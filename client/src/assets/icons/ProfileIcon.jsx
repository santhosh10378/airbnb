const ProfileIcon = ({ className, fill = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke="currentcolor"
      strokeWidth="2"
      aria-hidden="true"
      display="block"
      overflow="visible"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={className}
    >
      <circle cx="16" cy="16" r="14"></circle>
      <path d="M14.02 19.66a6 6 0 113.96 0m-.63.01H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0114 19.67h.62"></path>
    </svg>
  );
};

export default ProfileIcon;
