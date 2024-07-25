import React, { useEffect, useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Constants from 'expo-constants';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const photoShoot = require('../assets/images/photoShoot.png');

export default function CameraModal({ onClose }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <Text>No access to camera</Text>
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center',}}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                // console.log(data);
                // setImage(data.uri);
                // console.log('image: ', data.uri);
                onClose(data.uri);
            } catch (err) {
                console.log(err);
            };
        }
    }



    return (
        <View style={styles.container}>
            {!image ?
                <CameraView 
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                />
                :
                <Image source={{uri: image}} style={styles.image}/>
            }
            <Text style={styles.guideText}>영역 안에 신분증이 꽉 차도록{"\n"}배치 후 하단 버튼을 눌러 촬영해주세요</Text>

            <View style={styles.shootContainer}>
                <TouchableOpacity
                    // onPress={() => setCamModalVisible(!camModalVisible)}
                    onPress={takePicture}
                >
                    <Image source={photoShoot} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    },
    camera: {
        borderWidth: 20,
        borderColor: Colors.black,
        borderRadius: 10,
        overflow: 'hidden',
        width: 350,
        height: 250,
        marginTop: 100,
    },
    image: {
        width: 300,
        height: 160,
    },
    guideText: {
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
        marginTop: 50,
    },


    shootContainer: {
        position: 'absolute',
        bottom: 200,
        alignSelf: 'center',
        // marginBottom: 200,
    },

});
