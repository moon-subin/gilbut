import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import * as Location from 'expo-location'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import PlacesList from '@/components/Search/PlacesList';
import requestInfoList from '../../assets/datas/requestInfoList';
import ClientLocationMarker from '@/components/Map/ClientLocationMarker';
// import NaverMapView from '../../components/Map/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


import { Colors } from '@/constants/Colors';
import { SearchBar } from 'react-native-screens';

const micIcon = require('../../assets/images/mic_l.png');

export default function MainPageDisabled() {
    const navigation = useNavigation();
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

    const goRequestLetter = () => {
        if (location) {
            navigation.navigate('RequestLetter', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } else {
            Alert.alert('Location not available');
        }
    };
    
    
    return (
      <View style={styles.container}>
        <View style={styles.SearchBarContainer}>
            <PlaceSearchBar placeholder={"장소 검색"} />
            <TouchableOpacity style={styles.requestLetter} onPress={goRequestLetter}>
                <Text style={{fontSize:20, fontWeight:'500',}}>의뢰서</Text>
            </TouchableOpacity>
        </View>
        <MapView 
          style={styles.map}
          showsUserLocation={true}
          region={mapRegion}
        >
            {selectedPlace && (
                <ClientLocationMarker item={selectedPlace} />
            )}
        </MapView>
        <TouchableOpacity style={styles.placesListContainer}>
           <Image source={micIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gpsButton}>
            <Ionicons name="locate-outline" color={Colors.black} size={22} style={styles.gpsIcon} />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    SearchBarContainer: {
        position: 'absolute',
        zIndex: 20,
        top: 70,
        left: "5%",
        right: "5%",
        flexDirection: 'row',
    },
    requestLetter: {
        backgroundColor: Colors.yellow,
        borderRadius: 8,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        marginLeft: 'auto',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    map: {
        width: '100%',
        height: '100%',
    },
    placesListContainer: {
      position: 'absolute',
      zIndex: 20,
      bottom: 30,
      left: '50%',
      transform: [{ translateX: -80 }],
      backgroundColor: Colors.yellow,
      width: 160,
      height: 160,
      borderRadius: 100,
      justifyContent: 'center',
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
  gpsButton: {
    position: 'absolute',
    zIndex: 20,
    bottom: 20,
    right: 0,
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 100,
    // alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 30,
    marginBottom: 10,
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
        },
        android: {
            elevation: 5,
        },
    }),
    },
    gpsIcon: {
        alignSelf: 'center',
    },
});