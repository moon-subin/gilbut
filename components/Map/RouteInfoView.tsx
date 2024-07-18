import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
  
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { GOOGLEMAP_KEY } from '@env';

export default function RouteInfoView({ phase, routeInfo, myLatitude, myLongitude }) {

    // 1일 때 필요한 값
    // 내 위치(위도, 경도), 내 프로필
    // 의뢰자 위치(위도, 경도), 의뢰자 프로필 

    const title = phase ? '의뢰자에게 가는 중' : '의뢰자의 목적지로 가는 중';
    const button = phase ? '수락 취소' : '신고하기';
    const time = phase ? '' : '';

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
            <Text>{title}</Text>
            <Text>{button}</Text>
            <Text>{phase}</Text>
            <Text>{routeInfo.requestPlace.name}</Text>
            <Text>{routeInfo.requestPlace.coord.latitude}</Text>
            <Text>{routeInfo.requestPlace.coord.longitude}</Text>
            <Text>{routeInfo.requestPlace.location}</Text>
            <Text>{routeInfo.distToFin}</Text>
            <Text>{routeInfo.distToFin}</Text>
            <Text>{routeInfo.estimatedTime}</Text>
            <Text>{routeInfo.clientLocation.name}</Text>
            <Text>{routeInfo.clientLocation.coord.latitude}</Text>
            <Text>{routeInfo.clientLocation.coord.longitude}</Text>
            <Text>{routeInfo.clientLocation.location}</Text>
            <Text>{routeInfo.clientInfo}</Text>
            <Text>{routeInfo.clientRequest}</Text>
            <Text>{routeInfo.clientName}</Text>
            {/* <Text>Destination: {phase ? `${destination.latitude}, ${destination.longitude}` : 'N/A'}</Text> */}
            {/* <Text>Estimated Time:</Text> */}
        </View>

    );
}


const styles = StyleSheet.create({
    infoContainer: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: Colors.white,
        width: "100%",
        height: 250,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
});