import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AddPlant from '../../components/Plant/AddPlant';

const { width } = Dimensions.get('window');

export default function MyPlants() {
  const [plants, setPlants] = useState([]); // Dynamic plant list
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refresh state
  const navigation = useNavigation();
  const router = useRouter();

  const userId = '67607fafb9fc1c90104eee9c'; // Replace with the logged-in user's ID

  const images = {
    'potato-plant': require('../../assets/images/potato-plant.jpg'),
    'tomato-plant': require('../../assets/images/tomato-plant.jpg'),
    'pepper-plant': require('../../assets/images/pepper-plant.jpg'),
    // Add other images here
  };
  
  // Fetch plants associated with the user
  const fetchUserPlants = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.112:3000/api/plants/user/${userId}`
      );
      setPlants(response.data.data || []); // Ensure data is an array
    } catch (error) {
      console.error('Error fetching plants:', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Disassociate plant from user's garden
  const handleDisassociatePlant = async (plantId) => {
    try {
      await axios.post(`http://192.168.0.112:3000/api/plants/disassociate`, {
        userId,
        plantId,
      });
      setPlants(plants.filter((plant) => plant._id !== plantId));
    } catch (error) {
      console.error('Error disassociating plant:', error.message);
    }
  };

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserPlants();
  }, []);

  // Fetch plants when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUserPlants();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Garden</Text>
        <AddPlant />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']} // Android
            tintColor="#4CAF50" // iOS
          />
        }
      >
        {plants.map((plant) => (
          <LinearGradient
            key={plant._id}
            colors={['#8BC34A', '#4CAF50']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.plantCard}
          >
            <Image
              source={images[plant.image]} // Use the image mapping here
              style={styles.plantImage}
            />

            <View style={styles.plantDetails}>
              <View style={styles.plantTextContainer}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantDescription}>
                  {plant.description}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                {/* Disassociate button */}
                <TouchableOpacity
                  style={styles.disassociateButton}
                  onPress={() => handleDisassociatePlant(plant._id)}
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  plantCard: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  plantImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  plantDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  plantTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  plantDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disassociateButton: {
    backgroundColor: 'rgba(255,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});