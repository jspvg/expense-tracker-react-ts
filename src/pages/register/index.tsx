import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase/google";

const Register = () => {
  const navigate = useNavigate();
  const errortext = "";
  return (
    <form action="submit" id="register">
      <h3>Register account</h3>
      <label htmlFor="email">email</label>
      <input type="email" id="email" />
      <p className="error">{errortext && errortext}</p>
      <label htmlFor="password">password</label>
      <input type="password" id="password" />
      <p className="error">{errortext && errortext}</p>
      <label htmlFor="password">repeat password</label>
      <input type="password" id="password-repeat" />
      <p className="error">{errortext && errortext}</p>

      <button>register</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
        or sign in with Google
      </button>
    </form>
  );
};

export default Register;
