import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation'; // Ensure the path is correct based on your project structure

const { width } = Dimensions.get('window');

const ManageCard = () => {
  const [isCardDeactivated, setIsCardDeactivated] = useState(false);
  const [isPanicButtonActive, setIsPanicButtonActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANAGE CARD</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: 'https://i.guim.co.uk/img/media/13043cde285e39b573b7e23019d6fe3cbbfbc3d4/371_903_7825_4694/master/7825.jpg?width=700&quality=85&auto=format&fit=max&s=73fb68f6e7aa471e5ef07f8a5ce829d1' }} // Use remote image URI
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
    backgroundColor: '#02457A',
    width: '100%',
    height: 60,
    position: 'relative',
    zIndex: 1, // Ensure header is above other content
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
  content: {
    padding: 16,
    marginTop: 60, // Adjust based on header height
  },
  cardImage: {
    width: width - 32, // 16px padding on each side
    height: (width - 32) * 0.2, // Smaller height to fit better on the screen
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: '#f0f0f0', // Background color in case image doesn't load
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
    transform: [{ scale: 0.8 }], // Scale down the switch
  },
});

export default ManageCard;
