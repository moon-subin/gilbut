import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ScrollView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Colors } from '@/constants/Colors';

interface headerProp {
    title: string,
    naviPage: string,
}

export default function Header({title, naviPage}: headerProp) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Pressable
                style={styles.iconContainer}
                onPress={() => navigation.navigate(naviPage)}>
                <Ionicons name="chevron-back-outline" color={Colors.black} size={20} />
            </Pressable>
            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.placeholderContainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.headerBg,
        height: '12%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    iconContainer: {

    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.black,
    },
    placeholderContainer: {
        width: 20,
    }
});