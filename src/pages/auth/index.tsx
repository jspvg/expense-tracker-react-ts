import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

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

  if (isAuth) {
    return <Navigate to="expense-tracker" />;
  }

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  );
};

export default Auth;
