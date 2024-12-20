import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
export default function AddPlant() {
  const router = useRouter();
  return (
    // <View
    //   style={{
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: Colors.PRIMARY,
    //     height:100,
    //   }}
    // >
    //   <TouchableOpacity
    //     onPress={() => {
    //       router.push('/scan-plant/plant-scanner');
    //     }}
    //   >
    //     <Text>Scan Plant</Text>
    //   </TouchableOpacity>
    // </View>

    <TouchableOpacity style={styles.addButton}         
            onPress={() => {
              router.push('/plants/add-plant');
            }}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
