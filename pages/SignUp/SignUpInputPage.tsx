import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

import CustomButton from '../../components/CustomButton';
import GoToPageButton from '../../components/GoToPageButton';

import { sendEmailVerificationCode, verifyEmailCode, signUpMember, loginMember } from '../../Services/SignUp/MembersApis';

export default function SignUpInputPage() {

    const navigation = useNavigation(); // 내비게이션 객체 사용

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    useEffect(() => {
        validateForm();
    }, [id, email, emailVerified, password, confirmPassword]);

    const validateForm = () => {
        if (id && email && emailVerified && password && confirmPassword && password === confirmPassword) {
            setIsFormValid(true);
        } else {
            // 추후 수정
            setIsFormValid(false);
        }
    };

    const handleSendEmail = async () => {
        try {
            await sendEmailVerificationCode(email);
            Alert.alert('인증번호가 이메일로 발송되었습니다.');
        } catch (error) {
            Alert.alert('이메일 발송 중 오류가 발생했습니다.');
        }
    };

    const handleVerifyEmail = async () => {
        try {
            await verifyEmailCode(email, verificationCode);
            setEmailVerified(true);
            Alert.alert('이메일 인증이 완료되었습니다.');
        } catch (error) {
            Alert.alert('이메일 인증 중 오류가 발생했습니다.');
        }
    };

    const handleNextPage = async () => {
        navigation.navigate('SignUpVerifyPage');

        if (isFormValid) {
            const userData = {
                username: id,
                memberType: '', // replace with the actual member type
                email,
                code: verificationCode,
                password,
                passwordChk: confirmPassword,
            };

            try {
                await signUpMember(userData);
                navigation.navigate('SignUpVerifyPage');
            } catch (error) {
                Alert.alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.signUpTitle}>회원가입</Text>
                <Text style={styles.signUpContent}>
                    회원가입을 위해 아래 내용을 입력해주세요
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>아이디</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="사용할 아이디를 입력해주세요"
                        value={id}
                        onChangeText={setId}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>이메일 주소</Text>
                    <View style={styles.inputWithBtn}>
                        <TextInput
                            style={[styles.input, {width:'75%'}]} 
                            placeholder="이메일 주소를 입력해주세요"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={{marginLeft: 'auto'}}>
                            <CustomButton 
                                title='발송'
                                onPress={handleSendEmail}
                                buttonColor={Colors.gray}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>이메일 주소 인증</Text>
                    <View style={styles.inputWithBtn}>
                        <TextInput
                            style={[styles.input, {width:'75%'}]} 
                            placeholder="인증 번호를 입력해주세요"
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                        />
                        <View style={{marginLeft: 'auto'}}>
                            <CustomButton 
                                title='인증'
                                onPress={handleVerifyEmail}
                                buttonColor={Colors.gray}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>비밀번호</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput 
                            style={styles.input} 
                            placeholder="영문, 숫자, 특수문자 포함 8-15자" 
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                            <Ionicons 
                                name={passwordVisible ? "eye-outline" : "eye-off-outline"} 
                                color={Colors.black} 
                                size={20} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>비밀번호 확인</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput 
                            style={styles.input} 
                            placeholder="비밀번호를 다시 한 번 입력해주세요" 
                            secureTextEntry={!confirmPasswordVisible}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                            <Ionicons 
                                name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                                color={Colors.black} 
                                size={20} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="다음"
                    onPress={handleNextPage}
                    buttonColor={isFormValid ? Colors.darkYellow : Colors.lightGray}
                    style={{width: '100%'}}
                    disabled={!isFormValid}
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
    inputContainer: {
        paddingVertical: 10,
        // width: '100%',
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    inputWithBtn: {
        flexDirection: 'row',
        width: "100%",
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.gray,
        height: 60,
        width: '100%',
        fontWeight: '500',
        paddingLeft: 10,
        paddingRight: 40,
        // flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
    },
    pageBtnContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});
