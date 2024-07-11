import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CustomButtonPtops {
    title: string,
    onPress: () => void;
    buttonColor?: string;
}

export default function CustomButton({ title, onPress, buttonColor }: CustomButtonPtops) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 70,
        marginLeft: 10,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.white,
    },
});
