import { forwardRef } from "react";
import { CheckIcon } from "../../assets";

const Checkbox = forwardRef(
  ({ label, value, onChange, checked = false }, ref) => {
    return (
      <label className="flex items-center gap-x-2 cursor-pointer transition">
        <input
          type="checkbox"
          className="hidden peer"
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
        />
        <div className="w-6 h-6 p-1 bg-secondary-200 text-secondary-200 rounded-md flex items-center justify-center peer-checked:bg-secondary-gradient peer-checked:text-white">
          <CheckIcon />
        </div>
        <span className="truncate">{label}</span>
      </label>
    );
  }
);

export default Checkbox;
