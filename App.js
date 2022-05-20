import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/View/Screen/LoginScreen';
import HomeScreen from './src/View/Screen/HomeScreen';
import ScannerScreen from './src/View/Screen/ScannerScreen';
import UserProfile from './src/View/Screen/UserProfile';
import TabsScreen from './src/View/Screen/Navigation/TabsScreen';
import FindScreen from './src/View/Screen/FindScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/View/Components/Loader';

const Stack = createNativeStackNavigator();
const App = () => {
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      authUser();
      
    }, 1000);
  }, []);
  
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('tokenData');
      console.log(userData, "helooooooooo");
     
      
      if (userData) {
        setInitialRouteName('Tabs');
      } else {
        setInitialRouteName('Login');
      }
    } catch (error) {
      setInitialRouteName('Login');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tabs" component={TabsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen name="Find" component={FindScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
