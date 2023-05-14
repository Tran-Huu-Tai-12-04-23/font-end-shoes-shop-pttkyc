import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD-aWeFSwN91xKSZiXtfJ67NSVP18vtjk",
  authDomain: "shoes-shop-bb21d.firebaseapp.com",
  projectId: "shoes-shop-bb21d",
  storageBucket: "shoes-shop-bb21d.appspot.com",
  messagingSenderId: "902080828468",
  appId: "1:902080828468:web:20ea468e0402b7631a6661",
  measurementId: "G-QXY5WGBPV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
