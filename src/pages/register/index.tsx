import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase/googleAuth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { registerSchema } from "../../utils/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [pswdErr, setPswdErr] = useState("");

  const onSubmit = ({ email, password, passwordRepeat }: FieldValues) => {
    if (password !== passwordRepeat) {
      setPswdErr("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`${user.email} you have successfully registered!`);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(`Registration unsuccessful`);
        return;
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="register">
      <h3>Register account</h3>
      <label htmlFor="email">email</label>
      <input type="email" id="email" {...register("email")} />
      <p className="error">
        {errors.email && (errors.email.message as string)} {pswdErr && pswdErr}
      </p>
      <label htmlFor="password">password</label>
      <input type="password" id="password" {...register("password")} />
      <p className="error">
        {errors.password && (errors.password.message as string)}
      </p>
      <label htmlFor="password">repeat password</label>
      <input
        type="password"
        id="password-repeat"
        {...register("passwordRepeat")}
      />
      <p className="error">
        {errors.passwordRepeat && (errors.passwordRepeat.message as string)}
      </p>

      <button type="submit">register</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
        or sign in with Google
      </button>
      <p>
        Already have an account? <a href="/">Login here!</a>
      </p>
    </form>
  );
};

export default Register;
