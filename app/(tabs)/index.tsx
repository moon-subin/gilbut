import React, { useState, useEffect, useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Location from 'expo-location';

import HomeScreen from '@/pages/Home/MainPage';
import PathToRequesterMap from '@/pages/Matching/PathToRequesterMap';
import MainPageBlind from '@/pages/Home/MainPageBlind';
import RequestLetterPage from '@/pages/Home/RequestLetterPage';
import PaymentPage from '@/pages/Matching/PaymentPage';
import TabTwoScreen from './matching';
import { UserLocationContext } from '@/Context/UserLocationContext';
import { UserContext } from '@/Context/UserContext';

const Stack = createNativeStackNavigator();


export default function HomePage() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { userType } = useContext(UserContext);
    // console.log('userTypeeeee: ', userType);

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        //   console.log(location);
        })();
    }, []);

    const getInitialScreen = () => {
        // Determine which screen to show based on userType
        return userType === 'blind' ? 'MainPageBlind' : 'HomeScreen';
    };

    return (
        <UserLocationContext.Provider value={{ location, setLocation }}>
            <Stack.Navigator>
                {userType === 'blind' ? (
                    <Stack.Screen name="MainPageBlind" component={MainPageBlind} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                )}
                <Stack.Screen name="RequestLetterPage" component={RequestLetterPage} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }} />
                <Stack.Screen name="TabTwoScreen" component={TabTwoScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </UserLocationContext.Provider>
    );
}
