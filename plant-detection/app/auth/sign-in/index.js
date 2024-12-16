import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Touchable,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
//import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FireBaseConfig';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    const userData = {
      email,
      password,
    };

    // console.log('Email:', email);
    // console.log('Password:', password);

    axios
      .post('http://192.168.0.112:3000/login', userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 'ok') {
          ToastAndroid.show('login successfull', ToastAndroid.SHORT);
          AsyncStorage.setItem('token', res.data.data);
          //navigation.navigate('/home');
          router.replace('/home');
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
          source={require('./../../../assets/images/welcome4.jpg')}
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
              Welcome back
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 15,
                color: Colors.GREY,
                textAlign: 'center',
              }}
            >
              Login to your account
            </Text>
          </View>

          <View style={styles.InputContainer}>
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
                onChange={(value) => setPassword(value.nativeEvent.text)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={{ marginTop: -6 }}
              onPress={() => console.log('create the forgot password page')}
            >
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'outfit-bold',
                  fontSize: 12,
                  marginBottom: 29,
                  textDecorationLine: 'underline', // Added underline to mimic a link
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.login_button} onPress={onSignIn}>
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit',
                fontSize: 17,
              }}
            >
              Login
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
              Don't have an acount?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                router.push('auth/sign-up');
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
                Sign up
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
