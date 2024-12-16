import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
export default function ScanPlant() {
  const router = useRouter();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        height:100,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.push('/scan-plant/plant-scanner');
        }}
      >
        <Text>Scan Plant</Text>
      </TouchableOpacity>
    </View>
  );
}
