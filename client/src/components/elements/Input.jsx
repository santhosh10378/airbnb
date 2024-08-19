import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
  (
    {
      type,
      id,
      label,
      placeholder,
      value,
      onChange,
      error,
      ariaLabel,
      ariaLive = "polite",
      ariaAtomic = "true",
      labelClass,
      inputClass,
      errorClass,
      variant = "primary",
    },
    ref
  ) => {
    return (
      <>
        {variant === "primary" && (
          <label htmlFor={id} className="text-sm flex flex-col gap-1">
            {label && (
              <span className={twMerge("font-medium", labelClass)}>
                {label}
              </span>
            )}

            <input
              id={id}
              type={type}
              name={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder || (label ? `Enter ${label}` : "")}
              aria-label={ariaLabel}
              aria-describedby={error ? `${id}-error` : undefined}
              ref={ref}
              className={twMerge(
                "outline-none border p-3 rounded-md w-full focus:border-2 focus:border-black",
                error ? "border-red-600 border-2" : "border-secondary-300",
                inputClass
              )}
            />

            {error && (
              <span
                id={`${id}-error`}
                className={twMerge(
                  "text-red-600 text-xs font-medium",
                  errorClass
                )}
                aria-live={ariaLive}
                aria-atomic={ariaAtomic}
              >
                {error}
              </span>
            )}
          </label>
        )}
      </>
    );
  }
);

export default Input;
