import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { WebView } from 'react-native-webview';
import { Colors } from '@/constants/Colors';

const camLframe = require('../assets/images/camLframe.png');
const camRframe = require('../assets/images/camRframe.png');

const photoShoot = require('../assets/images/photoShoot.png');


export default function CameraModal() {

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    // if (!permission) {
    //     // Camera permissions are still loading.
    //     return <View />;
    // }
    
    // if (!permission.granted) {
    //     // Camera permissions are not granted yet.
    //     return (
    //       <View style={styles.container}>
    //         <Text style={{ textAlign: 'center' }}>카메라 접근을 허용하시겠습니까?</Text>
    //         <Button onPress={requestPermission} title="네" />
    //       </View>
    //     );
    // }
    
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <TouchableOpacity onPress={toggleCameraFacing} />
            </CameraView>

            <View style={styles.guideTextContainer}>
                <Text style={styles.guideText}>영역 안에 신분증이 꽉 차도록 배치 후 하단 버튼을 눌러 촬영해주세요</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      width: '90%',
      paddingVertical: 150,
    },
    camera: {
        borderWidth: 20,
        borderColor: Colors.black,
        borderRadius: 10,
        overflow: 'hidden',
        height: '80%',
    },
    guideTextContainer: {
        padding: 20,
    },
    guideText: {
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
    }
  });