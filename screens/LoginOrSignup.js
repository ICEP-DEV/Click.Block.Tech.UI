import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font';

// OPM - Function to load fonts
const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'), 
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    });
};

export default function LoginOrSignup ({navigation}){
    
    //OPM - Declare here
    const [fontsLoaded, setFontsLoaded] = useState(false); 

    // OPM - Load fonts on component mount
    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true)); 
    }, []);

    //OPM - Show loading indicator while fonts are loading
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />; 
    }

    return (
        <ImageBackground
            source={require('../assets/OnboardingGradient3.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Nexis</Text>
                <Text style={styles.description}>
                    Your trusted partner for financial security and personal protection, all in one app!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                {/* OPM - Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('VerifyApp')}>
                     <Text style={styles.loginButtonText}>Activate</Text>
                </TouchableOpacity>

                {/* OPM - Signup Button */}
                <TouchableOpacity style={styles.signupButton} onPress={()=>navigation.navigate('Registration')}>
                     <Text style={styles.signupButtonText}>Signup</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        marginTop: 200,
    },
    title: {
        fontSize: 26,
        fontFamily: 'Poppins-Bold', 
        color: 'white',
        marginTop: 180,
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', 
        textShadowOffset: { width: 0, height: 2 }, 
        textShadowRadius: 3,
    },
    buttonContainer: {
        flexDirection: 'row',          
        justifyContent: 'center',      
        marginTop: 20,                 
    },
    loginButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom: 100,
        alignSelf: 'center',               // Space between buttons
    },
    signupButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom: 100,
        marginLeft: 20,
        alignSelf: 'center',
    },
    loginButtonText: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textAlign: 'center',
    },
    signupButtonText: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textAlign: 'center',
    },
    description: {
        fontSize: 14.5,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        marginLeft:40,
        marginRight:40,
    },
    
});
