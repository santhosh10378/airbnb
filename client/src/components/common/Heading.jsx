import { twMerge } from "tailwind-merge";

const Heading = ({ title, subtitle, titleClass, subtitleClass }) => {
  return (
    <>
      {title && (
        <h1 className={twMerge("mb-3 text-center", titleClass)}>{title}</h1>
      )}
      {subtitle && (
        <p
          className={twMerge(
            "text-base text-secondary-500 mb-6 text-center",
            subtitleClass
          )}
        >
          {subtitle}
        </p>
      )}
    </>
  );
};

export default Heading;
