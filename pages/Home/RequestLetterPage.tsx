import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Modal, FlatList, Platform, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLEMAP_KEY } from '@env';
import Header from '../../components/Header';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import reverseGeocoding from '@/utils/reverseGeocoding';
import findPlace from '@/utils/findPlace';
import VoiceSearchPlaceModal from '@/components/Map/VoiceSearchPlaceModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import geocoding from '@/utils/geocoding';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import getWalkingRoute from '@/utils/getWalkingRoute';
import calculateAmount from '@/utils/calculateAmount';


const bookmarkPlaces = [
    { id: '1', name: 'First Item' },
    { id: '2', name: 'Second Item' },
    { id: '3', name: 'Third Item' },
    { id: '4', name: '4 Item' },
    { id: '5', name: '5 Item' },
    { id: '6', name: '' },
];

const recentPlaces = [
    { id: '1', name: 'First Item' },
    { id: '2', name: 'Second Item' },
    { id: '3', name: 'Third Item' },
    { id: '4', name: '4 Item' },
    { id: '5', name: '5 Item' },
    { id: '6', name: '' },
];

type ItemProps = {name: string, color: string, borderColor: string};

const Item = ({name, color, borderColor}: ItemProps) => (
    <View style={[styles.item, {backgroundColor:color, borderColor:borderColor}]}>
      <Text style={styles.placeName}>{name}</Text>
    </View>
  );

