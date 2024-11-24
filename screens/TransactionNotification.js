import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from '../API/API';

const storage = require("../async_storage");
const API = require("../API/API");

const TransactionNotification = () => {
  const [declined, setDeclined] = useState(false); 
  const [popupTransact, setPopupTransact] = useState(false);
  const navigation = useNavigation();

  // Fetching popup status from the server
  const fetchPopupStatus = async () => {
    try {
      const response = await axios.get('http://168.172.187.163:5000/get_popup/3');
      console.log("Popup Status Response:", response.data); // Log the response for debugging
      if (response.data.success) {
        setPopupTransact(response.data.success); // Show pop-up if success is true
      } else {
        setPopupTransact(false); // Hide pop-up if success is false
      }
    } catch (error) {
      console.error("Error fetching popup status:", error);
    }
  };

  useEffect(() => {
    fetchPopupStatus(); 
    const interval = setInterval(fetchPopupStatus, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const handleApprove = async () => {
    storage.setItem("accountID", "3");
    const custIdNr = "9908126401086";
    storage.setItem("custIdNr", custIdNr);

    try {
      const response = await axios.get(`${BASE_URL}/pending-transaction/${custIdNr}`);
      console.log("Transaction Response:", response.data);

      if (response.data && response.data.transactionID) {
        const transactionID = response.data.transactionID;
        storage.setItem("transactionID", transactionID); 
        navigation.navigate("Login");
      } else {
        console.error("Transaction ID not found in the response.");
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  };

  // Decline transaction
  const handleDecline = () => {
    setDeclined(true);
  };

  return (
    <View style={styles.container}>
      {popupTransact && (
        <Modal
          visible={popupTransact} // Controls the visibility of the modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => setPopupTransact(false)} // Close modal when requested
        >
          <View style={styles.modalOverlay}>
            <View style={styles.notificationBox}>
              {!declined ? (
                <>
                  <Text style={styles.notificationTitle}>Transaction Notification</Text>
                  <Text style={styles.notificationText}>
                    A withdrawal of 500 at Soshanguve Crossing is awaiting your approval.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleApprove} style={styles.approveButton}>
                      <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDecline} style={styles.declineButton}>
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={styles.declinedBox}>
                  <Text style={styles.declinedTitle}>TRANSACTION DECLINED</Text>
                  <Text style={styles.declinedText}>
                    You have insufficient funds in your bank account to withdraw.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setDeclined(false)} style={styles.closeButton}>
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Balance")} style={styles.balanceButton}>
                      <Text style={styles.buttonText}>Balance</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02457a",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  notificationBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#02457a",
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  declineButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  declinedBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  declinedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  declinedText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  balanceButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransactionNotification;
