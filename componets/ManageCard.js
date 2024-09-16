import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation'; // Ensure the path is correct based on your project structure

const ManageCard = () => {
  const [isCardDeactivated, setIsCardDeactivated] = useState(false);
  const [isPanicButtonActive, setIsPanicButtonActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerText}>MANAGE CARD</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card Section */}
      <View style={styles.content}>
        <Image
          source={{ uri: 'assets/ManageCard/6089337.jpg' }} // Replace with your actual card image URI
          style={styles.cardImage}
        />
        <Text style={styles.cardType}>Debit Card</Text>

        {/* Card Options */}
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>View card details</Text>
        </TouchableOpacity>

        {/* Toggle with Border */}
        <View style={styles.option}>
          <Text style={styles.optionText}>Deactivate your card</Text>
          <View style={styles.toggleWrapper}>
            <Switch
              value={isCardDeactivated}
              onValueChange={setIsCardDeactivated}
              thumbColor={isCardDeactivated ? 'white' : '#02457A'} // Set thumb color
              trackColor={{ false: 'white', true: '#02457A' }} // Set track color for off and on states
            />
          </View>
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>Activate/Deactivate Panic Button Feature</Text>
          <View style={styles.toggleWrapper}>
            <Switch
              value={isPanicButtonActive}
              onValueChange={setIsPanicButtonActive}
              thumbColor={isPanicButtonActive ? 'white' : '#02457A'} // Set thumb color
              trackColor={{ false: 'white', true: '#02457A' }} // Set track color for off and on states
            />
          </View>
        </View>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Card Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#02457A', // Dark blue background color
    position: 'absolute', // Position the header absolutely
    top: 0, // Align it to the top
    left: 0, // Align it to the left
    right: 0, // Align it to the right
    width: '100%', // Ensure it takes the full width
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Align text to center
    flex: 1, // Take up available space
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 64, // Add margin to avoid overlap with the header
  },
  cardImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  cardType: {
    fontSize: 16,
    marginTop: 8,
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
    padding: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleWrapper: {
    borderWidth: 2, // Border thickness
    borderColor: '#02457A', // Border color
    borderRadius: 20, // Rounded corners for the border
    padding: 3, // Padding inside the border
  },
});


export default ManageCard;
