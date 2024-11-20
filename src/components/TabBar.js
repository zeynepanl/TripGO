import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TabBar = ({ navigation }) => {
  const tabs = [
    { name: "Home", icon: "home-outline" },
    { name: "Map", icon: "location-outline" },
    { name: "Notes", icon: "calendar-outline" },
    { name: "Profile", icon: "person-outline" },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white py-4 shadow-md border-t border-gray-200">
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(tab.name)}
          className="items-center"
        >
          <Icon name={tab.icon} size={26} color="#536F61" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
