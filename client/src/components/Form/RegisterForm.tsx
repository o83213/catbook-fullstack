import { useForm } from "react-hook-form";
import { StyledForm } from "./style";
import { emailValidation } from "@utils/inputValidation";
import { useRouter } from "next/router";
import { useRegisterMutation } from "@generated/graphql";
import toast from "react-hot-toast";
interface Props {
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterForm = ({ setModalLoading }: Props) => {
  const router = useRouter();
  const [registerUser] = useRegisterMutation();
  const registerHandler = async (payload: {
    email: string;
    password: string;
    name: string;
  }) => {
    setModalLoading(true);
    try {
      await registerUser({
        variables: payload
      });
      router.reload();
    } catch (error) {
      console.log(error);
      toast.error("Email has been used!");
    }
    setModalLoading(false);
  };
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });
  return (
    <StyledForm onSubmit={handleSubmit(registerHandler)}>
      <div className="control">
        <label>
          Email
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required"
              },
              validate: (value) => emailValidation(value)
            })}
          />
        </label>
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="control">
        <label>
          Password
          <input
            type="password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
          />
        </label>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="control">
        <label>
          Name
          <input
            type="text"
            {...register("name", {
              required: "Name is required"
            })}
          />
        </label>
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="actions">
        <button type="submit">Sing Up</button>
      </div>
    </StyledForm>
  );
};

export default RegisterForm;
