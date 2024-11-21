import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBar from "../components/SearchBar"; // SearchBar bileşeni dahil edildi
import destinations from "../data/destinations"; // Şehir verilerini içe aktarın
import DestinationCard from "../components/DestinationCard"; // Şehir kartı bileşeni

const Discover = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  // Arama metnine göre şehirleri filtreleyin
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
        value={searchText}
        onChangeText={setSearchText}
      />
      <View className="mb-5" />

      {/* Arama Sonuçları */}
      {searchText.length > 0 ? (
        filteredDestinations.length > 0 ? (
          <FlatList
            data={filteredDestinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DestinationCard
                city={item}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <Text className="text-gray-500 mt-4">No results found.</Text>
        )
      ) : (
        // İsterseniz son aramalar veya başka bir içerik gösterebilirsiniz
        <Text className="text-gray-500 mt-4">Please enter a city name to search.</Text>
      )}
    </View>
  );
};

export default Discover;
