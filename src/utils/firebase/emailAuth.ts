import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";

const auth = getAuth();

export const loginUser = ({ email, password }: FieldValues) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const authInfo = {
        userId: user.uid,
        name: user.displayName,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
};

export const registerUser = ({ email, password, name }: FieldValues) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, { displayName: name }).then(() => {
        return user;
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
};
