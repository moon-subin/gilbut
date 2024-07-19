import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import { useRoute } from '@react-navigation/native'; 
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import axios from 'axios';

import getWalkingRoute from '@/utils/getWalkingRoute';

import { Colors } from '@/constants/Colors';
import RouteInfoView from '@/components/Map/RouteInfoView';
import ConfirmedArrivalModal from '@/components/Map/ConfirmedArrivalModal';
import { GOOGLEMAP_KEY, TMAP_KEY } from '@env';

const routeCircleMarker = require('../../assets/images/routeCircleMarker.png');


const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PathToRequesterMap() {
    // const { location } = useContext(UserLocationContext);
    const route = useRoute();

    // console.log(route.params.request);
    const selectedRequest = route.params.request;
    const myLocation = route.params.region;

    // const [mapRegion, setmapRegion] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    // 1: 의뢰자에게 가는 중, 2: 의뢰자와 목적지로 가는 중
    const [phase, setPhase] = useState(1); 

    const [mapRegion, setMapRegion] = useState({
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const [routeCoords, setRouteCoords] = useState([]);
    const mapRef = useRef<MapView>(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (selectedRequest) {
            if (phase === 1) {
                setOrigin({
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                }),
                setDestination({
                    latitude: selectedRequest.clientLocation.coord.latitude,
                    longitude: selectedRequest.clientLocation.coord.longitude,
                });
            } else if (phase === 2) {
                setOrigin({
                    latitude: selectedRequest.clientLocation.coord.latitude,
                    longitude: selectedRequest.clientLocation.coord.longitude,
                }),
                setDestination({
                    latitude: selectedRequest.requestPlace.coord.latitude,
                    longitude: selectedRequest.requestPlace.coord.longitude,
                });
            }
        }
    }, [phase, selectedRequest]);


    useEffect(() => {
        const fetchRoute = async () => {
            if (origin && destination) {
                const routeData = await getWalkingRoute(origin, destination);
                if (routeData) {
                    drawRoute(routeData);
                    setDistance(routeData[0].properties.totalDistance);
                    setTime(routeData[0].properties.totalTime);
                }
            }
        };
        fetchRoute();
    }, [origin, destination]);


    const drawRoute = (features) => {
        const coords = [];
        for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            if (feature.geometry.type === 'LineString') {
                const lineCoords = feature.geometry.coordinates;
                for (let j = 0; j < lineCoords.length; j++) {
                    const coord = lineCoords[j];
                    const latitude = coord[1];  // 위도
                    const longitude = coord[0]; // 경도
                    coords.push({ latitude, longitude });
                }
            }
        }
        setRouteCoords(coords);
    };
    
    const handlePress = () => {
        if (phase === 1) {
            setPhase(2);
        } else {
            // 목적지에 도착했을 때의 로직 추가
            // 도착 확정 요청 모달
            setShowConfirmModal(true);
        }
    };      

    const handleRequestConfirm = () => {
        setShowConfirmModal(false);
    }

    const handleCancel = () => {
        setShowConfirmModal(false);
    }

    return (
        <View style={styles.container}>
            <RouteInfoView 
                phase={phase} 
                routeInfo={selectedRequest} 
                myLatitude={myLocation.latitude} 
                myLongitude={myLocation.longitude}
                time={time} />

            <MapView
                style={styles.map}
                region={mapRegion}
                ref={mapRef}
            >

                {origin && <Marker coordinate={origin} image={routeCircleMarker} />}
                {destination && <Marker coordinate={destination} image={routeCircleMarker} />}
                {routeCoords.length > 0 && 
                    <Polyline 
                        coordinates={routeCoords}
                        strokeWidth={4} 
                    />}
            </MapView>

            <TouchableOpacity style={styles.arrivalBtnContainer} onPress={handlePress}>
                <Text style={styles.btnText}>
                    {phase === 1 ? '의뢰자 만남' : '의뢰 장소 도착'}
                </Text>
            </TouchableOpacity>

            <ConfirmedArrivalModal
                visible={showConfirmModal}
                onConfirm={handleRequestConfirm}
                onCencel={handleCancel}
                placeName={selectedRequest.requestPlace.name}
                clientName={selectedRequest.clientName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    infoContainer: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: Colors.white,
        width: "100%",
        height: 250,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    arrivalBtnContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: Colors.yellow,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    btnText: {
        fontSize: 24,
        fontWeight: '600',
    },
});
