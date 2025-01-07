// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjY84qZQmtqBbINeuMsQJcFzt1-4vNKkU",
  authDomain: "travel-2ea05.firebaseapp.com",
  projectId: "travel-2ea05",
  storageBucket: "travel-2ea05.firebasestorage.app",
  messagingSenderId: "866324560727",
  appId: "1:866324560727:web:e05ffb37908962eebddc12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 
export { app, auth, db, storage };

