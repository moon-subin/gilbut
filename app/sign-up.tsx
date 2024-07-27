import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpInputPage from '@/pages/SignUp/SignUpInputPage';
import SignUpVerifyPage from '@/pages/SignUp/SignUpVerifyPage';
import SignUpCamPage from '@/pages/SignUp/SignUpCamPage';
import SignUpCriminalRecChkPage from '@/pages/SignUp/SignUpCriminalRecChkPage';
import SignUpDocsFinPage from '@/pages/SignUp/SignUpDocsFinPage';
import SignUpFinPage from '@/pages/SignUp/SignUpFinPage';
import SignUpSetProfile from '@/pages/SignUp/SignUpSetProfile';
import SignUpSetProfileDisabled from '@/pages/SignUp/SignUpSetProfileDisabled';

const Stack = createNativeStackNavigator();

export const unstable_settings = {
    initialRouteName: 'SignUpInputPage',
};

export default function SignUp() {


    return (
        <Stack.Navigator>
            <Stack.Screen name="SignUpInputPage" component={SignUpInputPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpVerifyPage" component={SignUpVerifyPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpCamPage" component={SignUpCamPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpCriminalRecChkPage" component={SignUpCriminalRecChkPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpDocsFinPage" component={SignUpDocsFinPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpFinPage" component={SignUpFinPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpSetProfile" component={SignUpSetProfile} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpSetProfileDisabled" component={SignUpSetProfileDisabled} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}
