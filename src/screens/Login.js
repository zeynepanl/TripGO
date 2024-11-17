import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login() {
  return (
    <View className="flex-1 bg-[#DAEAE2] justify-center items-center px-6">
      {/* Logo */}
      <Image
        source={require('../../assets/icons/logo.png')}
        className="w-20 h-20 mb-8"
        resizeMode="contain"
      />

      {/* Kart Arka Planı */}
      <View className="w-full bg-white rounded-2xl p-8 shadow-lg">
        {/* Başlık */}
        <Text className="text-xl font-semibold text-center text-gray-800 mb-6">
          Welcome to TripGO
        </Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#A0AEC0"
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-700"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-700"
        />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text className="text-sm text-blue-500 text-right mb-6">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity className="w-full bg-[#4CAF50] rounded-lg py-3 mb-4 shadow">
          <Text className="text-white text-center text-lg font-medium">Sign In</Text>
        </TouchableOpacity>

        {/* Google Sign In */}
        <TouchableOpacity className="w-full flex-row bg-white border border-gray-300 rounded-lg py-3 items-center justify-center shadow">
          <Image
            source={require('../../assets/icons/google-icon.png')}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-gray-700 text-lg font-medium">Continue with Google</Text>
        </TouchableOpacity>

        {/* Register */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
