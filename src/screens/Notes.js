import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, Modal, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; 
import TabBar from "../components/TabBar";
import { auth } from "../../firebaseConfig"; // Firebase Authentication
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore bağlantısı
import { Swipeable } from "react-native-gesture-handler";

const Notes = ({ navigation }) => {
  const [noteText, setNoteText] = useState(""); // Yeni not girişi
  const [notes, setNotes] = useState([]); // Kullanıcının notları
  const [selectedNote, setSelectedNote] = useState(null); // Düzenlenecek not
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü
  const [isEditing, setIsEditing] = useState(false); // Düzenleme modu
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Klavye görünürlüğü

  const currentUser = auth.currentUser; // Mevcut kullanıcı

  // Klavye olaylarını dinleme
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Firestore'dan notları çekme
  useEffect(() => {
    if (!currentUser) return;

    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Yeni not ekleme
  const handleAddNote = async () => {
    if (!noteText.trim()) {
      Alert.alert("Hata", "Not boş olamaz!");
      return;
    }

    try {
      const notesRef = collection(db, "notes");
      await addDoc(notesRef, {
        text: noteText,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      setNoteText("");
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Not silme
  const handleDeleteNote = async (noteId) => {
    try {
      const noteDocRef = doc(db, "notes", noteId);
      await deleteDoc(noteDocRef);
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Not kaydetme
  const handleSaveNote = async () => {
    try {
      const noteDocRef = doc(db, "notes", selectedNote.id);
      await updateDoc(noteDocRef, { text: selectedNote.text });
      setModalVisible(false);
      setIsEditing(false);
      setSelectedNote(null);
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Silme işlemi için sağa kaydırma
  const renderRightActions = (noteId) => (
    <TouchableOpacity
      onPress={() => handleDeleteNote(noteId)}
      className="bg-red-400 w-[20%] justify-center items-center rounded-lg h-24"
    >
      <Ionicons name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

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
        <Text className="text-2xl font-bold text-[#536F61] ml-4">Notlar</Text>
      </View>

      {/* Yeni Not Ekleme Alanı */}
      <View className="flex-row justify-between mb-5 px-5">
        {/* Yeni Not İçin Giriş */}
        <View className="bg-white p-4 rounded-lg shadow-md w-[70%]">
          <TextInput
            placeholder="Yeni bir not yaz..."
            placeholderTextColor="#A0AEC0"
            value={noteText}
            onChangeText={setNoteText}
            className="text-sm text-[#536F61]"
          />
        </View>

        {/* Yeni Not Ekle */}
        <TouchableOpacity
          className="bg-white p-4 rounded-lg shadow-md w-[25%] items-center justify-center"
          onPress={handleAddNote}
        >
          <Ionicons name="add-outline" size={30} color="#536F61" />
        </TouchableOpacity>
      </View>

      {/* Not Listesi */}
      <FlatList
        className="px-5 flex-1"
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              onPress={() => {
                setSelectedNote(item);
                setModalVisible(true);
              }}
            >
              <View className="bg-white p-4 rounded-lg shadow-md mb-4 h-24 flex justify-between">
                <Text
                  className="text-sm text-[#536F61]"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.text}
                </Text>
                <Text className="text-xs text-gray-400">
                  {item.createdAt?.toDate().toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />

      {/* Not Düzenleme Modalı */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setIsEditing(false);
          setSelectedNote(null);
        }}
      >
        <BlurView intensity={50} tint="light" className="flex-1">
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-6 rounded-lg w-[90%] shadow-lg">
              {isEditing ? (
                <TextInput
                  className="bg-gray-100 p-4 rounded-lg text-sm text-[#536F61] mb-4"
                  value={selectedNote.text}
                  onChangeText={(text) =>
                    setSelectedNote((prev) => ({ ...prev, text }))
                  }
                  multiline
                />
              ) : (
                <Text className="text-sm text-[#536F61] mb-4">
                  {selectedNote?.text}
                </Text>
              )}
              <View className="flex-row justify-between">
                {isEditing ? (
                  <TouchableOpacity
                    onPress={handleSaveNote}
                    className="bg-[#DAEAE2] px-4 py-2 rounded-lg"
                  >
                    <Text className="text-[#536F61]">Save</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    className="bg-[#DAEAE2] px-4 py-2 rounded-lg"
                  >
                    <Text className="text-[#536F61]">Edit</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setIsEditing(false);
                    setSelectedNote(null);
                  }}
                  className="bg-gray-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>

      {/* TabBar */}
      {!keyboardVisible && (
        <View className="absolute bottom-0 left-0 right-0 bg-white">
          <TabBar navigation={navigation} />
        </View>
      )}
    </View>
  );
};

export default Notes;
