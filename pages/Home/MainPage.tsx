import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import PlacesList from '@/components/Search/PlacesList';
import requestInfoList from '../../assets/datas/requestInfoList';
import ClientLocationMarker from '@/components/Map/ClientLocationMarker';
// import NaverMapView from '../../components/Map/index';

import {
  type MapType,
  type NaverMapViewRef,
  type Camera,
  type ClusterMarkerProp,
  type Region,
  NaverMapView,
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPathOverlay,
  NaverMapArrowheadPathOverlay,
  NaverMapGroundOverlay,
  NaverMapPolylineOverlay,
  NaverMapMarkerOverlay,
} from '@mj-studio/react-native-naver-map';


import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
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
      <View style={styles.container}>
        <View style={{position:'absolute',zIndex:20,top:70,left:"5%",right:"5%",width:"80%"}}>
          <PlaceSearchBar placeholder={"장소 검색"} />
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
        <View style={styles.placesListContainer}>
          <PlacesList placesList={requestInfoList} onSelectPlace={setSelectedPlace} region={mapRegion} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: Colors.mapOverlayBg,
    },
    placesListContainer: {
      position: 'absolute',
      zIndex: 20,
      bottom: 50,
  },
});