import React, { useState, useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Location from 'expo-location';

import PathToRequesterMap from '@/pages/Matching/PathToRequesterMap';
import FinePage from '@/pages/Matching/FinePage';
import RewardPage from '@/pages/Matching/RewardPage';

import PaymentPage from '@/pages/Matching/PaymentPage';
import WaitingMatchingPage from '@/pages/Matching/WaitingMatchingPage';
import MatchingSuccessPage from '@/pages/Matching/MatchingSuccessPage';
import WaitingGilbutPage from '@/pages/Matching/WaitingGilbutPage';
import PathToDestinationMap from '@/pages/Matching/PathToDestinationMap';
import FinishedMatchingPage from '@/pages/Matching/FinishedMatchingPage';

import { UserLocationContext } from '@/Context/UserLocationContext';

const Stack = createNativeStackNavigator();


export default function TabTwoScreen() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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

    return (
        <UserLocationContext.Provider value={{ location, setLocation }}>
            <Stack.Navigator>
                <Stack.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }} />
                <Stack.Screen name="WaitingMatchingPage" component={WaitingMatchingPage} options={{ headerShown: false }} />
                <Stack.Screen name="MatchingSuccessPage" component={MatchingSuccessPage} options={{ headerShown: false }} />
                <Stack.Screen name="WaitingGilbutPage" component={WaitingGilbutPage} options={{ headerShown: false }} />
                <Stack.Screen name="PathToDestinationMap" component={PathToDestinationMap} options={{ headerShown: false }} />
                <Stack.Screen name="FinishedMatchingPage" component={FinishedMatchingPage} options={{ headerShown: false }} />
                
                <Stack.Screen name="PathToRequesterMap" component={PathToRequesterMap} options={{ headerShown: false }} />
                <Stack.Screen name="FinePage" component={FinePage} options={{ headerShown: false }} />
                <Stack.Screen name="RewardPage" component={RewardPage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </UserLocationContext.Provider>
    );
}
