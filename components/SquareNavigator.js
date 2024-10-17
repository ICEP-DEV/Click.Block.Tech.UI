import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'; // Import gesture handler
import { useNavigation } from '@react-navigation/native';

const SquareNavigator = ({ activeIndex, setActiveIndex }) => {
    const navigation = useNavigation();
    
    // Screens array to manage your onboarding screens
    const screens = ['OnboardingOne', 'OnboardingTwo', 'OnboardingThree'];
    
    const handleSquarePress = (index) => {
        navigation.navigate(screens[index]);
        setActiveIndex(index);
    };
    
    // Handle swipe left/right
    const handleSwipe = (event) => {
        if (event.nativeEvent.state === State.END) {
            const { translationX } = event.nativeEvent;

            if (translationX > 50) {
                // Swiped right
                const newIndex = Math.max(0, activeIndex - 1); // Prevent going below 0
                setActiveIndex(newIndex); // Update the active index
            } else if (translationX < -50) {
                // Swiped left
                const newIndex = Math.min(screens.length - 1, activeIndex + 1); // Prevent going above max
                setActiveIndex(newIndex); // Update the active index
            }
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onHandlerStateChange={handleSwipe}>
                <View style={styles.pagination}>
                    {[0, 1, 2].map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // setActiveIndex(index);
                                navigation.navigate(screens[index]);
                            }}
                                
                            accessible={true}
                            accessibilityLabel={`Navigate to onboarding step ${index + 1}`}
                            activeOpacity={1}
                        >
                            <View
                                style={[
                                    styles.square,
                                    index === activeIndex
                                        ? styles.activeSquare
                                        : styles.inactiveSquare
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 60,
    },
    square: {
        width: 15,
        height: 15,
        borderRadius: 3,
        backgroundColor: '#4BABCF',
        marginHorizontal: 5,
        opacity: 0.4,
        marginTop: -100,
    },
    activeSquare: {
        opacity: 1, // Fully visible for active square
    },
    inactiveSquare: {
        opacity: 0.5, // Inactive buttons have opacity of 0.5
    },
});

export default SquareNavigator;
