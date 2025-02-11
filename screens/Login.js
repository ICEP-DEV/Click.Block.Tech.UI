import React, { useState, useEffect} from 'react';
import axios from "axios";
import LottieView from 'lottie-react-native';
import { View, Text, TextInput, TouchableOpacity,ToastAndroid, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../API/API';
import * as Location from 'expo-location';
import useLocationStore from '../stores/location_store';
import useAlertStoreStore from '../stores/panicAlert_store';
import AcceptDeclineModal from '../hooks/acceptDecline_hook';

export default function Login ({ navigation }){
const [inputPin, setInputPin] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [accNumber, setAccNumber] = useState(0);
const [userLoading, setUserLoading] = useState(false);
const [customerName, setCustomerName] = useState('');
const [customerAccID, setCustomerAccID] =useState('');
const [customerIDNr,setCustomerIDNr] = useState('');
const [errMsg, setErrMsg] = useState('');
const permissionNotGranted = useLocationStore((state) => state.notGrantPermission);
const permissionGranted = useLocationStore((state) => state.grantPermission);
const alertTriggered = useAlertStoreStore((state)=> state.triggerAlert);
const reset = useAlertStoreStore((state)=> state.reset);
const isPanicAlertTriggered = useAlertStoreStore((state)=>state.isAlertTriggered);
const [isModalVisible,setIsModalVisible] = useState(false);
const storage = require('../async_storage');
const [transaction, setTransactions] = useState();


//Expo sensors

//ToastMessage
const showToastMsg= (msg) => {
  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};



//end of expo sensors

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
          let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude
          });
          console.log("User Location: ",response);
          //saving customer location
          //checking if the panic alert is triggered to avoid calling creating location when reusing the method
          if(isPanicAlertTriggered === false){
            saveLocation(response[0].formattedAddress,response[0].subregion,response[0].city,response[0].region,response[0].postalCode,response[0].country,latitude,longitude)
          }
          

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
  
}, [accNumber]);


//Fetching customer information to be displayed on the login screen
useEffect(() => {
  const fetchCustomerAndAccountData = async () => {
    try {
      setUserLoading(true);
      const value = await storage.getItem('CustID_Nr');
      console.log(`Id${customerAccID}`) 
      const response = await axios.get(`${BASE_URL}get_customer/${value}`);
      const customerData = response.data;
      console.log(value);
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
//fetching Transactions
const fetchTransacNotification = async () => {
  console.log(isModalVisible)

  try{
    console.log(`Acc:${customerAccID}`)
    const status = `pending`;
    if(customerAccID){
      const response = await axios.get(`${BASE_URL}getTransaction_byAccID/${customerAccID}/${status}`);
    const transactions = response.data;
    if(transactions.length > 0){
      setIsModalVisible(true);
      setTransactions(transactions);
     
    }else{
      setIsModalVisible(false);
    }

    }
    
  }catch(err){
    console.log(err);
  }
};
useEffect(() => {
  
  fetchTransacNotification();
  
}, [customerAccID,isModalVisible,transaction]);

const creatAlert = async(locationID) =>{
  console.log('creating alert');
  const date = new Date();
  const alertData = {
   "CustID_Nr": `${customerIDNr}`,
   "AlertType": `PanicAlert`,
   "SentDate": `${date.toISOString()}`,
   "LocationID": `${locationID}`,
   "Receiver": `Admin`,
   "Message": `Alert button is triggered`,
 }

 //This API call create an Alert 
 try{
  await axios.post(`${BASE_URL}createAlert`,alertData);
   
 }catch(err){
   console.log('error creating Alert');
 }
}
//
const updatePaniAlertStatus = async() =>{
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
}
//Method for disabling customer account upon panic alert trigger
const disableAccount = async() =>{
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
}

//Function for saving customer location upon panic alert trigger
const saveLocation = async(streetAddress,suburb,city,province,postalCode,country,latitude,longitude) =>{
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
      //If the results if not empty get the location ID
      //calling createAlert method to create alert using the location ID for reference
      creatAlert(result.id)
    }

   
  }catch(err){
    console.log('error creating Location');
  }
}

//This method handles the login and check if whether the user entered the Remote pin or AlertPin
  async function  handleLogin (){
    setIsLoading(true);
    try{
      //this API call compare the entered PIN with the alert PIN
          axios.get(`${BASE_URL}compare_alertPIN/${accNumber}/${inputPin}`,).then(response => {
        //If the entered PIN matched the alert PIN it returns true
      const data = response.data;
      if (data) {

        //checking if the panic alert is being triggered, to avoid creating multiple alerts and locations
        if(isPanicAlertTriggered){
          //navigating to the homepage
          navigation.navigate('Home');
        }else{
           
        //get location
        getUserLocation();

        //Enabling the Panic Button Status
        updatePaniAlertStatus (); 
         //Disabling the customer Account status
        disableAccount();
        
        console.log('The alert PIN is triggered');
        setInputPin('');
        alertTriggered();

        navigation.navigate('Home');
        setIsLoading(false);

        }
             }else{
        //if the entered PIN does not match with the Alert PIN check for the remote PIN
         try{
          axios.get(`${BASE_URL}compare_PIN/${accNumber}/${inputPin}`,).then(response => {
            //If the entered PIN matched the alert PIN it returns true
          const data = response.data;
           //check if the user data is not null
           if (data) {
            showToastMsg('Successfully logged in');
              //inserting the accountID of the customer to be used in the home page
             setInputPin('');
             setIsLoading(false);
             reset();
             //check if the panic button status is triggered
             //If the panic button status is triggered, ??deny access??

              navigation.navigate('Home');
            
            
          } else {
            showToastMsg('Wrong remote pin');
            setIsLoading(false);
           
          }

          });
           
         }catch(err){
          Alert.alert('Error', 'An error occurred. Please try again.');
         }
      }
        
      });
      
    }catch(err){
      
      Alert.alert('Error', 'An error occurred while comparing PINs. Please try again.');
    }
    //Checking if the comparePIN response if true or false
   
    
  };

  const handleForgotPin = () => {
    // alert('Forgot PIN clicked');
    navigation.navigate('PasswordAuthentication');
  };

  return (
    <View style={styles.container}>

      <AcceptDeclineModal isModalVisible={isModalVisible} transaction={transaction} customerIDNr={customerIDNr} customerAccID={customerAccID} navigation={navigation}/>
     
      <TouchableOpacity onPress={()=>{fetchTransacNotification()}}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo }
        />
    </TouchableOpacity>
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
          <TouchableOpacity onPress={()=>navigation.navigate('PasswordAuthentication')}>
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
    backgroundColor: '#02457A',
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
    textShadowOffset: { width: 1, height: 1 }, //Oamogetswe - Changed the shadow of the name
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
