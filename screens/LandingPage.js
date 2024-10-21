import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // OPM - Import useNavigation hook

const LandingPage = () => {
    
    // OPM - Initial value for scale and opacity
    const logoAnim = useRef(new Animated.Value(0)).current; 

    // OPM - Using the navigation hook to handle screen transitions
    const navigation = useNavigation(); 

    // OPM - Declaring opacity and duration for animation
    useEffect(() => {
        // OPM - Starting animation for logo
        Animated.timing(logoAnim, {
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true,
        }).start();

        // OPM - Setting a timeout for 3 seconds before navigating to OnboardingOne.js
        const timer = setTimeout(() => {
            navigation.navigate('OnboardingOne'); // OPM - Navigate to OnboardingOne
        }, 3000);

        // OPM - Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, [logoAnim, navigation]);

    return (
        // OPM - Adding background Image
        <ImageBackground
            source={require('../assets/LandingPicture.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                {/* OPM - Declaring opacity and duration for animation */}
                <Animated.Image
                    source={require('../assets/Logo.png')} 
                    style={[styles.logo, { 
                        opacity: logoAnim, 
                        transform: [{ scale: logoAnim }] 
                    }]}
                    resizeMode="contain"
                />
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
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1, 
    },
    logo: {
        width: 300, 
        height: 300, 
        marginBottom: 20, 
    },
});

export default LandingPage;
