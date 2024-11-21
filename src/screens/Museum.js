import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MuseumCard from "../components/MuseumCard"; // Kart componenti
import TabBar from "../components/TabBar"; // TabBar bileşeni

const Museum = ({ route, navigation }) => {
  const { city } = route.params; // Sadece şehir bilgisi alınıyor

  if (!city || !city.museums || city.museums.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">No museums found for this city.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const museums = city.museums;

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      <View className="flex-row items-center mt-12 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Museum</Text>
      </View>

      <FlatList
        data={museums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MuseumCard
            image={item.image}
            title={item.title}
            onPress={() => console.log(`${item.title} clicked`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <TabBar navigation={navigation} />
    </View>
  );
};

export default Museum;
