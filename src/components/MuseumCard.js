import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const MuseumCard = ({ image, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
    >
      <Image source={image} className="w-16 h-16 rounded-md mr-4" />
      <Text className="text-base font-semibold text-[#536F61]">{title}</Text>
    </TouchableOpacity>
  );
};

export default MuseumCard;
