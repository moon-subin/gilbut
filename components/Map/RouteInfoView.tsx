import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
  
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
                <Text style={styles.cancel}>{cancel}</Text>
            </View>
            <View>
                <Text style={styles.title}>{roundedTime}분 후</Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles .title}>{timeContent}</Text>
                        <TouchableOpacity>
                            <Image source={refreshBtn} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity>
                            <Image source={refreshBtn} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={refreshBtn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.clientInfoContainer, styles.row]}>
                <Image source={profile} />
                <View>
                    <View>
                        <Text>{routeInfo.clientName} 님</Text>
                        <View>
                            <Text>{routeInfo.requestPlace.name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>여자 | 24세</Text>
                        <Text>{routeInfo.clientInfo} | {routeInfo.clientRequest}</Text>
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
        height: 300,
        paddingTop: 60,
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


    clientInfoContainer: {
        backgroundColor: 'rgba(255, 230, 165, 1)',
        borderColor: Colors.yellow,
        borderWidth: 2,
        borderRadius: 10,
    },
});