import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfilePage from '../../pages/MyPage/ProfilePage';
import Logs from '@/pages/MyPage/LogsPage';
import CurrHelpTimePage from '@/pages/MyPage/CurrHelpTimePage';

const Stack = createNativeStackNavigator();


export default function TabThreeScreen() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name="Logs" component={Logs} options={{ headerShown: false }} />
            <Stack.Screen name="CurrHelpTimePage" component={CurrHelpTimePage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
