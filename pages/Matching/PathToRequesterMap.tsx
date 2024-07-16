import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import { useRoute } from '@react-navigation/native'; 

import { Colors } from '@/constants/Colors';
import RouteInfoView from '@/components/Map/RouteInfoView';

export default function PathToRequesterMap() {
    const { location } = useContext(UserLocationContext);
    const route = useRoute();

    // console.log(route.params.request);
    const selectedRequest = route.params.request;

    const [mapRegion, setmapRegion] = useState(null);
    const [destination, setDestination] = useState(null);
    const [time, setTime] = useState(null);

    // 1: 의뢰자에게 가는 중, 2: 의뢰자와 목적지로 가는 중
    const [phase, setPhase] = useState(1); 


    useEffect(() => {
        if (location) {
            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
            });
        }
    }, [location]);

    useEffect(() => {
        if (phase === 1) {
            // 의뢰자에게 가는 상황의 목적지와 예상 시간 설정

            // Distance Matrix API component 만들 것 ....

        } else if (phase === 2) {
            // 의뢰자와 목적지로 가는 상황의 목적지와 예상 시간 설정
            setDestination({ latitude: 37.78925, longitude: -122.4394 }); // 의뢰자의 목적지로 변경
            setTime('15 minutes'); // 예상 소요 시간
        }
    }, [phase]);

    const handlePress = () => {
        if (phase === 1) {
            setPhase(2);
        } else {
            // 목적지에 도착했을 때의 로직 추가
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text>Destination: {destination ? `${destination.latitude}, ${destination.longitude}` : 'N/A'}</Text>
                <Text>Estimated Time: {time}</Text>
            </View>
            <RouteInfoView phase={phase} routeInfo={selectedRequest} />

            <MapView
                style={styles.map}
                region={mapRegion}
            >
                {destination && (
                    <Marker coordinate={destination} />
                )}
            </MapView>

            <TouchableOpacity style={styles.arrivalBtnContainer} onPress={handlePress}>
                <Text style={styles.btnText}>
                    {phase === 1 ? '의뢰자 만남' : '의뢰 장소 도착'}
                </Text>
            </TouchableOpacity>
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
