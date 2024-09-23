import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation'; // Ensure the path is correct based on your project structure

const { width } = Dimensions.get('window');

export default function Component() {
  const [isCardDeactivated, setIsCardDeactivated] = useState(false);
  const [isPanicButtonActive, setIsPanicButtonActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#02457A"
        barStyle="#02457A"
      />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Back pressed')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>MANAGE CARD</Text>
          <View style={styles.placeholder} />
         </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require('../assets/ManageCard/card_p.png')} // Ensure this path is correct
            style={styles.cardImage}
          />
          <Text style={styles.cardType}>Debit Card</Text>

          {/* Card Options */}
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>View card details</Text>
          </TouchableOpacity>

          <View style={styles.option}>
            <Text style={styles.optionText}>Deactivate your card</Text>
            <Switch
              value={isCardDeactivated}
              onValueChange={setIsCardDeactivated}
              thumbColor={isCardDeactivated ? 'white' : '#02457A'}
              trackColor={{ false: '#ccc', true: '#02457A' }}
              style={styles.switch}
            />
          </View>

          <View style={styles.option}>
            <Text style={styles.optionText}>Activate/Deactivate Panic Button Feature</Text>
            <Switch
              value={isPanicButtonActive}
              onValueChange={setIsPanicButtonActive}
              thumbColor={isPanicButtonActive ? 'white' : '#02457A'}
              trackColor={{ false: '#ccc', true: '#02457A' }}
              style={styles.switch}
            />
          </View>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Card Settings</Text>
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
    backgroundColor: '#02457A', // Changed to match header color
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#02457A',
    width: '100%',
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  scrollContent: {
    padding: 16,
  },
  cardImage: {
    width: width - 32,
    height: (width - 32) * 0.63, // Maintain aspect ratio
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardType: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#02457A',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  optionText: {
    color: '#02457A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});
