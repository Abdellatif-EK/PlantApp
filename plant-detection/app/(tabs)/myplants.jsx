import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MyPlants() {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Potato Plant',
      description: 'Root Vegetable',
      image: require('../../assets/images/potato-plant.jpg'),
      care: 'Low Maintenance',
      color: ['#8BC34A', '#4CAF50'],
    },
    {
      id: 2,
      name: 'Tomato Plant',
      description: 'Fruit Vegetable',
      image: require('../../assets/images/tomato-plant.jpg'),
      care: 'Moderate Care',
      color: ['#FF5722', '#F44336'],
    },
    {
      id: 3,
      name: 'Carrot Plant',
      description: 'Root Vegetable',
      image: require('../../assets/images/potato-plant.jpg'),
      care: 'Easy Maintenance',
      color: ['#FF9800', '#FFC107'],
    },
    {
      id: 4,
      name: 'Lettuce Plant',
      description: 'Leafy Vegetable',
      image: require('../../assets/images/tomato-plant.jpg'),
      care: 'High Maintenance',
      color: ['#03A9F4', '#00BCD4'],
    },
    {
      id: 5,
      name: 'Lettuce Plant',
      description: 'Leafy Vegetable',
      image: require('../../assets/images/tomato-plant.jpg'),
      care: 'High Maintenance',
      color: ['#03A9F4', '#00BCD4'],
    },
    {
      id: 6,
      name: 'Lettuce Plant',
      description: 'Leafy Vegetable',
      image: require('../../assets/images/tomato-plant.jpg'),
      care: 'High Maintenance',
      color: ['#03A9F4', '#00BCD4'],
    },
  ]);

  const handleDeletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Garden</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {plants.map((plant) => (
          <LinearGradient
            key={plant.id}
            colors={plant.color}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.plantCard}
          >
            <Image source={plant.image} style={styles.plantImage} />
            
            <View style={styles.plantDetails}>
              <View style={styles.plantTextContainer}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantDescription}>{plant.description}</Text>
                <Text style={styles.plantCare}>{plant.care}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeletePlant(plant.id)}
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
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
  plantCare: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  deleteButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});