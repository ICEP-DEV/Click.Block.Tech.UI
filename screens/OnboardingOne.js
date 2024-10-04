import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font';

// OPM - Function to load fonts
const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Bold': require('../assets/Fonts/Poppins-Bold.ttf'), 
        'Poppins-Medium': require('../assets/Fonts/Poppins-Medium.ttf'),
    });
};

const OnboardingOne = () => {
    
    //OPM - Declare state here
    const [fontsLoaded, setFontsLoaded] = useState(false); 

    // OPM - Load fonts on component mount
    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true)); 
    }, []);

    // Show loading indicator while fonts are loading
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />; 
    }

     // OPM - Handle the skip button action
     const handleSkip = () => {
        // OPM - Here you can implement navigation to the next screen or any action you want
        console.log("Skip pressed");
    };

    return (
        <ImageBackground
            source={require('../assets/OnboardingGradient.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Easy TopUp & Withdraw</Text>
                <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                </Text>

                {/* OPM -Skip Button */}

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Skip</Text>
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
        marginTop: 160,
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', 
        textShadowOffset: { width: 0, height: 2 }, 
        textShadowRadius: 3,
    },
    skipButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 30,
        marginTop: 80,
        alignSelf: 'center',
    },
    skipButtonText: {
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

export default OnboardingOne;
