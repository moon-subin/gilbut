import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import userLogList from '../assets/datas/userLogList';

// 날짜 형식을 Date 객체로 변환하는 함수
const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(2000 + year, month - 1, day); // 연도는 2000년대 기준으로 파싱
};

export default function LogContainer() {
    // 날짜를 기준으로 최신순으로 정렬
    const sortedLogList = [...userLogList].sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // 월별로 데이터 분류
    const groupedData = sortedLogList.reduce((acc, log) => {
        const month = log.date.split('.')[1]; // 날짜에서 월을 추출
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(log);
        return acc;
    }, {});

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(groupedData).map(month => (
                <View key={month}>
                    <Text style={styles.monthHeader}>{parseInt(month, 10)}월</Text>
                    <FlatList
                        data={groupedData[month]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.logBox}>
                                <Text style={styles.logTitleText}>{item.accompanyName} 님과의 동행</Text>
                                <View style={styles.logRow}>
                                    <View style={styles.logBoxLeft}>
                                        <View style={styles.row}>
                                            <Text style={styles.logLeftText}>날짜 | </Text>
                                            <Text style={styles.logRightText}>{item.date}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.logLeftText}>동행 시간 | </Text>
                                            <Text style={styles.logRightText}>{item.startTime} - {item.finishTime}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.divLine} />
                                    <View>
                                        <View style={styles.row}>
                                            <Text style={styles.logLeftText}>출발 | </Text>
                                            <Text style={styles.logRightText}>{item.startLoc}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.logLeftText}>도착 | </Text>
                                            <Text style={styles.logRightText}>{item.finishLoc}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.logLeftText}>금액 | </Text>
                                            <Text style={styles.logRightText}>{item.fee}원</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    monthHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    logBox: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.yellow,
        padding: 15,
        marginBottom: 10,
    },
    logTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logLeftText: {
        color: 'gray',
    },
    logRightText: {
        fontWeight: '600',
    },
    logRow: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    logBoxLeft: {
        width: '45%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divLine: {
        width: 0.5,
        backgroundColor: 'rgba(126, 126, 126, 1)',
        marginHorizontal: 10,
    }
});
