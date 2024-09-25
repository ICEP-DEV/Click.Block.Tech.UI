import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './style';

import accountIcon from '../assets/Homepage/account.png'; 
import coinsIcon from '../assets/Homepage/coins.png'; 
import loanIcon from '../assets/Homepage/loan.png'; 
import addIcon from '../assets/Homepage/add.png'; 
import electricityIcon from '../assets/Homepage/electricity.png'; 
import transferIcon from '../assets/Homepage/transfer.png';
import payRecipientIcon from '../assets/Homepage/payRecipient.png';
import approveTransactionIcon from '../assets/Homepage/approveTransaction.png';

const MainScreen = () => {
  return (
    <View style={styles.fullScreenContainer}>

      <View style={styles.header}>
        <Image source={accountIcon} style={styles.accountIcon} />
        <Text style={styles.greeting}>WELCOME BACK, JONATHAN</Text>
        <Text style={styles.subGreeting}>How can we help you with today</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.accountBox}>
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>SAVINGS ACCOUNT</Text>
              <Image source={coinsIcon} style={styles.accountImage} />
            </View>
            <Text style={styles.balanceText}>Balance: R2830.58</Text>
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

export default MainScreen;










