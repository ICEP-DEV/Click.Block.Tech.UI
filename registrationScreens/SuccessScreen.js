import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const doneIcon = require('../assets/done.png');

const EmailVerificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.verificationContainer}>
        {/* The success check icon */}
        <Image source={doneIcon} style={styles.icon} />
        <Text style={styles.successText}>Your Email Address has been verified successfully!</Text>
        {/* Next button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex: 1 to make the container take up the full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#02457a',
    paddingVertical: 50,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  verificationContainer: {
    width: '85%',
    backgroundColor: '#ffffff',
    padding: 40, // Adjust padding to balance the content
    borderRadius: 10, // Optional: rounded corners
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center', // Center the content inside this container
  },
  successText: {
    fontSize: 20,
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2E5B9A',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmailVerificationScreen;