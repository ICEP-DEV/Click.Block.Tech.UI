import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const SavingsAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]); // State for transactions
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for the popup menu
  const storage = require('../async_storage');
  const navigation = useNavigation();

  // Fetch customer and transactions data from the database
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const value = await storage.getItem('CustID_Nr');
        const response = await axios.get(`${BASE_URL}get_customer/${value}`);
        const customerData = response.data;

        setFirstName(customerData.FirstName || '');
        setBalance(customerData.BankAccount.Balance || 0);

        // Fetch transactions based on the Bank Account ID (assuming it's part of the response)
        const accID = await storage.getItem('accountID');
        const transactionsResponse = await axios.get(`${BASE_URL}getAllTransactionByAccID/${accID}`);
        setTransactions(transactionsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data or transactions:', error);
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

  // Function to extract the year and month from a transaction's date
  const getTransactionYearMonth = (transactionDate) => {
    const date = new Date(transactionDate);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    return { year, month };
  };

  // Categorize transactions by year and month
  const categorizedTransactions = transactions.reduce((acc, transaction) => {
    const { year, month } = getTransactionYearMonth(transaction.transactionDate);
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(transaction);
    return acc;
  }, {});

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Hi, {firstName ? firstName : 'Customer'}!
        </Text>
        <Text style={styles.balanceText}>
          Balance: R{balance !== null ? balance.toFixed(2) : '0.00'}
        </Text>

        {/* Menu Icon */}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Popup Menu Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Account Type</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={25} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Modal Options */}
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                console.log('Proof of Account selected');
              }}
            >
              <Text style={styles.modalOptionText}>Proof of Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false); 
                console.log('Account Statement selected');
                navigation.navigate('StatementMenu'); // This will navigate to the StatementMenu screen
              }}
            >
              <Text style={styles.modalOptionText}>Account Statement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Categorized Transactions Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.transactionSection}>
          {Object.keys(categorizedTransactions).map((year) => (
            <View key={year} style={styles.transactionYearSection}>
              <Text style={styles.transactionYear}>{year}</Text>
              {Object.keys(categorizedTransactions[year]).map((month) => (
                <View key={month} style={styles.transactionMonthSection}>
                  <Text style={styles.transactionHeader}>
                    {month}
                  </Text>
                  {categorizedTransactions[year][month].map((transaction) => (
                    <View key={transaction.id} style={styles.transactionItem}>
                      <Text style={styles.transactionText}>
                        {transaction.transactionType || 'Transaction'}
                      </Text>
                      <Text
                        style={
                          transaction.transactionAmount > 0
                            ? styles.transactionAmountPositive
                            : styles.transactionAmountNegative
                        }
                      >
                        {transaction.transactionAmount > 0
                          ? `+R${transaction.transactionAmount}`
                          : `-R${Math.abs(transaction.transactionAmount)}`}
                      </Text>
                      <Text style={styles.transactionDate}>
  {new Date(transaction.transactionDate).toLocaleDateString()}{" "}
  <Text style={styles.transactionTime}>
    {new Date(transaction.transactionDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </Text>
</Text>

                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
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
  transactionTime: {
    fontSize: 12,
    color: '#666',
    marginRight: 30,
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
  menuIcon: {
    position: 'absolute',
    right: 20,
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
  transactionYearSection: {
    marginBottom: 30,
  },
  transactionYear: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  transactionMonthSection: {
    marginBottom: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default SavingsAccount;
