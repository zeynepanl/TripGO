import React from "react";
import { View, ScrollView,Text } from "react-native";
import DestinationCard from "./DestinationCard";

const PopularDestinations = () => {
  const destinations = [
    { name: "Antalya, Turkey", image: require("../../assets/images/antalya.jpeg") },
    { name: "Istanbul, Turkey", image: require("../../assets/images/istanbul.jpeg") },
  ];

  return (
    <View className="my-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-gray-800">Popular destinations</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {destinations.map((item, index) => (
          <DestinationCard key={index} title={item.name} image={item.image} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularDestinations;
