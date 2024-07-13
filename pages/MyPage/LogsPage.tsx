import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

import LogContainer from '@/components/LogContainer';
import Header from '../../components/Header';

const bracketLIcon = require('../../assets/images/bracketLIcon.png');

export default function Logs() {
    const navigation = useNavigation();
    const month = 5;

    return (
        <View>
            <Header
                title="기록"
                naviPage='TabThreeScreen'></Header>
            <View style={{backgroundColor: Colors.headerBg}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.logContainer}>
                        <LogContainer />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
});
