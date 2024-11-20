import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Card = ({ image, title, description, onPress, rating }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white rounded-lg shadow-md mb-4 overflow-hidden border border-gray-200"
    >
      <Image source={image} className="w-20 h-20" resizeMode="cover" />
      <View className="flex-1 px-4">
        <Text className="text-base font-semibold text-[#536F61]">{title}</Text>
        {description && (
          <Text className="text-sm text-gray-500 mt-1">{description}</Text>
        )}
        {rating && (
          <Text className="text-sm text-gray-500 mt-1">
            {rating} ⭐ ({description})
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
