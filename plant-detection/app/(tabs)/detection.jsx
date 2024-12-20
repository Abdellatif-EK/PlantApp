import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl, // Add this import
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Detection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [imageCache, setImageCache] = useState({});
  const router = useRouter();

  const fetchImage = async (imageUrl) => {
    if (imageCache[imageUrl]) {
      return imageCache[imageUrl];
    } else {
      try {
        const isCorrectFormat = imageUrl.startsWith('uploads/');
        const imagePath = isCorrectFormat ? imageUrl : `uploads/${imageUrl}`;
  
        const response = await axios.post(
          "http://192.168.0.112:3000/api/posts/get-image",
          { image: imagePath },
          {
            responseType: "blob"
          }
        );
  
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const objectURL = URL.createObjectURL(blob);
  
        setImageCache(prevCache => ({
          ...prevCache,
          [imageUrl]: objectURL
        }));
  
        return objectURL;
      } catch (error) {
        // console.error("Error fetching image:", error.response ? error.response.data : error.message);
        return null;
      }
    }
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://192.168.0.112:3000/api/posts/");
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  // Add onRefresh handler
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  // PostItem component remains the same
  const PostItem = ({ item, fetchImage, router }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadImage = async () => {
        const imageSrc = await fetchImage(item.imageUrl);
        setImageSrc(imageSrc);
        setLoading(false);
      };
      loadImage();
    }, [item.imageUrl]);
  
    return (
      <View style={styles.postContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (

            <Image
             source={require('../../assets/images/plant-disease.jpeg')}
              style={styles.postImage}
              onError={() =>
                console.error("Failed to load image:", item.imageUrl)
              }
            />

        )}
        <View style={styles.postDetails}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.content}</Text>
  
          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.commentsButton}
              onPress={() =>
                router.push(`/community/post-details?id=${item._id}`)
              }
            >
              <Text style={styles.commentsButtonText}>View Comments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderPostItem = ({ item }) => (
    <PostItem item={item} fetchImage={fetchImage} router={router} />
  );
  
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Community Posts</Text>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => router.push("/community/create-post")}
        >
          <Text style={styles.createPostButtonText}>+ New Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.postList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4CAF50"]}
          />
        }
        // Add bottom padding to prevent overlap with navigation tabs
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  // Posts Screen Styles
  listFooter: {
    height: 80, // Adjust this value based on your bottom navigation height
  },
  postList: {
    padding: 30,
    paddingBottom: 0, // Remove bottom padding from content container
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createPostButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  createPostButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  postList: {
    padding: 20,
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postDetails: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    color: "#666",
  },
  postActions: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  commentsButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  commentsButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  // Create Post Styles
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
  },
  imagePicker: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 15,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  // Post Details Styles
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentsSection: {
    padding: 20,
  },
  commentItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentText: {
    color: "#333",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sendCommentButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  sendCommentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
