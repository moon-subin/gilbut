import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CustomButtonProps {
    title: string,
    onPress: () => void;
    buttonColor?: string;
    style?: object;
}

export default function GoToPageButton({ title, onPress, buttonColor, style }: CustomButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }, style]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>       
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
});
