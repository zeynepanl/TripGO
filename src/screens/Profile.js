import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import TabBar from "../components/TabBar";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: "No Username",
    email: "No Email",
    photoURL: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false); // Kullanıcı adı düzenleme durumu
  const [newUsername, setNewUsername] = useState(""); // Yeni kullanıcı adı

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          username: user.displayName || "No Username",
          email: user.email || "No Email",
          photoURL: user.photoURL || null,
          password: "********",
        });
        setNewUsername(user.displayName || ""); // Kullanıcı adını varsayılan olarak kaydet
      } else {
        navigation.navigate("Login");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  // Profil resmi seçme ve Firebase Storage'a yükleme
  const handleUpdateProfilePicture = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Hata", "Profil resmini güncellemek için giriş yapmalısınız!");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setIsUploading(true);

        const storage = getStorage();
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}.jpg`);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        // Firebase Storage'a yükleme
        await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(imageRef);

        // Kullanıcı profilini güncelleme
        await updateProfile(currentUser, { photoURL: downloadUrl });
        setUserData((prev) => ({ ...prev, photoURL: downloadUrl }));

        Alert.alert("Başarılı", "Profil resminiz güncellendi!");
      }
    } catch (error) {
      console.error("Profil resmi güncellenirken hata:", error);
      Alert.alert("Hata", "Profil resmini güncellerken bir sorun oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  // Kullanıcı adını güncelleme fonksiyonu
  const handleUpdateUsername = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Hata", "Kullanıcı adını güncellemek için giriş yapmalısınız!");
      return;
    }

    try {
      // Firebase Authentication'da kullanıcı adını güncelle
      await updateProfile(currentUser, { displayName: newUsername });

      // Firestore'daki kullanıcı belgesini güncelle
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: newUsername,
        updatedAt: new Date().toISOString(),
      });

      // State'i güncelle
      setUserData((prev) => ({ ...prev, username: newUsername }));
      setIsEditingName(false); // Düzenleme modundan çık
      Alert.alert("Başarılı", "Kullanıcı adınız güncellendi!");
    } catch (error) {
      console.error("Kullanıcı adı güncellenirken hata:", error);
      Alert.alert("Hata", "Kullanıcı adınızı güncellerken bir sorun oluştu.");
    }
  };

  // Çıkış yapma fonksiyonu
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
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
        <View className="relative">
          <TouchableOpacity className="bg-white p-3 rounded-full shadow-md">
            {userData.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <Ionicons name="person-circle-outline" size={80} color="#536F61" />
            )}
          </TouchableOpacity>

          {/* Edit Butonu */}
          <TouchableOpacity
            onPress={handleUpdateProfilePicture}
            className="absolute bottom-0 right-0 bg-[#536F61] p-2 rounded-full shadow-md"
          >
            <Ionicons name="pencil-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-semibold text-[#536F61] mt-4">
          {userData.username}
        </Text>
      </View>

      {/* Kullanıcı Bilgi Kartları */}
      <View className="bg-white mt-8 mx-5 p-4 rounded-lg shadow-md">
        <View className="flex-row items-center mb-3">
          <Text className="text-sm text-[#536F61] w-1/3">User Name</Text>
          {isEditingName ? (
            <View className="flex-row items-center flex-1">
              <TextInput
                value={newUsername}
                onChangeText={setNewUsername}
                className="text-sm text-[#536F61] flex-1 border-b border-gray-300"
              />
              <TouchableOpacity onPress={handleUpdateUsername}>
                <Ionicons name="checkmark-outline" size={20} color="#536F61" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row items-center flex-1">
              <TextInput
                editable={false}
                value={userData.username}
                className="text-sm text-[#536F61] flex-1 border-b border-gray-300"
              />
              <TouchableOpacity onPress={() => setIsEditingName(true)}>
                <Ionicons name="pencil-outline" size={20} color="#536F61" />
              </TouchableOpacity>
            </View>
          )}
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
