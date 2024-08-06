import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

import homeIcon from '../../assets/images/bar-icons/tabhome-inactive.png';
import homeIconFocused from '../../assets/images/bar-icons/tabhome-active.png';
import matchingIcon from '../../assets/images/bar-icons/tabmatching-inactive.png';
import matchingIconFocused from '../../assets/images/bar-icons/tabmatching-active.png';
import profileIcon from '../../assets/images/bar-icons/tabprofile-inactive.png';
import profileIconFocused from '../../assets/images/bar-icons/tabprofile-active.png';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState('index'); // Default to 'index'

  const handleTabPress = (e) => {
    e.preventDefault(); // Prevent navigation from 'matching'
    
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0, // Remove top border
          height: '12%', // Adjust tab bar height
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: -10 }, // Shadow offset
          shadowOpacity: 0.1, // Shadow opacity
          shadowRadius: 10, // Shadow radius
          elevation: 5, // Android shadow effect
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: Colors.black,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignContent: 'space-around',
          margin: 10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? homeIconFocused : homeIcon}
            />
          ),

        }}
      />
      <Tabs.Screen
        name="matching"
        options={{
          title: '이용/알림',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? matchingIconFocused : matchingIcon}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => handleTabPress(e)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? profileIconFocused : profileIcon}
            />
          ),

        }}
      />
    </Tabs>
  );
}