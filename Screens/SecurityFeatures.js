import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Security Feature</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image source={require('../assets/check.png')} style={styles.checkImage} />
          </View>
          <Text style={styles.title}>Your Panic Button has been activated successfully!</Text>
          <Text style={styles.description}>
            You can now use this as a panic button whenever you are in danger. Don't share it with anyone.
          </Text>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}><Text style={styles.buttonText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}><Text style={styles.buttonText}>Manage</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}><Text style={styles.buttonText}>Notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}><Text style={styles.buttonText}>Transact</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#02457A',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    width: '90%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android
    marginBottom: 20,
    paddingVertical: 100
  },
  icon: {
    marginBottom: 20,
    alignItems: 'center', // Center the icon
  },
  checkImage: {
    width: 50, // Adjust width according to your icon size
    height: 50, // Adjust height according to your icon size
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#02457A',
    paddingVertical: 10, // Reduced padding
    paddingHorizontal: 30, // Reduced padding
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center', // Center the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, // Font size remains the same
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#02457A',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
});
