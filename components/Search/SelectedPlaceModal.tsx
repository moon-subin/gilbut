import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '@/constants/Colors';
import isLastConstant from '../IsLastConstant';

export default function SelectedPlaceModal({ visible, place, onClose, onViewOtherRequests }) {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContainer2}>
                    <View style={styles.horizontalContainer}>
                        {/* 의뢰 정보 */}
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{place.requestPlace.name}{isLastConstant(place.requestPlace.name)} 가주세요</Text>
                            <View style={styles.place}>
                                <Text style={styles.content}>목적지 | {place.requestPlace.name}</Text>
                                <Text style={styles.location}>{place.requestPlace.location}</Text>
                            </View>
                                <Text style={styles.content}>예상 소요 시간 | {place.estimatedTime}분</Text>
                                <Text>의뢰자 위치 | {place.clientLocation.name}</Text>
                                <Text>의뢰자 정보 | {place.clientInfo}</Text>
                            <View style={styles.clientRequestContainer}>
                                <Text>의뢰자 요청사항 | 
                                    {place.clientRequest === '없음' ? (
                                        <Text style={styles.value}>{place.clientRequest}</Text>
                                    ) : (
                                        <Text style={[styles.value, styles.clientRequestValue]}>{place.clientRequest}</Text>
                                    )}
                                </Text>
                            </View>
                        </View>
                        {/* 의뢰자 프로필 */}
                        <View style={styles.profileContent}>
                            <Text>{place.clientName}</Text>
                        </View>
                    </View>

                    {/* 장소 사이 거리 */}
                    <View style={styles.distanceContent}>
                        <Text>{place.distToClient}</Text>
                        <Text>{place.distToFin}</Text>
                    </View>

                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.acceptButton} onPress={onClose}>
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
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: 350,
        padding: 20,
        marginBottom: 20,
    },
    // modalContent: {
    //     width: 350,
    //     height: 450,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: Colors.white,
    //     borderRadius: 10,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,
    // },
    modalContent: {
        flex: 1,
        marginRight: 10,
    },
    profileContent: {
        flex: 1,
        marginLeft: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
    distanceContent: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
    },
    acceptButton: {
        backgroundColor: Colors.yellow,
        width: "50%",
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        borderRightWidth: 0.5,
        borderRightColor: Colors.lightGray,
    },
    viewOtherButton: {
        width: "50%",
        alignItems: 'center',
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