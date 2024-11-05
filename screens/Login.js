import React, { useState, useEffect } from 'react';
import axios from "axios";
import LottieView from 'lottie-react-native';
import { View, Text, TextInput, TouchableOpacity,ToastAndroid, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../API/API';
import * as Location from 'expo-location';
import useLocationStore from '../stores/location_store';
import useAlertStoreStore from '../stores/panicAlert_store';
// `navigation` is passed as a prop when using React Navigation

export default function Login ({ navigation }){
const [inputPin, setInputPin] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [accNumber, setAccNumber] = useState(0);
const [userLoading, setUserLoading] = useState(false);
const [customerName, setCustomerName] = useState('');
const [isPanicTriggered, setIsPanicTriggered] = useState(false);
const [customerAccID, setCustomerAccID] =useState('');
const [customerIDNr,setCustomerIDNr] = useState('');
//Location
const [errMsg, setErrMsg] = useState('');
const permissionNotGranted = useLocationStore((state) => state.notGrantPermission);
const permissionGranted = useLocationStore((state) => state.grantPermission);
const alertTriggered = useAlertStoreStore((state)=> state.triggerAlert);
const reset = useAlertStoreStore((state)=> state.reset);

const [streetAddress, setStreetAddress] = useState('');
const [suburb,setSuburb] = useState('');
const [city, setCity] = useState('');
const [province,setProvince] = useState('');
const [postalCode, setPostalCode] = useState('');
const [country, setCountry] = useState('');
const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const [locationID, setLocationID] = useState('');

const storage = require('../async_storage');
const showToastMsg= (msg) => {
  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

//Get location
const getUserLocation = async () =>{
  //If user does not grant permission
  try{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
          setErrMsg('not granted!');
          //set is permission granted to false
          permissionNotGranted();
          console.log('Permission is not granted from the hook');
      }else if (status === 'granted'){
          setErrMsg('granted');
          //set is permission granted to true
          permissionGranted();
          console.log('Permission is granted from the hook');
      }
      //If user grands us permission
      let {coords} = await Location.getCurrentPositionAsync();
      if ({coords}){
          const {latitude, longitude} = coords;
          console.log("lat and long is: ", latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude
          });
          console.log("User Location: ",response);
          //setting location information
          setStreetAddress(response[0].formattedAddress);
          setSuburb(response[0].subregion);
          setCountry(response[0].country);
          setProvince(response[0].region);
          setCity(response[0].city);
          setPostalCode(response[0].postalCode);


      } 
  }catch(err){
      console.log('inside err')
      console.log(err);
      setErrMsg('not granted');
  }
  
}

//Fetching customer account number to be used when logging in
useEffect(() => {
  const fetchData = async () => {
    const value = await storage.getItem('accountNumber');

    if(value !== null){
      setAccNumber(value)
    }
  };
  fetchData();
  
}, []);

//Fetching customer information to be displayed on the login screen
useEffect(() => {
  const fetchCustomerAndAccountData = async () => {
    try {
      setUserLoading(true);
      const value = await storage.getItem('CustID_Nr'); 
      const response = await axios.get(`${BASE_URL}get_customer/${value}`);
      const customerData = response.data;
      setCustomerIDNr(value);
      
      if(customerData){
        setCustomerName(customerData.FirstName);
        //set customer Account ID to be used to disable account of the customer where the Alert PIN is triggered
        setCustomerAccID(customerData.AccountID);
        setUserLoading(false);
      }
    } catch (error) {
      console.error('Error fetching customer or account data:', error);
      setUserLoading(false);
    }
  };

  fetchCustomerAndAccountData();
  
}, []);

  async function  handleLogin (){
    setIsLoading(true);
    try{
      const response = await axios.get(`${BASE_URL}compare_alertPIN/${accNumber}/${inputPin}`,);
      console.log('next');
      //If the entered PIN matched the alert PIN it returns true
      const userData = response.data;
      if (userData) {
        //get location
        getUserLocation();
        //set the IsPanicTriggered to true
      
     
        //Enabling the Panic Button Status
        const updateData = {
          "PanicButtonStatus": `1`
        }
        try{
          //updating the panic button status
          const response = await axios.put(`${BASE_URL}update_PanicStatus/${customerIDNr}`,updateData);
          const res = response.data;
          if(res){
            console.log(res);
          }
        }catch(err){
          console.log('error updating Panic Button Status');
        }
         //Disabling the customer Account status
         const updateAccountData = {
          "isActive": `0`
        }
         try{
          //updating the account status
          const response = await axios.put(`${BASE_URL}update_accountStatus/${customerAccID}`,updateAccountData);
          const res = response.data;
          if(res){
            console.log(res);
          }
        }catch(err){
          console.log('error updating account status');
        }
        //Setting location Data
        const locationData = {
          "StreetAddress": `${streetAddress}`,
          "Suburb": `${suburb}`,
          "City": `${city}`,
          "Province": `${province}`,
          "PostalCode": `${postalCode}`,
          "Country": `${country}`,
          "latitude": `${latitude}`,
          "longitude": `${longitude}`
        }
        //creating location
        try{
          const response = await axios.post(`${BASE_URL}createLocation`,locationData);
          const result = response.data;
          if(result){
            setLocationID(result.id);
          console.log(`location infromation: ${result.id}`);
          }
    
         
        }catch(err){
          console.log('error creating Location');
        }
        //setting Alert Data
        const sentDate = Date.now();
        const alertData = {
          "CustID_Nr": `${customerIDNr}`,
          "AlertType": `PanicAlert`,
          "SentDate": `${sentDate}`,
          "LocationID": `${locationID}`,
          "Receiver": `Admin`,
          "Message": `Alert button is triggered`,
        }

        //creating Alert
        try{
          const response = await axios.post(`${BASE_URL}createAlert`,alertData);
          const result = response.data;
    
         
        }catch(err){
          console.log('error creating Alert');
        }
        
        console.log('The alert PIN is triggered');
        alertTriggered();
        navigation.navigate('Home');
        setIsLoading(false);
      }else{
        //if the entered PIN does not match with the Alert PIN check for the remote PIN
        if(inputPin){
          reset();
         try{
          const response =  await axios.get(`${BASE_URL}get_customer_byID/${accNumber}/${inputPin}`,);
            const userData = response.data;
            console.log(userData);
            //check if the user data is not null
            if (userData) {
              showToastMsg('Successfully logged in');
                //inserting the accountID of the customer to be used in the home page
               setInputPin('');
                navigation.navigate('Home');
              setIsLoading(false);
              
            } else {
              showToastMsg('Wrong remote pin');
              setIsLoading(false);
             
            }
         }catch(err){
          Alert.alert('Error', 'An error occurred. Please try again.');
         }
          
        }else{
          showToastMsg('Please provide your remote Pin')
          setIsLoading(false);
        }
      }
    }catch(err){
      
      Alert.alert('Error', 'An error occurred while comparing PINs. Please try again.');
    }
    //fetching user account data using account number
    
   
   
  };
  const handleForgotPin = () => {
    alert('Forgot PIN clicked');
  };

  return (
    <View style={styles.container}>
   
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
      />
      <View style={styles.background} />
      <View style={styles.card}>
      
        <Image
          source={require('../assets/user.png')}
          style={styles.user}
          resizeMode="contain"
        />
       {
        userLoading ? (<ActivityIndicator size="large" color="#0000ff" /> ):
        (<View style={styles.greetingsContainer}>
          <Text style={styles.greeting1}>WELCOME BACK,</Text>
          <Text style={styles.greeting2}>{customerName.toUpperCase()}</Text>
        </View>)
       } 
        <Text style={styles.label}>Enter Remote Pin</Text>
        <TextInput
          style={styles.input}
          value={inputPin}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Remote pin"
          onChangeText={setInputPin}
        />
        <View style={styles.forgotPinContainer}>
          <TouchableOpacity onPress={()=>handleForgotPin}>
            <Text style={styles.forgotPin}>Forgot PIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          
          {isLoading ? (
        <LottieView style={{ width: 100, height: 100,alignItems: 'center', marginBottom: 45 }} source={require('../assets/lottie_animation_icons/loading_anim_icon.json')} autoPlay loop />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}
        </View>
        <TouchableOpacity style={styles.signupTxtBtn} onPress={ ()=>navigation.navigate('Registration')}>
          <Text>Don't have an account?</Text>
          <Text style={styles.signupTxt}>Sign up!</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  signupTxtBtn: {
    flexDirection: 'row',
    
  },
  signupTxt:{
    marginLeft: 5,
    fontWeight: '600'
  },
  logo: {
    width: 108,
    height: 63,
    marginBottom: 40,
  },
  user: {
    width: 50,
    height: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: 380,
    height: 448,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#02457A',
    zIndex: -1,
  },
  greetingsContainer:{
    alignItems: 'center',
    
  },
  greeting1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#02457A',
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  greeting2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#02457A',
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  
  label: {
    fontSize: 16,
    color: '#02457A',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#02457A',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotPinContainer: {
    alignSelf: 'flex-end',
  },
  forgotPin: {
    color: '#02457A',
    textAlign: 'right',
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#02457A',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
