import React, {useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

import { Colors } from '@/constants/Colors';

interface LevelStep {
    userLevel: number,
    totalLevelCnt: number;
    currLevelCnt: number;
}

const level1 = require('../assets/images/level1.png');
const level2 = require('../assets/images/level2.png');
const level3 = require('../assets/images/level3.png');
const level4 = require('../assets/images/level4.png');

export default function LevelProgressBar({userLevel, totalLevelCnt, currLevelCnt}: LevelStep) {
    let levelIcon = '';
    switch (userLevel) {
        case 1: 
            levelIcon = level1;
            break;
        case 2: 
            levelIcon = level2;
            break;
        case 3: 
            levelIcon = level3;
            break;
        case 4: 
            levelIcon = level4;
            break;
    }
    
    // 컨트롤할 ref 정의
    // 리렌더링 시 초기화 방지
    const loaderVal = useRef(new Animated.Value(0)).current;

    const load = (count: number) => {
        Animated.timing(loaderVal, {
            toValue: (count / totalLevelCnt) * 100,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const width = loaderVal.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
    });

    useEffect(() => {
        load(currLevelCnt)
    }, [currLevelCnt]);

    return (
        <View style={{paddingBottom: 20,}}>
            <View style={styles.levelContainer}>
                <View style={styles.currLevel}>
                    <View style={styles.levelTxtRow}>
                        <Text>LEVEL {userLevel}</Text>
                        <Image style={styles.levelImg} source={levelIcon} />
                    </View>
                    <Text>{currLevelCnt}/{totalLevelCnt}</Text>
                </View>
                <View style={styles.levelBar}>
                    <View style={styles.bar}>
                        <Animated.View
                            style={{
                                backgroundColor: Colors.progressBarFill,
                                width,
                                height: 15,
                                borderRadius: 10,
                            }} 
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    levelContainer: {
        paddingTop: 10,
    },
    levelTxtRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currLevel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    levelBar: {
        paddingTop: 10,
    },
    levelImg: {
        width: 15,
        height: 15,
        marginLeft: 10,
    },
    bar: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.progressBarBg,
        borderRadius: 10,
    },
})