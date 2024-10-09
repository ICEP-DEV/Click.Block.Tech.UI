import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SquareNavigator = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(null);

    const screens = ['OnboardingOne', 'OnboardingTwo', 'OnboardingThree'];

    const handleSquarePress = (index) => {
        setActiveIndex(index);
        navigation.navigate(screens[index]);
    };

    return (
        <View style={styles.pagination}>
            {[0, 1, 2].map((_, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleSquarePress(index)}
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
