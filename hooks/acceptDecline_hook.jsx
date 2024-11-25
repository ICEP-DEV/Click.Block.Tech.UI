import Modal from "react-native-modal";
import React, { useState, useEffect} from 'react';
import { TouchableOpacity,StyleSheet,View,Text, TextInput,ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import useLocationStore from '../stores/location_store';
import useAlertStoreStore from '../stores/panicAlert_store';
import axios from "axios";
import { BASE_URL } from "../API/API";

export default function AcceptDeclineModalHook({isModalVisible,transaction, customerIDNr,customerAccID,navigation}){
 const [isVisible, setIsVisble] = useState(false);
 const [approvalPIN, setApprovalPIN] = useState('');
 const [transactions, setTransactions] = useState(transaction);
 const [transactionType, setTransactionType] = useState('');
 const [transactionAmnt, setTransactionAmnt] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [accNumber,setAccNumber] = useState('');
 const permissionNotGranted = useLocationStore((state) => state.notGrantPermission);
 const permissionGranted = useLocationStore((state) => state.grantPermission);
 const isPanicAlertTriggered = useAlertStoreStore((state)=>state.isAlertTriggered);
 const alertTriggered = useAlertStoreStore((state)=> state.triggerAlert);
 const reset = useAlertStoreStore((state)=> state.reset);
 const storage = require('../async_storage');
 const showToastMsg= (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
 const getUserLocation = async () =>{
    //If user does not grant permission
    try{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
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

 useEffect(()=>{
    setIsVisble(isModalVisible);
    
    if(transaction){
    console.log(transaction)
    setTransactionAmnt(transaction[0].transactionAmount);
    setTransactionType(transaction[0].transactionType);
    
    }
    
 },[isModalVisible, transaction]);

 const closeModal = () =>{
    setIsVisble(false);
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

 const handleTransactionApproval = () =>{
    setIsLoading(true);
    try{
      //this API call compare the entered PIN with the alert PIN
      console.log(approvalPIN);
     
      console.log('inside');
          axios.get(`${BASE_URL}compare_alertPIN/${accNumber}/${approvalPIN}`,).then(response => {
        //If the entered PIN matched the alert PIN it returns true
        const data = response.data;
    
        if (data) {
        
        //get location
        getUserLocation();

        //Enabling the Panic Button Status
        updatePaniAlertStatus (); 
         //Disabling the customer Account status
        disableAccount();
        
        console.log('The alert PIN is triggered');
        setApprovalPIN('');
        alertTriggered();

        navigation.navigate('Home');
        setIsLoading(false);
     }else{
        //if the entered PIN does not match with the Alert PIN check for the remote PIN
         try{
            axios.get(`${BASE_URL}compare_PIN/${accNumber}/${approvalPIN}`,).then(response => {
            //If the entered PIN matched the alert PIN it returns true
          const data = response.data;
           //check if the user data is not null
           if (data) {
            showToastMsg('Successfully logged in');
              //inserting the accountID of the customer to be used in the home page
             setApprovalPIN('');
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
          showToastMsg('Error l');
         }
      }
        
      });
      
    }catch(err){
      
      showToastMsg('Error comparing Pins');
    }
    //Checking if the comparePIN response if true or false
   
    
 }
return(
    <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTextMsg}>{`Do you want to accept this ${transactionType} transaction of R${transactionAmnt} `}</Text>
          <TextInput
          style={styles.input}
          value={approvalPIN}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Remote pin"
          onChangeText={setApprovalPIN}
        />
        <TouchableOpacity style={styles.acceptButton} onPress={handleTransactionApproval}><Text style={styles.modalButtonText}>Accept</Text></TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={closeModal}><Text style={styles.modalButtonText}>Decline</Text></TouchableOpacity>
        </View>
      </Modal>
);

}
const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginLeft: 5,
        height: 280,
        borderRadius: 10
      },
      input:{
    width: '75%',
    borderColor: '#02457A',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
      },
      modalTextMsg:{
        width: 280,
        marginBottom: 15,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
      },
      acceptButton: {
        backgroundColor: '#02457A',
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
        marginBottom: 15,
      },
      declineButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
        marginBottom: 15,
      },
      
      modalButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
      },
     
})