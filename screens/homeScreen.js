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
import { DeviceMotion } from 'expo-sensors';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const storage = require('../async_storage');
  const navigation = useNavigation(); // Initialize navigation
  const panicAlert = useAlertStoreStore((state)=>state.isAlertTriggered);
  const [ data, setData] = useState();
  const [panicStatus, setPanicStatus] = useState();
  const [isMovement, setIsMovement] = useState(false);
  const [locationID, setLocationID] = useState(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //Device motion threshold for the magnitude 
  const threshold = 1;  
 
  //This method gets the current user location
  const getUserLocation = async () =>{
    //If user does not grant permission
    try{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            setErrMsg('not granted!');
            //set is permission granted to false
      
            console.log('Permission is not granted from the hook');
        }else if (status === 'granted'){
            setErrMsg('granted');
            //set is permission granted to true
          
            console.log('Permission is granted from the hook');
        }
        //If user grands us permission
        let {coords} = await Location.getCurrentPositionAsync();
        if ({coords}){
            const {latitude, longitude} = coords;
            
           setLatitude(latitude);
           setLongitude(longitude);
          coords = {};
        } 
    }catch(err){
        console.log('inside err')
        console.log(err);
        setErrMsg('not granted');
    }
    
  }
  // Fetch customer and account data
  useEffect(() => {
    const fetchCustomerAndAccountData = async () => {
      if(panicAlert){
        try {
          const value = await storage.getItem('CustID_Nr');
          const response = await axios.get(`${BASE_URL}get_customer/${value}`);
          const customerData = response.data;
          setFirstName(customerData.FirstName || '');
          setAccountType(customerData.BankAccount.AccountType || 'Savings');
          setLoading(false);
          console.log(customerData.PanicButtonStatus);
          setPanicStatus(customerData.PanicButtonStatus);
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
  }, [panicStatus]);

  //This function updated the latitude and longitude
  const updatingLatLong = async() =>{
    getUserLocation();
    if(locationID){
      console.log(`${longitude}`)
      
        const updateData = {
          "latitude": `${latitude}`,
          "longitude": `${longitude}`
        }
      const response = await axios.put(`${BASE_URL}updateLatLong/${locationID}`,updateData);
      const customerData = response.data;
      if(customerData){
        console.log('Location updated');
      }else{
        console.log('not');
      }
      
    }
  }
    //Tracking Live customerLive When the alert is triggered
useEffect(() => {
  if(panicStatus === 1){
    const subscription = DeviceMotion.addListener(setData);
  if (data && data.acceleration) {
    const { x, y, z } = data.acceleration;
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    if (magnitude > threshold) {
      console.log('Movement detected!');
      setIsMovement(true);
      updatingLatLong()
    }
    return () => subscription.remove();
  }
  }{
    //do nothing
  }
  
}, [data, panicStatus,latitude,longitude]);

//This useEffect get the user alert information when movement is detected
useEffect(()=>{
  const gettingAlert = async() =>{
    try{
      if(isMovement){
        const value = await storage.getItem('CustID_Nr');
        const response = await axios.get(`${BASE_URL}getAlertLocationID/${value}`);
        const locationData = response.data;
        setLocationID(locationData._LocationID);
      }
    }catch(err){
      console.log(err);
    }
  };
  gettingAlert()
},[isMovement])
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
              {(panicAlert ? <Text style={styles.balanceText}>Balance: R{'0.00'}</Text>: <Text style={styles.balanceText}>Balance: R{balance.toFixed(2)}</Text>) }
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




