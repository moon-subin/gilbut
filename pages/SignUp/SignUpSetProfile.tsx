import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { ScrollView, Alert, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setHelperProfile, setBlindProfile } from '@/Services/SignUp/SetProfileApis';

import GoToPageButton from '../../components/GoToPageButton';
import cityList from '@/assets/datas/cityList';
import { UserContext } from '@/Context/UserContext'; // Import the UserContext

const user = require('../../assets/images/user.png');
const addProfile = require('../../assets/images/addProfile.png');

export default function SignUpSetProfile() {
    const route = useRoute();
    const navigation = useNavigation(); 

    const userType = route.params.userType;
    const { setUserType } = useContext(UserContext);

    const [profileImage, setProfileImage] = useState(null); 
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [linkedAccount, setLinkedAccount] = useState('');

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSubArea, setSelectedSubArea] = useState(null);
    const [inputValue, setInputValue] = useState(''); // State for input field
    const [inputCityValue, setInputCityValue] = useState(''); // State for input field

    const [selectedVision, setSelectedVision] = useState(null);
    const [inputVisionValue, setInputVisionValue] = useState(''); // State for input field

    const [cityListVisible, setCityListVisible] = useState(false);
    const [visionListVisible, setVisionListVisible] = useState(false);

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

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedSubArea(null);
    };

    const handleSubAreaSelect = (subArea) => {
        setSelectedSubArea(subArea);
    }

    const handleVisionSelect = (vision) => {
        setSelectedVision(vision);
    }

    useEffect(() => {
        if (selectedCity && selectedSubArea) {
            setInputValue(`${selectedCity.name} ${selectedSubArea}`);
        } else if (selectedCity) {
            setInputValue(selectedCity.name); // Show city name if sub-area is not selected
        } else {
            setInputValue('');
        }
    }, [selectedCity, selectedSubArea]);

    useEffect(() => {
        if (selectedVision) {
            setInputVisionValue(selectedVision);
        } else {
            setInputVisionValue('');
        }
    }, [selectedVision]);

    const isCitySelected = (city) => city === selectedCity;
    const isSubAreaSelected = (subArea) => subArea === selectedSubArea;
    const isVisionSelected = (vision) => vision === selectedVision;

    const handleStartButton = async () => {
        setUserType(userType);
        navigation.navigate('(tabs)');

        if (userType === 'helper') {
            const helperProfileData = {
                profileUrl: profileImage,
                nickname: nickname, 
                age: age,
                region: inputCityValue,
                linkedAccount: linkedAccount
            };

            try {
                await setHelperProfile(helperProfileData);
                navigation.navigate('(tabs)');
            } catch (error) {
                Alert.alert('회원가입 중 오류가 발생했습니다.');
            }
        } else if (userType === 'blind') {
            const blindProfileData = {
                profileUrl: profileImage,
                nickname: nickname, // Replace with actual nickname input value
                age: age, // Replace with actual age input value
                region: inputCityValue,
                blindType: selectedVision || 'Unknown' // Replace with actual vision type
            };

            try {
                await setHelperProfile(blindProfileData);
                navigation.navigate('(tabs)');
            } catch (error) {
                Alert.alert('회원가입 중 오류가 발생했습니다.');
            }
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.signUpTitle}>프로필 설정</Text>
                    <Text style={styles.signUpContent}>
                        나중에 언제든지 변경 가능하니 걱정 마세요!
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
                                <Image source={addProfile} style={styles.addImgIconImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>닉네임</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="닉네임"
                            value={nickname}
                            onChangeText={setNickname}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>나이</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="나이"
                            value={age}
                            onChangeText={setAge}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>주요 활동 반경 (시/군/구)</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="주요 활동 반경"  
                                value={inputValue} // Bind the input value
                                onChangeText={text => setInputValue(text)} // Handle text change
                                editable={false}
                            />
                            <TouchableOpacity 
                                onPress={() => setCityListVisible(!cityListVisible)} 
                                style={styles.iconContainer}
                            >
                                <Ionicons 
                                    name={cityListVisible ? "chevron-up-outline" : "chevron-down-outline"} 
                                    color={Colors.white} 
                                    size={15} 
                                />
                            </TouchableOpacity>
                        </View>
                        {/* 토글 아이콘 클릭 시 도시 목록 보여짐 */}
                        {cityListVisible && (
                            <View style={styles.cityListContainer}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{width:'50%'}}>
                                    <FlatList
                                        data={cityList}
                                        keyExtractor={(item) => item.name}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                style={[
                                                    styles.cityItem, 
                                                    isCitySelected(item) && styles.selectedItem
                                                ]}
                                                onPress={() => handleCitySelect(item)}
                                            >
                                                <Text style={styles.cityName}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style={styles.cityList}
                                    />
                                </ScrollView>
                                <View style={styles.verticalLine} />
                                <ScrollView showsVerticalScrollIndicator={false} style={{width:'50%'}}>
                                    <FlatList
                                        data={selectedCity ? selectedCity.subArea : []}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                style={[
                                                    styles.subAreaItem, 
                                                    isSubAreaSelected(item) && styles.selectedItem
                                                ]}
                                                onPress={() => handleSubAreaSelect(item)}
                                            >
                                                <Text style={styles.subAreaName}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style={styles.subAreaList}
                                    />
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {userType === 'blind' && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>시력 정도</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="시력 정도"
                                    value={inputVisionValue}
                                    onChangeText={text => setInputVisionValue(text)} 
                                    editable={false}
                               />
                                <TouchableOpacity 
                                    onPress={() => setVisionListVisible(!visionListVisible)} 
                                    style={styles.iconContainer}
                                >
                                    <Ionicons 
                                        name={visionListVisible ? "chevron-up-outline" : "chevron-down-outline"} 
                                        color={Colors.white} 
                                        size={15} 
                                    />
                                </TouchableOpacity>
                            </View>
                            {visionListVisible && (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <FlatList
                                        data={['전맹', '맹', '준맹', '저시력']}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                style={[
                                                    styles.item, 
                                                    isVisionSelected(item) && styles.selectedItem
                                                ]}
                                                onPress={() => handleVisionSelect(item)}
                                            >
                                                <Text style={styles.name}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style={styles.visionContainer}
                                    />
                                </ScrollView>
                            )}
                        </View>
                    )}

                    {userType === 'helper' && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>1365/VMS 계정 (선택)</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="계정"
                                value={linkedAccount}
                                onChangeText={setLinkedAccount}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>

            <View style={styles.pageBtnContainer}>
                <GoToPageButton 
                    title="길벗 시작하기"
                    onPress={handleStartButton}
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
        paddingBottom: 100,
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
        width: 120,
        height: 120,
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
        width: '100%',
        fontWeight: '500',
        paddingLeft: 15,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        width: 24,
        height: 24,
        backgroundColor: 'rgba(23, 23, 23, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: [{ translateX: -0.5 }],
        backgroundColor: Colors.lightGray,
        width: 1,
        zIndex: 1,
    },
    cityListContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.yellow,
        height: 200,
        marginTop: 10,
        position: 'relative',
    },
    cityList: {
        flex: 1,
        // marginRight: 1,
    },
    cityItem: {
        padding: 10,
    },
    selectedItem: {
        backgroundColor: 'rgba(255, 219, 125, 1)',
    },
    cityName: {
        fontSize: 16,
        fontWeight: '500',
    },
    subAreaList: {
        flex: 1,
        // marginLeft: 1,
    },
    subAreaItem: {
        padding: 10,
    },
    subAreaName: {
        fontSize: 16,
        fontWeight: '500',
    },
    item: {
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    visionContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.yellow,
        height: 'auto',
        marginTop: 10,
    },
    pageBtnContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});