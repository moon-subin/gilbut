import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';

const successCheck = require('../../assets/images/successCheck.png');

export default function FinedNotifyPage() {

    const userLevel = 3;
    const currLevelCnt = 6;
    const totalLevelCnt = 9;
    const points = 1800;

    const navigation = useNavigation();

    const goToHome = () => {
        // navigation.navigate('index');
    };

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>성공적으로 의뢰를 완료했어요!</Text>
                <Text style={styles.pointsText}>+ {points}분</Text>
            </View>
            <Image source={successCheck} style={styles.image} />
            <View style={styles.messageContainer}>
                <TouchableOpacity onPress={goToHome}>
                    <Text style={styles.buttonText}>다른 의뢰 보러가기</Text>
                </TouchableOpacity>
                <Text style={styles.leftCntText}>의뢰를 {totalLevelCnt-currLevelCnt}번 더 완료하면 LEVEL UP!</Text>
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
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    pointsText: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: Colors.yellow,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      textDecorationLine: 'underline',
      marginBottom: 10,
      fontWeight: 500,
    },
    leftCntText: {
      fontSize: 16,
      fontWeight: 'bold',
    }
  });