import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const DestinationCard = ({ city, navigation }) => {
  const handlePress = () => {
    if (navigation && city) {
      navigation.navigate("CityDetails", { city });
    } else {
      console.warn("Navigation or city data is missing!");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} className="mr-4">
      <View className="rounded-xl overflow-hidden shadow-md bg-white w-60 h-70">
        <Image source={city.image} className="w-full h-56" resizeMode="cover" />
        <View className="px-3 py-2">
          <Text className="text-sm font-semibold text-[#2C2C2C]">{city.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DestinationCard;
