import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Home() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      setMessage('Please select an image first');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    console.log(image);
    try {
          const response = await fetch('http://192.168.1.10:8008/predict', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const jsonResponse = await response.json();
            setMessage('Image uploaded successfully!');
            setPrediction(jsonResponse);
          } else {
            setMessage('Upload failed, please try again.');
            console.log('Error:', response.status);
          }
        } catch (error) {
          setMessage('An error occurred while uploading.');
          console.log('Error:', error);
        } finally {
          setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && (
        <Button
          title={uploading ? 'Uploading...' : 'Upload Image'}
          onPress={uploadImage}
          disabled={uploading}
          style={{ marginTop: 20 }}
        />
      )}
      {message ? <Text style={{ marginTop: 20 }}>{message}</Text> : null}
      {prediction && (
        <View style={{ marginTop: 20 }}>
          <Text>Prediction: {prediction.class}</Text>
          <Text>Confidence: {prediction.confidence.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
