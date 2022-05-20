import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import ScannerScreen from '../ScannerScreen';
import UserProfile from '../UserProfile';
import COLORS from '../../../conts/colors';
import TabIcons from '../../Components/TabIcons';
import icons from '../../../conts/icons';
import {SIZES} from '../../../conts';
import FindScreen from '../FindScreen';

const Tab = createBottomTabNavigator();

const TabsScreen = ({route, navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          style: 1,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center',
          //   paddingVertical: 10,
          //   paddingHorizontal: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // children={() => <HomeScreen uniDataD={route.params && route.params.universityData}/>}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcons focused={focused} icon={icons.home} name="Home" />;
          },
        }}
      />
      <Tab.Screen
        name="Find"
        component={FindScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcons focused={focused} icon={icons.scanner} name="Scan" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcons focused={focused} icon={icons.profile} name="Profile" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsScreen;

const styles = StyleSheet.create({});
