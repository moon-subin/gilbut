import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '@/Context/UserContext';

import GoToPageButton from '../../components/GoToPageButton';

const verifyCheck = require('../../assets/images/verify-check.png');
const verifyCheckYellow = require('../../assets/images/verify-check-yellow.png');

export default function SignUpVerifyPage() {

    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState(null);
    const [isNextButtonYellow, setIsNextButtonYellow] = useState(false);
    const [userType, setUserType] = useState(null); // 'visuallyImpaired' or 'normal'

    // const { setUserType } = useContext(UserContext);


    useEffect(() => {
        setIsNextButtonYellow(selectedOption !== null);
        
        if (selectedOption === 'welfare') {
            setUserType('blind');
        } else if (selectedOption === 'idCard' || selectedOption === 'driverLicense') {
            setUserType('helper');
        } else {
            setUserType(null);
        }
    }, [selectedOption]);

    const getAuthCard = (option) => {
        switch (option) {
            case 'welfare':
                return '복지카드';
            case 'idCard':
                return '신분증';
            case 'driverLicense':
                return '운전면허증';
            default:
                return '';
        }
    };

    const handleNextPage = () => {
        if (isNextButtonYellow) {
            navigation.navigate('SignUpCamPage', {
                authCard: getAuthCard(selectedOption),
                userType: userType
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.signUpTitle}>본인 인증</Text>
                <Text style={styles.signUpContent}>
                    안전한 어플 이용을 위해 본인 인증을 진행합니다{"\n"}
                    인증할 신분증을 선택해주세요
                </Text>

                <Text style={styles.idTitle}>시각장애인</Text>
                <TouchableOpacity
                    style={[styles.button, selectedOption === 'welfare' && styles.selectedButton]}
                    onPress={() => setSelectedOption('welfare') }
                >
                    <Text style={styles.buttonText}>복지카드</Text>
                    <Image
                        source={selectedOption === 'welfare' ? verifyCheckYellow : verifyCheck}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <Text style={styles.idTitle}>정안인</Text>
                <TouchableOpacity
                    style={[styles.button, selectedOption === 'idCard' && styles.selectedButton]}
                    onPress={() => setSelectedOption('idCard')}
                >
                    <Text style={styles.buttonText}>신분증</Text>
                    <Image
                        source={selectedOption === 'idCard' ? verifyCheckYellow : verifyCheck}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selectedOption === 'driverLicense' && styles.selectedButton]}
                    onPress={() => setSelectedOption('driverLicense')}
                >
                    <Text style={styles.buttonText}>운전면허증</Text>
                    <Image
                        source={selectedOption === 'driverLicense' ? verifyCheckYellow : verifyCheck}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="다음"
                    onPress={handleNextPage}
                    buttonColor={isNextButtonYellow ? Colors.darkYellow : Colors.lightGray}
                    style={{width: '100%'}}>
                </GoToPageButton>
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
        marginTop: 100,
    },
    signUpContent: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 30,
    },
    idTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 60,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.gray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
    },
    selectedButton: {
        borderColor: Colors.darkYellow,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
    },
    icon: {
        width: 24,
        height: 24,
    },
    pageBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    }
});
