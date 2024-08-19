import Heading from "../components/common/Heading";
import Button from "../components/elements/Button";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-secondary-600">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return user ? (
    element
  ) : (
    <div className="flex flex-col items-center justify-center text-center h-full text-secondary-600 p-5">
      <Heading
        title="Start Your Journey with Us"
        subtitle="Sign in to access your trips, save your favorite places, check your messages, and manage your profile."
      />
      <Button
        variant="primary-gradient"
        onClick={() => openModal("LoginModal")}
        aria-label="Log in to access your account"
      >
        Log in to Explore
      </Button>
    </div>
  );
};

export default ProtectedRoute;
