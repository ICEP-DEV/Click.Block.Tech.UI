import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function IdentityVerificationScreen() {
  const [docType, setDocType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idDocument, setIdDocument] = useState(null);
  const [selfie, setSelfie] = useState(null);

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
    Alert.alert('Submitted', 'Identity verification details submitted successfully.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Identity Verification</Text>

        {/* <Text style={styles.label}>Document Type</Text>
        <Picker
          selectedValue={docType}
          onValueChange={(itemValue) => setDocType(itemValue)}
        >
          <Picker.Item label="Select Document Type" value="" />
          <Picker.Item label="Driver's License" value="drivers_license" />
          <Picker.Item label="ID Card" value="id_card" />
        </Picker> */}

        {/* <Text style={styles.label}>Enter your Identity Number</Text> */}
        <TextInput
          style={styles.input}
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Enter your Identity Number"
          keyboardType="numeric"
        />

        {/* <Text style={styles.label}>Upload ID Document (PDF)</Text> */}
        <TouchableOpacity style={styles.fileInput} onPress={handleUploadDocument}>
          <Text style={styles.fileInputText}>
            {idDocument ? 'PDF Uploaded Successfully' : 'Tap to upload your ID document(PDF)'}
          </Text>
        </TouchableOpacity>

        {/* <Text style={styles.label}>Take a Selfie with ID in Hand</Text> */}
        <TouchableOpacity style={styles.selfieButton} onPress={handleTakeSelfie}>
          {selfie ? (
            <Image source={{ uri: selfie }} style={styles.selfieImage} />
          ) : (
            <Text style={styles.selfieText}>Take a picture of yourself holding your ID</Text>
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
    backgroundColor: '#f5f5f5', // Light background for the whole screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20, // Adjust padding as needed
  },
  card: {
    backgroundColor: '#02457A',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    padding: 20,
    width: '100%',
    maxWidth: 400, // Max width to avoid stretching on large screens
    maxHeight: '90%', // Max height to fit within screen constraints
    overflow: 'scroll', // Allow scrolling if content is too tall
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16, // Adjust size for labels
    fontWeight: '600', // Semi-bold font weight for labels
    marginBottom: 10, // Space below label
    color: '#0000FF', // Blue color for labels
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  fileInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  fileInputText: {
    color: '#0000FF', // Blue color for text
    fontSize: 16,
  },
  selfieButton: {
    width: '100%', // Match button width
    height: 100,
    backgroundColor: '#e0e0e0', // Light grey background
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  selfieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  selfieText: {
    color: '#888', // Grey text color
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF', // Blue background color for the button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff', // White text color
    fontSize: 16,
  },
});
