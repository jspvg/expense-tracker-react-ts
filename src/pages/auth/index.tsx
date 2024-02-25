import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signInWithGoogle } from "../../utils/firebase/google";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const errortext = "";

  if (isAuth) {
    return <Navigate to="expense-tracker" />;
  }

  return (
    <form action="submit" id="login">
      <h3>Login</h3>
      <label htmlFor="email">email</label>
      <input type="email" id="email" />
      <p className="error">{errortext && errortext}</p>
      <label htmlFor="password">password</label>
      <input type="password" id="password" />
      <p className="error">{errortext && errortext}</p>
      <button>login</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
       or sign in with Google
      </button>
    </form>
  );
};

export default Auth;
