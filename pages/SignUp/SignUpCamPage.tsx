import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import PrivacyTermCheckBox from '../../components/PrivacyTermCheckBox';
import GoToPageButton from '../../components/GoToPageButton';
import CameraModal from '../../components/CameraModal';

const addCircle = require('../../assets/images/add-circle.png');

export default function SignUpCamPage() {
    const route = useRoute();
    const navigation = useNavigation();
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [camModalVisible, setCamModalVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const authCard = route.params.authCard;

    const handleModalClose = (imageUri) => {
        setCapturedImage(imageUri); // Update state with the captured image URI
        setCamModalVisible(false); // Close the modal
    };

    const handleCheckboxChange = (checked) => {
        setChecked(checked);
        setIsNextButtonYellow(checked && capturedImage !== null); // Update button color based on checkbox and image state
    };

    const handleNextPage = () => {
        if (isChecked && capturedImage) {
            navigation.navigate('SignUpCriminalRecChkPage', { authCardImage: capturedImage });
        } else {
            // Alert.alert("Error", "Please capture an image and agree to the terms.");
        }
    };

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
                        <CameraModal onClose={handleModalClose} />
                    </View>
                </Modal>

                <Pressable
                    style={({ pressed }) => styles.cameraButton}
                    onPress={() => setCamModalVisible(true)}
                >
                    <View style={styles.buttonContent}>
                        <Image source={addCircle} style={styles.plusIcon} />
                        <Text style={styles.buttonText}>이곳을 눌러 신분증을 촬영해주세요</Text>
                    </View>
                    {capturedImage && (
                        <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
                    )}
                </Pressable>

                <PrivacyTermCheckBox
                    isChecked={isChecked}
                    onCheck={handleCheckboxChange}
                />
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
                    onPress={handleNextPage}
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
        fontWeight: '600',
        marginTop: 100,
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
    cameraButton: {
        width: 350,
        height: 200,
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.lightGray,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
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
        fontWeight: '400',
    },
    capturedImage: {
        position: 'absolute',
        width: 350,
        height: 200,
        borderRadius: 16,
        marginTop: 20,
        alignSelf: 'center',
    },
});
