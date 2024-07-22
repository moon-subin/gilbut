import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

const micIcon = require('../../assets/images/mic.png');

export default function PlaceSearchBar({placeholder}) {
    const [searchInput, setSearchInput]=useState();

    return (
            <View style={styles.searchBarContainer}>
                <TextInput  
                    style={styles.textInput}
                    placeholder={placeholder}
                    onChangeText={(value) => setSearchInput(value)}
                    // onSubmitEditing={() => setSearchText(searchInput)}
                />
                <TouchableOpacity style={styles.micBtn}>
                    <Image source={micIcon} />
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        elevation: 0.7,
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        height: 60,
        width: 280,
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
    textInput: {
        backgroundColor: Colors.white,
        width: '80%',
        height: '100%',
        fontSize: 20,
        fontWeight: '500',
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