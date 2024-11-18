import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ScheduleCard = ({ title, image, initialCompleted = false }) => {
  const [completed, setCompleted] = useState(initialCompleted);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl shadow-md p-3 mb-4"
      onPress={toggleCompleted} // Tıklama işlevi
    >
      {/* Resim */}
      <Image
        source={image}
        className="w-16 h-16 rounded-lg mr-4"
        resizeMode="cover"
      />
      {/* Başlık */}
      <Text className="flex-1 text-base font-medium text-[#2C2C2C]">
        {title}
      </Text>
      {/* Tik veya Boş */}
      {completed ? (
        <FontAwesome name="check-square" size={24} color="#4CAF50" /> // Tik işareti
      ) : (
        <FontAwesome name="square-o" size={24} color="#A0A0A0" /> // Boş kutu
      )}
    </TouchableOpacity>
  );
};

export default ScheduleCard;
