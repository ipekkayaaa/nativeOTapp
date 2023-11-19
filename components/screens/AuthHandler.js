// AuthHandler.js

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../firebase";
import { firestore } from "../../firebase";



const auth = getAuth(app);

export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log("Logged in with", user.email);
    return { success: true, user: user };
  } catch (error) {
    console.error("Login failed: ", error.message);
    return { success: false, error: error.message };
  }
};

export const getUserType = async (userId) => {
  try {
    const colUser = collection(getFirestore(app), "signUp");
    const userQuery = query(colUser, where("userId", "==", userId));
    const snapshot = await getDocs(userQuery);

    for (const doc of snapshot.docs) {
      const userType = doc.data().userType;
      console.log("UserType:", userType);
      return userType;
    }
  } catch (error) {
    console.error("Error getting user type: ", error);
    return null;
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
