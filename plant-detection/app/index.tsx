import { Text, View } from 'react-native';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function Index() {
  const [storedToken, setStoredToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setStoredToken(token);
      console.log(token);
    };
    fetchToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {storedToken ? <Redirect href="/home" /> : <Login />}
    </View>
  );
}
