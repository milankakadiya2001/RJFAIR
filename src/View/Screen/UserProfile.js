import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, icons} from '../../conts';
import Buttons from '../Components/Buttons';

const UserProfile = navigation => {
  const handleLogOut = () =>
    Alert.alert('Log out', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'log out', onPress: () => navigation.navigate('Login')},
    ]);
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View
          style={{
            marginTop: 25,
            height: 80,
            width: 80,
            backgroundColor: COLORS.grey,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Image source={icons.user} />
        </View>
        <View style={{width: 250}}>
          <Buttons title="Log out" onPres={handleLogOut} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
