import React from "react";
import { View, ScrollView, Text } from "react-native";
import DestinationCard from "./DestinationCard";
import destinations from "../data/destinations";

const PopularDestinations = ({ navigation }) => {
  return (
    <View className="my-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-gray-800">Popular destinations</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {destinations.map((city) => (
          <DestinationCard key={city.id} city={city} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularDestinations;
