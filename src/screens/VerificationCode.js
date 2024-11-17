import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VerificationCode = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus(); // Sonraki input'a odaklan
    }
  };

  const isButtonDisabled = code.some((item) => item === '');

  return (
    <View className="flex-1 bg-[#DAEAE2] items-center px-5 pt-52">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-20 left-5">
        <Icon name="arrow-back" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <Text className="text-3xl font-semibold text-[#536F61] mb-3">Verification Code</Text>
      <Text className="text-base text-[#536F61] text-center mb-5">
        Please enter the verification code sent to your email.
      </Text>

      {/* Code Input Fields */}
      <View className="flex-row justify-between w-3/4 mb-5">
        {code.map((item, index) => (
          <TextInput
            key={index}
            className="bg-white rounded-xl w-14 h-14 text-center text-lg shadow-md"
            maxLength={1}
            keyboardType="number-pad"
            value={item}
            onChangeText={(text) => handleChangeText(text, index)}
            ref={inputRefs[index]}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        className={`w-5/6 bg-white rounded-full py-4 shadow-md ${
          isButtonDisabled ? 'opacity-50' : ''
        }`}
        onPress={() => console.log('Code verified!')}
        disabled={isButtonDisabled}
      >
        <Text className="text-[#536F61] text-lg font-semibold text-center">Verify</Text>
      </TouchableOpacity>

      {/* Resend Code Section */}
      <View className="flex-row justify-between w-4/5 mt-5">
        <Text className="text-[#536F61]">Resend code to</Text>
        <Text className="text-[#536F61]">01:26</Text>
      </View>
    </View>
  );
};

export default VerificationCode;
