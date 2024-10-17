import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import Stepper from './Stepper';
import axios from 'axios';
import { BASE_URL } from '../API/API'
// Import Navigation props
import { useNavigation, useRoute } from '@react-navigation/native';

export default function IdentityVerificationScreen() {
  const route = useRoute();  
  const {custID_Nr} = route.params;
  const [idNumber, setIdNumber] = useState(custID_Nr);
  const [idDocument, setIdDocument] = useState(null);
  const [idDocumentName, setIdDocumentName] = useState('');
  const [selfie, setSelfie] = useState(null);
  const [currentStep, setCurrentStep] = useState(3);
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
  });
  const [error, setError] = useState('');

  // Get navigation prop
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleUploadDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
 
    // console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const document = result.assets[0];
      setIdDocument(document.uri);
      setIdDocumentName(document.name);
    } else {
      Alert.alert('No file selected');
    }
  };
  const handleTakeSelfie = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }
  
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelfie(result.assets[0]);  // Update this to store the image correctly
    } else {
      Alert.alert('No photo taken');
    }
  };
  
  const calculateLuhnChecksum = (number) => {
    let sum = 0;
    let shouldDouble = true;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return (10 - (sum % 10)) % 10;
  };

  const handleSubmit = async () => {
    // Validate the inputs

  
    if (!idDocument) {
      Alert.alert('Document Missing', 'Please upload your ID document.');
      return;
    }else if (!selfie) {
      Alert.alert('Selfie Missing', 'Please take a selfie.');
      return;
    }else{
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append('CustID_Nr', idNumber);
        
        // Append the document as a file
        formData.append('ID_Document', {
          uri: idDocument,
          name: idDocumentName,
          type: 'application/pdf',
        });
        
        // Append the selfie
        formData.append('Selfie_With_ID', {
          uri: selfie.uri,  // Ensure correct URI
          name: 'selfie.jpg',
          type: 'image/jpeg',
        });
    
        // Make the POST request
        const response = await axios.post(`${BASE_URL}upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Check for success response
        if (response.status === 200) {
          Alert.alert('Success', 'Your details have been uploaded successfully!');
          navigation.navigate('Success');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading details:', error.response || error.message);
        Alert.alert('Error', 'Failed to upload details. Please try again.');
      }
    }
  
    
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.card}>
        <Stepper currentStep={currentStep} />
        <Text style={styles.title}>IDENTITY VERIFICATION</Text>
        <Text style={styles.subtitle}>Verify your identity</Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : {}]}
          value={idNumber}
          placeholder="Enter your Identity Number"
          placeholderTextColor="#02457A"
          keyboardType="numeric"
          maxLength={13}
          editable={false}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.fileInput} onPress={handleUploadDocument}>
          <Text style={styles.fileInputText}>
            {idDocumentName ? `${idDocumentName}` : 'Tap to upload your ID document (PDF)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.selfieButton} onPress={handleTakeSelfie}>
          {selfie ? (
            <Image source={selfie} style={styles.selfieImage} />
          ) : (
            <View style={styles.iconContainer}>
              <Text style={styles.selfieText}>Take a picture of yourself holding your ID</Text>
              <Image source={require('../assets/camera.png')} style={styles.cameraIcon} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    overflow: 'scroll',
  },
  title: {
    fontSize: 20,
    fontFamily: 'BebasNeue',
    color: '#02457A',
    marginBottom: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'PoppinsMedium',
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  input: {
    height: 40,
    borderColor: '#163460',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 300,
    color: '#02457A',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  fileInput: {
    height: 40,
    borderColor: '#163460',
    borderWidth: 1.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 300,
  },
  fileInputText: {
    color: '#02457A',
    fontSize: 14,
  },
  selfieButton: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#02457A',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  cameraIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  selfieText: {
    color: '#02457A',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  selfieImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#02457A',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center', // This will center the button horizontally
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  background: {
    position: 'absolute',
    top: 0,
    left:0,
    bottom: 0,
    width: '120%',
    height: '40%',
    backgroundColor: '#02457A', // This can be changed to an image if needed
    zIndex: -1, // Ensure it is behind other elements
  },
});
