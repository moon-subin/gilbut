import { Tabs, useNavigation, useRouter, usePathname } from 'expo-router';
import React, { useState, useEffect } from 'react';
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
  const navigation = useNavigation();
  const pathname = usePathname(); // Get the current pathname
  const [activeTab, setActiveTab] = useState('index'); // Default to 'index'

  useEffect(() => {
    // When the pathname changes, update the activeTab accordingly
    if (pathname.includes('matching')) {
      setActiveTab('matching');
    } else if (pathname.includes('mypage')) {
      setActiveTab('mypage');
    } else {
      setActiveTab('index');
    }
  }, [pathname]);

  const handleTabPress = (tabName, e) => {
    if (tabName === 'matching' || activeTab === 'matching') {
      e.preventDefault(); // Prevent navigation from or to 'matching'
    } else {
      navigation.navigate(tabName);
      setActiveTab(tabName); // Set the active tab state
    }
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? homeIconFocused : homeIcon}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => handleTabPress('index', e)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matching"
        options={{
          title: '이용/알림',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? matchingIconFocused : matchingIcon}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => e.preventDefault()} // Prevent navigation to 'matching'
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              image={focused ? profileIconFocused : profileIcon}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => handleTabPress('mypage', e)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
