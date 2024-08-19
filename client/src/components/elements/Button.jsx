import { twMerge } from "tailwind-merge";
import { useMemo } from "react";

const Button = ({
  variant = "primary",
  type = "button",
  disabled,
  className,
  children,
  onClick,
  ariaLabel,
  ariaPressed,
  title,
}) => {
  const variantClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return "bg-primary-500 text-white border border-primary-500 hover:opacity-80";
      case "secondary":
        return "bg-secondary-900 text-white border border-secondary-500 hover:opacity-80";
      case "primary-gradient":
        return "bg-primary-gradient text-white border border-primary-500 hover:opacity-80";
      case "secondary-gradient":
        return "bg-secondary-gradient text-white border border-secondary-900 hover:opacity-80";
      case "primary-outlined":
        return "text-secondary-900 border border-secondary-900 hover:bg-secondary-200";
      case "secondary-outlined":
        return "text-secondary-900 border border-secondary-300 hover:bg-secondary-200";
      case "primary-ghost":
        return "text-secondary-900 hover:bg-secondary-200";
      case "primary-link":
        return "text-secondary-900 hover:underline p-0";
      case "secondary-link":
        return "text-secondary-900 underline p-0";
      default:
        return "";
    }
  }, [variant]);

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={twMerge(
        "transition w-max rounded-md p-3 font-medium flex items-center justify-center gap-2 text-sm",
        variantClass,
        className
      )}
      aria-disabled={disabled ? "true" : "false"}
      aria-label={ariaLabel}
      title={title}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
};

export default Button;
