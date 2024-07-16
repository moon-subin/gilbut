import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';

import { Colors } from '@/constants/Colors';

export default function PathToRequesterMap() {
    const { location } = useContext(UserLocationContext);

    const [mapRegion, setmapRegion] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [destination, setDestination] = useState(null);
    const [time, setTime] = useState(null);
    const [phase, setPhase] = useState(1); // 1: 의뢰자에게 가는 상황, 2: 의뢰자와 목적지로 가는 상황


    console.log('selectedPlace ', selectedPlace);

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
            setDestination({ latitude: 37.78825, longitude: -122.4324 }); // 의뢰자의 위치로 변경
            setTime('10 minutes'); // 예상 소요 시간
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
            <MapView
                style={styles.map}
                region={mapRegion}
            >
                {destination && (
                    <Marker coordinate={destination} />
                )}
            </MapView>

            <View style={styles.infoContainer}>
                <Text>Destination: {destination ? `${destination.latitude}, ${destination.longitude}` : 'N/A'}</Text>
                <Text>Estimated Time: {time}</Text>
            </View>

            <TouchableOpacity style={styles.arrivalBtnContainer} onPress={handlePress}>
                <Text style={styles.btnText}>
                    {phase === 1 ? 'Meet the Requester' : 'Go to Destination'}
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
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    arrivalBtnContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: Colors.yellow,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
