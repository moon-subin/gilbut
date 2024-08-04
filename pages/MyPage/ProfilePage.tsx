import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LevelProgressBar from '@/components/LevelProgressBar';

import CurrHelpTimeContainer from '@/components/CurrHelpTimeContainer';

import { Colors } from '@/constants/Colors';
const notifyIcon = require('../../assets/images/headerIconNotify.png');
const settingIcon = require('../../assets/images/headerIconSetting.png');
const editIcon = require('../../assets/images/editIcon.png');


const profile = require('../../assets/images/kittyProfile.png');
const divBox = require('../../assets/images/divBox.png');

export default function ProfilePage() {
    const navigation = useNavigation();

    const userName = '멍충키티';
    const userEmail = 'uidesign@icloud.com';

    const userLevel = 3;
    const currLevelCnt = 6;
    const totalLevelCnt = 9;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* 홈 헤더 */}
            <View style={styles.header}>
                <Text style={styles.titleText}>홈</Text>
                <View style={styles.row}>
                    <TouchableOpacity>
                        <Image source={notifyIcon} style={styles.buttons} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={settingIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                {/* 내 프로필 */}
                <Text style={styles.subTitleText}>내 프로필</Text>
                <View style={styles.profileContainer}>
                    <Image source={profile} style={{marginRight: 10}} />
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.userNameText}>{userName}</Text>
                            <Image source={editIcon} style={{marginLeft: 10}} />
                        </View>
                        <Text style={styles.userEmailText}>{userEmail}</Text>
                    </View>
                </View>

                <CurrHelpTimeContainer />

                {/* 내 등급 */}
                <Text style={styles.subTitleText}>내 등급</Text>
                <LevelProgressBar userLevel={userLevel} totalLevelCnt={totalLevelCnt} currLevelCnt={currLevelCnt} />
            </View>

            <Image source={divBox} style={{width: '100%'}}></Image>

            <View style={styles.body}>
                <Text style={styles.subTitleText2}>봉사/포인트</Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.contentText}>1365/VMS 계정 수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('LevelRewardGuidePage')}}>
                        <Text style={styles.contentText}>등급제도 및 리워드 안내</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.contentText}>후원하기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={divBox} style={{width: '100%'}}></Image>

            <View style={styles.body}>
                <Text style={styles.subTitleText2}>고객센터</Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.contentText}>,,</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.contentText}>공지사항</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.contentText}>FAQ</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        alignItems:'center',
    },
    header: {
        height: '10%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    body: {
        backgroundColor: Colors.white_myprofileBg,
        padding: 20,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    buttons: {
        margin: 10,
    },
    subTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    userNameText: {
        fontSize: 16,
    },
    userEmailText: {
        color: 'gray',
    },
    levelImg: {
        width: 15,
        height: 15,
        marginLeft: 10,
    },

    box: {
        width: '100%',
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // iOS에서는 inset을 사용할 수 없지만 비슷한 효과를 위해서 아래 속성을 사용합니다.
        // 단, inset shadow를 완벽히 구현하기는 어렵습니다.
    },

    subTitleText2: {
        fontSize: 13,
        color: Colors.gray_mypageFont,
        paddingBottom: 10,
    },
    contentText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 15,
    },
});
