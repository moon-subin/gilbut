import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '@/constants/Colors';
import isLastConstant from '../IsLastConstant';
import DistanceView from '../DistanceView';

const profile = require('../../assets/images/kittyProfile.png');
const distLine = require('../../assets/images/distLine.png');

export default function SelectedPlaceModal({ visible, place, onAccept, onViewOtherRequests }) {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onAccept}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContainer2}>
                    <View style={styles.horizontalContainer}>
                        {/* 의뢰 정보 */}
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{place.requestPlace.name}{isLastConstant(place.requestPlace.name)} 가주세요</Text>
                            <View style={styles.place}>
                                <Text style={styles.contentText}>목적지 | {place.requestPlace.name}</Text>
                                <Text style={styles.location}>{place.requestPlace.location}</Text>
                            </View>
                            <Text style={styles.contentText}>예상 소요 시간 | {place.estimatedTime}분</Text>
                            <Text style={styles.contentText}>의뢰자 위치 | {place.clientLocation.name}</Text>
                            <Text style={styles.contentText}>의뢰자 정보 | {place.clientInfo}</Text>
                            <Text style={styles.contentText}>의뢰자 요청사항 | {place.clientRequest}</Text>
                        </View>
                        {/* 의뢰자 프로필 */}
                        <View style={styles.profileContent}>
                            <Image source={profile} style={styles.clientProfile}></Image>
                            <Text style={styles.profileText}>{place.clientName} 님</Text>
                            {/* 클라이언트 성별/나이 */}
                            <Text style={styles.profileText}>(여성 | 20대)</Text>
                        </View>
                    </View>

                    {/* 장소 사이 거리 */}
                    <DistanceView place={place} />

                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
                            <Text style={styles.buttonText}>의뢰 수락</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewOtherButton} onPress={onViewOtherRequests}>
                            <Text style={styles.buttonText}>다른 요청 보기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    },
    modalContainer2: {
        width: 350,
        height: 450,
        backgroundColor: Colors.white,
        borderRadius: 10,
        // padding: 10,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: 350,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    modalContent: {
        flex: 1,
        // marginRight: 10,
        // width: "70%",
    },
    profileContent: {
        flex: 1,
        // marginLeft: 10,
        // width: "30%",
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        right: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    place: {

    },
    location: {
        color: Colors.gray,
        fontSize: 10,
    },
    contentText: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10,
    },
    clientProfile: {
        width: 36,
        height: 36,
        marginBottom: 5,
    },
    profileText: {
        fontSize: 12,
        color: Colors.gray,
    },
    // 거리
    distanceContent: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    distImgContent: {
        flexDirection: 'row',
    },
    distProfile: {
        width: 25,
        height: 25,
    },
    distLine: {
        
    },

    // 버튼
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        position: 'absolute',
        bottom: 0,
    },
    acceptButton: {
        backgroundColor: Colors.yellow,
        width: "50%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        borderRightWidth: 0.5,
        borderRightColor: Colors.lightGray,
        borderBottomLeftRadius: 10,
    },
    viewOtherButton: {
        width: "50%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        borderLeftWidth: 0.5,
        borderLeftColor: Colors.lightGray,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
    },
});