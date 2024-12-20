import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DetectionResult() {
  const item = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);

  const details = {
    Rose: 'A beautiful flower known for its fragrance.',
    'Fungal Infection': 'Common treatment includes antifungal sprays.',
    'Late Blight': 'A serious disease affecting potatoes and tomatoes.',
    Healthy: 'No disease present, continue regular care.',
  };

  const data = [
    {
      plantClass: 'Potato__Early_blight',
      name: 'Early Blight',
      Description: `Early blight of potato is caused by the fungus Alternaria solani, which can infect potato, tomato, other members of the potato family, and some mustards. This disease, also known as target spot, typically affects older leaves first and is favored by warm temperatures and high humidity. The fungus can survive in plant debris and soil, making crop rotation and proper sanitation important for management.`,
      Treatment: `To manage early blight, use fungicides such as chlorothalonil or mancozeb. Ensure proper plant spacing to improve air circulation and reduce humidity around the plants. Remove and destroy infected plant debris to reduce the source of inoculum. Crop rotation with non-host crops can also help reduce disease pressure.`,
      Symptoms: `Early blight symptoms include dark, concentric rings on older leaves, often referred to as target spots. These spots can enlarge and cause the leaves to yellow and die prematurely. In severe cases, the disease can also affect stems and tubers, leading to reduced yield and quality.`,
      Image: require('../../assets/images/early-blight.jpg'),
      Type: 'Fungal Disease',
    },
    {
      plantClass: 'Pepper__bell__healthy',
      name: 'Pepper Bell Healthy',
      Description: `Healthy bell pepper plants are characterized by vibrant green leaves, strong stems, and an abundance of flowers and fruits. These plants thrive in well-drained soil with plenty of organic matter and require consistent watering to maintain soil moisture. Bell peppers are sensitive to temperature extremes and grow best in warm, sunny conditions.`,
      Advices: `To maintain healthy bell pepper plants, provide them with a balanced fertilizer high in phosphorus and potassium. Mulch around the plants to conserve moisture and suppress weeds. Regularly inspect the plants for pests such as aphids and caterpillars, and use appropriate control measures if necessary. Prune the plants to improve air circulation and support fruit development.`,
      Image: require('../../assets/images/bell-pepper.jpg'),
      Type: 'Vegetable',
    },
  ];

  // Check if item.class exists and matches 'Potato__Early_blight' or 'Pepper__bell__healthy'
  const plantData =
    item.class === 'Potato__Early_blight'
      ? data[0]
      : item.class === 'Pepper__bell___healthy'
      ? data[1]
      : data[0]; // Default to 'Early Blight' if no match

  const confidence = (item.confidence * 100).toFixed(2) + '%';

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const ExpandableSection = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
    const animation = new Animated.Value(expanded ? 1 : 0);

    const toggleExpand = () => {
      setExpanded(!expanded);
      Animated.timing(animation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    const bodyHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1000],
    });

    return (
      <View style={styles.expandableSection}>
        <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#555"
          />
        </TouchableOpacity>
        <Animated.View style={[styles.sectionContent, { height: bodyHeight }]}>
          <Text style={styles.sectionText}>{content}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <LinearGradient colors={['#6a994e', '#386641']} style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
            router.back();
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Detection</Text>
      </LinearGradient>
      <View style={styles.imageContainer}>
        <Image source={plantData.Image} style={styles.backgroundImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageForeground}
        >
          <Text style={styles.imageTitle}>{plantData.plantClass}</Text>
          <Text style={styles.imageSubtitle}>{plantData.Type}</Text>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>Confidence: {confidence}</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.contentContainer}>
        <ExpandableSection title="Description" content={plantData.Description} />
        {plantData.Symptoms && (
          <ExpandableSection title="Symptoms" content={plantData.Symptoms} />
        )}
        {plantData.Treatment && (
          <ExpandableSection title="Treatment" content={plantData.Treatment} />
        )}
        {plantData.Advices && (
          <ExpandableSection title="Advices" content={plantData.Advices} />
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="leaf-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>More Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="share-outline" size={24} color="#386641" />
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imageForeground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  imageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  imageSubtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 10,
  },
  confidenceContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 14,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -27,
  },
  expandableSection: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    overflow: 'hidden',
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    padding: 15,
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#386641',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#386641',
  },
  secondaryButtonText: {
    color: '#386641',
  },
});
