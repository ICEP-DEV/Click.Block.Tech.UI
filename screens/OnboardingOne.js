import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import SquareNavigator from '../components/SquareNavigator';

// OPM - Function to load fonts
const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'), 
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    });
};

const OnboardingOne = () => {
    
    //OPM - Declare here
    const [fontsLoaded, setFontsLoaded] = useState(false); 
    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();

    // OPM - Load fonts on component mount
    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true)); 
    }, []);

    //OPM - Show loading indicator while fonts are loading
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />; 
    }

     // OPM - Handle the skip button action
     const handleSkip = () => {
        // OPM - Here you can implement navigation to the next screen or any action you want
        navigation.navigate('LoginOrSignup');
    };

    return (
        <ImageBackground
            source={require('../assets/Onboarding/OnboardingGradient.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <Text style={styles.title}>Easy TopUp & Withdraw</Text>

                <Text style={styles.description}>
                     Quickly and securely top up your account or withdraw funds with just a few taps. Enjoy seamless transactions and manage your money effortlessly, anytime, anywhere.
                </Text>


                {/* OPM -Skip Button */}
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.navigator}>
            <SquareNavigator activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
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
        marginTop: 300,
    },
    title: {
        fontSize: 26,
        fontFamily: 'Poppins-Bold', 
        color: 'white',
        marginTop: 120,
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', 
        textShadowOffset: { width: 0, height: 2 }, 
        textShadowRadius: 3,
    },
    navigator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -20,
        marginBottom: 10,
    },
    skipButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 30,
        marginTop: 60,
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
