import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth"; // Firebase Auth'u ekleyin

// Yorumları şehre göre çekme fonksiyonu
export const fetchComments = async (cityId) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("cityId", "==", cityId));
    const querySnapshot = await getDocs(q);

    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
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
      throw new Error("Kullanıcı oturumu açmamış.");
    }

    const docRef = await addDoc(collection(db, "comments"), {
      ...commentData,
      displayName: currentUser.displayName || "Anonim", // Kullanıcı adı
      profilePicture: currentUser.photoURL || null, // Profil resmi URL'si
      createdAt: serverTimestamp(), // Firestore zaman damgası
    });

    return docRef.id; // Eklenen dokümanın ID'sini döner
  } catch (error) {
    console.error("Yorum eklenirken hata:", error);
    throw error;
  }
};
