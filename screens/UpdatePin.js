import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation'; // Import the bottom navigation
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const { width } = Dimensions.get('window');

export default function UpdatePin() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('CardSettings'); // Directly navigate to CardSettings
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure StatusBar is configured like in CardSettings */}
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>UPDATE PIN</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require('../assets/card_settings/card_p.png')} // Use the same image as in CardSettings
            style={styles.cardImage}
          />

          <Text style={styles.cardType}>Debit Card</Text>

          {/* Buttons for Remote, Alert, and Panic PIN */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PinEntry', { pinType: 'Remote' })}>
            <Text style={styles.optionText}>Remote PIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PinEntry', { pinType: 'Alert' })}>
            <Text style={styles.optionText}>Alert PIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PinEntry', { pinType: 'Panic' })}>
            <Text style={styles.optionText}>Create Panic PIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02457A', // Blue background for status bar and header
  },
  content: {
    flex: 1,
    backgroundColor: 'white', // White background for the body content
    paddingBottom: 90, // To account for BottomNavigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust to space-between
    padding: 16,
    backgroundColor: '#02457A', // Blue background for the header
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24, // Placeholder for aligning the title in the center
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: width - 32,
    height: (width - 32) * 0.63,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  cardType: {
    fontSize: 18,
    marginBottom: 24,
    color: '#02457A',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    color: '#02457A',
    fontSize: 16,
    fontWeight: '600',
  },
});
