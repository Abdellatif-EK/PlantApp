import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
import Button from '../../components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import mime from 'mime';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Add this import
import { Modal } from 'react-native'; // Add this import
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function PlantScanner() {
  const navigation = useNavigation(); // Add this line to get the navigation object
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const router = useRouter();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'back',
    flash: 'on',
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility
  const [isUploading, setIsUploading] = useState(false); // Add state for uploading status
  const [message, setMessage] = useState('');

  const cameraRef = useRef(null);

  // Function to extract or generate an image ID from the URI
  const getImgId = (uri) => {
    // You can extract the ID from the URI or generate a unique ID
    // For example, if the URI is a file path, you can use the last part of the path
    const parts = uri.split('/');
    return parts[parts.length - 1].split('.')[0]; // Extracts the file name without extension
  };

  //to load the last saved image when permissions change
  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === 'granted'
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    // Permissions are still loading.
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== 'granted'
  ) {
    // Permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //function to toggle camera properties
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => {
      const newValue = current[prop] === option1 ? option2 : option1;
      return {
        ...current,
        [prop]: newValue,
        enableTorch: newValue === 'off', // Update enableTorch based on flash state
      };
    });
  };

  //function to zoom in
  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1),
    }));
  };

  //function to zoom out
  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0),
    }));
  };

  //function to take a picture and show it without saving it
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        console.log(picture);
        setImage(picture.uri);
      } catch (err) {
        console.log('Error while taking the picture : ', err);
      }
    }
  };

  const uploadImage = async () => {
    if (!image) {
      setMessage('Please select an image first');
      return;
    }

    setIsUploading(true); // Set uploading state to true
    setMessage('');

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    //console.log(image);
    try {
      const response = await fetch('http://192.168.1.10:8008/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setMessage('Image uploaded successfully!');
        // Navigate to DetectionResult with prediction data

        router.push({
          pathname: `/scan-plant/detection-result`,
          params: jsonResponse,
        });
      } else {
        setMessage('Upload failed, please try again.');
        console.log('Error:', response.status);
      }
    } catch (error) {
      setMessage('An error occurred while uploading.');
      console.log('Error:', error);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  if (isUploading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Image
          source={require('../../assets/images/welcome3.jpg')}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
        <View style={{ position: 'relative', zIndex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
            Uploading...
          </Text>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    );
  }

  //function to save the picture using MediaLibrary
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        //Alert.alert('Photo saved!', image);
        setImage(null);
        getLastSavedImage();
        uploadImage();
      } catch (err) {
        console.log('Error while saving the picture : ', err);
      }
    }
  };
  // const savePicture = async () => {
  //   if (image) {
  //     // Check if image is defined

  //     //console.log(image);
  //     //const newImageUri = 'file:///' + newImageUri.split('file:/').join('');
  //     //console.log('new image :', newImageUri);
  //     console.log('Image URI:', image); // Log the image URI
  //     const imageData = new FormData();
  //     const fileName = image.split('/').pop(); // Get the file name
  //     const fileType = mime.getType(image); // Get the MIME type

  //     imageData.append('file', {
  //       uri: image,
  //       name: 'photo.jpg',
  //       type: 'image/jpeg',
  //     });
  //     // console.log('Form Data :', imageData._parts); // Access the internal parts directly
  //     console.log(image);
  //     try {
  //       const response = await fetch('http://192.168.1.10:8008/predict', {
  //         method: 'POST',
  //         body: imageData,
  //       });

  //       if (response.ok) {
  //         const jsonResponse = await response.json();

  //         console.log(jsonResponse);
  //       } else {
  //         setMessage('Upload failed, please try again.');
  //         console.log('Error:', response.status);
  //       }
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }

  //     setImage(null);
  //     //getLastSavedImage();
  //   } else {
  //     console.log('Image is undefined:', image); // Log the image state for debugging
  //   }
  // };
  //function to get the last saved image from the 'DCIM' album created in the gallery by expo
  const getLastSavedImage = async () => {
    if (
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === 'granted'
    ) {
      const dcimAlbum = await MediaLibrary.getAlbumAsync('DCIM');

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

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

  const tips = [
    'Tip 1: Ensure good lighting for better detection.',
    'Tip 2: Hold the camera steady.',
    "Tip 3: Focus on the plant's leaves.",
  ];

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isUploading ? ( // Show uploading view if uploading
        renderUploadingView()
      ) : (
        <>
          {!image ? (
            <>
              <View style={styles.topControlsContainer}>
                <TouchableOpacity
                  style={{ position: 'absolute', paddingLeft: 30, zIndex: 1 }} // Added zIndex
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ position: 'absolute', paddingLeft: 300 }} // Changed 'styles' to 'style'
                  onPress={() => toggleProperty('flash', 'on', 'off')} // Update this line
                >
                  <Ionicons
                    name={
                      cameraProps.flash === 'on'
                        ? 'flash-outline'
                        : 'flash-off-outline'
                    }
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <CameraView
                style={styles.camera}
                zoom={cameraProps.zoom}
                facing={cameraProps.facing}
                flash={cameraProps.flash}
                animateShutter={cameraProps.animateShutter}
                enableTorch={cameraProps.enableTorch}
                ref={cameraRef}
              />

              <View style={styles.sliderContainer}>
                <Button icon="zoom-out" onPress={zoomOut} />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={cameraProps.zoom}
                  onValueChange={(value) =>
                    setCameraProps((current) => ({ ...current, zoom: value }))
                  }
                  step={0.1}
                />
                <Button icon="zoom-in" onPress={zoomIn} />
              </View>

              <View style={styles.bottomControlsContainer}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={{ uri: previousImage }}
                    style={styles.previousImage}
                  />
                </TouchableOpacity>

                <Button
                  icon="camera"
                  size={60}
                  style={{ height: 60 }}
                  onPress={takePicture}
                />

                <Button
                  icon="info" // Change icon to indicate tips
                  onPress={() => setModalVisible(true)} // Update this line
                  style={{ height: 70 }}
                  size={60}
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={handleCloseModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text
                        style={{
                          fontFamily: 'outfit-bold',
                          fontSize: 20,
                          marginBottom: 15,
                        }}
                      >
                        Detection Tips
                      </Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          marginBottom: 6,
                        }}
                      >
                        {tips.map((tip, index) => (
                          <Text key={index} style={styles.tipText}>
                            {tip}
                          </Text>
                        ))}
                      </View>

                      <TouchableOpacity
                        style={{
                          backgroundColor: '#4CAF50',
                          borderRadius: 10,
                          width: 70,
                          height: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={handleCloseModal}
                      >
                        <Text style={{ fontFamily: 'outfit-bold' }}>
                          Got it
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </>
          ) : (
            <>
              <Image source={{ uri: image }} style={styles.camera} />
              <View style={styles.bottomControlsContainer}>
                <Button
                  icon="flip-camera-android"
                  onPress={() => setImage(null)}
                />
                <Button icon="check" onPress={uploadImage} />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    marginBottom: 10,
    fontFamily: 'outfit',
  },
  uploadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
