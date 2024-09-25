// manageScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style'; // Reusing styles from style.js

const ManageScreen = () => {
  return (
    <View style={styles.fullScreenContainer}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>WELCOME BACK, JONATHAN</Text>
        <Text style={styles.subGreeting}>How can we help you with today</Text>
      </View>

      {/* Content section with buttons */}
      <View style={styles.accountContainer}>
        <TouchableOpacity style={styles.accountBox}>
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>PERSONAL INFORMATION</Text>
          </View>
          <Text style={styles.balanceText}>View and update information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountBox}>
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>CARD MANAGEMENT</Text>
          </View>
          <Text style={styles.balanceText}>Manage and update your security features</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountBox}>
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>ACCOUNT MANAGEMENT</Text>
          </View>
          <Text style={styles.balanceText}>Access and download electronic statements</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageScreen;


