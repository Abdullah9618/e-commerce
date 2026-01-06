import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth, db } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialState = { user: null, loading: true };

  function authReducer(state, action) {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // FIXED: Correct modular usage
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({
          type: "SET_USER",
          payload: {
            email: currentUser.email,
            uid: currentUser.uid,
            name: currentUser.displayName || null,
          },
        });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // FIXED: Correct register signature (name, email, password)
  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update Firebase Auth profile
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // Create Firestore user doc (secure - NO password stored)
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "SET_USER", payload: null });
  };
  return (
    <AuthContext.Provider value={{ user: state.user, login, register, logout, loading: state.loading }}>
      {children}
    </AuthContext.Provider>
  );
};
