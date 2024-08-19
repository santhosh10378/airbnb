const FilterHeading = ({ title, subtitle }) => {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {subtitle && (
        <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default FilterHeading;
