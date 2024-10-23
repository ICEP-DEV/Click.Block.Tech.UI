import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use navigation and route hooks
import BottomNavigation from './BottomNavigation'; // Import BottomNavigation
import axios from 'axios'; // Add Axios for making HTTP requests
import { BASE_URL } from '../API/API'; // Ensure BASE_URL is set correctly
import storage from '../async_storage'; // Import your AsyncStorage functions

export default function PinEntry() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [custID_Nr, setCustID_Nr] = useState(null); // State for customer ID
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { pinType } = route.params || { pinType: 'panic' }; // Get pinType from the navigation parameters

  // Define the titles, placeholders, and tips based on the pinType
  const pinDetails = {
    remote: {
      title: 'UPDATE REMOTE PIN',
      placeholder: 'Enter your new 5-digit remote PIN',
      confirmPlaceholder: 'Confirm new Remote PIN',
      tips: [
        'Use a complex PIN',
        'Avoid sequential numbers (e.g., 12345)',
        'Use a unique PIN for each account',
      ],
      submitButtonText: 'Update Remote PIN',
      pinKey: 'loginPin', // This is where we update the LoginPin for Remote PIN
    },
    alert: {
      title: 'UPDATE ALERT PIN',
      placeholder: 'Enter your new 5-digit alert PIN',
      confirmPlaceholder: 'Confirm new Alert PIN',
      tips: [
        'Use a complex PIN',
        'Avoid easily guessable numbers (e.g., birthdates)',
        'Use a unique PIN for each account',
      ],
      submitButtonText: 'Update Alert PIN',
      pinKey: 'alertPin', // This is where we update the AlertPin
    },
  };

  const selectedPin = pinDetails[pinType.toLowerCase()] || pinDetails.remote;

  // Fetch custID_Nr from AsyncStorage
  useEffect(() => {
    const fetchCustID = async () => {
      try {
        const storedCustID = await storage.getItem('CustID_Nr'); // Get the custID_Nr from storage
        if (storedCustID) {
          setCustID_Nr(storedCustID); // Set customer ID in state
        } else {
          Alert.alert('Error', 'Customer ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Failed to fetch CustID_Nr from storage:', error);
        Alert.alert('Error', 'Unable to retrieve customer ID.');
      }
    };

    fetchCustID();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!custID_Nr) {
      Alert.alert('Error', 'Customer ID is required.');
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match.');
      return;
    }

    try {
      // Prepare data to send to the backend
      const updateData = {
        [selectedPin.pinKey]: newPin,
      };

      // Send PUT request to the backend
      const response = await axios.put(`${BASE_URL}customers/${custID_Nr}`, updateData);

      if (response.status === 200) {
        Alert.alert('Success', 'PIN updated successfully');
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert('Error', 'Failed to update PIN.');
      }
    } catch (error) {
      console.error('Error updating PIN:', error);
      Alert.alert('Error', 'An error occurred while updating the PIN.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure StatusBar is configured like in CardSettings */}
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{selectedPin.title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Card Content */}
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder={selectedPin.placeholder}
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
              value={newPin}
              onChangeText={setNewPin}
            />
            <TextInput
              style={styles.input}
              placeholder={selectedPin.confirmPlaceholder}
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
              value={confirmPin}
              onChangeText={setConfirmPin}
            />

            {/* Tips Section */}
            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>Tips for a secure PIN:</Text>
              {selectedPin.tips.map((tip, index) => (
                <Text key={index} style={styles.tip}>• {tip}</Text>
              ))}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{selectedPin.submitButtonText}</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 90, // To account for BottomNavigation height
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
  cardContainer: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white', // Card's background
    borderRadius: 16, // Rounded corners
    padding: 30,
    shadowColor: '#000', // Shadow properties
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa', // Soft background for input fields
  },
  tipsBox: {
    backgroundColor: '#F5F5F5', // Light grey background for the tips box
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsText: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  tip: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#02457A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
