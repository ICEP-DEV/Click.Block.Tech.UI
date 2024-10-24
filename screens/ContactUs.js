import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Image, ScrollView, Modal } from 'react-native';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !phoneNumber || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert('Submitted', 'Your message has been submitted successfully.');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:0817654321');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/123456789');
  };

  const handleSupportPress = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const sendChatMessage = () => {
    if (!chatMessage) return;

    // Add user's message to chat history
    setChatHistory([...chatHistory, { text: chatMessage, sender: 'User' }]);

    // Get AI response
    const aiResponse = getAIResponse(chatMessage);
    if (aiResponse) {
      setChatHistory(prev => [...prev, { text: aiResponse, sender: 'AI' }]);
    } else {
      setChatHistory(prev => [...prev, { text: "I'm sorry, I couldn't resolve your issue. A human agent will assist you shortly.", sender: 'AI' }]);
    }

    setChatMessage('');
  };

  const getAIResponse = (message) => {
    // Simple AI response logic (expand as needed)
    const responses = {
      "hello": "Hi there! How can I help you today?",
      "how can i contact support?": "You can contact support via phone or email.",
      "what are your hours?": "We are available 9 AM to 5 PM, Monday to Friday.",
      "help": null, // Null indicates escalation needed
    };

    // Convert message to lowercase for matching
    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || "I'm not sure how to help with that.";
  };

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
    if (!isChatboxVisible) {
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />

      <View style={styles.formContainer}>
        <Text style={styles.header}>CONTACT US</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Names"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Write your message here"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatIcon} onPress={toggleChatbox}>
          <Image source={require('../assets/chat.png')} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePhonePress}>
            <Image source={require('../assets/phone.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWhatsAppPress}>
            <Image source={require('../assets/whatsapp.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSupportPress}>
            <Image source={require('../assets/communication.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Chat Messages</Text>
            <ScrollView style={styles.chatBox}>
              {chatHistory.map((chat, index) => (
                <Text key={index} style={styles.chatMessage}>
                  {chat.sender}: {chat.text}
                </Text>
              ))}
            </ScrollView>
            <TextInput
              style={styles.chatInput}
              placeholder="Type a message..."
              value={chatMessage}
              onChangeText={setChatMessage}
              onSubmitEditing={sendChatMessage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#02457a',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003E75',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#02457a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
  },
  messageBox: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#003E75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatBox: {
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  chatMessage: {
    color: '#333',
    marginBottom: 5,
  },
  chatInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  chatIcon: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#003E75',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactUs;
