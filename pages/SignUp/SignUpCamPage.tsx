import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import GoToPageButton from '../../components/GoToPageButton';
import CameraModal from '../../components/CameraModal';
import PrivacyTermCheckBox from '../../components/PrivacyTermCheckBox';

const photoShoot = require('../../assets/images/photoShoot.png');
const addCircle = require('../../assets/images/add-circle.png');

export default function SignUpCamPage() {
    const navigation = useNavigation();
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [camModalVisible, setCamModalVisible] = useState(false);

    const authCard = '운전면허증';

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.signUpTitle}>{authCard} 인증</Text>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={camModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setCamModalVisible(!camModalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <CameraModal />
                        <View style={styles.shootContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setCamModalVisible(!camModalVisible)}>
                                <Image source={photoShoot} style={styles.shootStyle} />
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setCamModalVisible(true)}>
                    <Text style={styles.textStyle}>이곳을 눌러 신분증을 촬영해주세요</Text>
                </Pressable> */}
                <View style={styles.cameraBtnContainer}>
                    <Pressable
                        style={({ pressed }) => styles.cameraButton}
                        onPress={() => setCamModalVisible(true)}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={addCircle} style={styles.plusIcon} />
                            <Text style={styles.buttonText}>이곳을 눌러 신분증을 촬영해주세요</Text>
                        </View>
                    </Pressable>
                </View>
                
                <PrivacyTermCheckBox />
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton
                    title="이전"
                    onPress={() => navigation.navigate('SignUpVerifyPage')}
                    buttonColor={Colors.lightGray}
                    style={{ width: '39%' }}
                />
                <GoToPageButton
                    title="다음"
                    onPress={() => navigation.navigate('SignUpCriminalRecChkPage')}
                    buttonColor={isNextButtonYellow ? Colors.darkYellow : Colors.lightGray}
                    style={{ width: '59%' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: Colors.white,
        flex: 1,
    },
    content: {
        padding: 20,
        height: '100%',
    },
    signUpTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
    },
    modalView: {
        backgroundColor: Colors.gray_modalBg,
        width: '100%',
        height: '100%',
        padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pageBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },

    cameraBtnContainer: {
        height: '100%',
        alignItems: 'center',
        paddingVertical: '50%',
    },
    cameraButton: {
        width: '90%',
        height: '50%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContent: {
        alignItems: 'center',
    },
    plusIcon: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 16,
        fontWeight: 'bold',
    },

    shootContainer: {
        alignItems: 'center',
        marginBottom: 200,
    },
    shootStyle: {},
});
