import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import getWalkingRoute from '@/utils/getWalkingRoute';
import { Colors } from '@/constants/Colors';
import RouteInfoViewBlind from '@/components/Map/RouteInfoViewBlind';
import ResponseConfirmArrivalModal from '@/components/Map/ResponseConfirmArrivalModal';

const routeCircleMarker = require('../../assets/images/routeCircleMarker.png');

// Example profile images
const kittyProfile = require('../../assets/images/kittyProfile.png');

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PathToDestinationMap() {
    const navigation = useNavigation();
    const route = useRoute();

    const destName = route.params.destName;
    const requestData = route.params.requestData;
    // console.log(requestData);

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    // const [phase, setPhase] = useState(1);
    const [mapRegion, setMapRegion] = useState({
        latitude: requestData.srcLocation.srcLat,
        longitude: requestData.srcLocation.srcLong,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const [routeCoords, setRouteCoords] = useState([]);
    const mapRef = useRef<MapView>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const gilbutInfo = {
        name: '나는너의길벗',
        gender: '여자',
        age: '24',
        level: 2,
    }

    useEffect(() => {
        setOrigin({
            latitude: requestData.srcLocation.srcLat,
            longitude: requestData.srcLocation.srcLong,
        }),
        setDestination({
            latitude: requestData.dstLocation.dstLat,
            longitude: requestData.dstLocation.dstLong,
        });
    }, []);

    useEffect(() => {
        const fetchRoute = async () => {
            // console.log(origin, destination);
            const routeData = await getWalkingRoute(origin, destination);
            // console.log('routeData: ', routeData);
            if (routeData) {
                drawRoute(routeData);
                // setTime(routeData[0].properties.totalTime);
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
        // console.log('routecoords: ', routeCoords);
    };
    
    // const handlePress = () => {
    //     if (phase === 1) {
    //         setPhase(2);
    //     } else {
    //         setShowConfirmModal(true);
    //     }
    // };   
    
    // 일단 5초 지나면 모달 열리게
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowConfirmModal(true);
            // setShowConfirmModal(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const handleRequestConfirm = () => {
        setShowConfirmModal(false);
        navigation.navigate('FinishedMatchingPage', { amount: requestData.estSalary });
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
    }

    return (
        <View style={styles.container}>
            <RouteInfoViewBlind 
                origin={origin} 
                destination={destination}
                destName={destName}
                time={requestData.estTime}
                gilbutInfo={gilbutInfo} />

            <MapView
                style={styles.map}
                region={mapRegion}
                ref={mapRef}
            >
                {origin && 
                    <Marker coordinate={origin} image={routeCircleMarker}>
                            <View style={styles.calloutContainer}>
                                <Image source={kittyProfile} style={styles.profilePic} />
                                <Text style={styles.markerText}>출발지</Text>
                            </View>
                    </Marker>
                }
                {destination && 
                    <Marker coordinate={destination} image={routeCircleMarker}>
                            <View style={styles.calloutContainer}>
                                <Image source={kittyProfile} style={styles.profilePic} />
                                <Text style={styles.markerText}>목적지</Text>
                            </View>
                    </Marker>
                }
                {routeCoords.length > 0 && 
                    <Polyline 
                        coordinates={routeCoords}
                        strokeWidth={4} 
                    />}
            </MapView>

            <ResponseConfirmArrivalModal
                visible={showConfirmModal}
                onConfirm={handleRequestConfirm}
                onCancel={handleCancel}
                gilbutName={gilbutInfo.name}
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
