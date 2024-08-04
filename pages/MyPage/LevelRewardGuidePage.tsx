import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, FlatList, YellowBox } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header';

const level_seed = require('../../assets/images/level_seed.png');
const level_sprout = require('../../assets/images/level_sprout.png');
const level_semipro = require('../../assets/images/level_semipro.png');
const level_pro = require('../../assets/images/level_pro.png');

export default function LevelRewardGuidePage() {
    const navigation = useNavigation();
    const [conditionGuideVisible, setConditionGuideVisible] = useState(false);
    const [rewardGuideVisible, setRewardGuideVisible] = useState(false);
    
    const levelUpCondition = [
        { level: 1, description: '교육영상 및 퀴즈 완료 시 도우미 배지 부여' },
        { level: 2, description: '길 안내 1회 완료' },
        { level: 3, description: '길 안내 3회 완료' },
        { level: 4, description: '길 안내 6회 완료' },
        { level: 5, description: '길 안내 9회 완료' },
        { level: 6, description: '길 안내 12회 완료' },
        { level: 7, description: '길 안내 16회 완료' },
        { level: 8, description: '길 안내 20회 완료' },
        { level: 9, description: '길 안내 24회 완료' },
        { level: 10, description: '길 안내 30회 완료' },
    ];

    const rewardByLevel = [
        { level: 5, description: '기프티콘 5000원권' },
        { level: 10, description: '기프티콘 10000원권' },
    ];

    return (
        <View>
            <Header
                title="등급제도 및 리워드 안내"
                naviPage='ProfilePage'>
            </Header>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.levelContainer}>
                        <View style={styles.levelContent}>
                            <View style={styles.levelImage}>
                                <Image source={level_seed} />
                            </View>
                            <Text style={styles.levelText}>씨앗{'\n'}(0레벨)</Text>
                        </View>
                        <View style={styles.levelContent}>
                            <View style={styles.levelImage}>
                                <Image source={level_sprout} />
                            </View>
                            <Text style={styles.levelText}>새싹{'\n'}(1-3레벨)</Text>
                        </View>
                        <View style={styles.levelContent}>
                            <View style={styles.levelImage}>
                                <Image source={level_semipro} />
                            </View>
                            <Text style={styles.levelText}>준프로{'\n'}(4-6레벨)</Text>
                        </View>
                        <View style={styles.levelContent}>
                            <View style={styles.levelImage}>
                                <Image source={level_pro} />
                            </View>
                            <Text style={styles.levelText}>프로{'\n'}(7-9레벨){'\n'}마스터{'\n'}(10레벨)</Text>
                        </View>
                    </View>

                    <View style={{width:'100%'}}>
                        <View style={styles.guideContainer}>
                            <Text style={[styles.guideText, conditionGuideVisible ? {color:Colors.darkYellow} : {color:Colors.black}]}>레벨 업 조건 안내</Text>
                            <TouchableOpacity 
                                onPress={() => setConditionGuideVisible(!conditionGuideVisible)} 
                                style={styles.iconContainer}
                            >
                                <Ionicons 
                                    name={conditionGuideVisible ? "chevron-up-outline" : "chevron-down-outline"} 
                                    style={conditionGuideVisible ? {color:Colors.darkYellow} : {color:Colors.black}}
                                    size={20} 
                                />
                            </TouchableOpacity>
                        </View>
                        {conditionGuideVisible && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlatList
                                    data={levelUpCondition}
                                    keyExtractor={(item) => item.level.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.toggledItem}>
                                            <Text style={styles.level}>{item.level}레벨</Text>
                                            <Text style={styles.description}>{item.description}</Text>
                                        </View>
                                    )}
                                    style={styles.toggledContainer}
                                />
                            </ScrollView>
                        )}
                    </View>

                    <View style={{width:'100%'}}>
                        <View style={styles.guideContainer}>
                            <Text style={[styles.guideText, rewardGuideVisible ? {color:Colors.darkYellow} : {color:Colors.black}]}>레벨별 리워드 안내</Text>
                            <TouchableOpacity 
                                onPress={() => setRewardGuideVisible(!rewardGuideVisible)} 
                                style={styles.iconContainer}
                            >
                                <Ionicons 
                                    name={rewardGuideVisible ? "chevron-up-outline" : "chevron-down-outline"} 
                                    style={rewardGuideVisible ? {color:Colors.darkYellow} : {color:Colors.black}}
                                    size={20} 
                                />
                            </TouchableOpacity>
                        </View>
                        {rewardGuideVisible && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlatList
                                    data={rewardByLevel}
                                    keyExtractor={(item) => item.level.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.toggledItem}>
                                            <Text style={styles.level}>{item.level}레벨</Text>
                                            <Text style={styles.description}>{item.description}</Text>
                                        </View>
                                    )}
                                    style={styles.toggledContainer}
                                />
                            </ScrollView>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: Colors.headerBg,
        height: '100%',
        padding: 30,
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    levelContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    levelContent: {
        padding: 10,
    },
    levelImage: {
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    levelText: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    guideContainer: {
        // width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 1,
    },
    guideText: {
        fontWeight: '700',
        fontSize: 18,
    },
    iconContainer: {
        position: 'absolute',
        right: 20,

    },

    toggledContainer: {
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    toggledItem: {
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    level: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'right',
        marginRight: 20,
    },
    description: {
        fontWeight: '400',
        fontSize: 13,
        textAlign: 'left',
    }
});
