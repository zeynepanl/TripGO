import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import Modal from "react-native-modal";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatbotModal = ({ isOpen, onRequestClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // Google Generative AI yapılandırması
    const initChatbot = async () => {
      const API_KEY = "AIzaSyC4UcdvO4PNGOInlE4tZcZKNeZHWMipuE4"; // Kendi API anahtarınızı buraya ekleyin
      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const newChat = model.startChat({
        history: [], // Sohbet geçmişini başlat
        generationConfig: { maxOutputTokens: 100 },
      });
      setChat(newChat);
    };

    initChatbot();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      // Google Generative AI üzerinden yanıt al
      const result = await chat.sendMessage(message);
      const responseText =
        result.response.text || result.response.candidates[0]?.text;

      const botMessage = {
        role: "bot",
        text: responseText || "Üzgünüm, şu anda size yardımcı olamıyorum.",
      };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Hata:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Üzgünüm, bir hata oluştu." },
      ]);
    }

    setMessage(""); // Mesaj girişini temizle
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className="bg-white rounded-t-lg p-4 shadow-lg">
        <Text className="text-lg font-bold text-center text-[#536F61] mb-2">
          TripGO Chatbot
        </Text>

        <FlatList
          data={chatHistory}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={`mb-2 ${
                item.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <Text
                className={`px-4 py-2 rounded-lg ${
                  item.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {item.text}
              </Text>
            </View>
          )}
          style={{ maxHeight: 300, marginBottom: 10 }}
        />

        <View className="flex-row">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-4 py-2 border rounded-lg border-gray-300"
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <Text className="text-white font-bold">Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatbotModal;
