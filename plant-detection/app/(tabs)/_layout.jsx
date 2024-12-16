import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter, Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import icons from '@/constants/icons';

export default function TabLayout() {
  const router = useRouter();
  
  const handleScanPress = () => {
    router.push('/scan-plant/plant-scanner');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 30,
          height: 70,
          shadowColor: Colors.BLACK,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          borderTopWidth: 0,  // Remove the border line above each tab
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 18,
              }}
            >
              <Image
                source={icons.Home}
                contentFit="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.PRIMARY : Colors.GRAY,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 10,  // Adjust font size to prevent wrapping
                  color: focused ? Colors.PRIMARY : Colors.GRAY,
                  fontFamily: 'outfit',
                  textAlign: 'center',
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="detection"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 18,
              }}
            >
              <Image
                source={icons.Detection}
                contentFit="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.PRIMARY : Colors.GRAY,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? Colors.PRIMARY : Colors.GRAY,
                  fontFamily: 'outfit',
                  textAlign: 'center',
                }}
              >
                Detection
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={handleScanPress}
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: -35,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.PRIMARY,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 8,
                  shadowColor: Colors.BLACK,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                }}
              >
                <Image
                  source={icons.Scanner}
                  contentFit="contain"
                  style={{
                    height: 35,
                    width: 35,
                    tintColor: Colors.BLACK,
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="myplants"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 18,
              }}
            >
              <Image
                source={icons.MyPlants}
                contentFit="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.PRIMARY : Colors.GRAY,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? Colors.PRIMARY : Colors.GRAY,
                  fontFamily: 'outfit',
                  textAlign: 'center',
                }}
              >
                My Plants
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="botaniste"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 18,
              }}
            >
              <Image
                source={icons.Profile}
                contentFit="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.PRIMARY : Colors.GRAY,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? Colors.PRIMARY : Colors.GRAY,
                  fontFamily: 'outfit',
                  textAlign: 'center',
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
