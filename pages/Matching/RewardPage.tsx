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
                <Text style={styles.messageText}>응답시간이 지났으므로{"\n"}벌금을 부과합니다</Text>
                {/* 수정 */}
                <Text style={styles.pointsText}>-...원</Text>
            </View>
            <Image source={successCheck} style={styles.image} />
            <View style={styles.messageContainer}>
                <TouchableOpacity onPress={goToHome}>
                    <Text style={styles.buttonText}>벌금 현황 보러가기</Text>
                </TouchableOpacity>
                <Text style={styles.leftCntText}>항상 부지런하게 응답해주세요 ;)</Text>
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