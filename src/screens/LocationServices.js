import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const LocationServices = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#DAEAE2] items-center justify-center px-5">
      {/* Location Icon */}
      <Image
        source={require('../../assets/icons/location-icon.png')}
        className="w-28 h-28 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-3xl text-[#536F61] font-semibold mb-4">Location Services</Text>

      {/* Description */}
      <Text className="text-center text-[#536F61] mb-6 px-5 text-base">
        For a more personalized experience and to discover nearby attractions, please allow
        access to your location. Your privacy is important to us.
      </Text>

      {/* Allow Location Button */}
      <TouchableOpacity
        className="bg-white rounded-full py-3 px-8 mb-4 border border-gray-300 shadow-md"
        onPress={() => navigation.navigate('Home')} // Konum izni işlevi buraya eklenebilir
      >
        <Text className="text-[#536F61] text-base font-semibold">Allow Location Access</Text>
      </TouchableOpacity>

      {/* Later Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text className="text-[#536F61] text-base font-semibold">Later</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationServices;
