import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Modal, FlatList, Platform, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLEMAP_KEY } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function PaymentPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const origin = route.params.origin;
    const destName = route.params.destName;
    const time = route.params.time;
    const amount = route.params.amount;
    // console.log(origin);
    // console.log(destName);
    // console.log(time);
    // console.log(amount);

    const handleNextPage = () => {
        navigation.navigate('WaitingMatchingPage', { 
            origin: origin,
            destName: destName,
            time: time,
            amount: amount,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight:'700', fontSize:20}}>결제</Text>
                <TouchableOpacity>
                    <Text style={{fontWeight:'500', fontSize:15}}>신고하기</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.guideText}>길 안내 종료 시 결제할{'\n'}결제 수단을 선택해주세요</Text>
            <View>
                <Text style={styles.subText}>결제 수단</Text>
            </View>
            <View>
                <Text style={styles.subText}>포인트</Text>
                <View>
                    <View>
                        <Text>보유 포인트</Text>
                        <Text>{}원</Text>
                    </View>
                    <View>
                        <Text>사용</Text>
                        
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.subText}>예상 결제 금액</Text>
                <Text>{amount}원</Text>
            </View>
            <TouchableOpacity style={styles.requestButton} onPress={handleNextPage}>
                <Text style={styles.requestText}>선택 후 길 안내 요청하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
        padding: 20,
    },
    header: {
        marginTop: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    guideText: {
        fontWeight: '700',
        fontSize: 32,
        marginTop: 30,
    },
    subText: {
        fontWeight: '700',
        fontSize: 24,
    },


    requestButton: {
        backgroundColor: Colors.lightGray,
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
    requestText: {
        fontSize: 24,
        fontWeight: '600',
    },
});
