import Modal from "../modal-templates/Modal";

const ReservationModal = () => {
  return (
    <Modal title="Reserve">
      <div className="p-5">
        <h2>Secure Your Perfect Stay</h2>
        <p className="text-secondary-500 mt-2 mb-10">
          Book Your Dream Property Today – Hassle-Free Reservations Await!
        </p>

        {/* <PropertyReservation /> */}
      </div>
    </Modal>
  );
};

export default ReservationModal;
