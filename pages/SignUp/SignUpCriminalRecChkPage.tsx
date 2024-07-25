import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Colors } from '@/constants/Colors';

import GoToPageButton from '../../components/GoToPageButton';
import PrivacyTermCheckBox from '../../components/PrivacyTermCheckBox';

const fileAttach = require('../../assets/images/file-attach.png');
const FOLDER_NAME = 'documents';


export default function SignUpCriminalRecChkPage() {
    const navigation = useNavigation();
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [isChecked, setChecked] = useState(false);

    const authDoc = '범죄경력회보서';
    const DOCUMENTS_FOLDER = `${FileSystem.documentDirectory}${FOLDER_NAME}/`;

    // URL 클릭 시 동작하는 함수
    const handleUrlPress = () => {
        const url = 'https://crims.police.go.kr/';
        Linking.openURL(url).catch((err) =>
            Alert.alert('링크 열기 실패', 'URL을 열 수 없습니다.')
        );
    };

    // 파일 선택 함수
    const selectFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // All files
            });
            if (result.assets && result.assets.length > 0) {
                const selectedFile = result.assets[0];
                setAttachedFile(selectedFile.uri);
                // uploadFile(selectedFile);
                // saveFile(selectedFile);
                Alert.alert('파일 선택 성공')
                console.log('파일 선택 성공 result: ', selectedFile);
            } else {
                Alert.alert('Document picking cancelled')
                console.log('Document picking cancelled');
            }
        } catch (error) {
            Alert.alert('Error picking file')
            console.error('Error picking file', error);
        }
    };

    
    // 파일 저장 함수
    const saveFile = async (pickedFile: DocumentPicker.DocumentResult) => {
        const fileName = pickedFile.name;
        const fileUri = pickedFile.uri;

        try {
            // Ensure directory exists
            await FileSystem.makeDirectoryAsync(DOCUMENTS_FOLDER, { intermediates: true });

            // Move the file to documents directory
            await FileSystem.moveAsync({
                from: fileUri,
                to: `${DOCUMENTS_FOLDER}${fileName}`,
            });
            Alert.alert('File saved successfully')
            // Optionally, you can do something after file is saved
            console.log('File saved successfully');
        } catch (error) {
            console.error('Error saving file', error);
        }
    };

    // 파일 업로드 함수
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType,
        });

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                Alert.alert('파일 업로드 성공');
                console.log('파일 업로드 성공');
            } else {
                Alert.alert('파일 업로드 실패');
                console.log('파일 업로드 실패');
            }
        } catch (error) {
            Alert.alert('파일 업로드 중 오류가 발생했습니다');
            console.error('파일 업로드 중 오류가 발생했습니다', error);
        }
    };

    
    const handleCheckboxChange = (checked) => {
        setChecked(checked);
        setIsNextButtonYellow(checked && attachedFile !== null); // Update button color based on checkbox and image state
    };

    const handleNextPage = () => {
        if (isChecked && attachedFile) {
            navigation.navigate('SignUpDocsFinPage');
        } else {
            // Alert.alert("Error", "Please capture an image and agree to the terms.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.signUpTitle}>{authDoc} 인증</Text>
                <Text style={styles.signUpContent}>
                    범죄경력회보서 발급 시스템{"\n"}
                    <Text style={styles.urlText} onPress={handleUrlPress}>
                        (https://crims.police.go.kr/)
                    </Text>
                    에서 증명서를 {"\n"}
                    발급 후 첨부해주세요
                </Text>

                <View style={styles.button}>
                    <Text style={styles.buttonText}>{authDoc}</Text>
                    <TouchableOpacity 
                        onPress={selectFile} 
                        style={[
                            styles.attachTextContainer,
                            {backgroundColor: (attachedFile? Colors.yellow : Colors.lightGray)}
                        ]}
                    >
                        <Text style={styles.attachText}>첨부</Text>
                    </TouchableOpacity>
                </View>

                {/* Display selected file */}
                {attachedFile && (
                    <View style={styles.selectedFileContainer}>
                        <Text style={styles.selectedFileName}>{attachedFile}</Text>
                    </View>
                )}

                {/* 개인정보수집 체크박스 */}
                <PrivacyTermCheckBox
                    isChecked={isChecked}
                    onCheck={handleCheckboxChange}
                />
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton
                    title="이전"
                    onPress={() => navigation.navigate('SignUpCamPage')}
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
    signUpContent: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 30,
    },
    urlText: {
        color: 'blue', 
        textDecorationLine: 'underline',

    },
    pageBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 60,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.gray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    attachTextContainer: {
        // backgroundColor: Colors.lightGray,
        borderRadius: 18,
        height: 30,
        width: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachText: {
        fontSize: 16,
        fontWeight: '500',
    },  
    selectedFileContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    selectedFileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedFileSize: {
        fontSize: 14,
        color: Colors.gray,
        marginTop: 5,
    },
});
