import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransactionNotification = () => {
  const [declined, setDeclined] = useState(false); // State to handle declined transaction
  const navigation = useNavigation();

  const handleApprove = () => {
    // Navigate to the PIN Entry Screen
    navigation.navigate('PinEntry');
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  return (
    // Use require() to reference the image from the assets folder
    <ImageBackground
      source={require('../Assets/PopUp.jpg')} // OPM Inserting - Backgound Image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {!declined ? (
          <View style={styles.notificationBox}>
            <Text style={styles.notificationTitle}>Transaction Notification</Text>
            <Text style={styles.notificationText}>
              A withdrawal of R500 at Soshanguve Crossing is awaiting your approval.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleApprove} style={styles.approveButton}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDecline} style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.declinedBox}>
            <Text style={styles.declinedTitle}>TRANSACTION DECLINED</Text>
            <Text style={styles.declinedText}>
              You have insufficient funds in your bank account to withdraw R500.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setDeclined(false)} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Balance')} style={styles.balanceButton}>
                <Text style={styles.buttonText}>Balance</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Ensure the image covers the whole screenS
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  notificationBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 50, // For Android shadow effect
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#02457a', // Added blue highlight color
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:-20,
  },
  approveButton: {
    backgroundColor: '#02457A', // iOS-like blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal:-20,
    borderTopLeftRadius: 0,  //OPM - No radius on the top-left corner
    borderTopRightRadius: 0, //OPM - No radius on the top-right corner
    borderBottomLeftRadius: 5, //OPM - Radius of 5 on the bottom-left corner
    borderBottomRightRadius: 0, //OPM - No radius on the bottom-right corner
    width: '58%',
  },
  declineButton: {
    backgroundColor: '#02457A', // iOS-like red color for decline
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal:-20,
    borderRadius: 5,
    borderTopLeftRadius: 0,  //OPM - No radius on the top-left corner
    borderTopRightRadius: 0, //OPM - No radius on the top-right corner
    borderBottomLeftRadius: 0, //OPM - Radius of 5 on the bottom-left corner
    borderBottomRightRadius: 5, //OPM - No radius on the bottom-right corner
    width: '58.2%',
  },
  declinedBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 50, // For Android shadow effect
    alignItems: 'center',
  },
  declinedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#ff3b30', // Red background like in the screenshot
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  declinedText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  balanceButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default TransactionNotification;
