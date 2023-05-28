import { useForm } from "react-hook-form";
import { StyledForm } from "./style";
import { useLoginMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
interface Props {
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm = ({ setModalLoading }: Props) => {
  const router = useRouter();
  const [login, { client, error: loginError }] = useLoginMutation();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const loginHandler = async (payload: { email: string; password: string }) => {
    setModalLoading(true);
    try {
      const response = await login({
        variables: payload
      });
      if (!response.data || !response.data.login) {
        throw new Error("Internal server error, no token...");
      }
      localStorage.setItem("accessToken", response.data.login.accessToken);
      await client.clearStore();
      router.push("/");
    } catch (error) {
      toast.error("Bad email or password!");
      console.log(error);
    }
    setModalLoading(false);
  };
  return (
    <StyledForm onSubmit={handleSubmit(loginHandler)}>
      <div className="control">
        <label htmlFor="email">
          Email
          <input
            type="email"
            {...register("email", {
              required: "Email is required"
            })}
          />
        </label>
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="control">
        <label htmlFor="password">
          Password
          <input
            type="password"
            {...register("password", {
              required: "Password is required"
            })}
          />
        </label>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="actions">
        <button type="submit">Login</button>
      </div>
    </StyledForm>
  );
};

export default LoginForm;
