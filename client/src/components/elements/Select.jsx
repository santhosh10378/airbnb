import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Select = forwardRef(
  ({ id, label, options, error, selectClass, labelClass, ...props }, ref) => (
    <div className="text-sm  flex flex-col gap-1">
      <label htmlFor={id} className={twMerge("font-medium", labelClass)}>
        {label}
      </label>
      <select
        id={id}
        ref={ref}
        {...props}
        className={twMerge(
          "outline-none border p-3 rounded-md w-full focus:border-2 focus:border-black",
          error ? "border-red-600 border-2" : "border-secondary-300",
          selectClass
        )}
      >
        <option value="">Select {label}</option>
        {options.map(({ code, name }) => (
          <option key={code} value={code}>
            {name} ({code})
          </option>
        ))}
      </select>
    </div>
  )
);

export default Select;
