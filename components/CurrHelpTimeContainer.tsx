import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const yellowContainerBgImg = require('../assets/images/Rectangle 1503.png');
const bracketRIcon = require('../assets/images/bracketRIcon.png');
const horizontalLine = require('../assets/images/horizontalLine.png');
const verticalLine = require('../assets/images/verticalLine.png');

export default function CurrHelpTimeContainer() {
    const navigation = useNavigation();

    const helpTime = 90;

    return (
        <View style={styles.yellowContainer}>
            <View style={styles.upperContainer}>
                <Text style={styles.text1}>현재 도움시간</Text>
                <View style={styles.upperRight}>
                    <Text style={styles.text2}>{helpTime}</Text>
                    <Text style={styles.text3}>분</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CurrHelpTimePage')}>
                        <Image source={bracketRIcon} style={{margin: 10}} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.lowerContainer}>
                <View style={styles.lower} >
                    <TouchableOpacity onPress={() => navigation.navigate('Logs')}>
                        <Text style={styles.text3}>봉사기록보기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.lower} >
                    <TouchableOpacity>
                        <Text style={styles.text3}>상점이동하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    yellowContainer: {
        width: '100%',
        height: 150,
        backgroundColor: Colors.darkYellow,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '50%',
        width: '100%',
        justifyContent: 'space-between',
        padding: 20,
    },
    upperRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lowerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '50%',
        padding: 10,

    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    text3: {
        fontSize: 16,
    },
    lower: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalLine: {
        width: '90%',
        height: 0.5,
        backgroundColor: Colors.gray,
    },
    verticalLine: {
        width: 0.5,
        height: '80%',
        backgroundColor: Colors.gray,
    },
});