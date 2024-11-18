// src/components/SearchBar.js
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = ({ placeholder, autoFocus, onPress }) => {
  return (
    <View className="flex-row items-center bg-[#F1F1F1] rounded-full px-4 py-3 shadow-md">
      <Icon name="search-outline" size={20} color="#A0A0A0" />
      <TouchableOpacity
        onPress={onPress} // Navigasyon veya başka bir eylem için onPress
        className="flex-1"
      >
        <TextInput
          autoFocus={autoFocus} // Discover ekranında klavye açılmasını sağlar
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          className="text-gray-700 text-base"
          editable={!onPress} // Eğer onPress varsa TextInput tıklanamaz
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
