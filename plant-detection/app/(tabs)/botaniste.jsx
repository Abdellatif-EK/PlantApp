import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

export default function Botaniste() {
  const navigation = useNavigation();
  const router = useRouter();
  function SignOut() {
    AsyncStorage.setItem('token', '');
    //navigation.navigate('auth/sign-in');
    router.replace('auth/sign-in');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={SignOut}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 20,
          margin: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
