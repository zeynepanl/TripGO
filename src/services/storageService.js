import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

// Profil resmini yükleme fonksiyonu
export const uploadProfilePicture = async (userId, file) => {
  try {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, file); // Dosyayı yükleme
    const url = await getDownloadURL(storageRef); // Yüklenen dosyanın URL'sini alma
    return url;
  } catch (error) {
    console.error("Profil resmi yüklenirken hata oluştu:", error);
    throw error;
  }
};
