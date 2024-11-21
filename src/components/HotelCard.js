import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HotelCard = ({ image, name, rating, comments }) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <Image source={image} className="w-20 h-20 rounded-md mr-4" />
      <View className="flex-1">
        <Text className="text-base font-semibold text-[#536F61]">{name}</Text>
        <View className="flex-row items-center mt-2">
          {/* Yıldızlar */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(rating) ? "star" : "star-outline"}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
        <Text className="text-xs text-gray-500 mt-1">
          {rating} ({comments} comments)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;
