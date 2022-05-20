import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FindCard from '../Components/FindCard';
import {COLORS, icons, SIZES} from '../../conts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [no, setNo] = useState('');

  useEffect(async () => {
    let universityCountry = await AsyncStorage.getItem('universityCountry');
    let universityName = await AsyncStorage.getItem('universityName');
    let universityNo = await AsyncStorage.getItem('universityStoleNo');
    setCountry(universityCountry);
    setName(universityName);
    setNo(universityNo);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text
          style={{fontSize: SIZES.h1, color: COLORS.white, marginVertical: 5}}>
          University :
        </Text>
        <Text style={styles.titleStyle}>{name}</Text>
        <Text
          style={{fontSize: SIZES.h1, color: COLORS.white, marginVertical: 5}}>
          Country :
        </Text>
        <Text style={[styles.titleStyle, {textTransform: 'capitalize'}]}>
          {country}
        </Text>
        <Text
          style={{fontSize: SIZES.h1, color: COLORS.white, marginVertical: 5}}>
          University No :
        </Text>
        <Text style={styles.titleStyle}>{no}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
    height: '100%',
  },
  container: {
    backgroundColor: COLORS.darkBlue,
    width: '100%',
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
  },
  fontStyle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.orange,
    marginBottom: 10,
  },
});
