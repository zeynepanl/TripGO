import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ScheduleContext } from "../context/ScheduleContext";

const MuseumCard = ({ image, title, onPress }) => {
  const { addToSchedule } = useContext(ScheduleContext);

  const handleAddPress = () => {
    // Kartın title ve image bilgilerini schedule'a ekleyelim
    addToSchedule({
      title,
      image,
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
    >
      <Image source={image} className="w-16 h-16 rounded-md mr-4" />
      <Text className="text-base font-semibold text-[#536F61]">{title}</Text>

      <TouchableOpacity onPress={handleAddPress} className="ml-auto p-2">
        <Ionicons name="add-circle-outline" size={24} color="#536F61" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MuseumCard;
