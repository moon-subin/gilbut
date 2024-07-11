import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

import homeIcon from '../../assets/images/bar-icons/tabhome-inactive.png';
import homeIconFocused from '../../assets/images/bar-icons/tabhome-active.png';
import matchingIcon from '../../assets/images/bar-icons/tabmatching-inactive.png';
import matchingIconFocused from '../../assets/images/bar-icons/tabmatching-active.png';
import profileIcon from '../../assets/images/bar-icons/tabprofile-inactive.png';
import profileIconFocused from '../../assets/images/bar-icons/tabprofile-active.png';



export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0, // 탭 바 위쪽 테두리 제거
            height: '12%', // 탭 바 높이 조정
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
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
