import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
    const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | null>(null);


    return (
        <View style={styles.container}>
            <Text>홈</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
});
