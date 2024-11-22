import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

const Weather = ({ route, navigation }) => {
  const { cityName } = route.params || {};
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const weatherIconMapping = {
    Clear: "sunny-outline",
    Clouds: "cloud-outline",
    Rain: "rainy-outline",
    Snow: "snow-outline",
    Drizzle: "rainy-outline",
    Thunderstorm: "thunderstorm-outline",
    Mist: "cloudy-outline",
    Fog: "cloudy-outline",
  };

  const weatherIconColors = {
    Clear: "#FFD700",
    Clouds: "#A0A0A0",
    Rain: "#007BFF",
    Snow: "#00BFFF",
    Drizzle: "#007BFF",
    Thunderstorm: "#6A5ACD",
    Mist: "#A0A0A0",
    Fog: "#A0A0A0",
  };

  useEffect(() => {
    if (!cityName) {
      console.error("City name is missing!");
      return;
    }

    const fetchWeather = async () => {
      try {
        const apiKey = "f8a79e4a68fad1ccc71e5e1ee3c21d81";

        // Current weather data
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        );
        const currentWeatherData = await currentWeatherResponse.json();

        // Hourly weather data
        const hourlyWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
        );
        const hourlyWeatherData = await hourlyWeatherResponse.json();

        if (currentWeatherResponse.ok && hourlyWeatherResponse.ok) {
          setWeatherData(currentWeatherData);
          setHourlyData(hourlyWeatherData.list.slice(0, 5)); // İlk 5 saatlik hava durumu verisi
        } else {
          console.error("Error fetching weather data");
        }
      } catch (error) {
        console.error("Hava durumu verisi alınamadı:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  const getWeatherIcon = (condition) => {
    return weatherIconMapping[condition] || "cloud-outline";
  };

  const getWeatherIconColor = (condition) => {
    return weatherIconColors[condition] || "#A0A0A0";
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F7F7F7]">
        <ActivityIndicator size="large" color="#536F61" />
        <Text className="mt-4 text-lg font-medium text-gray-500">Loading weather data...</Text>
      </View>
    );
  }

  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F7F7F7]">
        <Text className="text-lg font-bold text-red-500">Error fetching weather data</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
          <Text className="text-blue-500">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5">
      {/* Geri Butonu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-white p-2 rounded-full shadow-md mt-12 w-10 h-10"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
      </TouchableOpacity>

      {/* Hava Durumu Bilgileri */}
      <View className="mt-6 items-center">
        <Ionicons name="location-outline" size={20} color="#536F61" />
        <Text className="text-lg font-semibold text-[#536F61]">{cityName}</Text>
        <View className="flex-row items-center mt-4">
          <Ionicons
            name={getWeatherIcon(weatherData.weather[0].main)}
            size={64}
            color={getWeatherIconColor(weatherData.weather[0].main)}
          />
          <Text className="text-5xl font-bold text-[#2C2C2C] ml-4">{weatherData.main.temp}°</Text>
        </View>
        <Text className="text-sm text-gray-500 capitalize">{weatherData.weather[0].description}</Text>
        <Text className="text-sm text-gray-500">
          Max.: {weatherData.main.temp_max}° Min.: {weatherData.main.temp_min}°
        </Text>
        <Text className="text-sm text-gray-500">Humidity: {weatherData.main.humidity}%</Text>
        <Text className="text-sm text-gray-500">Wind Speed: {weatherData.wind.speed} m/s</Text>
      </View>

      {/* Saatlik Hava Durumu */}
      <View className="mt-10 bg-[#E6F6F3] rounded-xl p-5">
        <View className="flex-row justify-between px-5">
          <Text className="text-lg font-bold text-[#536F61]">Today</Text>
          <Text className="text-lg font-bold text-[#536F61]">
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          </Text>
        </View>
        <FlatList
          horizontal
          data={hourlyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <View
                className="items-center justify-center mx-2 p-4 rounded-lg bg-white"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                  height: 120,
                  
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name={getWeatherIcon(item.weather[0].main)}
                    size={24}
                    color={getWeatherIconColor(item.weather[0].main)}
                  />
                  <Text className="text-lg font-bold text-[#2C2C2C] ml-2">
                    {Math.round(item.main.temp)}°
                  </Text>
                </View>
                <Text className="text-sm text-gray-500 mt-2">{time}</Text>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        />
      </View>

      {/* TabBar */}
      <View className="absolute bottom-0 left-0 right-0">
        <TabBar navigation={navigation} />
      </View>
    
    </View>
  );
};

export default Weather;
