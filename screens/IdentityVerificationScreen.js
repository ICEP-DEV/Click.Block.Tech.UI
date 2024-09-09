import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';
import Stepper from './Stepper';

export default function IdentityVerificationScreen() {
  const [docType, setDocType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idDocument, setIdDocument] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [currentStep, setCurrentStep] = useState(3); // State for step
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleUploadDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      setIdDocument(result.uri);
    }
  };

  const handleTakeSelfie = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelfie(result.uri);
      }
    } else {
      Alert.alert("Camera permission is required to take a selfie.");
    }
  };

  const handleSubmit = () => {
    if (!validateIdNumber(idNumber)) {
      Alert.alert('Invalid ID Number', 'Please enter a valid South African ID number.');
      return;
    }

    Alert.alert('Submitted', 'Identity verification details submitted successfully.');
  };

  return (  
    <View style={styles.container}> 
      <View style={styles.card}>
    <Stepper currentStep={currentStep} />
        <Text style={styles.title}>IDENTITY VERIFICATION</Text>
        <Text style={styles.subtitle}>Verify your identity</Text>

        <TextInput
          style={styles.input}
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Enter your Identity Number"
           placeholderTextColor="#02457A"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.fileInput} onPress={handleUploadDocument}>
          <Text style={styles.fileInputText}>
            {idDocument ? 'PDF Uploaded Successfully' : 'Tap to upload your ID document(PDF)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.selfieButton} onPress={handleTakeSelfie}>
          {selfie ? (
            <Image source={{ uri: selfie }} style={styles.selfieImage} />
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
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#0000FF',
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
    width: '100',
    height: 100,
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
    width: 40, // Adjust size as needed
    height: 40, // Adjust size as needed
    marginBottom: 10, // Space between icon and text
  },
  selfieText: {
    color: '#02457A',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  selfieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
