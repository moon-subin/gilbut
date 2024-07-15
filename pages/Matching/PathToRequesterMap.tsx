import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';

import { Colors } from '@/constants/Colors';

export default function PathToRequesterMap() {

    const [mapRegion, setmapRegion] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const { location } = useContext(UserLocationContext);


    useEffect(()=>{
        if(location)
        {
            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
            })
        }
    },[location])

    // console.log("location.coords: ", location.coords);

    // console.log(selectedPlace.clientLocation.coord);
    return (
      <View>
        <MapView />

      </View>
    );
}

const styles = StyleSheet.create({

});
