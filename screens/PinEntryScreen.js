import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const PinEntryScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    const correctPin = '12345'; // Set the correct PIN here

    if (pin === correctPin) {
      Alert.alert("Transaction Approved", "You have approved the transaction.");
      // You can navigate or perform other actions here
      navigation.goBack();
    } else {
      Alert.alert("Invalid PIN", "The PIN you entered is incorrect. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinBox}>
        <Text style={styles.pinTitle}>APPROVE OR DECLINE</Text>
        <Text style={styles.pinDescription}>
          You are withdrawing R500 from Soshanguve Crossing (07/10/2023 12:30PM). 
          Enter your PIN to approve the withdrawal.
        </Text>

        <TextInput
          style={styles.pinInput}
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          keyboardType="numeric"
          maxLength={5} // Assuming a 4-digit PIN
          placeholder="Enter PIN"
          placeholderTextColor="#999"
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modal effect
  },
  pinBox: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
    alignItems: 'center',
  },
  pinTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#02457a', // The dark blue color from your design
    marginBottom: 10,
  },
  pinDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  pinInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007aff', // Blue button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PinEntryScreen;
