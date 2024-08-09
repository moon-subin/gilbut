import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import { Colors } from '@/constants/Colors';
import GoToPageButton from '../../components/GoToPageButton';
import { UserContext } from '@/Context/UserContext';

const successCheck = require('../../assets/images/successCheck.png');

export default function SignUpDocsFinPage() {
    const route = useRoute();
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);

    const authCard = route.params.authCard;
    const userType = route.params.userType;
    let docs = '';

    if (userType === 'blind') {
        docs = '복지 카드 진위';
    } else {
        docs = `${authCard}과 범죄경력회보서`;
    }

    const handleNextPage = () => {
        navigation.navigate('SignUpSetProfile', {userType: userType});
        // if (userType === 'blind') {
        //     navigation.navigate('SignUpSetProfileBlind', {userType: userType});
        // } else {
        //     navigation.navigate('SignUpSetProfile');
        // }
    };

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    {authCard} 확인에 {"\n"}
                    최대 1-2일이 소요될 수 있어요 !{"\n\n"}
                    확인이 끝나면 알림을 통해 알려드려요
                </Text>
            </View>
            <Image source={successCheck} style={styles.image} />
            <View style={styles.messageContainer}>
                <Text style={styles.checkText}>알림으로 알려주세요!</Text>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? Colors.darkYellow : undefined}
                />
            </View>
            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="프로필 설정"
                    onPress={handleNextPage}
                    buttonColor={Colors.darkYellow}
                    style={{width: '100%'}}>
                </GoToPageButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 50,
    },
    messageText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
      
    },
    image: {
      width: 250,
      height: 250,
    },
    checkText: {
        fontSize: 16,
    },
    checkbox: {
        margin: 10,
    },
    pageBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
  });