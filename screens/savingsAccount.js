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
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for the popup menu
  const storage = require('../async_storage');
  const navigation = useNavigation();

  // Fetch customer data from the database
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const value = await storage.getItem('CustID_Nr');
        const response = await axios.get(`${BASE_URL}get_customer/${value}`);
        const customerData = response.data;

        setFirstName(customerData.FirstName || '');
        setBalance(customerData.BankAccount.Balance || 0);
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
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default SavingsAccount;
