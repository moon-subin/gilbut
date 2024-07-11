import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/Colors';

import GoToPageButton from '../../components/GoToPageButton';

const successCheck = require('../../assets/images/Group 1000002384.png');

export default function SignUpFinPage() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText1}>
                    축하합니다 !
                </Text>
                <Text style={styles.messageText2}>
                    회원가입이 완료되었습니다{"\n"}
                    같은 정보로 로그인하시겠습니까?
                </Text>
            </View>
            <Image source={successCheck} style={styles.image} />

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="로그인"
                    onPress={() => navigation.navigate('(tabs)')}
                    buttonColor={Colors.darkYellow}
                    style={{width: '100%'}}>
                </GoToPageButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageText1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
      paddingBottom: 10,
    },
    messageText2: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
      width: 250,
      height: 250,
      margin: 50,
    },
    pageBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
  });