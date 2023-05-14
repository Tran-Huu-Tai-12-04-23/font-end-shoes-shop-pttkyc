import { useEffect } from "react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./index";

export const facebookSignIn = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider);
};
