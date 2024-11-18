import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const DestinationCard = ({ title, image }) => {
  return (
    <TouchableOpacity className="mr-4">
      <View className="rounded-xl overflow-hidden shadow-md bg-white w-60 h-70">
        <Image source={image} className="w-full h-56" resizeMode="cover" />
        <View className="px-3 py-2">
          <Text className="text-sm font-semibold text-[#2C2C2C]">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DestinationCard;
