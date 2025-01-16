import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import destinations from "../data/destinations"; // Şehir adlarını içeren dosya

export const fetchMostCommentedCity = async () => {
  try {
    const commentsRef = collection(db, "comments");

    // Tüm yorumları al
    const commentsSnapshot = await getDocs(commentsRef);
    const cityCommentCount = {}; // Şehir yorum sayılarını tutmak için bir obje

    // Yorumları dolaşarak cityId'ye göre gruplandır
    commentsSnapshot.forEach((doc) => {
      const cityId = doc.data().cityId;
      if (cityCommentCount[cityId]) {
        cityCommentCount[cityId]++;
      } else {
        cityCommentCount[cityId] = 1;
      }
    });

    // En çok yorumu alan şehri bul
    const sortedCities = Object.entries(cityCommentCount).sort(
      (a, b) => b[1] - a[1]
    );
    const mostCommentedCityId = parseInt(sortedCities[0]?.[0]); // En çok yorum alan şehir ID'si
    const commentCount = sortedCities[0]?.[1];

    if (!mostCommentedCityId) {
      console.log("Hiç yorum bulunamadı.");
      return null;
    }

    // Şehir adını eşleştir
    const mostCommentedCity = destinations.find(
      (destination) => destination.id === mostCommentedCityId
    );

    if (!mostCommentedCity) {
      console.log("Şehir adı bulunamadı.");
      return null;
    }

    return { cityName: mostCommentedCity.name, commentCount };
  } catch (error) {
    console.error("Error fetching most commented city:", error);
    return null;
  }
};
