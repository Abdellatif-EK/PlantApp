import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Pick image from device
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Create post
  const createPost = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', description.trim());
      
      if (imageUri) {
        const fileType = imageUri.split('.').pop();
        formData.append('image', {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        });
      }
  
      await axios.post(
        'http://192.168.0.112:3000/api/posts/create', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      Alert.alert('Success', 'Post created successfully');
      router.back();
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Could not create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        {/* Title Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="text-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />
        </View>

        {/* Description Input */}
        <View style={[styles.inputWrapper, styles.descriptionWrapper]}>
          <Ionicons name="document-text-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Write your post description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholderTextColor="#888"
          />
        </View>

        {/* Image Picker */}
        <TouchableOpacity 
          style={styles.imagePickerButton} 
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={18} color="#888" style={styles.icon} />
          <Text style={styles.imagePickerText}>
            {imageUri ? 'Change Image' : 'Add an Image'}
          </Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.removeImageButton} 
              onPress={() => setImageUri(null)}
            >
              <Ionicons name="close-circle" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!title.trim() || !description.trim()) && styles.saveButtonDisabled
          ]} 
          onPress={createPost}
          disabled={isLoading || !title.trim() || !description.trim()}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Create Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  descriptionWrapper: {
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  icon: {
    marginRight: 8,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  descriptionInput: {
    height: 120,
    paddingTop: 0,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  imagePickerText: {
    color: '#2ecc71',
    fontSize: 14,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#a8e6bc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});