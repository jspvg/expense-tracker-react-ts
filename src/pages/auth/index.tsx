import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const authInfo = {
          userId: res.user.uid,
          name: res.user.displayName,
          profilePicture: res.user.photoURL,
          isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  );
};

export default Auth;
