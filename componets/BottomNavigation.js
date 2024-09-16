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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0f1c3f',
    paddingVertical: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    height: 60,
  },
  qrCircle: {
    backgroundColor: '#02457A',
    borderRadius: 50,
    padding: 8,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    top: -20,
  },
});

export default BottomNavigation;
