import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const SavingsAccount = () => {
  const [firstName, setFirstName] = useState(''); // Default to empty string
  const [balance, setBalance] = useState(0); // Default to zero
  const [loading, setLoading] = useState(true);
  const storage = require('../async_storage');
  const navigation = useNavigation();

  // Fetch customer data from the database
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const value = await storage.getItem('CustID_Nr');
        const response = await axios.get(`${BASE_URL}get_customer/${value}`);
        const customerData = response.data;

        setFirstName(customerData.FirstName || ''); // Ensure it defaults to an empty string if null/undefined
        setBalance(customerData.BankAccount.Balance || 0); // Ensure it defaults to 0 if null/undefined
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
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

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Ensure firstName and balance are rendered within <Text> components */}
        <Text style={styles.headerText}>
          Hi, {firstName ? firstName : 'Customer'}!
        </Text>
        <Text style={styles.balanceText}>
          Balance: R{balance !== null ? balance.toFixed(2) : '0.00'}
        </Text>
      </View>

      {/* Recent Transactions Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.transactionSection}>
          <Text style={styles.transactionHeader}>Recent transactions</Text>

          {/* Hardcoded Transactions */}
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>PAYROLL REF 12443554535</Text>
            <Text style={styles.transactionAmountPositive}>+R2000</Text>
            <Text style={styles.transactionDate}>Sat 7, 18:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>RTC 1223356778 PAYMENT</Text>
            <Text style={styles.transactionAmountPositive}>+R630.50</Text>
            <Text style={styles.transactionDate}>Mon 8, 10:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>VODACOM AIRTIME</Text>
            <Text style={styles.transactionAmountNegative}>-R350</Text>
            <Text style={styles.transactionDate}>Mon 8, 14:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>KING PIE</Text>
            <Text style={styles.transactionAmountNegative}>-R179.98</Text>
            <Text style={styles.transactionDate}>Mon 8, 09:00 am</Text>
          </View>
        </View>

        {/* Last Week Transactions Section */}
        <View style={styles.transactionSection}>
          <Text style={styles.transactionHeader}>Last week transactions</Text>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>JOHN DOE</Text>
            <Text style={styles.transactionAmountNegative}>-R200</Text>
            <Text style={styles.transactionDate}>Sat 7, 18:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>REF: 1223356778</Text>
            <Text style={styles.transactionAmountPositive}>+R300</Text>
            <Text style={styles.transactionDate}>Fri 6, 10:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>SHOPRITE LIQUOR</Text>
            <Text style={styles.transactionAmountNegative}>-R204.89</Text>
            <Text style={styles.transactionDate}>Fri 5, 14:53 pm</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>KFC SOSHANGUVE CROSSING</Text>
            <Text style={styles.transactionAmountNegative}>-R79.98</Text>
            <Text style={styles.transactionDate}>Fri 5, 14:15 pm</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#002f66',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  balanceText: {
    fontSize: 18,
    color: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  transactionSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transactionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#002f66',
  },
  transactionItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmountPositive: {
    fontSize: 16,
    color: '#2ECC71',
    fontWeight: 'bold',
  },
  transactionAmountNegative: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default SavingsAccount;




