import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYsA100brTV4dF8i3K6HSz5CeqXOQXwQE",
  authDomain: "ecommerce-defab.firebaseapp.com",
  projectId: "ecommerce-defab",
  storageBucket: "ecommerce-defab.appspot.com",
  messagingSenderId: "946999039668",
  appId: "1:946999039668:web:bc0a33119ae1a0e7c0a9e1",
  measurementId: "G-CDBW537Z8L"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
