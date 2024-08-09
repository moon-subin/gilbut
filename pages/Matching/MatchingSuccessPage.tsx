import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';

const matchingSuccess = require('../../assets/images/matchingSuccess.png');

export default function MatchingSuccessPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const destName = route.params.destName;
    const requestData = route.params.requestData;

    const userLevel = 3;
    const currLevelCnt = 6;
    const totalLevelCnt = 9;
    const points = 1800;

    // 일단 5초 지나면 페이지 넘어가도록
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('WaitingGilbutPage', { 
                requestData: requestData,
                destName: destName,
            });
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={matchingSuccess} />
            <Text style={styles.text}>매칭 성공!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
    text: {
        fontWeight: '700',
        fontSize: 32,
        marginTop: 30,
    },
});