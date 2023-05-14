import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./index.jsx";

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
