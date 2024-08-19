const MessageIcon = ({ className, fill = "none" }) => {
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
      <path d="M26 3a4 4 0 014 4v14a4 4 0 01-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 01-4-4V7a4 4 0 014-4z"></path>
    </svg>
  );
};

export default MessageIcon;
