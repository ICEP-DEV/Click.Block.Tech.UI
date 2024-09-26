// BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = () => {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home-outline" size={20} color="white" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="settings-outline" size={20} color="white" />
        <Text style={styles.label}>Manage</Text>
      </TouchableOpacity>

      {/* Centered QR Code Button */}
      <TouchableOpacity style={styles.qrContainer}>
        <View style={styles.qrCircle}>
          <Ionicons name="qr-code-outline" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="notifications-outline" size={20} color="white" />
        <Text style={styles.label}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="swap-horizontal-outline" size={20} color="white" />
        <Text style={styles.label}>Transact</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Change from 'space-around' to 'space-between' to create space for the centered QR
    alignItems: 'center',
    backgroundColor: '#0f1c3f',
    paddingVertical: 8,
    shadowColor: '#02457A',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    elevation: 100,  // For Android shadow
    bottom: 0,
    width: '100%',
    height: 90,  // Increased height for better visual balance
  },

  navItem: {
    alignItems: 'center',
    flex: 0.7, // Ensure items take equal space
  },

  label: {
    fontSize: 12,  // Slightly larger font for better readability
    color: 'white',
    marginTop: 4,  // Increased margin for better spacing
  },

  qrContainer: {
    position: 'absolute',  // Use absolute positioning to center
    bottom: 20, // Ensure it overlaps from the bottom
    left: '50%', // Center horizontally
    transform: [{ translateX: -40 }], // Adjust for the size of the circle
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrCircle: {
    backgroundColor: '#02457A',
    borderRadius: 60,  // Adjusted for a more prominent circle
    padding: 20,  // Increased padding for better icon visibility
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: 'white',  // Added shadow for a more 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // For Android shadow
    top:-38
  },
});

export default BottomNavigation;
