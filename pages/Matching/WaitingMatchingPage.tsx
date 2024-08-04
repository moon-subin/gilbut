import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, SafeAreaView, Modal, FlatList, Image, Platform, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLEMAP_KEY } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const matchingFootprint = require('../../assets/images/matchingFootprint.png');

export default function WaitingMatchingPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const [isMatchingSuccess, setIsMatchingSuccess] = useState(false);

    const origin = route.params.origin;
    const destination = route.params.destination;
    const time = route.params.time;
    const amount = route.params.amount;
    // console.log(origin);
    // console.log(destName);
    // console.log(time);
    // console.log(amount);

    const handlePrevPage = () => {
        navigation.navigate('RequestLetterPage');

    };

    const [dot, setDot] = useState('.');
    const dotStates = ['.', '..', '...'];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % dotStates.length;
            setDot(dotStates[index]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isMatchingSuccess) {
            navigation.navigate('MatchingSuccessPage', { 
                origin: origin,
                destination: destination,
                time: time,
                amount: amount,
            });
        }
    }, [isMatchingSuccess]);

    // 일단 5초 지나면 페이지 넘어가도록
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMatchingSuccess(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}><Text style={styles.infoText}>{origin.address}</Text> 에서</Text>
                <Text style={styles.text}><Text style={styles.infoText}>{destination.name}</Text> 까지</Text>
                <Text style={styles.text}>총 소요 시간 <Text style={styles.infoText}>{time}분</Text></Text>
                <Text style={styles.text}>예상 금액 <Text style={styles.infoText}>{amount}원</Text></Text>
            </View>
            <View style={styles.content2}>
                <Image source={matchingFootprint} style={{margin: 20}} />
                <Text style={styles.infoText}>매칭중{dot}</Text>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={handlePrevPage}>
                <Text style={styles.cancelText}>길 안내 요청 취소하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
    },
    content: {
        marginTop: 100,
        backgroundColor: Colors.white,
        padding: 20,
        paddingVertical: 30,
        height: 'auto',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    infoText: {
        fontSize: 32,
        fontWeight: '700',
    },
    text: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 10,
    },
    content2: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        marginHorizontal: 20,
        backgroundColor: Colors.black,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 30,
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
    },
    cancelText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.white,
    },
});
