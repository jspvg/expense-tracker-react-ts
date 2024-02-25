import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signInWithGoogle } from "../../utils/firebase/googleAuth";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/schemas/login";
import { loginUser } from "../../utils/firebase/emailAuth";
import { useState } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = ({ email, password }: FieldValues) => {
    loginUser({ email, password })
      .then((user) => {
        alert(`${user.displayName} you have successfully logged in!`);
        navigate("expense-tracker");
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/wrong-password") {
          setLoginError("Wrong password");
        } else if (errorCode === "auth/user-not-found") {
          setLoginError("User not found");
        } else if(errorCode === "auth/invalid-login-credentials") {
          setLoginError("Invalid login credentials");
        }
      });
  };

  if (isAuth) {
    return <Navigate to="expense-tracker" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="login">
      <h3>Login</h3>
      <label htmlFor="email">email</label>
      <input type="email" id="email" {...register("email")} />
      <p className="error">
        {errors.email && (errors.email.message as string)}
      </p>
      <label htmlFor="password">password</label>
      <input type="password" id="password" {...register("password")} />
      <p className="error">
        {errors.password && (errors.password.message as string)}
        {loginError && loginError}
      </p>
      <button type="submit">login</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
        or sign in with Google
      </button>
      <p>
        Don't have an account? <a href="register">Register here!</a>
      </p>
    </form>
  );
};

export default Auth;
