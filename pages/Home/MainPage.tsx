import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import PlacesList from '@/components/Search/PlacesList';
import requestInfoList from '../../assets/datas/requestInfoList';

export default function HomeScreen() {
    // const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    // const mapRef = useRef<MapView | null>(null);


    // useEffect(() => {
    //     (async () => {
    //       try {
    //         const {granted} = await Location.requestForegroundPermissionsAsync();
    //         /**
    //          * Note: Foreground permissions should be granted before asking for the background permissions
    //          * (your app can't obtain background permission without foreground permission).
    //          */
    //         if(granted) {
    //           await Location.requestBackgroundPermissionsAsync();
    //         }
    //       } catch(e) {
    //         console.error(`Location request has been failed: ${e}`);
    //       }
    //     })();
    // }, []);

    // if (!location) {
    //   return (
    //       <View style={styles.container}>
    //           <Text>Loading...</Text>
    //       </View>
    //   );
    // }

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
                    <Marker
                        coordinate={{
                            latitude: selectedPlace.clientLocation.coord.latitude,
                            longitude: selectedPlace.clientLocation.coord.longitude,
                        }}
                        title={selectedPlace.clientLocation.name}
                    />
                )}
        </MapView>
        <View style={{position:'absolute',zIndex:20,bottom:50}}>
          <PlacesList placesList={requestInfoList} onSelectPlace={setSelectedPlace} />
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
    },
});
