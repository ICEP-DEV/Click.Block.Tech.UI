import React, { useState, useEffect } from 'react';
import axios from "axios";
import LottieView from 'lottie-react-native';
import { View, Text, TextInput, TouchableOpacity,ToastAndroid, StyleSheet, Image, ActivityIndicator } from 'react-native';
// `navigation` is passed as a prop when using React Navigation

export default function Login ({ navigation }){
const [inputPin, setInputPin] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [accNumber, setAccNumber] = useState(0);
const [userLoading, setUserLoading] = useState(false);
const [customerData, setCustomerData] = useState(null);
const storage = require('../async_storage');
const showToastMsg= (msg) => {
  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};
useEffect(() => {
  const fetchData = async () => {
    const value = await storage.getItem('accountNumber'); 

    if(value !== null){
      setAccNumber(value)
    }
  };
  fetchData();
  
}, []);
useEffect(() => {
  const fetchCustomerAndAccountData = async () => {
    setUserLoading(true);
    try {
      const value = await storage.getItem('accountID'); 
      const response = await axios.get(`http://192.168.56.1:5000/api/get_customer/${value}`);
      const customerData = response.data;
      if(customerData){
        console.log(customerData.FirstName);
        setCustomerData(customerData);
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
    console.log(inputPin);
    //fetching user account data using account number
    if(inputPin){
      await axios.get(`http://192.168.56.1:5000/api/get_customer_byID/${accNumber}/${inputPin}`,).then((response)=>{
        const userData = response.data;
        console.log(userData);
        //check if the user data is not null
        if (userData) {
          showToastMsg('Successfully logged in');
            //inserting the accountID of the customer to be used in the home page
           navigation.navigate('Home')
          setIsLoading(false);
          
        } else {
          showToastMsg('Wrong remote pin');
          setIsLoading(false);
         
        }
        }).catch((error)=>{
        console.error('Error fetching data:', error.response.data);
      });
    }else{
      showToastMsg('Please provide your remote Pin')
      setIsLoading(false);
    }
   
   
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
        (<Text style={styles.greeting}>
          Hello <Text>{customerData.FirstName}</Text><Text style={styles.name}></Text>
        </Text>)
       } 
        <Text style={styles.label}>Enter Remote Pin</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Remote pin"
          onChangeText={setInputPin}
        />
        <View style={styles.forgotPinContainer}>
          <TouchableOpacity onPress={handleForgotPin}>
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
            
        <View style={styles.signupTxtBtn} onPress={()=>{}}>
          <Text>Don't have an account?</Text>
          <Text style={styles.signupTxt}>Sign up!</Text>
        </View>
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
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#02457A',
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
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
