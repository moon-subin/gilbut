import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const micIcon = require('../../assets/images/mic.png');

export default function PlaceSearchBar({placeholder}) {
    const [searchInput,setSearchInput]=useState();

    return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    gap: 5,
                    elevation: 0.7,
                    alignItems: "center",
                    backgroundColor: Colors.white,
                    borderRadius: 8,
                    height: 50,
                }}
            >
                <TextInput
                    placeholder="장소 검색"
                    style={{ backgroundColor: Colors.white, width: "100%" }}
                    onChangeText={(value) => setSearchInput(value)}
                    // onSubmitEditing={() => setSearchText(searchInput)}
                />
                <TouchableOpacity style={styles.micBtn}>
                    <Image source={micIcon}></Image>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    micBtn: {
        // backgroundColor: Colors.yellow,
        width: "20%",
        height: "100%",
        alignItems: 'center',
    }
});