import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

import { Colors } from '@/constants/Colors';


export default function confirmedArrivalModal({visible, onConfirm, onCencel, placeName, clientName}) {
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
                    <Text style={styles.title}>도착 완료를 위한 마지막 단계!</Text>
                    <Text style={styles.content}>{placeName}에 도착하셨나요?{"\n"}도착하셨으면 {clientName} 님께 도착 확정 요청을 보내주세요!</Text>
                    <Text style={styles.content2}>*의뢰자가 도착을 확정한 후, 보수가 지급됩니다. 조금만 기다려주세요!</Text>
                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.acceptButton} onPress={onConfirm}>
                            <Text style={styles.buttonText}>도착 확정 요청</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewOtherButton} onPress={onCencel}>
                            <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContainer2: {
        width: 350,
        height: 280,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingTop: 20,
    },

    title: {
        marginHorizontal: 20,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: '600',
    },
    content: {
        fontSize: 18,
        fontWeight: '400',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    content2: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.gray,
        marginHorizontal: 20,

    },

    // 버튼
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        position: 'absolute',
        bottom: 0,
    },
    acceptButton: {
        backgroundColor: Colors.yellow,
        width: "50%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        borderRightWidth: 0.5,
        borderRightColor: Colors.lightGray,
        borderBottomLeftRadius: 10,
    },
    viewOtherButton: {
        width: "50%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        borderLeftWidth: 0.5,
        borderLeftColor: Colors.lightGray,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
    },
});