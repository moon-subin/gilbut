import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions,TouchableOpacity, Platform, StyleSheet, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Colors } from '@/constants/Colors';
import PlaceCard from './PlaceCard';
import SelectedPlaceModal from './SelectedPlaceModal';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PlacesList({ placesList, onSelectPlace }) {
    const navigation=useNavigation();
    const flatListRef = useRef(null);
    const [isGrid, setIsGrid] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleCardPress = (index, place) => {
        setSelectedIndex(index);
        setSelectedPlace(place);
        setShowDetailModal(true);
        onSelectPlace(place);
        if (flatListRef.current && index >= 0 && index < placesList.length) {
            flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
        }
    };

    const handleToggleLayout = () => {
        setIsGrid(!isGrid); // Toggle layout state
    };

    const handleAcceptRequest = () => {
        setShowDetailModal(false);
        if (selectedPlace) {
            navigation.navigate('matching', { screen: 'PathToRequesterMap', place: {selectedPlace}});
        }
    };

    const handleViewOtherRequests = () => {
        setSelectedIndex(null);
        setSelectedPlace(null);
        setShowDetailModal(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonHeader}>
                 {isGrid ? (
                    <View style={styles.chevronButtonContainer}>
                        <TouchableOpacity onPress={handleToggleLayout}>
                            <Ionicons name="chevron-down-outline" color={Colors.black} size={30} />
                        </TouchableOpacity>
                    </View>
                 ) : (
                    <View style={styles.toggleButtonContainer}>
                        <TouchableOpacity onPress={handleToggleLayout} style={styles.toggleButton}>
                            <Ionicons name="list-outline" color={Colors.black} size={22} />
                            <Text style={styles.toggleButtonText}>목록 보기</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {isGrid ? null : (
                    <TouchableOpacity style={styles.gpsButton}>
                        <Ionicons name="locate-outline" color={Colors.black} size={22} style={styles.gpsIcon} />
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                key={isGrid ? 'grid' : 'list'}
                ref={flatListRef}
                style={isGrid ? styles.gridContainer : styles.listContainer}
                columnWrapperStyle={isGrid ? styles.columnWrapper : null}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={placesList}
                horizontal={isGrid ? false : true}
                numColumns={isGrid ? 2 : 1}
                renderItem={({item,index})=>(
                    <TouchableOpacity onPress={() => handleCardPress(index, item)}>
                        <View style={[styles.cardContainer, isGrid ? styles.cardContainerW2 : styles.cardContainerW1, selectedIndex === index && (isGrid ? null : styles.selectedCard)]}>
                            <PlaceCard place={item} />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={isGrid ? null : styles.flatListContent}
                snapToAlignment="center"
                decelerationRate="fast"
            />
            <SelectedPlaceModal
                visible={showDetailModal}
                place={selectedPlace}
                onAccept={handleAcceptRequest}
                onViewOtherRequests={handleViewOtherRequests}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardContainer: {
        marginHorizontal: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: Colors.white,
    },
    cardContainerW1: {
        width: screenWidth * 0.5,
    },
    cardContainerW2: {
        width: screenWidth * 0.45,
    },
    selectedCard: {
        width: screenWidth * 0.5, // 선택된 카드는 더 크게 표시합니다.
        height: screenHeight * 0.28, // 선택된 카드는 더 크게 표시합니다.
        
    },
    flatListContent: {
        alignItems: 'flex-end',
    },
    chevronButtonContainer: {
        marginHorizontal: 'auto',
    },
    toggleButtonContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        marginRight: -75,
        // justifyContent: 'center',
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 10,
        // marginBottom: 10,
        backgroundColor: Colors.white,
        width: 140,
        height: 45,
        paddingHorizontal: 20,
        borderRadius: 100,
        justifyContent: 'space-evenly',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    toggleButtonText: {
        fontSize: 18,
        fontWeight: '400',
    },
    gpsButton: {
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
    listContainer: {
        // position: 'absolute',
        // bottom: 50,
    },
    gridContainer: {
        // padding: 20,
        // margin: 10,
        width: "100%",
        height: 600,
        marginBottom: -50,

    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
});