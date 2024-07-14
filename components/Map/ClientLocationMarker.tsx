import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

import { Colors } from '@/constants/Colors';

const clientLocationIcon = require('../../assets/images/location.png');

export default function ClientLocationMarker({item}) {
    return (
        <Marker
            coordinate={{
                latitude: item.clientLocation.coord.latitude,
                longitude: item.clientLocation.coord.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }} // 마커의 기준점 설정 (이미지의 중앙 아래 기준)
            style={styles.marker}
        >
            <View style={styles.container}>
                <Image
                    source={clientLocationIcon}
                    style={styles.image}
                />
                <Text style={styles.text}>의뢰자 위치</Text>
            </View>
        </Marker>
    )
}

const styles = StyleSheet.create({
    marker: {
        width: 48,
        height: 48,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        fontWeight: '700',
        backgroundColor: Colors.darkYellow,
        width: 53,
        height: 21,
        textAlign: 'center',
        padding: 3,
    },
});
