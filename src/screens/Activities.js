import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MuseumCard from "../components/MuseumCard"; // Kart componenti (activities için kullanılacak)
import TabBar from "../components/TabBar"; // TabBar bileşeni

const Activities = ({ route, navigation }) => {
  const { city } = route.params; // Şehir bilgisi alınıyor

  if (!city || !city.activities || city.activities.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">No activities found for this city.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activities = city.activities; // Şehirden gelen activities bilgileri

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      {/* Geri Butonu ve Başlık */}
      <View className="flex-row items-center mt-12 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Activities</Text>
      </View>

      {/* Activities Kartları */}
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MuseumCard
            image={item.image}
            title={item.title}
            onPress={() => console.log(`${item.title} selected.`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Activities;
