import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { useRoute } from '@react-navigation/native'; 
import getWalkingRoute from '@/utils/getWalkingRoute';
import { Colors } from '@/constants/Colors';
import RouteInfoView from '@/components/Map/RouteInfoView';
import ConfirmedArrivalModal from '@/components/Map/ConfirmedArrivalModal';

const routeCircleMarker = require('../../assets/images/routeCircleMarker.png');

// Example profile images
const kittyProfile = require('../../assets/images/kittyProfile.png');

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PathToRequesterMap() {
    const route = useRoute();
    const selectedRequest = route.params.request;
    const myLocation = route.params.region;

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
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

                {origin && 
                    <Marker coordinate={origin} image={routeCircleMarker}>
                            <View style={styles.calloutContainer}>
                                <Image source={kittyProfile} style={styles.profilePic} />
                                <Text style={styles.markerText}>내 위치</Text>
                            </View>
                    </Marker>
                }
                {destination && 
                    <Marker coordinate={destination} image={routeCircleMarker}>
                            <View style={styles.calloutContainer}>
                                <Image source={kittyProfile} style={styles.profilePic} />
                                <Text style={styles.markerText}>의뢰자 위치</Text>
                            </View>
                    </Marker>
                }
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
                onCancel={handleCancel}
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
    calloutContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 50,
        position: 'absolute',
        bottom: 20,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    markerText: {
        backgroundColor: Colors.yellow,
        fontWeight: '700',
        fontSize: 10,
        padding: 5,
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
