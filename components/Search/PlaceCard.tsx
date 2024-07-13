import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import isLastConstant from '../IsLastConstant';

export default function PlaceCard({ place }) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.row}>
                <Text style={styles.requestPlace}>{place.requestPlace.name}</Text>
                <Text style={styles.dist}>{place.dist}</Text>
            </View>
            <View style={{ width: "100%" }}>
                <Text style={styles.title}>{place.requestPlace.name}{isLastConstant(place.requestPlace.name)} 가주세요</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.content}>예상 소요 시간 | </Text>
                <Text style={styles.value}>{place.estimatedTime}분</Text>
            </View>
            <View style={styles.row}>
                <Text>의뢰자 위치 | </Text>
                <Text style={styles.value}>{place.clientLocation.name}</Text>
            </View>
            <View style={styles.row}>
                <Text>의뢰자 정보 | </Text>
                <Text style={styles.value}>{place.clientInfo}</Text>
            </View>
            <View style={styles.clientRequestContainer}>
                <Text>의뢰자 요청사항 | </Text>
                {place.clientRequest === '없음' ? (
                    <Text style={styles.value}>{place.clientRequest}</Text>
                ) : (
                    <Text style={[styles.value, styles.clientRequestValue]}>{place.clientRequest}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        backgroundColor: Colors.white,
        borderRadius: 12.5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        margin: 5,
        elevation: 0.4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    clientRequestContainer: {
        flexDirection: 'column',
        marginBottom: 5,
    },
    requestPlace: {
        fontWeight: '700',
        fontSize: 15,
        backgroundColor: Colors.darkYellow,
    },
    dist: {
        fontWeight: '400',
        fontSize: 15,
        color: Colors.gray,
        marginLeft: 'auto',
        marginRight: 5,
    },
    title: {
        fontWeight: '700',
        fontSize: 17.5,
        marginBottom: 15,
    },
    content: {
        fontWeight: '400',
        fontSize: 13.75,
    },
    value: {
        fontWeight: '700',
        fontSize: 13.75,
        flexShrink: 1,
    },
    clientRequestValue: {
        marginTop: 5, // Add space between label and value when text moves to next line
    },
});