export default function RequestLetterPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const [origin, setOrigin] = useState({ name: '', address: '', location: { lat: 0, lng: 0 } });
    const [destination, setDestination] = useState({ name: '', address: '', location: { lat: 0, lng: 0 } });
    const [distance, setDistance] = useState(0);
    const [estTime, setEstTime] = useState(0);
    const [amount, setAmount] = useState(0);

    const [micModalVisible, setMicModalVisible] = useState(false);
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);

    const lat = route.params.latitude;
    const lng = route.params.longitude;


    // 출발지 검색 전
    // 현재 위치: 주소, 위도/경도
    useEffect(() => {
        async function fetchAddress() {
            const formattedAddress = await reverseGeocoding(lat, lng);
            // console.log('formattedAddress: ', formattedAddress);
            if (formattedAddress) {
                const currLocation = {
                    name: formattedAddress,
                    address: formattedAddress,
                    location: {
                        latitude: lat,
                        longitude: lng,
                    }
                };
                setOrigin(currLocation);

                setIsNextButtonYellow(true);
                // console.log('before origin: ', origin);
            }
        }
        fetchAddress();
    }, []);

    // console.log('address: ', address);

    // 출발지 검색 후
    // 출발 위치: 이름, 주소, 위도/경도
    const handleOriginPlaceSelect = (place) => {
        setOrigin(place);
    }

    // 도착지 검색 후
    // 도착 위치: 이름, 주소, 위도/경도
    const handleDestPlaceSelect = (place) => {
        setDestination(place);
        // console.log('dest: ', destination.name);    
    }

    useEffect(() => {
        const fetchRoute = async () => {
            if (origin && destination) {
                const routeData = await getWalkingRoute(origin.location, destination.location);
                const roundedTime = Math.ceil((routeData[0].properties.totalTime)/60);
                const estAmount = calculateAmount(roundedTime);
                if (routeData) {
                    setDistance(routeData[0].properties.totalDistance);
                    setEstTime(roundedTime);
                    setAmount(estAmount);
                    // console.log('amount: ', amount);
                    // console.log(estTime);
                    // setTime(routeData[0].properties.totalTime);
                }
            }
        };
        fetchRoute();
    }, [origin, destination]);

    const handleModalClose = () => {
        setMicModalVisible(false);
    };

    const handleMicButton = () => {
        setMicModalVisible(true);
    };

    const handleNextPage = () => {
        // navigation.navigate('matching', { 
        //     screen: 'PaymentPage', 
        //     params: { 
        //         requestData: requestData,
        //         originName: origin.name,
        //         destName: destination.name,
        //     }
        // });

        if (origin && destination) {
            const requestData = {
                memberId: '', // Replace with actual member ID
                blindId: '', // Replace with actual blind ID
                blindType: '', // Replace with actual blind type
                srcLocation: {
                    srcLong: origin.location.longitude,
                    srcLat: origin.location.latitude,
                },
                srcAddr: origin.address,
                dstLocation: {
                    dstLong: destination.location.longitude,
                    dstLat: destination.location.latitude,
                },
                dstAddr: destination.address,
                estTime: estTime,
                estSalary: amount,
                title: '', // Replace with actual title if necessary
                additionalInfo: '', // Replace with actual additional info if necessary
            };

            navigation.navigate('matching', { 
                screen: 'PaymentPage', 
                params: { 
                    requestData: requestData,
                    originName: origin.name,
                    destName: destination.name,
                }
            });
        } else {
            Alert.alert('Error', 'Please select both origin and destination');
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const searchKeyword = '남녕고';
    //             const findedPlace = await findPlace(searchKeyword);
    //             const placeLocation = await geocoding(findedPlace.candidates[0].formatted_address);
    //             // console.log('placeLocation: ', placeLocation);
    //             setDestination({
    //                 name: findedPlace.candidates[0].name,
    //                 address: findedPlace.candidates[0].formatted_address,
    //                 location: {
    //                     lat: placeLocation.lat,
    //                     lng: placeLocation.lng,
    //                 }
    //             });
    //             console.log(destination);
    //         } catch (error) {
    //             Alert.alert('Error', 'Failed to fetch destination place');
    //         }
    //     };
    
    //     fetchData();
    // }, []);


    return (
        <View style={{flex:1}}>
            <Header title="의뢰서 작성" naviPage='MainPageBlind' />
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Ionicons name="swap-vertical-outline" color={Colors.gray} size={28} style={styles.swap} />
                    </TouchableOpacity>
                    <View style={styles.searchBarContainer}>
                        <PlaceSearchBar 
                            placeholder={origin.address} 
                            handleMicButton={handleMicButton}
                            isActive={true} // Pass dynamic value based on your logic
                            onPlaceSelect={handleOriginPlaceSelect}
                        />                        
                        <View style={{paddingVertical:5}}/>
                         <PlaceSearchBar 
                            placeholder="도착지 입력" 
                            handleMicButton={handleMicButton} 
                            isActive={false} // Pass dynamic value based on your logic
                            onPlaceSelect={handleDestPlaceSelect}
                        />
                    </View>
                </View>
                {/* 즐겨찾기 */}
                <SafeAreaView style={styles.placeContainer}>
                    <Text style={styles.title}>즐겨찾기</Text>
                    <FlatList
                        data={bookmarkPlaces}
                        renderItem={({item}) => <Item name={item.name} color={Colors.yellow} borderColor={Colors.darkYellow} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                    />
                </SafeAreaView >
                {/* 최근 목적지 */}
                <SafeAreaView style={styles.placeContainer}>
                    <Text style={styles.title}>최근 목적지</Text>
                    <FlatList
                        data={recentPlaces}
                        renderItem={({item}) => <Item name={item.name} color={Colors.whiteGray} borderColor={Colors.lightGray} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </SafeAreaView>
                <TouchableOpacity 
                    style={[styles.requestButton, isNextButtonYellow ? {backgroundColor:Colors.yellow} : {backgroundColor:Colors.lightGray}]}
                    onPress={handleNextPage}
                >
                    <Text style={styles.requestText}>길 안내 요청하기</Text>
                </TouchableOpacity>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={micModalVisible}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.modalView}>
                        <VoiceSearchPlaceModal
                            onClose={handleModalClose}
                            onStartRecording={() => console.log('Start recording')}
                            onStopRecording={() => console.log('Stop recording')}
                        />
                    </View>
                </Modal>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        borderWidth: 2.5,
        borderRadius: 13,
        width: 140,
        height: 140,
        marginRight: 10,
        padding: 10,
    },
    placeName: {
        fontSize: 30,
        fontWeight: '700',
    },
    container: {
        backgroundColor: Colors.headerBg,
        height: '100%',
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1,
    },
    swap: {
        margin: 10,
    },
    searchBarContainer: {
        width: '100%',

    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 20,
    },
    placeContainer: {
        paddingVertical: 10,
    },
    requestButton: {
        // backgroundColor: Colors.lightGray,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    requestText: {
        fontSize: 24,
        fontWeight: '600',
    },
    modalView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
