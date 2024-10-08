import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

// OPM - Function to load fonts
const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Bold': require('../assets/Fonts/Poppins-Bold.ttf'), 
        'Poppins-Medium': require('../assets/Fonts/Poppins-Medium.ttf'),
    });
};

const OnboardingTwo = () => {
    
    //OPM - Declare here
    const [fontsLoaded, setFontsLoaded] = useState(false); 
    const [activeIndex, setActiveIndex] = useState(1);
    const [hoverIndex, setHoverIndex] = useState(null); // Track hover state
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

    //OPM - Handling Pagination

    const handleSquarePress = (index) => {
        setActiveIndex(index);
        // OPM - Navigating to the relevant screen based on the index
        if (index === 0) {
            navigation.navigate('OnboardingOne'); 
        } else if (index === 1) {
            navigation.navigate('OnboardingTwo'); 
        } else if (index === 2) {
            navigation.navigate('OnboardingThree'); 
        }
    };

    return (
        <ImageBackground
            source={require('../assets/OnboardingGradient1.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Easy Payments</Text>
                <Text style={styles.description}>
                Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                </Text>

                <View style={styles.pagination}>
                    {/* Dynamically rendering squares with rounded corners based on activeIndex */}
                    {[0, 1, 2].map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSquarePress(index)} // Set active index on press
                            onPressIn={() => setHoverIndex(index)} // Set hover index on press in
                            onPressOut={() => setHoverIndex(null)} // Reset hover index on press out
                            activeOpacity={1} // Disable default opacity on press
                        >
                            <View
                                style={[styles.square, 
                                    index === activeIndex 
                                        ? styles.activeSquare 
                                        : hoverIndex === index 
                                            ? styles.hoverSquare 
                                            : styles.inactiveSquare]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

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
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    square: {
        width:15,
        height:15,
        borderRadius: 3,
        backgroundColor: '#4BABCF',
        marginHorizontal: 5,
        opacity: 0.4,
    },
    activeSquare: {
        opacity: 1,
    },
    
    skipButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 30,
        marginTop: 50,
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

export default OnboardingTwo;
