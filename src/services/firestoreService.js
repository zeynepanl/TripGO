import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Yeni not ekle
export const addNote = async (note) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), note);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Tüm notları getir
export const fetchNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};
