import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

interface ButtonProps {
    title: string,
    onPress: () => void;
    buttonColor?: string;
    style?: object;
}

export function CustomBtn({ title, onPress, buttonColor, style }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }, style]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>      
    )
}

export default function CurrHelpTimePage() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFullFillTime, setIsFullFillTime] = useState(false);

    const currHelpTime = 90;

    useEffect(() => {
        setIsFullFillTime(selectedOption !== null);
    }, [selectedOption]);

    return (
        <View>
            <Header
                title="현재 도움 시간"
                naviPage='TabThreeScreen'></Header>
            <View style={styles.container}>
                <View style={styles.circularBar}>
                    <AnimatedCircularProgress
                        size={330}
                        width={30}
                        fill={50}
                        tintColor={Colors.progressBarFill}
                        backgroundColor={Colors.progressBarBg}
                        rotation={-90} // 반원 형태로 변경
                        arcSweepAngle={180} // 반원 형태로 변경
                    >
                        {
                            (fill) => (
                                <View style={styles.centerTextContainer}>
                                    <Text style={styles.timeText}>{currHelpTime}</Text>
                                    <Text style={styles.minText}>분</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.btnsContainer}>
                    <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 10, }}>한 시간 단위로 도움시간을 전환할 수 있습니다.</Text>
                    <CustomBtn
                        title="봉사 시간 받기"
                        onPress={() => navigation.navigate('CurrHelpTimePage')}
                        buttonColor={isFullFillTime ? Colors.darkYellow : Colors.progressBarBg}
                        style={{width: '100%'}}>
                    </CustomBtn>
                    <CustomBtn
                        title="상점 이동하기"
                        onPress={() => navigation.navigate('CurrHelpTimePage')}
                        buttonColor={Colors.darkYellow}
                        style={{width: '100%'}}>
                    </CustomBtn>
                    <CustomBtn
                        title="봉사 기록 보기"
                        onPress={() => navigation.navigate('CurrHelpTimePage')}
                        buttonColor={Colors.white}
                        style={{borderWidth: 3, borderColor: Colors.darkYellow}}>
                    </CustomBtn>

                    <TouchableOpacity
                        onPress={() => Alert.alert('봉사시간안내 화면으로 ..')}>
                        <Text style={styles.viewButtonText}>봉사시간안내</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: Colors.headerBg,
        height: '100%',
    },
    circularBar: {
        alignItems: 'center',
        marginTop: -200,
    },
    centerTextContainer: {
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: Colors.darkYellow,
        fontWeight: '700',
        fontSize: 50,
    },
    minText: {
        color: Colors.black,
        fontSize: 30,
        fontWeight: '700',
    },

    btnsContainer: {
        paddingVertical: 20,
        width: '100%',
        marginTop: -50,
    },

    button: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',

    },
    viewButtonText: {
        fontSize: 12,
        color: Colors.gray,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 30,
    },
});
