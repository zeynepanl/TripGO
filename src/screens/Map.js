import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

const Map = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Geri Butonu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Geri navigasyon
        className="absolute top-12 left-5 z-10 bg-white p-2 rounded-full shadow-lg"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* History Butonu */}
      <TouchableOpacity
        className="absolute right-5 bottom-20 items-center justify-center p-3 bg-white rounded-full shadow-lg"
        onPress={() => alert("History Button Pressed")} // Butona tıklanma işlevi
      >
        <Ionicons name="time-outline" size={20} color="#536F61" />
        <Text className="text-sm text-[#536F61] mt-1">History</Text>
      </TouchableOpacity>

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Map;
