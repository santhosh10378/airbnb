import Container from "../../layouts/Container";
import Filters from "./Filters";
import PropertyFilters from "./PropertyFilters";

const QuickFilters = () => {
  return (
    <div
      role="region"
      aria-label="Quick Filters"
      className="shadow-md bg-white z-20 fixed top-[80px] w-full"
    >
      <Container>
        <div className="relative h-full w-full flex items-center gap-4">
          <PropertyFilters />
          <div className="hidden md:block">
            <Filters />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuickFilters;
