import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.card}>
        <Image 
          source={require('../assets/check.png')} // Make sure the path is correct
          style={styles.checkIcon} 
        />
        <Text style={styles.message}>
          Thank you for uploading your documents as required.
          Your documents will be verified within 24 hours!
        </Text>
        <TouchableOpacity style={styles.submitButton} >
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    padding: 60,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  checkIcon: {
    width: 60,  // Adjust the width as needed
    height: 60, // Adjust the height as needed
    marginBottom: 20, // Space between icon and text
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#02457A', // Optional: Adjust the text color for better contrast
  },
  background: {
    position: 'absolute',
    top: 0,
    // right:0,
    left:0,
    bottom: 0,
    width: '120%',
    height: '40%',
    backgroundColor: '#02457A', // This can be changed to an image if needed
    zIndex: -1, // Ensure it is behind other elements
  },
  submitButton: {
    backgroundColor: '#02457A',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center', // This will center the button horizontally
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
