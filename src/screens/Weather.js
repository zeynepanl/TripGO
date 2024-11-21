import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

const Weather = ({ navigation }) => {
  // Örnek saatlik hava durumu verileri
  const weatherData = [
    { time: "15:00", temp: "29°C", icon: "cloud-outline" },
    { time: "16:00", temp: "26°C", icon: "cloud-outline" },
    { time: "17:00", temp: "29°C", icon: "sunny-outline", selected: true },
    { time: "18:00", temp: "23°C", icon: "cloud-outline" },
  ];

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      {/* Geri Butonu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-white p-2 rounded-full shadow-md mt-12 w-10 h-10"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* Şehir ve Genel Hava Durumu */}
      <View className="mt-6 items-center">
        <Ionicons name="location-outline" size={20} color="#536F61" />
        <Text className="text-lg font-semibold text-[#536F61]">
          Antalya, Turkey
        </Text>
        <Ionicons name="sunny-outline" size={64} color="#FFD700" />
        <Text className="text-5xl font-bold text-[#2C2C2C] mt-2">29°</Text>
        <Text className="text-sm text-gray-500">Precipitations</Text>
        <Text className="text-sm text-gray-500">Max.: 31° Min.: 25°</Text>
      </View>

      {/* Saatlik Hava Durumu */}
      <View className="mt-10">
        <View className="flex-row justify-between px-5">
          <Text className="text-lg font-bold text-[#536F61]">Today</Text>
          <Text className="text-lg font-bold text-[#536F61]">October, 28</Text>
        </View>
        <FlatList
          horizontal
          data={weatherData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={`items-center justify-center mx-2 p-4 rounded-lg ${
                item.selected ? "bg-[#C1E8E2]" : "bg-white"
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Ionicons name={item.icon} size={24} color="#FFD700" />
              <Text className="text-lg font-bold text-[#2C2C2C] mt-2">
                {item.temp}
              </Text>
              <Text className="text-sm text-gray-500">{item.time}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        />
      </View>

      {/* TabBar */}
      <View className="absolute bottom-0 w-full bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Weather;
