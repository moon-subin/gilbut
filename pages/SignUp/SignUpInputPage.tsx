import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import GoToPageButton from '../../components/GoToPageButton';

export default function SignUpInputPage() {

    const navigation = useNavigation(); // 내비게이션 객체 사용

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            
                <Text style={styles.signUpTitle}>회원가입</Text>
                <Text style={styles.signUpContent}>
                    본인 인증이 모두 완료되었습니다 ! {"\n"}
                    회원가입을 위해 아래 내용을 입력해주세요
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>아이디</Text>
                    <Input placeholder="사용할 아이디를 입력해주세요"></Input>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>연동 메일</Text>
                    <Input placeholder="이메일 주소를 입력해주세요"></Input>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>비밀번호</Text>
                    <Input placeholder="영문, 숫자, 특수문자 포함 8-15자" isPassword></Input>
                </View>
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="가입하기"
                    onPress={() => navigation.navigate('SignUpFinPage')}
                    buttonColor={Colors.darkYellow}
                    style={{width: '100%'}}>
                </GoToPageButton>
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
        fontWeight: 'bold',
        marginTop: 100,
    },
    signUpContent: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 50,
    },
    inputContainer: {
        paddingVertical: 20,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    pageBtnContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});
