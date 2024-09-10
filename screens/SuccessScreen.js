import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={require('../assets/check.png')} // Make sure the path is correct
          style={styles.checkIcon} 
        />
        <Text style={styles.message}>
          Thank you for uploading your documents as required.
        </Text>
        <Text style={styles.message}>
          Your documents will be verified within 24 hours.
        </Text>
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
    padding: 20,
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
});
