import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

const CityDetails = ({ route, navigation }) => {
  const city = route.params?.city; 

  if (!city) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">City data not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categories = [
    { id: 1, name: "Food & Drink", icon: "restaurant-outline", screen: "FoodAndDrink" },
    { id: 2, name: "Hotels", icon: "bed-outline", screen: "Hotels" },
    { id: 3, name: "Museum", icon: "business-outline", screen: "Museum" },
    { id: 4, name: "Nature", icon: "leaf-outline", screen: "Nature" },
    { id: 5, name: "Activities", icon: "bicycle-outline", screen: "Activities" },
    { id: 6, name: "Weather", icon: "cloud-outline", screen: "Weather" },
  ];

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Geri Oku */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-5 z-10 bg-white p-3 rounded-full shadow-md"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* Şehir Görseli */}
      <Image source={city.image} className="w-full h-80 mt-10" resizeMode="cover" />

      {/* Şehir Adı ve Açıklama */}
      <View className="px-5 mt-4">
        <Text className="text-xl font-semibold text-[#536F61]">{city.name}</Text>
        <Text className="text-sm text-gray-600 mt-2">{city.description}</Text>
      </View>

      {/* Kategoriler */}
      <View className="px-5 mt-6 flex-1">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <View className="items-center justify-center w-1/3 mb-5">
              <TouchableOpacity
                className="p-4 bg-white rounded-xl shadow-md items-center justify-center w-20 h-20"
                onPress={() =>
                  navigation.navigate(item.screen, {
                    city: city,
                    cityName: city.name, // Hava Durumu ekranına name gönderiliyor
                  })
                }
              >
                <Ionicons name={item.icon} size={24} color="#536F61" />
              </TouchableOpacity>
              <Text className="text-xs mt-2 text-[#536F61]">{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* TabBar */}
      <View className="absolute bottom-0 w-full">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default CityDetails;
