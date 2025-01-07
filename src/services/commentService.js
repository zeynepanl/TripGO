import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

// Yorumları şehre göre çekme fonksiyonu
export const fetchComments = async (cityId) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("cityId", "==", cityId));
    const querySnapshot = await getDocs(q);

    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() }); // Tüm alanları dahil edin
    });

    return comments;
  } catch (error) {
    console.error("Yorumları çekerken hata:", error);
    throw error;
  }
};

// Yeni yorum ekleme fonksiyonu
export const addComment = async (commentData) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Kullanıcı oturum açmamış.");
    }

    const docRef = await addDoc(collection(db, "comments"), {
      ...commentData,
      displayName: currentUser.displayName, // Kullanıcı adı
      profilePicture: currentUser.photoURL, // Profil resmi
      createdAt: serverTimestamp(), // Firestore zaman damgası
    });

    return docRef.id; // Eklenen dokümanın ID'sini döner
  } catch (error) {
    console.error("Yorum eklenirken hata:", error);
    throw error;
  }
};

// Yorum silme fonksiyonu
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Yorum silinirken hata:", error);
    throw error;
  }
};

// Yorum güncelleme fonksiyonu
export const updateComment = async (commentId, updatedText) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, {
      commentText: updatedText,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Yorum güncellenirken hata:", error);
    throw error;
  }
};
