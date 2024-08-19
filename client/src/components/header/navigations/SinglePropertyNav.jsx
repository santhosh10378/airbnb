import Container from "../../../layouts/Container";
import Button from "../../elements/Button";
import { formatCurrency } from "../../../utils/currencyUtils";
import { useModal } from "../../../context/ModalContext";

const SinglePropertyNav = () => {
  const { openModal } = useModal();

  return (
    <nav
      aria-label="Single Property Navigation"
      className="lg:hidden fixed bg-white z-10 bottom-0 left-0 w-full h-[65px] border-t"
    >
      <Container>
        <div
          role="button"
          aria-label="Open Reservation Modal"
          onClick={() => openModal("ReservationModal")}
          className="h-full w-full flex items-center justify-between cursor-pointer"
        >
          <div>
            <p>
              <span className="font-semibold text-lg text-secondary-800">
                {formatCurrency({ amount: 2500 })}
              </span>
              &nbsp;
              <span className="text-secondary-600 text-sm">night</span>
            </p>
          </div>
          <Button
            variant="primary-gradient"
            ariaLabel="Reserve"
            className="px-7"
          >
            Reserve
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default SinglePropertyNav;
