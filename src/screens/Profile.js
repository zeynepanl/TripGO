// src/screens/Profile.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // signOut fonksiyonunu ekledik
import TabBar from "../components/TabBar";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: "No Username",
    email: "No Email",
    password: "********",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          username: user.displayName || "No Username",
          email: user.email || "No Email",
          password: "********", // Şifre doğrudan alınamaz
        });
      } else {
        navigation.navigate("Login"); // Eğer kullanıcı oturum açmadıysa giriş ekranına yönlendirin
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  // Çıkış yapma fonksiyonu
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Oturum başarıyla kapatıldı, giriş ekranına yönlendirin
        navigation.navigate("Login");
      })
      .catch((error) => {
        // Hata oluştu, kullanıcıya bildirin
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Geri Butonu ve Başlık */}
      <View className="flex-row items-center px-5 mt-12 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Profile</Text>
      </View>

      {/* Kullanıcı Bilgileri */}
      <View className="items-center mt-4">
        <View className="bg-white p-3 rounded-full shadow-md">
          <Ionicons name="person-circle-outline" size={80} color="#536F61" />
        </View>
        <Text className="text-lg font-semibold text-[#536F61] mt-4">
          {userData.username}
        </Text>
      </View>

      {/* Kullanıcı Bilgi Kartları */}
      <View className="bg-white mt-8 mx-5 p-4 rounded-lg shadow-md">
        <View className="flex-row items-center mb-3">
          <Text className="text-sm text-[#536F61] w-1/3">User Name</Text>
          <TextInput
            editable={false}
            value={userData.username}
            className="text-sm text-[#536F61] flex-1 border-b border-gray-300"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="text-sm text-[#536F61] w-1/3">Email</Text>
          <TextInput
            editable={false}
            value={userData.email}
            className="text-sm text-[#536F61] flex-1 border-b border-gray-300"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="text-sm text-[#536F61] w-1/3">Password</Text>
          <View className="flex-row items-center flex-1 border-b border-gray-300">
            <TextInput
              secureTextEntry
              editable={false}
              value={userData.password}
              className="text-sm text-[#536F61] flex-1"
            />
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#536F61" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Ayarlar ve Yardım Butonları */}
      <View className="mt-6 mx-5">
        <TouchableOpacity className="bg-white px-4 py-3 rounded-lg shadow-md mb-4 flex-row items-center">
          <Text className="text-[#536F61] text-base flex-1">Settings</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#536F61" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-4 py-3 rounded-lg shadow-md flex-row items-center">
          <Text className="text-[#536F61] text-base flex-1">Help</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#536F61" />
        </TouchableOpacity>
      </View>

      {/* Çıkış Yap Butonu */}
      <View className="mt-6 mx-5">
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-[#DAEAE2] px-4 py-3 rounded-lg shadow-md flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={20} color="#536F61" />
          <Text className="text-[#536F61] text-base ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Profile;
