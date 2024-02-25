import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase-config";
import { NavigateFunction } from "react-router-dom";

interface SignInProps {
  navigate: NavigateFunction;
}

export const signInWithGoogle = ({ navigate }: SignInProps) => {
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
