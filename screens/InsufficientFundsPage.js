import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InsufficientFundsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>Insufficient Funds</Text>
      <Text style={styles.instructionText}>
        Please check your balance and try again.
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.goBack()} // Navigates back to the previous screen
      >
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')} // Navigate to the Home screen
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9534f', // Red background to indicate error
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  retryButton: {
    backgroundColor: '#f0ad4e', // Orange button for retry
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#0275d8', // Blue button for Home
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InsufficientFundsPage;
