import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Axios for making HTTP requests
import { BASE_URL } from '../API/API';
import storage from '../async_storage'; // AsyncStorage functions

export default function PinEntry() {
  const navigation = useNavigation();
  const route = useRoute();

  const [custID_Nr, setCustID_Nr] = useState(null); // Customer ID state
  const [oldPin, setOldPin] = useState(''); // Old PIN state
  const [newPin, setNewPin] = useState(''); // New PIN state
  const [confirmPin, setConfirmPin] = useState(''); // Confirm PIN state
  const { pinType } = route.params || { pinType: 'panic' }; // Get pinType from route params

  const pinDetails = {
    remote: {
      title: 'UPDATE REMOTE PIN',
      placeholder: 'Enter your new 5-digit remote PIN',
      confirmPlaceholder: 'Confirm new Remote PIN',
      tips: ['Use a complex PIN', 'Avoid sequential numbers (e.g., 12345)', 'Use a unique PIN for each account'],
      submitButtonText: 'Update Remote PIN',
      pinKey: 'loginPin', // Updating loginPin for Remote PIN
    },
    alert: {
      title: 'UPDATE ALERT PIN',
      placeholder: 'Enter your new 5-digit alert PIN',
      confirmPlaceholder: 'Confirm new Alert PIN',
      tips: ['Use a complex PIN', 'Avoid easily guessable numbers (e.g., birthdates)', 'Use a unique PIN for each account'],
      submitButtonText: 'Update Alert PIN',
      pinKey: 'alertPin', // Updating alertPin
    },
  };

  const selectedPin = pinDetails[pinType.toLowerCase()] || pinDetails.remote;

  // Fetch custID_Nr from AsyncStorage
  useEffect(() => {
    const fetchCustID = async () => {
      try {
        const storedCustID = await storage.getItem('CustID_Nr');
        if (storedCustID) {
          setCustID_Nr(storedCustID);
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

    if (!oldPin) {
        Alert.alert('Error', 'Please enter your old PIN.');
        return;
    }

    if (!newPin || !confirmPin) {
        Alert.alert('Error', 'Please fill in both the new PIN and confirm PIN fields.');
        return;
    }

    if (newPin !== confirmPin) {
        Alert.alert('Error', 'PINs do not match.');
        return;
    }

    try {
        // Log data being sent
        console.log('Verifying old PIN for update');

        // Verify the old PIN first using the backend route: /customers/verify-pin
        const verifyOldPinResponse = await axios.post(`${BASE_URL}/customers/verify-pin`, {
            custID_Nr,
            oldPin,
            pinKey: selectedPin.pinKey, // Use the correct pinKey
        });

        if (verifyOldPinResponse.status !== 200 || !verifyOldPinResponse.data.success) {
            Alert.alert('Error', 'Old PIN verification failed.');
            return;
        }

        // Prepare data to send to the backend to update the new PIN
        const updateData = {
            [selectedPin.pinKey]: newPin, // Assign the new PIN to either loginPin or alertPin
        };

        // Log the updateData to verify what is being sent
        console.log('Updating PIN with data:', updateData);

        // Send PUT request to the backend to update the new PIN
        const response = await axios.put(`${BASE_URL}/customers/${custID_Nr}`, {
            updateData,
            oldPin,
            pinKey: selectedPin.pinKey, // Send the correct pinKey here too
        });

        if (response.status === 200) {
            Alert.alert('Success', 'PIN updated successfully');
            navigation.goBack(); // Go back to the previous screen
        } else {
            Alert.alert('Error', 'Failed to update PIN.');
        }
    } catch (error) {
        console.error('Error updating PIN:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'An error occurred while updating the PIN.');
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{selectedPin.title}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.cardContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Enter your old PIN"
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
              value={oldPin}
              onChangeText={setOldPin}
            />
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

            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>Tips for a secure PIN:</Text>
              {selectedPin.tips.map((tip, index) => (
                <Text key={index} style={styles.tip}>
                  • {tip}
                </Text>
              ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{selectedPin.submitButtonText}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
