import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLEMAP_KEY } from '@env';
import { request, PERMISSIONS } from 'react-native-permissions';
import reverseGeocoding from '@/utils/reverseGeocoding';

const micIcon = require('../../assets/images/mic.png');


export default function PlaceSearchBar({ placeholder, handleMicButton, isActive, onPlaceSelect }) {
    // const [searchInput, setSearchInput] = useState();
    // const [selectedPlace, setSelectedPlace] = useState(null);

    const handlePlaceSelect = async (data, details = null) => {
        try {
            if (details?.geometry?.location) {
                // console.log(data, details);
                console.log(data.structured_formatting.main_text);
                const { lat, lng } = details.geometry.location;
                const address = await reverseGeocoding(lat, lng);
                const place = {
                    name: data.structured_formatting.main_text,
                    address: address,
                    location: {
                        latitude: lat,
                        longitude: lng,
                    }
                };
                if (onPlaceSelect) {
                    onPlaceSelect(place); // Call the callback with the selected place
                }
            }
        } catch (err) {
            console.error('Error during place selection:', err);
        }
    };

    return (
        <View style={[styles.searchBarContainer, { zIndex: isActive ? 10 : 1 }]}>
            <GooglePlacesAutocomplete
                minLength={2}
                placeholder={placeholder}
                onPress={handlePlaceSelect}
                onFail={(error) => console.log(error)}
                onNotFound={() => console.log("no results")}
                query={{
                    key: GOOGLEMAP_KEY,
                    language: 'ko',
                    components: "country:kr",
                }}
                keyboardShouldPersistTaps={"handled"}
                fetchDetails={true}
                keepResultsAfterBlur={false}
                enablePoweredByContainer={false}
                styles={autocompleteStyles}
            />
            <TouchableOpacity style={styles.micBtn} onPress={handleMicButton}>
                <Image source={micIcon} />
            </TouchableOpacity>
        </View>
    );
}


const autocompleteStyles = {
    textInputContainer: {
        backgroundColor: Colors.white,
        // borderRadius: 8,
        borderTopStartRadius: 8,
        borderBottomLeftRadius: 8,
        height: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    listView: { // 검색된 장소 목록을 렌더링하는 스타일
        position: 'absolute',
        top: 62, // 검색 바 아래에 목록을 표시
        borderRadius: 8,
        width: '100%',
        backgroundColor: Colors.white,
        zIndex: 10,
    },
    textInput: {
        // backgroundColor: Colors.gray,
        fontSize: 20,
        fontWeight: '500',
        // height: 40,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
};


const styles = StyleSheet.create({
    searchBarContainer: {
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 60,
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
    micBtn: {
        backgroundColor: Colors.yellow,
        width: "20%",
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    }
});
