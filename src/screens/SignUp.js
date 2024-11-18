import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { registerWithEmailAndPassword } from "../services/authService";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Şifre görünürlüğü için state

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Görünürlüğü tersine çevir
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    try {
      await registerWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  

  return (
    <View className="flex-1 bg-[#DAEAE2] items-center justify-end px-5 pb-10">
      {/* Logo Section */}
      <View className="absolute top-36 flex-row items-center">
        <Image
          source={require('../../assets/icons/logo.png')}
          className="w-24 h-24 mr-4"
          resizeMode="contain"
        />
        <Text className="text-4xl text-[#536F61] font-bold">TripGO</Text>
      </View>

      {/* Form Section */}
      <View className="bg-white rounded-3xl px-12 py-20 w-full items-center shadow-md">
        {/* Title */}
        <Text className="text-2xl text-[#536F61] font-medium mb-2 -ml-7 self-start">
          Create an Account
        </Text>

        {/* Name Input */}
        <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 my-3 w-[120%] h-16 shadow-xl">
          <TextInput
            placeholder="Your Name"
            placeholderTextColor="#A0AEC0"
            value={name}
            onChangeText={setName}
            className="flex-1 py-2 text-lg font-normal text-gray-700"
          />
        </View>

        {/* Email Input */}
        <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 my-3 w-[120%] h-16 shadow-xl">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            className="flex-1 py-2 text-lg font-normal text-gray-700"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 my-3 w-[120%] h-16 shadow-xl">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A0AEC0"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            className="flex-1 py-2 text-lg font-normal text-gray-700"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <View className="flex-row items-center w-[120%] px-4 my-3">
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            className={`w-6 h-6 border-2 rounded-md ${
              isChecked ? 'bg-[#536F61] border-[#536F61]' : 'border-gray-300'
            } justify-center items-center`}
          >
            {isChecked && <Icon name="check" size={16} color="white" />}
          </TouchableOpacity>
          <Text className="ml-3 text-sm text-[#536F61]">
          By creating an account, you agree to our <Text className="font-bold">Terms and Conditions</Text>.
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          disabled={!isChecked}
          onPress={handleSignUp}
          className={`w-[120%] bg-[#DAEAE2] rounded-3xl py-4 my-4 border border-black ${
            isChecked ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <Text className="text-center text-lg font-bold text-[#536F61]">Sign Up</Text>
        </TouchableOpacity>

        {/* Already Have an Account */}
        <View className="flex-row mt-4">
          <Text className="text-gray-600">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-[#536F61] ml-2 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
