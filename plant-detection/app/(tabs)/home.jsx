import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Home() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        {/* Plants Container */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/plants-image.png')} // Replace with actual image URL
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Plants</Text>
        </TouchableOpacity>

        {/* Diseases Container */}
        <TouchableOpacity style={styles.card}>
          <Image
            // source={{ uri: 'https://example.com/diseases-image.jpg' }} // diseases-image  Replace with actual image URL
            source={require('../../assets/images/diseases-image.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Diseases</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  headerText: {
    padding: 10,
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
  },
  middleSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
});
