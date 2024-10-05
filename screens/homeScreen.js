import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './style';
 
import accountIcon from '../assets/Homepage/account.png';
import coinsIcon from '../assets/Homepage/coins.png';
import loanIcon from '../assets/Homepage/loan.png';
import addIcon from '../assets/Homepage/add.png';
import electricityIcon from '../assets/Homepage/electricity.png';
import transferIcon from '../assets/Homepage/transfer.png';
import payRecipientIcon from '../assets/Homepage/payRecipient.png';
import approveTransactionIcon from '../assets/Homepage/approveTransaction.png';
 
const api = 'http://10.0.2.2:5000/api/';

const HomeScreen = () => { // Previously MainScreen
  const [firstName, setFirstName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const custID_Nr = '0207170585088';

  useEffect(() => {
    const fetchCustomerAndAccountData = async () => {
      try {
        const response = await axios.get(`${api}customer/${custID_Nr}`);
        const customerData = response.data;
        console.log('Customer Data:', customerData);

        setFirstName(customerData.FirstName || '');
        const accountType = customerData.BankAccount.AccountType || 'Savings';
        const balance = customerData.BankAccount.Balance || 0;

        setAccountType(accountType.toUpperCase());
        setBalance(balance);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer or account data:', error);
        setLoading(false);
      }
    };

    fetchCustomerAndAccountData();
  }, [custID_Nr]);

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
        <Text style={styles.greeting}>
          WELCOME BACK, {firstName ? firstName.toUpperCase() : 'Guest'}
        </Text>
        <Text style={styles.subGreeting}>How can we help you today?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.accountBox}>
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>{accountType} ACCOUNT</Text>
              <Image source={coinsIcon} style={styles.accountImage} />
            </View>
            <Text style={styles.balanceText}>Balance: R{balance.toFixed(2)}</Text>
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



