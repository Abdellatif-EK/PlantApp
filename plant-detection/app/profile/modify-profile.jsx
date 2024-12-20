import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
const ModifyProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');

  const navigation = useNavigation();
  const route = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.0.112:3000/api/users/67607fafb9fc1c90104eee9c'
        );
        console.log(response.data); // Log to ensure data is structured properly
        const userData = response.data.data; // Access the nested "data" object
  
        setName(userData?.name || '');
        setEmail(userData?.email || '');
        setDateOfBirth(new Date(userData?.dateOfBirth) || new Date());
        setTelephone(userData?.telephone || '');
        setAddress(userData?.address || '');
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setSex(userData?.sex || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleSaveChanges = async () => {
    try {
      await axios.put('http://192.168.0.112:3000/api/users/67607fafb9fc1c90104eee9c', {
        name,
        email,
        dateOfBirth: dateOfBirth.toISOString(),
        telephone,
        address,
        firstName,
        lastName,
        sex,
      });
      console.log('Profile updated successfully');
      alert('Profile updated successfully');
      route.back();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const showDatePickerModal = () => setShowDatePicker(true);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity onPress={() => route.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.formContainer}>
        {/* First Name */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputWrapper}>
          <Ionicons name="calendar-outline" size={18} color="#888" style={styles.icon} />
          <TouchableOpacity style={styles.input} onPress={showDatePickerModal}>
            <Text style={styles.dateText}>
              {dateOfBirth.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios'); // Hide picker on Android
                if (selectedDate) {
                  setDateOfBirth(selectedDate);
                  setShowDatePicker(false); // Hide picker after selecting a date
                }
              }}
            />
          )}
        </View>

        {/* Telephone */}
        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={telephone}
            onChangeText={setTelephone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Address */}
        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
        </View>

        {/* Sex */}
        <View style={styles.inputWrapper}>
          <Ionicons name="male-female-outline" size={18} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={sex}
            onChangeText={setSex}
            placeholder="Sex"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    fontSize: 30,
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
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  dateText: {
    paddingTop: 9,
    fontSize: 16,
    color: '#34495e',
  },
});

export default ModifyProfile;