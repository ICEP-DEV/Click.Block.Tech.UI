import React, { useEffect, useState } from 'react';
import { View, Text, Image,StyleSheet,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsePromptContainer from '../components/responsePromptContainer';
import PromptComponent from '../components/prompt_compo';
import ResponseComponent from '../components/response_compo';
import axios from "axios";
import { BASE_URL } from '../API/API';

export default function ChatbotPage({navigation}){
    const [prompt, setPrompt] = useState();
    const [responsePromptList, setResponsePromptList] = useState([]);
    const [isContactAdminActive, setIsContactAdminActive] = useState(false) ;
    const [promptsCounter, setPromptsCounter] = useState(0);
    
        useEffect(()=>{
            if(promptsCounter > 1){
                setIsContactAdminActive(true)
            }
        },[isContactAdminActive,promptsCounter])
        const addPrompt = async() =>{
            console.log(prompt)
            setResponsePromptList((prevList) => [
                ...prevList,
                <ResponsePromptContainer message={<PromptComponent promptText={prompt} />} />
              ]);
              setPromptsCounter(responsePromptList.length);
            const promptText = {
                "prompt": `${prompt}`
              }
              console.log(promptText)
            const response = await axios.put(`${BASE_URL}/chatbotResponse/`,promptText);
            console.log(promptText)
            const responseData= response.data;
            console.log(responseData)
            if(responseData){
                console.log(responseData)
                addResponse(responseData.response);
            }
        }
        const addResponse = (response) => {
            setResponsePromptList((prevList) => [
              ...prevList,
              <ResponsePromptContainer message={<ResponseComponent responseText={response} />} />
            ]);
          };
        
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text><Ionicons name="arrow-back" size={24} color="white" /></Text>
                </TouchableOpacity>
                <Image source={require('../assets/card_settings/chatbot.png')} style={{width: 50, height: 50,marginLeft: 50 }}/><Text style={{marginTop: 25, marginLeft: 15, fontSize: 18, color: 'white', fontWeight: '500'}}>Hello, Ask me anything.</Text></View>
            
            <View style={styles.messagesContainer}>
            <FlatList
                data={responsePromptList}
                renderItem={({item}) => item}
            />
            </View>
           {isContactAdminActive?  <View style={{ marginTop: 15, }}><TouchableOpacity onPress={()=>navigation.navigate('contactUs')} style={{borderRadius: 10, width: '35%', height: 35, marginLeft: 35,backgroundColor: '#02457A',justifyContent: 'center' }}><Text style={{textAlign: 'center', color: 'white' }}>Contact Admin</Text></TouchableOpacity></View> : <View></View>}
            <View style={styles.chatInputContainer}>
                
                <TextInput
                style={styles.input}
                placeholder="How can I assist you?"
                onChangeText={setPrompt}
                />
                <TouchableOpacity onPress={addPrompt}><Image source={require('../assets/card_settings/robot.png')} style={{width: 50, height: 50,marginLeft: 10, marginTop: 15 }}/></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
       
      },
      header:{
        
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        paddingLeft: 15,
        backgroundColor: '#02457A'

    },
    input:{
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        
        margin: 10,
        width: '70%'

    },
    chatInputContainer:{
        flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        marginTop: 15
    },
    messagesContainer:{
        height: '70%',
        backgroundColor: '',
        display: 'flex',
        flexDirection: 'row',

    },
    promptMessageContainer:{
        
        backgroundColor: 'black',
        width: "50%"
    },
    responseMessageContainer:{
        backgroundColor:'blue',
        width: "50%"
    }
});