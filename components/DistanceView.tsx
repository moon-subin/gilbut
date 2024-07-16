import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

const profile = require('../assets/images/kittyProfile.png');
const distLine = require('../assets/images/distLine.png');

export default function DistanceView({ place }) {
    return (
        <View style={styles.distanceContent}>
            <View style={styles.distImgContent}>
                <Image source={profile} style={styles.distProfile} />
                <View style={styles.distContainer}>
                    <Text style={styles.distText}>{place.distToClient}</Text>
                    <Image source={distLine} style={styles.distLine} />
                </View>
                <Image source={profile} style={styles.distProfile} />
                <View style={styles.distContainer}>
                    <Text style={styles.distText}>{place.distToFin}</Text>
                    <Image source={distLine} style={styles.distLine} />
                </View>
                <Image source={profile} style={styles.distProfile} />
            </View>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>출발지</Text>
                <Text style={styles.locationText}>의뢰자 위치</Text>
                <Text style={styles.locationText}>목적지</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    distanceContent: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    distImgContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    distProfile: {
        width: 25,
        height: 25,
        marginBottom: -10,
    },
    distContainer: {
        alignItems: 'center',
    },
    distText: {
        fontSize: 12,
        marginBottom: -3,
    },  
    distLine: {
        width: 120,
    },
    locationContainer: {
        marginTop: 20,
        width: "100%",
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationText: {
        fontSize: 12,
        backgroundColor: Colors.yellow,
        padding: 5,
        fontWeight: '700',
    },
});