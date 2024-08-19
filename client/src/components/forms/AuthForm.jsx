import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(50, "First name should not exceed 50 characters.")
    .optional(),

  email: z
    .string()
    .email("Invalid email address.")
    .max(100, "Email should not exceed 100 characters."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(20, "Password should not exceed 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one digit.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character."
    ),
});

const AuthForm = ({ isLogin }) => {
  const { loginUser, registerUser, loading } = useAuth();
  const { openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      await loginUser(data);
    } else {
      await registerUser(data);
    }
    closeModal();
  };

  console.log(errors);

  return (
    <section aria-labelledby="form-title" className="p-5 border-t">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-5">
          {/* <legend className="text-lg font-medium mb-5 text-center">
            Register
          </legend> */}

          {!isLogin && (
            <Input
              type="text"
              id="firstName"
              label="First Name"
              placeholder="Enter your first name"
              {...register("firstName")}
              error={errors.firstName?.message}
              ariaLabel="First Name"
            />
          )}

          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email address"
            {...register("email")}
            error={errors.email?.message}
            ariaLabel="Email"
          />

          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
            ariaLabel="Password"
          />

          <div className="flex flex-col gap-2">
            <Button disabled={loading} className="w-full" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
            <div className="flex items-center justify-center gap-1">
              <span className="text-secondary-500 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <Button
                disabled={loading}
                onClick={() => {
                  openModal(isLogin ? "RegisterModal" : "LoginModal");
                }}
                variant="primary-link"
                className="text-sm"
                ariaLabel={
                  isLogin ? "Open Registration Modal" : "Open Login Modal"
                }
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AuthForm;
