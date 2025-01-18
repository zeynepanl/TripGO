// src/services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Firebase yapılandırmanızı içe aktarın

// Kullanıcı Kayıt Fonksiyonu
export const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    // Firebase Authentication ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firebase Authentication'da kullanıcının profil adını güncelle
    await updateProfile(user, {
      displayName: name, // Kullanıcı adı
    });

    // Kullanıcıyı Firestore'da "users" koleksiyonuna ekle
    await setDoc(doc(db, "users", user.uid), {
      displayName: name, // Kullanıcı adı
      email: email, // Kullanıcı e-posta adresi
      photoURL: user.photoURL || null, // Profil fotoğrafı (varsayılan olarak null)
      createdAt: new Date(), // Oluşturulma zamanı
    });

    return user; // Kullanıcı bilgisini döndür
  } catch (error) {
    console.error("Kullanıcı kaydı sırasında hata oluştu:", error);
    throw error; // Hata durumunda yakalama
  }
};

// Kullanıcı Giriş Fonksiyonu
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    // Firebase Authentication ile giriş yap
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Kullanıcı bilgisini döndür
  } catch (error) {
    console.error("Kullanıcı girişi sırasında hata oluştu:", error);
    throw error; // Hata durumunda yakalama
  }
};
