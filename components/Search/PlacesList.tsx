import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions,TouchableOpacity, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Colors } from '@/constants/Colors';
import PlaceCard from './PlaceCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PlacesList({ placesList, onSelectPlace }) {
    const navigation=useNavigation();
    const flatListRef = useRef(null);
    const [isGrid, setIsGrid] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleCardPress = (index, place) => {
        setSelectedIndex(index);
        onSelectPlace(place);
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
        }
    };

    const handleToggleLayout = () => {
        setIsGrid(!isGrid); // Toggle layout state
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleToggleLayout} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>{isGrid ? "목록 보기" : "그리드 보기"}</Text>
            </TouchableOpacity>
            <FlatList
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                data={placesList}
                // horizontal={true}
                horizontal={!isGrid} // Render horizontally if isGrid is false
                numColumns={isGrid ? 2 : 1} // Set numColumns to 2 for grid view, 1 for list view
                renderItem={({item,index})=>index<=6&&(
                    <TouchableOpacity onPress={() => handleCardPress(index, item)}>
                        <View style={[styles.cardContainer, selectedIndex === index && styles.selectedCard]}>
                            <PlaceCard place={item} />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                snapToInterval={screenWidth * 0.7} // 카드 너비의 70%로 스크롤 위치를 조정합니다.
                snapToAlignment="center"
                decelerationRate="fast"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        width: screenWidth * 0.5,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: 'white',
    },
    selectedCard: {
        width: screenWidth * 0.5, // 선택된 카드는 더 크게 표시합니다.
        height: screenHeight * 0.3, // 선택된 카드는 더 크게 표시합니다.
        
    },
    flatListContent: {
        alignItems: 'flex-end',
    },
    toggleButton: {
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});