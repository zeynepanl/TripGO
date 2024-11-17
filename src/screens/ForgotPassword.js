import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const isButtonDisabled = email.trim() === '';

  return (
    <View className="flex-1 bg-[#DAEAE2] items-center px-5 pt-52">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-20 left-5">
        <Icon name="arrow-back" size={26} color="#536F61" />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <Text className="text-3xl font-semibold text-[#536F61] mb-3">Forgot Password</Text>
      <Text className="text-base text-[#536F61] text-center mb-5">
        Enter your email account to reset your password
      </Text>

      {/* Email Input */}
      <View className="bg-white rounded-full px-4 w-full h-16 justify-center shadow-md mb-5">
        <TextInput
          className="text-base font-normal text-gray-600"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity
        className={`w-full bg-white rounded-full h-16 py-3 shadow-md justify-center ${
          isButtonDisabled ? 'opacity-50' : ''
        }`}
        onPress={() => navigation.navigate('VerificationCode')}
        disabled={isButtonDisabled}
      >
        <Text className="text-[#536F61] text-base font-semibold text-center">Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
