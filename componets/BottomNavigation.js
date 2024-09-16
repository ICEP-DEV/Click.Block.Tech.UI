// BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You can replace icons with images if needed

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={[styles.label, styles.label]}>Manage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.qrContainer]}>
        <View style={styles.qrCircle}>
          <Ionicons name="qr-code-outline" size={32} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="notifications-outline" size={24} color="white" />
        <Text style={styles.label}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="swap-horizontal-outline" size={24} color="white" />
        <Text style={styles.label}>Transact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0f1c3f',
    paddingVertical: 8,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  activeLabel: {
    color: '#4da8da',
  },
  qrContainer: {
    position: 'absolute',
    top: -30,
  },
  qrCircle: {
    backgroundColor: '#02457A',
    borderRadius: 100,
    padding: 10,
    borderWidth: 6,
    borderColor: 'white',
  
  },
});

export default BottomNavigation;
