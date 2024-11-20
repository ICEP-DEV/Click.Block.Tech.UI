import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SuccessPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>Login Successful!</Text>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen')}
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
    backgroundColor: '#02457A',
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#007aff',
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

export default SuccessPage;
