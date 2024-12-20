import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PostDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = '67607fafb9fc1c90104eee9c';

  const fetchPostDetails = async () => {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        axios.get(`http://192.168.0.112:3000/api/posts/${id}`),
        axios.get(`http://192.168.0.112:3000/api/posts/${id}/comments`)
      ]);

      setPost(postResponse.data.post);
      setComments(commentsResponse.data.comments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error);
      Alert.alert('Error', 'Could not load post details');
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://192.168.0.112:3000/api/posts/add-comment`,
        {
          postId: id,
          userId: userId,
          content: newComment
        }
      );

      const { _id, content, user } = response.data.comment;
      const updatedComment = { _id, content, user };

      setComments(prevComments => [...prevComments, { 
        ...updatedComment, 
        user: { ...user, name: 'Abdellatif El kerbani' } // Replace 'Your Username' with actual user logic
      }]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Could not add comment');
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  if (loading || !post) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const ListHeaderComponent = () => (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      
      <Image 
        source={require('../../assets/images/plant-disease.jpeg')}
        style={styles.postImage} 
      />
      
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.content}</Text>
      </View>
      
      <View style={styles.commentsSection}>
        <Text style={styles.commentsSectionTitle}>Comments</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.mainContent}>
        <FlatList
          data={comments}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentUserName}>{item.user.name}</Text>
              <Text style={styles.commentText}>{item.content}</Text>
            </View>
          )}
          keyExtractor={item => item._id}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
          numberOfLines={1}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={addComment}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    margin: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postDetails: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    color: '#666',
  },
  commentsSection: {
    padding: 20,
    paddingBottom: 0,
  },
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  commentUserName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  commentText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
