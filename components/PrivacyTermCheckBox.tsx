import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';


export default function PrivacyTermCheckBox() {

    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.section}>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? Colors.darkYellow : undefined}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.paragraph}>
                    <Text style={styles.requiredText}>(필수)</Text> 개인정보 수집 및 이용 안내
                </Text>
            </View>
            <Pressable
                onPress={() => Alert.alert('개인정보 수집 약관 화면으로 ..')}>
                <Text style={styles.viewButtonText}>보기</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center',
    },
    checkboxContainer: {
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    paragraph: {
        fontSize: 18,
        paddingHorizontal: 10,
    },
    requiredText: {
        color: 'blue',
    },
    viewButtonText: {
        color: Colors.gray,
    },
});