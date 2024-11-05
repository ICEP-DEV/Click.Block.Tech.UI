// homeScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,Alert, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import styles from './style';

import accountIcon from '../assets/Homepage/account.png';
import coinsIcon from '../assets/Homepage/coins.png';
import loanIcon from '../assets/Homepage/loan.png';
import addIcon from '../assets/Homepage/add.png';
import electricityIcon from '../assets/Homepage/electricity.png';
import transferIcon from '../assets/Homepage/transfer.png';
import payRecipientIcon from '../assets/Homepage/payRecipient.png';
import approveTransactionIcon from '../assets/Homepage/approveTransaction.png';
import { BASE_URL } from '../API/API';
import useAlertStoreStore from '../stores/panicAlert_store';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const storage = require('../async_storage');
  const navigation = useNavigation(); // Initialize navigation
  const panicAlert = useAlertStoreStore((state)=>state.isAlertTriggered);

 
  // Fetch customer and account data
  useEffect(() => {
    const fetchCustomerAndAccountData = async () => {
      if(panicAlert){
        Alert.alert(
          'Network Error',
          'Please try logging out and try again.',
          [
            {
              text: 'Cancel',
              onPress: () => {
                
                navigation.navigate('Login')

              } ,
              style: 'cancel',
            },
          ],
          {
            cancelable: false,
            onDismiss: () =>
              Alert.alert(
                'This alert was dismissed by tapping outside of the alert dialog.',
              ),
          },
        );
        try {
          const value = await storage.getItem('CustID_Nr');
          const response = await axios.get(`${BASE_URL}get_customer/${value}`);
          const customerData = response.data;
          setFirstName(customerData.FirstName || '');
          setAccountType(customerData.BankAccount.AccountType || 'Savings');
          setBalance(customerData.BankAccount.Balance || 0);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching customer or account data:', error);
          setLoading(false);
        }
      }else{
        try {
          const value = await storage.getItem('CustID_Nr');
          const response = await axios.get(`${BASE_URL}get_customer/${value}`);
          const customerData = response.data;
          setFirstName(customerData.FirstName || '');
          setAccountType(customerData.BankAccount.AccountType || 'Savings');
          setBalance(customerData.BankAccount.Balance || 0);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching customer or account data:', error);
          setLoading(false);
        }
      }
      
    };

    fetchCustomerAndAccountData();
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
      <View style={styles.header}>
        <Image source={accountIcon} style={styles.accountIcon} />
        <Text style={styles.greeting}>WELCOME BACK, </Text>
        <Text style={styles.greeting}>{firstName.toUpperCase()}</Text>
        <Text style={styles.subGreeting}>How can we help you today?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accountContainer}>
          {/* Navigate to SavingsAccount.js when clicked */}
          <TouchableOpacity 
            style={styles.accountBox} 
            onPress={() => navigation.navigate('SavingsAccount')}
          >
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>{accountType.toUpperCase()} ACCOUNT</Text>
              <Image source={coinsIcon} style={styles.accountImage} />
            </View>
            {
              panicAlert ? (<Text style={styles.balanceText}>Balance: R25.50</Text>) : <Text style={styles.balanceText}>Balance: R{balance.toFixed(2)}</Text>
            }
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountBox}>
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>LOAN ACCOUNT</Text>
              <Image source={loanIcon} style={styles.accountImage} />
            </View>
            <Text style={styles.balanceText}>Balance: R0.00</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountBox}>
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>ADD NEW ACCOUNT</Text>
              <Image source={addIcon} style={styles.accountImage} />
            </View>
            <Text style={styles.balanceText}>Open or add an account of your choice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.servicesTitle}>SERVICES:</Text>
          <View style={styles.horizontalServiceContainer}>
            <TouchableOpacity style={styles.serviceBox}>
              <Image source={electricityIcon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>Buy electricity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceBox}>
              <Image source={transferIcon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>Transfer money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalServiceContainer}>
            <TouchableOpacity style={styles.serviceBox}>
              <Image source={payRecipientIcon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>Pay recipient</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceBox}>
              <Image source={approveTransactionIcon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>Approve transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;




