import React, {useEffect} from 'react';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constants/Colors';

const successCheck = require('../../assets/images/successCheck.png');

export default function FinishedMatchingPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const amount = route.params.amount;

    const handleConfirm = () => {
        navigation.navigate('MainPageDisabled');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={handleConfirm}>
                <Ionicons name="close-outline" color={Colors.black} size={40} />
            </TouchableOpacity>
            <Image source={successCheck} />
            <Text style={styles.text}>길 안내 종료</Text>
            <Text style={styles.amountText}>선택하신 결제 수단으로{'\n'}{amount}원이 결제되었습니다</Text>
            <TouchableOpacity style={styles.goToReview}>
                <Text style={{fontWeight:'600', fontSize:'24'}}>리뷰 쓰러 가기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      padding: 30,
    },
    close: {
        position: 'absolute',
        top: 70,
        right: 20,
    },
    text: {
        fontWeight: '700',
        fontSize: 32,
        marginTop: 40,
    },
    amountText: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        margin: 30,
    },
    goToReview: {
        backgroundColor: Colors.yellow,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    }
});