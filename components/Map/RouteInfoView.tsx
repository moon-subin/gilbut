import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import Ionicons from 'react-native-vector-icons/Ionicons';
  
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { GOOGLEMAP_KEY } from '@env';

const refreshBtn = require('../../assets/images/refresh.png');
const profile = require('../../assets/images/kittyProfile.png');

export default function RouteInfoView({ phase, routeInfo, myLatitude, myLongitude, time }) {

    // 1일 때 필요한 값
    // 내 위치(위도, 경도), 내 프로필
    // 의뢰자 위치(위도, 경도), 의뢰자 프로필 

    const roundedTime = Math.ceil(time/60);

    const title = phase ? '의뢰자에게 가는 중' : '의뢰자의 목적지로 가는 중';
    const cancel = phase ? '수락 취소' : '신고하기';
    // const time = phase ? '' : '';
    const timeContent = phase ? '의뢰자에게 도착 예정' : '목적지에 도착 예정';
    const [timeWidth, setTimeWidth] = useState(0);

    const [route, setRoute] = useState([]);
    const options = {
        polylineOptions: 'red',
        // strokeWeight: 6,
        // strokeOpacity: 0.8,
    }
    const [coordinates, setCoordinates] = useState({
        origin: { latitude: myLatitude, longitude: myLongitude },
        destination: { latitude: routeInfo.clientLocation.coord.latitude, longitude: routeInfo.clientLocation.coord.longitude },
    });

    return (
        <View style={styles.infoContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={{marginLeft:'auto'}}>
                    <Text style={styles.cancel}>{cancel}</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 20}}>
                <Text style={[styles.title, styles.time]}>{roundedTime}분 후</Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles .title}>{timeContent}</Text>
                        <TouchableOpacity style={styles.refreshBtn}>
                            <Ionicons name="refresh-outline" color={Colors.black} size={15} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, {marginLeft:'auto'}]}>
                        <TouchableOpacity style={styles.callBtn}>
                            <Ionicons name="call-outline" color={Colors.black} size={15} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callBtn}>
                            <Ionicons name="chatbubble-outline" color={Colors.black} size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.clientInfoContainer, styles.row]}>
                <Image source={profile} width={60} height={60} />
                <View style={{marginLeft:10}}>
                    <View style={styles.row}>
                        <Text style={{fontSize:16, fontWeight:'700'}}>{routeInfo.clientName} 님</Text>
                        <View style={styles.placeContainer}>
                            <Text style={styles.place}>{routeInfo.requestPlace.name}</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 5,}}>
                        <Text style={styles.infoText}>여자 | 24세</Text>
                        <Text style={styles.infoText}>{routeInfo.clientInfo} | {routeInfo.clientRequest}</Text>
                    </View>
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
        height: 340,
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
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
        backgroundColor: Colors.innerYellow,
        borderWidth: 1,
        width: 28,
        height: 28,
        borderRadius: 14,
        borderColor: Colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
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

    clientInfoContainer: {
        backgroundColor: Colors.innerYellow,
        borderColor: Colors.yellow,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    placeContainer: {
        borderWidth: 1,
        borderColor: Colors.yellow,
        backgroundColor: Colors.white,
        width: 60,
        height: 20,
        justifyContent: 'center',
        marginLeft: 5,
    },
    place: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.darkYellow,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 14,
        fontWeight: '400',
    },
});