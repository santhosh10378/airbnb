import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { SearchQueryProvider } from "./SearchQueryContext";
import { NewPropertyFormProvider } from "./NewPropertyContext";

const ContextManager = ({ children }) => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <SearchQueryProvider>
          <NewPropertyFormProvider>
            <ModalProvider>{children}</ModalProvider>
          </NewPropertyFormProvider>
        </SearchQueryProvider>
      </AuthProvider>
    </>
  );
};

export default ContextManager;
