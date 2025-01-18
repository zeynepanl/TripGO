// src/services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Kullanıcı Kayıt
export const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Kullanıcının profilini Firebase Authentication'da güncelle
    await updateProfile(user, {
      displayName: name,
    });

    // Kullanıcıyı Firestore'da sakla
    await setDoc(doc(db, "users", user.uid), {
      displayName: name,
      email: email,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Kullanıcı Giriş
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
