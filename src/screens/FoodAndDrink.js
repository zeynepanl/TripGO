import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import HotelCard from "../components/HotelCard";

const FoodAndDrinks = ({ route, navigation }) => {
  const { city } = route.params;

  if (!city || !city.foods || !city.restaurants) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">No food and drinks found for this city.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { foods, restaurants } = city;

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      {/* Geri Butonu ve Başlık */}
      <View className="flex-row items-center mt-12 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Food & Drinks</Text>
      </View>

      {/* Yiyecekler */}
      <Text className="text-lg font-semibold text-[#536F61] mb-3">Food</Text>
      <FlatList
        data={foods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-200">
            <Text className="text-sm text-[#536F61]">{item}</Text>
          </View>
        )}
      />

      {/* Restoranlar */}
      <Text className="text-lg font-semibold text-[#536F61] mb-3 mt-5">Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelCard
            image={item.image}
            name={item.name}
            rating={item.rating}
            comments={item.comments}
            onPress={() => console.log(`${item.name} selected.`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default FoodAndDrinks;
