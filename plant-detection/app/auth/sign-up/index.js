import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FireBaseConfig';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = async () => {
    if (!email || !password || !name) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    const userData = {
      name,
      email,
      password,
    };

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    axios
      .post('http://192.168.0.112:3000/register', userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 'ok') {
          ToastAndroid.show('Resigtered successfull', ToastAndroid.SHORT);
          navigation.goBack();
          router.push('auth/sign-in');
        } else {
          console.log(JSON.stringify(res.data.data));
          ToastAndroid.show(JSON.stringify(res.data.data), ToastAndroid.SHORT);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Container}
    >
      <ScrollView contentContainerStyle={styles.ScrollViewContent}>
        <Image
          source={require('./../../../assets/images/welcome3.jpg')}
          style={styles.Background}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
        </TouchableOpacity>

        <View style={styles.Login_Container}>
          <View style={styles.Welcome_text_container}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                color: Colors.SECONDARY,
                textAlign: 'center',
              }}
            >
              Register
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 15,
                color: Colors.GREY,
                textAlign: 'center',
              }}
            >
              Create your new account
            </Text>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.InputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.GREY}
                style={styles.InputIcon}
              />
              <TextInput
                placeholder="Full Name"
                style={styles.Input}
                onChange={(value) => setFullName(value.nativeEvent.text)}
              />
            </View>
            <View style={styles.InputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.GREY}
                style={styles.InputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChange={(value) => setEmail(value.nativeEvent.text)}
              />
            </View>
            <View style={styles.InputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.GREY}
                style={styles.InputIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.Input}
                secureTextEntry
                onChange={(value) => setPassword(value.nativeEvent.text)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.login_button}
            onPress={OnCreateAccount}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit',
                fontSize: 17,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                textAlign: 'right',
                fontFamily: 'outfit',
                fontSize: 14,
                color: Colors.GREY,
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                router.push('auth/sign-in');
              }}
            >
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'outfit-bold',
                  fontSize: 14,
                  textDecorationLine: 'underline',
                  marginLeft: 6, // Added underline to mimic a link
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  Background: {
    height: 300,
    width: '100%',
  },
  Container: {
    flex: 1,
  },
  ScrollViewContent: {
    flexGrow: 1,
  },
  Login_Container: {
    backgroundColor: Colors.WHITE,
    marginTop: -70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Welcome_text_container: {
    marginTop: 10,
    marginBottom: 30,
  },
  InputContainer: {
    width: '100%',
  },
  InputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: Colors.LIGHTGREEN,
  },
  InputIcon: {
    padding: 10,
  },
  Input: {
    flex: 1,
    padding: 10,
    fontFamily: 'outfit',
  },
  login_button: {
    backgroundColor: Colors.DARKGREEN,
    padding: 10,
    borderRadius: 99,
    margin: 10,
    marginTop: 30,
    width: 330,
  },
  iconContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    //zIndex: 1
  },
});
