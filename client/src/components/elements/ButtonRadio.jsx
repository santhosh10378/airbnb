import { forwardRef } from "react";

const ButtonRadio = forwardRef(
  ({ label, icon, value, name, onChange, checked = false }, ref) => {
    return (
      <label className="flex items-center gap-x-2 cursor-pointer transition">
        <input
          type="radio"
          className="hidden peer"
          value={value}
          name={name}
          onChange={onChange}
          checked={checked}
          ref={ref}
        />
        <div
          className="
            peer-checked:bg-secondary-gradient  peer-checked:text-white peer-checked:border-secondary-900 peer-checked:hover:opacity-80
            text-secondary-900 border border-secondary-400 hover:bg-secondary-200
            transition w-full rounded-xl p-3 font-medium flex items-center gap-2 text-sm truncate text-left
          "
        >
          {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
          <span>{label}</span>
        </div>
      </label>
    );
  }
);

export default ButtonRadio;
