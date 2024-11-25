import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Keyboard, Animated, TouchableOpacity } from "react-native";
import PopularDestinations from "../components/PopularDestinations";
import ScheduleCard from "../components/ScheduleCard";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import ChatbotModal from "../components/ChatbotModal";

const Home = ({ navigation }) => {
  const tabBarOpacity = useRef(new Animated.Value(1)).current;
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(tabBarOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(tabBarOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const schedule = [
    {
      id: 1,
      title: "Efes Antik Kenti, İzmir",
      image: require("../../assets/images/efes.jpeg"),
      completed: true,
    },
    {
      id: 2,
      title: "Alaçatı, İzmir",
      image: require("../../assets/images/alacati.jpeg"),
      completed: false,
    },
  ];

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      <View className="flex-1 px-5">
        {/* Başlık */}
        <Text className="text-4xl font-bold text-[#536F61] mt-24 mb-7 text-left">
          New Routes Await,{"\n"}Ready to Explore?
        </Text>

        {/* Arama */}
        <SearchBar
          placeholder="Where to go?"
          onPress={() => navigation.navigate("Discover")}
        />

        {/* Popüler Destinasyonlar */}
        <PopularDestinations navigation={navigation} />

        {/* Takvim */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-[#2C2C2C] mb-3">My schedule</Text>
          <FlatList
            data={schedule}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ScheduleCard
                title={item.title}
                image={item.image}
                completed={item.completed}
              />
            )}
          />
        </View>
      </View>

      {/* Chatbot Baloncuğu */}
      <TouchableOpacity
        onPress={() => setIsChatbotOpen(true)}
        className="absolute bottom-20 right-5 bg-[#DAEAE2] p-4 rounded-full shadow-lg"
      >
        <Text className="text-white text-lg">💬</Text>
      </TouchableOpacity>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onRequestClose={() => setIsChatbotOpen(false)}
      />

      {/* TabBar */}
      <Animated.View style={{ opacity: tabBarOpacity }}>
        <TabBar navigation={navigation} />
      </Animated.View>
    </View>
  );
};

export default Home;
