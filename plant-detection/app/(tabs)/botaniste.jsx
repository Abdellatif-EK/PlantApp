import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import {  StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/Profile/CustomButton';

export default function Botaniste() {
  const navigation = useNavigation();
  const router = useRouter();
  function SignOut() {
    AsyncStorage.setItem('token', '');
    //navigation.navigate('auth/sign-in');
    router.replace('auth/sign-in');
  }
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/profile-pic.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <CustomButton text="Edit Profile" path="/profile/modify-profile" />
        <CustomButton text="Reset Password" path="/profile/reset-password" />
        <TouchableOpacity onPress={SignOut} style={styles.actionButton}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f7',
  },
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#2ecc71',
    marginBottom:-100,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
