import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { useRouter } from 'expo-router'; // Import router

export default function DetectionResult() {
  const item = useLocalSearchParams(); // Assuming item is coming from search params
  const navigation = useNavigation(); // Initialize navigation
  const router = useRouter(); // Initialize router

  const details = {
    Rose: 'A beautiful flower known for its fragrance.',
    'Fungal Infection': 'Common treatment includes antifungal sprays.',
    'Late Blight': 'fuck yeah',
    Healthy: 'shit',
  };

  const data = [
    {
      name: 'Rose',
      Description: 'A beautiful flower known for its fragrance.',
      Traitement: 'Regular watering and sunlight exposure.',
      Symptômes: 'Wilting leaves, discoloration.',
      Image: 'path/to/rose-image.jpg',
      Type: 'Flower',
    },
    {
      name: 'Fungal Infection',
      Description: 'A common disease affecting plants.',
      Traitement: 'Use antifungal sprays and improve air circulation.',
      Symptômes: 'Moldy spots on leaves, stunted growth.',
      Image: 'path/to/fungal-infection-image.jpg',
      Type: 'Infection',
    },
    {
      name: 'Late Blight',
      Description: 'A serious disease that affects potatoes and tomatoes.',
      Traitement: 'Remove infected plants and apply fungicides.',
      Symptômes: 'Dark spots on leaves, rotting fruit.',
      Image: 'path/to/late-blight-image.jpg',
      Type: 'Disease',
    },
    {
      name: 'Healthy',
      Description: 'No disease present.',
      Traitement: 'Continue regular care.',
      Symptômes: 'Vibrant leaves, strong growth.',
      Image: 'path/to/healthy-plant-image.jpg',
      Type: 'Healthy',
    },
  ];

  const plantClass = item.class;
  const confidence = item.confidence;
  return (
    <ScrollView contentContainerStyle={styles.ScrollViewContent}>
      <Image
        source={require('../../assets/images/early-blight.jpg')}
        style={styles.Background}
      />
      <View
        style={{
          position: 'absolute',
          top: 40,
          left: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'outfit-bold',
            color: 'black',
            paddingLeft: 15,
          }}
        >
          Detection
        </Text>
      </View>
      <View style={styles.TextContainer}>
        <Text
          style={{ fontSize: 40, fontFamily: 'outfit-bold', textAlign: 'left' }}
        >
          Early Blight
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            textAlign: 'left',
            color: 'green',
          }}
        >
          Fungus
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 20, paddingTop: 20 }}>
          Description :
        </Text>
        <Text style={{ fontFamily: 'outfit', padding: 10 }}>
          Early blight of potato is caused by the fungus, Alternaria solani,
          which can cause disease in potato, tomato, other members of the potato
          family, and some mustards. This disease, also known as target spot,
          rarely affects young, vigorously growing plants. It is found on older
          leaves first. Early blight is favored by warm temperatures and high
          humidity.
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 20, paddingTop: 20 }}>
          Symptoms :
        </Text>
        <Text style={{ fontFamily: 'outfit', padding: 10 }}>
          Spots begin as small, dark, dry, papery flecks, which grow to become
          brown-black, circular-to-oval areas. The spots are often bordered by
          veins that make them angular. The spots usually have a target
          appearance, caused by concentric rings of raised and depressed dead
          tissue. A yellowish or greenish-yellow ring is often seen bordering
          the growing spots. As the spots become very large, they often cause
          the entire leaf to become yellow and die. This is especially true on
          the lower leaves, where spots usually occur first and can be very
          abundant. The dead leaves do not usually fall off. Dark brown to black
          spots can occur on stems.
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 20, paddingTop: 20 }}>
          Prevention :
        </Text>
        <Text style={{ fontFamily: 'outfit', padding: 10 }}>
          Varieties resistant to this disease are available. In general, late
          maturing varieties are more resistant than the earlier maturing
          varieties. Keep plants healthy; stressed plants are more predisposed
          to early blight. Avoid overhead irrigation. Do not dig tubers until
          they are fully mature in order to prevent damage. Do not use a field
          for potatoes that was used for potatoes or tomatoes the previous year.
          Keep this year’s field at least 225 to 450 yards away from last year’s
          field. Surround the field with wheat to keep wind-blown spores from
          entering. Use adequate nitrogen levels and low phosphorus levels to
          reduce disease severity. See current recommendations for chemical
          control measures.
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 20, paddingTop: 20 }}>
          Treatement :
        </Text>
        <Text style={{ fontFamily: 'outfit', padding: 10 }}>
          To treat plant diseases effectively:
        </Text>
        <Text>
          1. **Improve Air Circulation**: Prune or stake plants to enhance
          airflow, reducing fungal issues.
        </Text>
        <Text>
          2. **Disinfect Tools**: Clean pruning shears with a bleach solution (1
          part bleach to 4 parts water) after each cut.
        </Text>
        <Text>
          3. **Maintain Clean Soil**: Keep the soil free from debris and add
          organic compost to prevent spore splashing.
        </Text>
        <Text>
          4. **Water Management**: Use drip irrigation or soaker hoses to keep
          foliage dry.
        </Text>
        <Text>
          5. **Fungicide Application**: Apply copper-based fungicides early,
          before the disease appears, or at the first sign of infection. Reapply
          every 7-10 days as needed.
        </Text>
        <Text>
          6. **Insect and Fungus Control**: Use Bonide Garden Dust, containing
          copper and pyrethrins, to control insects and fungi. Cover leaves with
          a thin, even layer and reapply every 7-10 days.
        </Text>
        <Text>
          7. **Bio-fungicide Use**: Apply SERENADE Garden bio-fungicide as a
          preventative measure, starting before disease development and
          repeating weekly.
        </Text>
        <Text>
          8. **Post-Harvest Clean-Up**: Remove and destroy all garden debris
          after harvest and practice crop rotation the following year. Burn or
          bag infected plant parts; do not compost.
        </Text>
      </View>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{plantClass ? plantClass : 'No class available.'}</Text>
        <Text>{confidence ? confidence : 'No details available.'}</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Change to 'flex-start' to allow scrolling
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  Background: {
    height: 300,
    width: 350,
    marginTop: 80,
    borderRadius: 15,
  },
  TextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});
