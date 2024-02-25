import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signInWithGoogle } from "../../utils/firebase/googleAuth";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/schemas/login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const auth = getAuth();

  const onSubmit = ({ email, password }: FieldValues) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`${user.email} you have successfully logged in!`);
        navigate('expense-tracker');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode === 'auth/wrong-password'){
          console.log('wrong password');
        } else if(errorCode === 'auth/user-not-found'){
          console.log('User not found');
        }

        console.log(errorMessage);
      })
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
      </p>
      <button type="submit">login</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
        or sign in with Google
      </button>
      <p>
        Don't have an account? <a href="/register">Register here!</a>
      </p>
    </form>
  );
};

export default Auth;
