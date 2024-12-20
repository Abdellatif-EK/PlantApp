import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Axios for API calls
import { useNavigation } from '@react-navigation/native'; // React Navigation
import { useRouter } from 'expo-router';

const AddPlant = () => {
  const [plants, setPlants] = useState([]); // Plant list
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation();
  const route = useRouter();
  
  const userId = '67607fafb9fc1c90104eee9c'; // Replace with logged-in user ID

  const images = {
    'potato-plant': require('../../assets/images/potato-plant.jpg'),
    'tomato-plant': require('../../assets/images/tomato-plant.jpg'),
    'pepper-plant': require('../../assets/images/pepper-plant.jpg'),
    // Add other images here
  };

  // Fetch all plants from API
  const fetchAllPlants = async () => {
    try {
      const response = await axios.get('http://192.168.0.112:3000/api/plants');
      setPlants(response.data.data); // Assuming the response contains a `data` field
    } catch (error) {
      console.error('Error fetching plants:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssociatePlant = async (plantId) => {
    try {
      const payload = {
        userId: '67607fafb9fc1c90104eee9c', // Replace with the actual logged-in user ID
        plantId: plantId, // The plant ID to associate
      };
      
      await axios.post('http://192.168.0.112:3000/api/plants/associate', payload); // Ensure to use the correct IP address for your server
      alert('Plant added to your garden!');
    } catch (error) {
      // console.error('Error associating plant:', error.message);
      alert(`Failed to add plant : ${error.response.data.message}`);
      // alert('Failed to add plant.' );
    }
  };
  

  useEffect(() => {
    fetchAllPlants();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => route.back()}>
          <Ionicons name="arrow-back" size={30} color="black" style={{paddingBottom:15,paddingRight:15}}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a Plant</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {plants.map((plant) => (
          <View key={plant._id} style={styles.plantCard}>
            <Image 
              source={images[plant.image]} // Use the image mapping here
              style={styles.plantImage} 
            />
            <View style={styles.plantDetails}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.plantDescription}>{plant.description}</Text>
              <Text style={styles.plantType}>Type: {plant.type}</Text>
              <Text style={styles.wateringFrequency}>Watering: {plant.wateringFrequency}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAssociatePlant(plant._id)}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  plantCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
  },
  plantImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  plantDetails: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  plantDescription: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 5,
  },
  plantType: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  wateringFrequency: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:140,
  },
});

export default AddPlant;