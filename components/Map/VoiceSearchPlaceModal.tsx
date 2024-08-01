import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const micBg = require('../../assets/images/micBg.png');
const mic_l = require('../../assets/images/mic_l.png');
const stopRecordingBtn = require('../../assets/images/Frame 1000002407.png');

export default function VoiceSearchPlaceModal({ onClose, onStartRecording, onStopRecording }) {
    const [isRecording, setIsRecording] = useState(true);
    const [showButtons, setShowButtons] = useState(false);

    const handleStartStopRecording = () => {
        if (isRecording) {
            onStopRecording();
            setIsRecording(false);
            setShowButtons(true);
        } else {
            onStartRecording();
            setIsRecording(true);
            setShowButtons(false);
        }
    };

    const handleConfirm = () => {
        onStopRecording();
        onClose();
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>음성 검색</Text>
                <Text style={styles.content}>지금 말해주세요</Text>
            </View>
            <TouchableOpacity style={styles.close} onPress={handleConfirm}>
                <Ionicons name="close-outline" color={Colors.black} size={60} style={{color:Colors.white}} />
            </TouchableOpacity>

            <Image source={micBg} style={styles.micBg} />
            <Image source={mic_l} style={styles.mic_l} />

            {isRecording ? (
                <TouchableOpacity 
                    style={styles.stopRecordingBtn} 
                    onPress={handleStartStopRecording} 
                >
                    <Image source={stopRecordingBtn}/>
                </TouchableOpacity>
            ) :  (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button1} onPress={handleStartStopRecording}>
                        <Text style={styles.buttonText}>다시 말하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={handleConfirm}>
                        <Ionicons name="checkmark-outline" color={Colors.black} size={60} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'gray',
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    textContainer: {
        position: 'absolute',
        top: 300,
        left: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 30,
    },
    content: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 50,
    },
    close: {
        position: 'absolute',
        top: 50,
        right: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 70,
        position: 'absolute',
        bottom: '7%',
    },
    button1: {
        backgroundColor: Colors.white,
        width: 180,
        height: '100%',
        borderRadius: 33,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    button2: {
        backgroundColor: Colors.white,
        width: 70,
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    startStopButton: {
        width: 100,
    },
    buttonText: {
        fontSize: 32,
        fontWeight: '500',
    },

    micBg: {
        position: 'absolute',
        bottom: 0,
        // width: '100%',
        height: '50%',
    },
    mic_l: {
        position: 'absolute',
        bottom: '20%',
    },
    stopRecordingBtn: {
        position: 'absolute',
        bottom: '5%',
        // height: 70,
        width: 'auto',
    },
});
