import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import isLastConstant from '../IsLastConstant';
import haversine from 'haversine-distance';

import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { GOOGLEMAP_KEY } from '@env';

const refreshBtn = require('../../assets/images/refresh.png');
const profile = require('../../assets/images/kittyProfile.png');

export default function RouteInfoViewDisabled({ origin, destination, time, gilbutInfo }) {
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentSubtitle, setCurrentSubtitle] = useState('');

    const roundedTime = Math.ceil(time/60);

    const titles = [
        `${destination.name}${isLastConstant(destination.name)}\n길 안내를 시작합니다\n${time}분 후 도착 예정 `,
        `${destination.name}\n도착까지 ${time}분 남았어요 `,
        `${destination.name}에 도착했어요 `
    ];

    const subtitles = [
        '',
        '길벗과 동행 중',
        '목적지 도착'
    ];
    
    useEffect(() => {
        setCurrentTitle(titles[0]);
        setCurrentSubtitle(subtitles[0]);

        const switchToTitle2 = setTimeout(() => {
            setCurrentTitle(titles[1]);
            setCurrentSubtitle(subtitles[1]);
        }, 5000);

        return () => clearTimeout(switchToTitle2);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const distance = haversine(
                { latitude: origin.latitude, longitude: origin.longitude },
                { latitude: destination.location.lat, longitude: destination.location.lng }
            );

            if (distance < 50) { // Change this threshold as needed
                setCurrentTitle(titles[2]);
                setCurrentSubtitle(subtitles[2]);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [origin, destination]);


    return (
        <View style={styles.infoContainer}>
            <View style={styles.row}>
                <Text style={styles.subTitle}>{currentSubtitle}</Text>
                <TouchableOpacity style={{marginLeft:'auto'}}>
                    <Text style={styles.cancel}>신고하기</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 20}}>
                <View style={styles.row}>
                    <Text style={styles .title}>
                        {currentTitle}
                        <TouchableOpacity style={styles.refreshBtn}>
                            <Ionicons name="refresh-outline" color={Colors.black} size={30} />
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
            <View style={styles.profileContainer}>
                    <Image source={profile} style={{alignSelf:'center'}} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.gilbutName}>{gilbutInfo.name} 님</Text>
                        <Text style={styles.gilbutInfo}>{gilbutInfo.gender} | {gilbutInfo.age}세</Text>
                        <Text style={styles.gilbutInfo}>(Lev.{gilbutInfo.level})</Text>
                    </View>
                </View>
        </View>

    );
}


const styles = StyleSheet.create({
    infoContainer: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: Colors.white,
        width: "100%",
        height: 'auto',
        paddingTop: 70,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        alignItems: 'baseline',
    },
    subTitle: {
        fontWeight: '700',
        fontSize: 20,
    },
    cancel: {
        fontSize: 15,
        fontWeight: '500',
    },
    time: {
        backgroundColor: Colors.yellow,
        width: 70,
        marginBottom: 5,
    },
    refreshBtn: {
        backgroundColor: Colors.yellow,
        borderWidth: 1,
        width: 36,
        height: 36,
        borderRadius: 18,
        borderColor: Colors.darkYellow,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    callBtn: {
        width: 28,
        height: 28,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: Colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },

    profileContainer: {
        backgroundColor: Colors.innerYellow,
        borderColor: Colors.yellow,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        marginTop: 20,
    },
    profileInfo: {
        marginLeft: 15,
    },
    gilbutName: {
        fontWeight: '700',
        fontSize: 20,
    },
    gilbutInfo: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 2,
    },
});