import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Keyboard, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PopularDestinations from "../components/PopularDestinations";
import ScheduleCard from "../components/ScheduleCard";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import { fetchMostCommentedCity } from "../services/notificationService";

const Home = ({ navigation }) => {
  const tabBarOpacity = useRef(new Animated.Value(1)).current;
  const [mostCommentedCity, setMostCommentedCity] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [notifications, setNotifications] = useState([]); // Kapatılan bildirimleri tutar

  useEffect(() => {
    // Klavye animasyonu
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(tabBarOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(tabBarOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // En çok yorumu alan şehri getir
    const getMostCommentedCity = async () => {
      const city = await fetchMostCommentedCity();
      setMostCommentedCity(city); // Şehri state'e kaydet
    };

    getMostCommentedCity();
  }, []);

  const handleDismissNotification = () => {
    if (mostCommentedCity) {
      // Bildirimi kapattığında kaydet
      setNotifications((prev) => [
        ...prev,
        {
          id: new Date().getTime(), // Benzersiz ID
          title: `Popular City: ${mostCommentedCity.cityName}`,
          description: `with ${mostCommentedCity.commentCount} comments!`,
          dismissedAt: new Date().toISOString(), // Kapatılma zamanı
        },
      ]);
    }
    setShowNotification(false); // Bildirimi gizle
  };

  const schedule = [
    {
      id: 1,
      title: "Efes Antik Kenti, İzmir",
      image: require("../../assets/images/efes.jpeg"),
      completed: true,
    },
    {
      id: 2,
      title: "Alaçatı, İzmir",
      image: require("../../assets/images/alacati.jpeg"),
      completed: false,
    },
  ];

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Başlık ve Bildirim İkonu */}
      <View className="flex-row justify-between items-center px-5 mt-20">
        <Text className="text-4xl font-bold text-[#536F61]">
          New Routes Await,{"\n"}Ready to Explore?
        </Text>

        {/* Bildirim İkonu */}
        <TouchableOpacity
          className="bg-white p-2 rounded-full shadow-md"
          onPress={() =>
            navigation.navigate("Notifications", { notifications }) // Bildirimleri aktar
          }
        >
          <Ionicons name="notifications-outline" size={24} color="#536F61" />
        </TouchableOpacity>
      </View>

      {/* Bildirim Alanı */}
      {showNotification && mostCommentedCity && (
        <View className="bg-[#DAEAE2] p-4 mt-4 rounded-lg mx-5 flex-row justify-between items-center">
          <Text className="text-sm text-[#2C2C2C] font-semibold">
            🔔 Popular City: {mostCommentedCity.cityName} with{" "}
            {mostCommentedCity.commentCount} comments!
          </Text>
          <TouchableOpacity onPress={handleDismissNotification}>
            <Ionicons name="close-circle-outline" size={24} color="#536F61" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-1 px-5">
        {/* Arama */}
        <SearchBar
          placeholder="Where to go?"
          onPress={() => navigation.navigate("Discover")}
        />

        {/* Popüler Destinasyonlar */}
        <PopularDestinations navigation={navigation} />

        {/* Takvim */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-[#2C2C2C] mb-3">My schedule</Text>
          <FlatList
            data={schedule}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ScheduleCard
                title={item.title}
                image={item.image}
                completed={item.completed}
              />
            )}
          />
        </View>
      </View>

      {/* TabBar */}
      <Animated.View style={{ opacity: tabBarOpacity }}>
        <TabBar navigation={navigation} />
      </Animated.View>
    </View>
  );
};

export default Home;
