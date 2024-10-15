import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PinEntry = () => {
  const [pin, setPin] = useState('');
  const [approved, setApproved] = useState(false); // State to track if the transaction is approved
  const [loading, setLoading] = useState(false); // State to track loading state
  const [currentDateTime, setCurrentDateTime] = useState(''); // State to hold current date and time
  const navigation = useNavigation();

  // Update current date and time when approved
  useEffect(() => {
    if (approved) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString(); // e.g., 10/09/2024
      const formattedTime = date.toLocaleTimeString(); // e.g., 14:34:21
      setCurrentDateTime(`on ${formattedDate} at ${formattedTime}`);
    }
  }, [approved]); // This ensures the date and time are set after approval state changes

  const handlePinSubmit = () => {
    setLoading(true); // Start loading when submit is pressed

    // Simulate network delay (e.g., verifying PIN)
    setTimeout(() => {
      setApproved(true); // Approve the transaction regardless of the PIN
      setLoading(false); // Stop loading after approval
    }, 2000); // Simulate 2 seconds of delay
  };

  return (
    <View style={styles.container}>
      {!approved ? (
        <View style={styles.pinBox}>
          {!loading ? (
            <>
              <Text style={styles.notificationText}>
                A withdrawal of R500 at Soshanguve Crossing is awaiting your approval.
              </Text>
              <Text style={styles.pinTitle}>Enter PIN</Text>
              <TextInput
                style={styles.pinInput}
                secureTextEntry
                keyboardType="numeric"
                value={pin}
                onChangeText={setPin}
                placeholder="Enter 5-digit PIN"
                maxLength={5} // Set the PIN input to allow 5 digits
              />
              <TouchableOpacity onPress={handlePinSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Show loading indicator while waiting
            <ActivityIndicator size="large" color="#007aff" />
          )}
        </View>
      ) : (
        // This is where the success message appears after correct PIN is entered
        <View style={styles.approvedBox}>
          <Text style={styles.approvedTitle}>TRANSACTION APPROVED</Text>
          <Text style={styles.approvedText}>
            Your transaction of R500 has been approved {currentDateTime}. Take your money out at an ATM and start spending.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.reset({
              index: 0, // Start at the first screen of the stack
              routes: [{ name: 'Home' }] // Reset the stack to only have the 'Home' screen
            })}
            style={styles.doneButton}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02457a',
  },
  pinBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  pinTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#02457a',
  },
  pinInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  approvedBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  approvedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  approvedText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PinEntry;
