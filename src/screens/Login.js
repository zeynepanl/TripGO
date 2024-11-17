import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Şifre görünürlüğü için state

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Görünürlüğü tersine çevir
  };

  const handleLogin = async () => {
    try {
      if (email === 'test@test.com' && password === '123456') {
        navigation.navigate('LocationServices'); // Başarılı girişten sonra yönlendirme
      } else {
        Alert.alert('Error', 'Invalid email or password'); // Hata durumunda mesaj gösterme
      }
    } catch (error) {
      Alert.alert('Error', error.message); // Hata durumunda mesaj gösterme
    }
  };

  return (
    <View className="flex-1 bg-[#DAEAE2] items-center justify-end px-5 pb-10">
      {/* Logo */}
      <View className="flex-row items-center absolute top-36">
        <Image source={require('../../assets/icons/logo.png')} className="w-24 h-24 mr-4" />
        <Text className="text-4xl text-[#536F61] font-medium">TripGO</Text>
      </View>

      {/* Giriş Kartı */}
      <View className="bg-white rounded-3xl px-12 py-20 w-full items-center shadow-md">
        {/* Başlık */}
        <Text className="text-2xl text-[#536F61] font-medium mb-2 -ml-7 self-start">
          Welcome to TripGO
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-white rounded-3xl px-4 my-3 w-[120%] h-16 shadow-xl">
          <TextInput
            className="flex-1 py-2 text-lg font-normal"
            placeholder="Email"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-white rounded-3xl px-4 my-3 w-[120%] h-16 shadow-xl">
          <TextInput
            className="flex-1 py-2 text-lg font-normal"
            placeholder="Password"
            placeholderTextColor="#A0AEC0"
            secureTextEntry={!isPasswordVisible} // Şifre görünürlüğü
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'} // İkon değişimi
              size={20}
              color="gray"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          className="w-[120%] flex-row justify-end mt-2"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text className="text-[#536F61] ml-4">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#DAEAE2] rounded-3xl items-center justify-center w-[120%] py-4 my-4 border border-black"
          onPress={handleLogin}
        >
          <Text className="text-[#536F61] text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>

        {/* Google Sign In Button */}
        <TouchableOpacity className="flex-row items-center bg-[#f5f5f5] rounded-3xl py-4 px-4 my-2 w-[120%] border border-gray-300 justify-center">
          <FontAwesome name="google" size={20} color="gray" />
          <Text className="text-gray-500 text-lg text-center font-normal ml-3">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row mt-5">
          <Text className="text-[#536F61] font-normal">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-[#536F61] ml-1 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
