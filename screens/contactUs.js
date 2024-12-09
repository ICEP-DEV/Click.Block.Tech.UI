import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { BASE_URL } from "../API/API";
import storage from "../async_storage";

export default function ContactUs() {
  const [customerData, setCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const custID_Nr = await storage.getItem("CustID_Nr");
        if (!custID_Nr) {
          throw new Error("Customer ID not found. Please log in again.");
        }

        const response = await fetch(`${BASE_URL}get_customer/${custID_Nr}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer data.");
        }

        const data = await response.json();
        setCustomerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert("Validation Error", "Please enter a message before submitting.");
      return;
    }

    const payload = {
      CustID_Nr: customerData?.CustID_Nr || "",
      FullNames: `${customerData?.FirstName || ""} ${customerData?.LastName || ""}`,
      PhoneNumber: customerData?.PhoneNumber || "",
      Email: customerData?.Email || "",
      MessageDescription: message,
      Status: "pending", // Default status
    };

    try {
      const response = await fetch(`${BASE_URL}contactmessages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the message.");
      }

      Alert.alert("Success", "Your message has been submitted successfully.");
      setMessage(""); // Clear the input field after submission
    } catch (err) {
      Alert.alert("Error", `Failed to submit message: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Blue Background Section */}
      <View style={styles.styleContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>

      {/* White Card Section */}
      <View style={styles.card}>
        <Text style={styles.headerText}>CONTACT US</Text>

        <TextInput
          style={styles.input}
          value={customerData ? `${customerData.FirstName} ${customerData.LastName}` : ""}
          editable={false}
          placeholder="Full Name"
        />

        <TextInput
          style={styles.input}
          value={customerData ? customerData.Email : ""}
          editable={false}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          value={customerData ? customerData.PhoneNumber : ""}
          editable={false}
          placeholder="Contact"
        />

        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Write your message here"
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>

        {/* Bottom Icons Section */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => Alert.alert("Call", "Calling Nexis Support")}>
            <MaterialIcons name="call" size={36} color="#02457A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("WhatsApp", "Opening WhatsApp chat")}>
            <FontAwesome5 name="whatsapp" size={36} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Email", "Composing Email")}>
            <MaterialIcons name="email" size={36} color="#EA4335" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  styleContainer: {
    backgroundColor: "#02457A",
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#02457A",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    borderColor: "#02457A",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#02457A",
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 120,
    borderColor: "#02457A",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    textAlignVertical: "top",
    color: "#02457A",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#02457A",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02457A",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});















