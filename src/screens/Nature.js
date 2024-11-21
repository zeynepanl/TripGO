import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar"; // TabBar bileşeni
import Card from "../components/Card"; // Daha önce oluşturulan kart componenti

const Nature = ({ route, navigation }) => {
  const { city } = route.params; // Şehir bilgisi alınıyor

  if (!city || !city.natureHighlights || city.natureHighlights.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">No nature highlights found for this city.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const natureHighlights = city.natureHighlights;

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Geri Butonu ve Başlık */}
      <View className="flex-row items-center mt-12 mb-5 px-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Nature Highlights</Text>
      </View>

      {/* Doğal Yer Kartları */}
      <FlatList
        data={natureHighlights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            image={item.image}
            title={item.title}
            onPress={() => console.log(`${item.title} clicked.`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      />

      {/* TabBar */}
      <View className="absolute bottom-0 w-full">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Nature;
