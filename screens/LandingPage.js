import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Image, Animated } from 'react-native';

const LandingPage = () => {

    // OPM - Initial value for scale and opacity
    const logoAnim = useRef(new Animated.Value(0)).current; 

    // OPM - Declaring opacity and duration for animation
    useEffect(() => {
        Animated.timing(logoAnim, {
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true,
        }).start();
    }, [logoAnim]);

    return (
        //OPM - Adding background Image
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
        width: 350, 
        height: 350, 
        marginBottom: 20, 
    },
});

export default LandingPage;
