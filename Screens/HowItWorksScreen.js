import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HowItWorksScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>How It Works</Text>
      <Text style={styles.description}>
        The Panic Button is a security feature that allows you to set a unique PIN for emergency situations. 
        If you feel threatened or in danger, you can quickly activate the panic button using this PIN.
      </Text>
      <Text style={styles.description}>
        Follow these steps to set up your Panic Button:
      </Text>
      <Text style={styles.description}>
        1. Create a 5-digit PIN that you can remember.
      </Text>
      <Text style={styles.description}>
        2. Confirm your PIN by entering it again.
      </Text>
      <Text style={styles.description}>
        3. Press the "Submit" button to activate the panic feature.
      </Text>
      <Text style={styles.description}>
        In case of an emergency, you can press the panic button and help will be notified immediately.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
