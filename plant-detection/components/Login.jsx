import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  return (
    <View style={styles.container_father}>
      <ImageBackground
        source={require('./../assets/images/welcome1.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Plant disease detection app</Text>
        </View>

        <View style={styles.container_child}>
          <TouchableOpacity
            style={styles.signup_button}
            onPress={() => router.push('auth/sign-up')}
          >
            <Text
              style={{
                color: Colors.PRIMARY,
                textAlign: 'center',
                fontFamily: 'outfit',
                fontSize: 17,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login_button}
            onPress={() => router.push('auth/sign-in')}
          >
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
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container_father: {
    flex: 1,
  },
  container_child: {
    // flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // Optional: Add styles for the text container if needed
    flex: 3,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 45,
    fontFamily: 'outfit-bold',
    top: 200,
  },
  signup_button: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 99,
    margin: 10,
    width: 300,
  },
  login_button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    margin: 10,
    width: 300,
  },
});
