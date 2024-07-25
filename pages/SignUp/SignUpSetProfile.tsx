import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import GoToPageButton from '../../components/GoToPageButton';

const user = require('../../assets/images/user.png');
const addPrifile = require('../../assets/images/addProfile.png');

export default function SignUpSetProfile() {
    const navigation = useNavigation(); 
    const [profileImage, setProfileImage] = useState(null); 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.content}>
                    <Text style={styles.signUpTitle}>프로필 설정</Text>
                    <Text style={styles.signUpContent}>
                        나중에 언제든지 변경 가능하니 걱정 마세요 !
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>프로필 사진</Text>
                        <View style={styles.profileContainer}>
                            <Image source={user} style={styles.defaultProfileImage} />
                            {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
                            <TouchableOpacity 
                                style={styles.addImgIcon}
                                onPress={pickImage}    
                            >
                                <Image source={addPrifile} style={styles.addImgIconImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>닉네임</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="닉네임"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>나이</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="나이"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>주요 활동 반경 (시/군/구)</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="주요 활동 반경"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>1365/VMS 계정 (선택)</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="계정"
                        />
                    </View>

                </View>
            </ScrollView>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="길벗 시작하기"
                    onPress={() => navigation.navigate('SignUpSetProfile')}
                    buttonColor={Colors.darkYellow}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: Colors.white,
        flex: 1,
    },
    content: {
        padding: 20,
    },
    signUpTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 50,
    },
    signUpContent: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 30,
    },
    profileContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderColor: 'rgba(202, 202, 202, 1)',
        borderWidth: 2,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative', // This makes it the containing block for the absolute positioning of the addImgIcon
    },
    profileImage: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: Colors.yellow,
        borderWidth: 2,
    },
    defaultProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    addImgIcon: {
        position: 'absolute',
        bottom: 0, // Position it 10 units from the bottom
        right: 0,  // Position it 10 units from the right
        width: 40,
        height: 40,
        backgroundColor: Colors.yellow,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addImgIconImage: {
        width: 20,
        height: 20,
    },
    inputContainer: {
        paddingVertical: 10,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.gray,
        height: 60,
        fontWeight: '500',
        paddingLeft: 15,
    },
    pageBtnContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});
