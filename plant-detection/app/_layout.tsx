import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // add this inside the Stack component if you want to hide the nav title for every page : screenOptions={{headerShown:false}}
    <NavigationContainer> 
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
    </NavigationContainer> 
  );
}
