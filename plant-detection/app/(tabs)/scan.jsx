// import { View, Text, Image, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// import { Camera } from 'expo-camera';
// import * as FileSystem from 'expo-file-system';

// export default function scan() {
//   const [imageUri, setImageUri] = useState(null); // State to hold the image URI

//   const takePicture = async () => {
//     // Request camera permissions
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('Camera permission not granted');
//       return;
//     }

//     // Launch the camera
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log('Camera result:', result); // Log the entire result object

//     if (!result.canceled) {
//       const imageUri = result.assets[0].uri; // Access the URI from the first asset
//       console.log('Image URI:', imageUri); // Log the image URI
//       setImageUri(imageUri); // Set the captured image URI to state

//       router.replace('home', { imageUri });
//       // Save the image to the document directory
//       const path = imageUri.split('/');
//       const filename = path[path.length - 1];
//       const newPath = `${FileSystem.documentDirectory}${filename}`; // Use document directory

//       try {
//         await FileSystem.copyAsync({
//           from: imageUri,
//           to: newPath,
//         });
//         console.log('Image saved to:', newPath); // Log the new path
//       } catch (error) {
//         console.error('Error saving image:', error);
//       }
//     } else {
//       console.log('User cancelled the picker!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Picture" onPress={takePicture} />
//       {imageUri && ( // Conditionally render the image if it exists
//         <Image
//           source={{ uri: imageUri }} // Use the saved image URI
//           style={styles.image}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginTop: 20,
//   },
// });

import { View, Text } from 'react-native';
import React from 'react';

export default function scan() {
  return (
    <View>
      <Text>scan</Text>
    </View>
  );
}
