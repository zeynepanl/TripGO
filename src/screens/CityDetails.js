import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import { fetchComments, addComment, deleteComment, updateComment } from "../services/commentService";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

const CityDetails = ({ route, navigation }) => {
  const city = route.params?.city;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // Düzenlenen yorumun ID'si
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (city) {
      fetchComments(city.id).then((fetchedComments) =>
        setComments(fetchedComments)
      );
    }
  }, [city]);

  const handleAddOrEditComment = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Hata", "Yorum yapmak için giriş yapmalısınız!");
      return;
    }

    if (!newComment.trim()) {
      Alert.alert("Hata", "Lütfen bir yorum yazın!");
      return;
    }

    try {
      if (editCommentId) {
        // Yorum güncelle
        await updateComment(editCommentId, newComment);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editCommentId ? { ...comment, commentText: newComment } : comment
          )
        );
        setEditCommentId(null); // Düzenleme işlemi sıfırla
      } else {
        // Yeni yorum ekle
        const commentData = {
          cityId: city.id,
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          profilePicture: currentUser.photoURL || null,
          commentText: newComment,
          createdAt: serverTimestamp(),
        };

        await addComment(commentData);
        setComments([...comments, { ...commentData, createdAt: new Date() }]);
      }
      setNewComment("");
    } catch (error) {
      console.error("Yorum eklenirken/güncellenirken hata:", error);
      Alert.alert("Hata", "Yorum eklenirken veya güncellenirken bir sorun oluştu.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Yorum silinirken hata:", error);
      Alert.alert("Hata", "Yorum silinirken bir sorun oluştu.");
    }
  };

  const toggleCommentsView = () => {
    setShowAllComments((prevState) => !prevState);
  };

  if (!city) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F7]">
        <Text className="text-lg text-gray-500">City data not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categories = [
    {
      id: 1,
      name: "Food & Drink",
      icon: "restaurant-outline",
      screen: "FoodAndDrink",
    },
    { id: 2, name: "Hotels", icon: "bed-outline", screen: "Hotels" },
    { id: 3, name: "Museum", icon: "business-outline", screen: "Museum" },
    { id: 4, name: "Nature", icon: "leaf-outline", screen: "Nature" },
    {
      id: 5,
      name: "Activities",
      icon: "bicycle-outline",
      screen: "Activities",
    },
    { id: 6, name: "Weather", icon: "cloud-outline", screen: "Weather" },
  ];

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-[#F7F7F7]">
        {/* Geri Oku */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-5 z-10 bg-white p-3 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#536F61" />
        </TouchableOpacity>

        <FlatList
          data={[1]} // Tek öğeli dizi, header için
          ListHeaderComponent={() => (
            <>
              {/* Şehir Görseli */}
              <Image
                source={city.image}
                className="w-full h-80 mt-10"
                resizeMode="cover"
              />

              {/* Şehir Adı ve Açıklama */}
              <View className="px-5 mt-4">
                <Text className="text-xl font-semibold text-[#536F61]">
                  {city.name}
                </Text>
                <Text className="text-sm text-gray-600 mt-2">
                  {city.description}
                </Text>
              </View>

              {/* Kategoriler */}
              <View className="px-5 mt-6">
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View className="items-center justify-center w-1/3 mb-5">
                      <TouchableOpacity
                        className="p-4 bg-white rounded-xl shadow-md items-center justify-center w-20 h-20"
                        onPress={() =>
                          navigation.navigate(item.screen, {
                            city: city,
                            cityName: city.name,
                          })
                        }
                      >
                        <Ionicons name={item.icon} size={24} color="#536F61" />
                      </TouchableOpacity>
                      <Text className="text-xs mt-2 text-[#536F61]">
                        {item.name}
                      </Text>
                    </View>
                  )}
                />
              </View>

              {/* Yorumlar Başlığı */}
              <View className="flex-row justify-between items-center px-5 mt-6">
                <Text className="text-lg font-bold text-[#536F61]">
                  Yorumlar
                </Text>
                {comments.length > 2 && (
                  <TouchableOpacity onPress={toggleCommentsView}>
                    <Text className="text-sm text-[#536F61]">
                      {showAllComments ? "Gizle" : "Tümünü Görüntüle"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Yorum Yaz */}
              <View className="px-5 mt-4 mb-4">
                <View className="flex-row items-center bg-white p-3 rounded-lg shadow-md">
                  <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Yorum yazın..."
                    className="flex-1 bg-gray-100 px-4 py-2 rounded-lg"
                    multiline
                  />
                  <TouchableOpacity
                    onPress={handleAddOrEditComment}
                    className="ml-2 px-2 py-2 rounded-full"
                  >
                    <Ionicons name="send" size={20} color="#536F61" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Yorumlar Listesi */}
              {displayedComments.map((item) => (
                <View
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md mb-2 mx-5 flex-row items-start"
                >
                  {item.profilePicture ? (
                    <Image
                      source={{ uri: item.profilePicture }}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  ) : (
                    <View className="w-10 h-10 rounded-full bg-gray-300 mr-4" />
                  )}
                  <View className="flex-1">
                    <Text className="text-sm font-bold">
                      {item.displayName || "Anonim"}
                    </Text>
                    <Text className="text-sm text-gray-700">
                      {item.commentText}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString()
                        : new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  {getAuth().currentUser?.uid === item.userId && (
                    <View className="flex-row">
                      {/* Düzenle Butonu */}
                      <TouchableOpacity
                        onPress={() => {
                          setNewComment(item.commentText);
                          setEditCommentId(item.id);
                        }}
                        className="mr-4"
                      >
                        <Ionicons name="pencil" size={20} color="#536F61" />
                      </TouchableOpacity>

                      {/* Sil Butonu */}
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(item.id)}
                      >
                        <Ionicons name="trash" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled" 
        />

        {/* TabBar */}
        <View className="absolute bottom-0 w-full">
          <TabBar navigation={navigation} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CityDetails;