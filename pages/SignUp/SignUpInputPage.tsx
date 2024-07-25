import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import GoToPageButton from '../../components/GoToPageButton';

export default function SignUpInputPage() {

    const navigation = useNavigation(); // 내비게이션 객체 사용

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
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
            setIsFormValid(true);
        }
    };

    const handleSendEmail = () => {
        // Add logic to send verification email
        Alert.alert('발송 버튼 누름');
    };

    const handleVerifyEmail = () => {
        // Add logic to verify the email
        setEmailVerified(true);
        Alert.alert('인증 버튼 누름');
    };

    const handleNextPage = () => {
        console.log(isFormValid);
        console.log(id);
        console.log(email);
        console.log(emailVerified);
        console.log(password);
        console.log(confirmPassword);
        if (isFormValid) {
            navigation.navigate('SignUpVerifyPage');
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
