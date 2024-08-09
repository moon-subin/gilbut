import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, Platform, Alert } from 'react-native';
import { Audio } from 'expo-av';
import MapView from 'react-native-maps';
import { UserLocationContext } from '@/Context/UserLocationContext';
import PlaceSearchBar from '@/components/Search/PlaceSearchBar';
import ClientLocationMarker from '@/components/Map/ClientLocationMarker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import VoiceSearchPlaceModal from '@/components/Map/VoiceSearchPlaceModal';

const micIcon = require('../../assets/images/mic_l.png');

export default function MainPageBlind() {
    const navigation = useNavigation();
    const [mapRegion, setMapRegion] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [recording, setRecording] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [results, setResults] = useState([]);
    const { location } = useContext(UserLocationContext);
    const [recordingUri, setRecordingUri] = useState(null);
    const [micModalVisible, setMicModalVisible] = useState(false);

    useEffect(() => {
        if (location) {
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
            });
        }
    }, [location]);

    const handlePlaceSelect = (place) => {
    }

    const handleModalClose = () => {
        setMicModalVisible(false);
    };

    const handleMicButton = () => {
        setMicModalVisible(true);
        startRecording();
    }

    const startRecording = async () => {
        try {
            if (recording !== null) {
                await recording.stopAndUnloadAsync();
                setRecording(null);
            }

            console.log('Requesting permissions..');
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access microphone was denied');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await newRecording.startAsync();
            setIsListening(true);
            setRecording(newRecording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');
        setIsListening(false);
        if (recording !== null) {
            try {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecordingUri(uri);
                setRecording(null);
                console.log('Recording stopped and stored at', uri);
                // await uploadAudioToGCS(uri); // Process recording
            } catch (err) {
                console.error('Failed to stop recording', err);
            }
        }
    };

    const goRequestLetter = () => {
        if (location) {
            navigation.navigate('RequestLetterPage', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } else {
            Alert.alert('Location not available');
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="none"
                transparent={true}
                visible={micModalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalView}>
                    <VoiceSearchPlaceModal
                        onClose={handleModalClose}
                        onStartRecording={startRecording}
                        onStopRecording={stopRecording}
                    />
                </View>
            </Modal>
            <View style={styles.SearchBarContainer}>
                <View style={{width:'75%'}}>
                    <PlaceSearchBar 
                        placeholder="장소 검색" 
                        handleMicButton={handleMicButton}
                        isActive={false}
                        onPlaceSelect={handlePlaceSelect}
                    />
                </View>
                <TouchableOpacity style={styles.requestLetter} onPress={goRequestLetter}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>의뢰서</Text>
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={mapRegion}
            >
                {selectedPlace && <ClientLocationMarker item={selectedPlace} />}
            </MapView>
            <TouchableOpacity
                style={styles.placesListContainer}
                onPress={handleMicButton}
            >
                <Image source={micIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gpsButton}>
                <Ionicons name="locate-outline" color={Colors.black} size={22} style={styles.gpsIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        // padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    SearchBarContainer: {
        position: 'absolute',
        zIndex: 20,
        top: 70,
        left: '5%',
        right: '5%',
        flexDirection: 'row',
    },
    requestLetter: {
        backgroundColor: Colors.yellow,
        borderRadius: 8,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22%',
        marginLeft: 'auto',
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
    map: {
        width: '100%',
        height: '100%',
    },
    placesListContainer: {
        position: 'absolute',
        zIndex: 20,
        bottom: 30,
        left: '50%',
        transform: [{ translateX: -80 }],
        backgroundColor: Colors.yellow,
        width: 160,
        height: 160,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    gpsButton: {
        position: 'absolute',
        zIndex: 20,
        bottom: 20,
        right: 0,
        width: 45,
        height: 45,
        backgroundColor: Colors.white,
        borderRadius: 100,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 30,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    gpsIcon: {
        alignSelf: 'center',
    },
    transcript: {
        position: 'absolute',
        bottom: 200,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
});
