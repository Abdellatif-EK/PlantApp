import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  const route = useRouter();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://192.168.0.112:3000/api/users/67607fafb9fc1c90104eee9c/reset-password', {
        oldPassword,
        newPassword,
      });
      console.log('Password reset successfully:', response.data);
      Alert.alert('Password reset successfully');
      route.back();
      // Navigate back or show a success message
    } catch (error) {
      // Check if error response exists and alert the message
      const errorMessage = error.response?.data?.data || error.message;
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => route.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Old Password */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Old Password"
            secureTextEntry
          />
        </View>

        {/* New Password */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleResetPassword}>
          <Text style={styles.saveButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f7',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
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
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPassword;
