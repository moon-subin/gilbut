import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLEMAP_KEY } from '@env';
import Header from '../../components/Header';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import reverseGeocoding from '@/utils/reverseGeocoding';
import findPlace from '@/utils/findPlace';

export default function RequestLetter() {
    const navigation = useNavigation();
    const route = useRoute();
    const [address, setAddress] = useState('');

    const lat = route.params.latitude;
    const lng = route.params.longitude;

    useEffect(() => {
        async function fetchAddress() {
            const formattedAddress = await reverseGeocoding(lat, lng);
            if (formattedAddress) {
                setAddress(formattedAddress);
            }
        }

        fetchAddress();
    }, []);

    console.log('address: ', address);

    useEffect(() => {
        const fetchData = async () => {
            const address = '잠실역 2호선';
            const data = await findPlace(address);
            console.log('data: ', data);
        };
    
        fetchData();
    }, []);


    return (
        <View>
            <Header
                title="의뢰서 작성"
                naviPage='MainPageDisabled'></Header>
            <View style={styles.container}>
            <View>
                <PlaceSearchBar placeholder={address}></PlaceSearchBar>
                <PlaceSearchBar placeholder={"도착지 입력"}></PlaceSearchBar>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 50,
        backgroundColor: Colors.headerBg,
        height: '100%',
    },
});
