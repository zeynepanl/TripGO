import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBar from "../components/SearchBar"; // SearchBar bileşeni dahil edildi

const Discover = ({ navigation }) => {
  const [lastSearched, setLastSearched] = useState([]);

  const handleSearch = (query) => {
    if (query.trim() !== "") {
      setLastSearched((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: `${query}, Turkey`,
          image: require("../../assets/images/istanbul.jpeg"), // Örnek resim
        },
      ]);
    }
  };

  const clearAll = () => {
    setLastSearched([]);
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      {/* Üst Bar */}
      <View className="flex-row justify-between items-center mt-20 mb-7">
        <Text className="text-2xl font-bold text-[#536F61]">Discover</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={28} color="#536F61" />
        </TouchableOpacity>
      </View>

      {/* Arama Kutusu */}
      <SearchBar
        placeholder="Where to go?"
        autoFocus
        onSearch={(query) => handleSearch(query)} // Arama sorgusu
      />
      <View className="mb-5" />

      {/* Son Aramalar */}
      {lastSearched.length > 0 && (
        <>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-[#2C2C2C]">Last searched</Text>
            <TouchableOpacity onPress={clearAll}>
              <Text className="text-sm text-[#536F61]">Clear all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={lastSearched}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mr-4">
                <Image source={item.image} className="w-40 h-40 rounded-lg" />
                <Text className="text-sm mt-2 text-[#2C2C2C]">{item.title}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Discover;
