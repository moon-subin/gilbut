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

const bookmarkPlaces = [
    {
        id: '1',
        name: 'First Item',
    },
    {
        id: '2',
        name: 'Second Item',
    },
    {
        id: '3',
        name: 'Third Item',
    },
    {
        id: '4',
        name: '4 Item',
    },
    {
        id: '5',
        name: '5 Item',
    },
    {
        id: '6',
        name: '',
    },
];

const recentPlaces = [
    {
        id: '1',
        name: 'First Item',
    },
    {
        id: '2',
        name: 'Second Item',
    },
    {
        id: '3',
        name: 'Third Item',
    },
    {
        id: '4',
        name: '4 Item',
    },
    {
        id: '5',
        name: '5 Item',
    },
    {
        id: '6',
        name: '',
    },
];

type ItemProps = {name: string, color: string, borderColor: string};

const Item = ({name, color, borderColor}: ItemProps) => (
    <View style={[styles.item, {backgroundColor:color, borderColor:borderColor}]}>
      <Text style={styles.placeName}>{name}</Text>
    </View>
  );

export default function RequestLetter() {
    const navigation = useNavigation();
    const route = useRoute();
    const [address, setAddress] = useState('');
    const [micModalVisible, setMicModalVisible] = useState(false);
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);

    const lat = route.params.latitude;
    const lng = route.params.longitude;

    useEffect(() => {
        async function fetchAddress() {
            const formattedAddress = await reverseGeocoding(lat, lng);
            if (formattedAddress) {
                setAddress(formattedAddress);
                setIsNextButtonYellow(true);
            }
        }

        fetchAddress();
    }, []);

    // console.log('address: ', address);

    const handleModalClose = () => {
        setMicModalVisible(false);
    };

    const handleMicButton = () => {
        setMicModalVisible(true);
    };

    const handleNextPage = () => {
        navigation.navigate('RequestLetter');
    };

    useEffect(() => {
        const fetchData = async () => {
            const address = '이화여자대학교';
            const data = await findPlace(address);
            // console.log('data: ', data);
        };
    
        fetchData();
    }, []);


    return (
        <View>
            <Header title="의뢰서 작성" naviPage='MainPageDisabled' />
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="swap-vertical-outline" color={Colors.gray} size={28} style={styles.swap} />
                    <View style={styles.searchBarContainer}>
                        <PlaceSearchBar placeholder={address} handleMicButton={handleMicButton} />
                        <PlaceSearchBar placeholder="도착지 입력" handleMicButton={handleMicButton} />
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
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
