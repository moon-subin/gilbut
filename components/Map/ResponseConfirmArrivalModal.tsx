import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal, Image } from 'react-native';

import { Colors } from '@/constants/Colors';


export default function ResponseConfirmArrivalModal({visible, onConfirm, onCencel, gilbutName}) {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onConfirm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContainer2}>
                    <Text style={styles.text}>{gilbutName} 님이{'\n'}길 안내 종료를{'\n'}요청했어요</Text>
                    <Text style={styles.text}>이곳이 목적지가 맞다면{'\n'}요청을 수락해주세요!</Text>
                    {/* 버튼 */}
                        <TouchableOpacity style={[styles.button, {backgroundColor:Colors.yellow}]} onPress={onConfirm}>
                            <Text style={[styles.buttonText, {color:Colors.black}]}>여기가 맞아요 😄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor:Colors.black}]} onPress={onCencel}>
                            <Text style={[styles.buttonText, {color:Colors.white}]}>여기가 아니에요 🤔</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContainer2: {
        width: 350,
        height: 'auto',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
    },

    // 버튼
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 15,
        borderRadius: 16,
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
    },
});