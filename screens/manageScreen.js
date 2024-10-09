import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './style';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const api = 'http://168.172.187.202:5000/api/'; // Your base API URL
const custID_Nr = '0707170585088'; // Replace with the actual CustID_Nr

const ManageScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${api}get_customer/${custID_Nr}`);
        const customerData = response.data;
        console.log('Customer Data:', customerData);

        setFirstName(customerData.FirstName || '');
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Failed to load customer data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>WELCOME BACK, {firstName ? firstName.toUpperCase() : 'Guest'}</Text>
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

        <TouchableOpacity
          style={styles.accountBox}
          onPress={() => navigation.navigate('ManageCard')} // Navigate to ManageCard
        >
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
