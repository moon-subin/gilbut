import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import { Colors } from '@/constants/Colors';
import GoToPageButton from '../../components/GoToPageButton';

const successCheck = require('../../assets/images/successCheck.png');

export default function SignUpDocsFinPage() {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    신분증과 범죄경력회보서 확인에 {"\n"}
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
                    onPress={() => navigation.navigate('SignUpSetProfile')}
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