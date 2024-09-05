import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Thank you for uploading your documents as required.</Text>
      <Text style={styles.message}>Your documents will be verified within 24 hours.</Text>
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
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
});
