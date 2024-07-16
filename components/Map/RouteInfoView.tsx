import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RouteInfoView({ phase, routeInfo }) {

    return (
        <View style={styles.infoContainer}>
            <Text>{phase}</Text>
            <Text>{routeInfo.requestPlace.name}</Text>
            <Text>{routeInfo.requestPlace.coord.latitude}</Text>
            <Text>{routeInfo.requestPlace.coord.longitude}</Text>
            <Text>{routeInfo.requestPlace.location}</Text>
            <Text>{routeInfo.distToFin}</Text>
            <Text>{routeInfo.distToFin}</Text>
            <Text>{routeInfo.estimatedTime}</Text>
            <Text>{routeInfo.clientLocation.name}</Text>
            <Text>{routeInfo.clientLocation.coord.latitude}</Text>
            <Text>{routeInfo.clientLocation.coord.longitude}</Text>
            <Text>{routeInfo.clientLocation.location}</Text>
            <Text>{routeInfo.clientInfo}</Text>
            <Text>{routeInfo.clientRequest}</Text>
            <Text>{routeInfo.clientName}</Text>
            {/* <Text>Destination: {phase ? `${destination.latitude}, ${destination.longitude}` : 'N/A'}</Text> */}
            {/* <Text>Estimated Time:</Text> */}
        </View>

    );
}


const styles = StyleSheet.create({
    infoContainer: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: Colors.white,
        width: "100%",
        height: 250,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
});