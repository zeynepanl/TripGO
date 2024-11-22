import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar"; // TabBar bileşeni

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [history, setHistory] = useState([]); // Konum geçmişini tutmak için

  useEffect(() => {
    (async () => {
      // Konum izinlerini kontrol et
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      // Konumu al
      let currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        timestamp: new Date().toLocaleString(), // Zaman bilgisi
      };

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Geçmişe ekle
      setHistory((prevHistory) => [newLocation, ...prevHistory]);
    })();
  }, []);

  const handleHistoryPress = () => {
    if (history.length === 0) {
      alert("No location history available.");
      return;
    }

    alert(
      history
        .map(
          (loc, index) =>
            `${index + 1}. Lat: ${loc.latitude}, Lon: ${loc.longitude} (${loc.timestamp})`
        )
        .join("\n")
    );
  };

  if (!location) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">Loading map...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      {/* Harita */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={location}
        showsUserLocation={true}
      >
        {/* Kullanıcının Konumu */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="My Location"
          description="This is where you are!"
        />
      </MapView>

      {/* Geri Butonu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-5 bg-white p-3 rounded-full shadow-md"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* History Butonu */}
      <TouchableOpacity
        onPress={handleHistoryPress}
        className="absolute bottom-20 right-5 bg-white p-3 rounded-full shadow-md items-center justify-center"
      >
        <Ionicons name="time-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* TabBar */}
      <View className="absolute bottom-0 w-full bg-white">
        <TabBar navigation={navigation} />
      </View>
    </View>
  );
};

export default Map;
