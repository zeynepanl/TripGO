import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Notifications = ({ route, navigation }) => {
  // Ana sayfadan gelen bildirimleri alın
  const { notifications: passedNotifications = [] } = route.params || {};

  // Önceden tanımlı bildirimler
  const defaultNotifications = [
    { id: 1, title: "New update available!", description: "Explore our new destinations." },
    { id: 2, title: "Don't miss our tips!", description: "Check the latest travel guides." },
    { id: 3, title: "Discount alert!", description: "Special discounts for your next trip." },
  ];

  // Tüm bildirimleri birleştir
  const notifications = [...passedNotifications, ...defaultNotifications];

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Geri Butonu ve Başlık */}
      <View className="flex-row items-center px-5 mt-12 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Notifications</Text>
      </View>

      {/* Bildirim Listesi */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()} // Bildirimlerin benzersiz key'leri
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 mx-5 rounded-lg shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-[#2C2C2C]">{item.title}</Text>
              <Text className="text-sm text-gray-500 mt-2">{item.description}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">No notifications available.</Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;
