import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

const Notes = ({ navigation }) => {
  const [reminderVisible, setReminderVisible] = useState(false); // Hatırlatıcı görünürlüğü için state

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
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Notes</Text>
      </View>

      {/* Not Kartları */}
      <ScrollView className="px-5 flex-1">
        <View className="flex-row justify-between mb-5">
          {/* Mevcut Not */}
          <View className="bg-white p-4 rounded-lg shadow-md w-[50%]">
            <Text className="text-sm text-[#536F61] mb-2">
              Antalya is a paradise for me! Sunbathing at its stunning beaches
              like Lara and Konyaaltı, wanderin...
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-500">Read more</Text>
            </TouchableOpacity>
          </View>

          {/* Yeni Not Ekle */}
          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-md w-[48%] items-center justify-center"
            onPress={() => alert("Add new note")} // Yeni not ekleme işlevi
          >
            <Ionicons name="add-outline" size={30} color="#536F61" />
          </TouchableOpacity>
        </View>

        {/* Archived Notes Bölümü */}
        <View className="mb-5">
          <TouchableOpacity className="bg-white px-4 py-3 rounded-lg shadow-md flex-row justify-between items-center">
            <Text className="text-[#536F61] text-base font-semibold">
              Archived Notes
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color="#536F61" />
          </TouchableOpacity>
        </View>

        {/* Reminders Bölümü */}
        <View className="mb-5">
          <TouchableOpacity
            className="bg-white px-4 py-3 rounded-lg shadow-md flex-row justify-between items-center"
            onPress={() => setReminderVisible(!reminderVisible)} // Görünürlüğü değiştir
          >
            <Text className="text-[#536F61] text-base font-semibold">
              Reminders
            </Text>
            <Ionicons
              name={reminderVisible ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color="#536F61"
            />
          </TouchableOpacity>

          {/* Hatırlatıcı Kartı (Görünürse Göster) */}
          {reminderVisible && (
            <View className="bg-white p-3 mt-2 rounded-lg shadow-md flex-row items-center">
              <TextInput
                editable={false}
                value="Bring a hat and sunglasses."
                className="text-[#536F61] text-sm flex-1"
              />
              <TouchableOpacity className="p-2">
                <Ionicons name="calendar-outline" size={20} color="#536F61" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <Ionicons name="trash-outline" size={20} color="#536F61" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Notes;
