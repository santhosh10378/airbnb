import { twMerge } from "tailwind-merge";

const PropertiesGrid = ({ children, className }) => {
  return (
    <section
      className={twMerge(
        `
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        2xl:grid-cols-6 
        gap-x-6
        gap-y-14 
        
        `,
        className
      )}
    >
      {children}
    </section>
  );
};

export default PropertiesGrid;
