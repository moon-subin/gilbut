import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, SafeAreaView, Modal, FlatList, Image, Platform, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLEMAP_KEY } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const matchingFootprint = require('../../assets/images/matchingFootprint.png');
const kittyProfile = require('../../assets/images/kittyProfile.png');

export default function WaitingMatchingPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const destName = route.params.destName;
    const requestData = route.params.requestData;

    // console.log('waitinggilbut - requestData: ', requestData);

    const [expanded, setExpanded] = useState(false);
    const [leftTime, setLeftTime] = useState(5);
    const [isGilbutArrived, setIsGilbutArrived] = useState(false);

    const gilbutName = '나는너의길벗';
    const gilbutGender = '여자';
    const gilbutAge = '24';
    const gilbutLevel = 2;
    const gilbutVolunteerCnt = 1;

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const refreshTime = () => {
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setLeftTime(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                }
                clearInterval(timer); 
                // setIsGilbutArrived(true);
                return 0;
            });
        }, 2000); // 1 min 60000

        return () => clearInterval(timer); 
    }, []);

    useEffect(() => {
        if (isGilbutArrived) {
            navigation.navigate('PathToDestinationMap', { 
                requestData: requestData,
                destName: destName,
            });
        }
    }, [isGilbutArrived, navigation]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsGilbutArrived(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={{fontWeight:'700', fontSize:20}}>길벗 기다리는 중</Text>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'500', fontSize:15}}>요청 취소</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.guideText}>열심히 가고 있어요</Text>
                <View style={[styles.profileContainer, expanded && styles.profileContainerExpanded]}>
                    <Image source={kittyProfile} style={{alignSelf:'center'}} />
                    <View style={expanded ? styles.profileInfoExpanded : styles.profileInfo}>
                        <Text style={expanded ? styles.gilbutNameExpanded : styles.gilbutName}>{gilbutName} 님</Text>
 
                        {expanded ? (
                            <>
                                <Text style={styles.gilbutInfoExpanded}>성별 <Text style={{fontWeight:'500'}}>{gilbutGender}</Text></Text>
                                <Text style={styles.gilbutInfoExpanded}>나이 <Text style={{fontWeight:'500'}}>{gilbutAge}</Text></Text>
                            </>
                        ) : (
                            <Text style={styles.gilbutInfo}>{gilbutGender} | {gilbutAge}세</Text>
                        )}
                        {expanded ? (
                            <Text style={styles.gilbutInfoExpanded}>경력 <Text style={{fontWeight:'500'}}>(Lev.{gilbutLevel})</Text></Text>

                        ) : (
                            <Text style={styles.gilbutInfo}>(Lev.{gilbutLevel})</Text>
                        )}
                        {expanded && <Text style={styles.gilbutInfoExpanded}>활동 횟수 <Text style={{fontWeight:'500'}}>{gilbutVolunteerCnt}회</Text></Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={toggleExpand}>
                    <Ionicons 
                        name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                        color={Colors.black} size={30} style={styles.chevron} />
                </TouchableOpacity>
            </View>
            <View style={styles.leftTimeContainer}>
                <TouchableOpacity onPress={refreshTime}>
                    <Ionicons 
                        name={"refresh-outline"}
                        color={Colors.black} size={30} />
                </TouchableOpacity>
                <Text style={{fontWeight:'700', fontSize:32}}>남은 시간</Text>
                <Text style={{fontWeight:'700', fontSize:64}}>{leftTime}분</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        height: 'auto',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        marginTop: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    guideText: {
        fontWeight: '700',
        fontSize: 32,
        marginTop: 30,
    },
    profileContainer: {
        backgroundColor: Colors.innerYellow,
        borderColor: Colors.yellow,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        marginTop: 20,
    },
    profileContainerExpanded: {
        flexDirection: 'column',
    },
    profileInfo: {
        marginLeft: 15,
    },
    profileInfoExpanded: {
        marginLeft: 0,
        marginTop: 15,
        width: '100%',
    },
    gilbutName: {
        fontWeight: '700',
        fontSize: 20,
    },
    gilbutNameExpanded: {
        fontWeight: '700',
        fontSize: 24,
        alignSelf: 'center',
        marginBottom: 10,
    },
    gilbutInfo: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 2,
    },
    gilbutInfoExpanded: {
        fontWeight: '700',
        fontSize: 20,
        marginTop: 5,
    },
    additionalInfo: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    chevron: {
        alignSelf: 'center',
        marginVertical: 5,
    },
    leftTimeContainer: {
        backgroundColor: Colors.innerYellow,
        borderColor: Colors.yellow,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',       
        alignSelf: 'center',
        marginTop: 50, 
    },
});