import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FindCard from '../Components/FindCard';
import {COLORS, icons, SIZES} from '../../conts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import axios from 'axios';

const HomeScreen = () => {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [loading, setLoading] = React.useState(false);
  const token = AsyncStorage.getItem('tokenData');
  const [student, setStudent] = useState('');

  useEffect(async () => {
    setLoading(true);
    let universityCountry = await AsyncStorage.getItem('universityCountry');
    let universityName = await AsyncStorage.getItem('universityName');
    let universityNo = await AsyncStorage.getItem('universityStoleNo');
    setCountry(universityCountry);
    setName(universityName);
    setNo(universityNo);
    try {
      const studentNo = await axios.get(
        `http://13.233.42.166:3001/api/university/studentVisited`,
        {
          headers: {
            Authorization: `Bearer ${token['_W']}`,
          },
        },
      );
      const noOfStudent = studentNo.data.data.total_student;
      console.log(noOfStudent, 'aaa');
      setStudent(noOfStudent);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Loader visible={loading} />
      <View>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: SIZES.h1,
              color: COLORS.white,
              marginVertical: 5,
            }}>
            University :
          </Text>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text
            style={{
              fontSize: SIZES.h1,
              color: COLORS.white,
              marginVertical: 5,
            }}>
            Country :
          </Text>
          <Text style={[styles.titleStyle, {textTransform: 'capitalize'}]}>
            {country}
          </Text>
          <Text
            style={{
              fontSize: SIZES.h1,
              color: COLORS.white,
              marginVertical: 5,
            }}>
            University No :
          </Text>
          <Text style={styles.titleStyle}>{no}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.7} style={styles.root1}>
            <View style={styles.img1}>
              <Image source={icons.student} />
            </View>
            <View style={styles.container1}>
              <Text style={styles.titleStyle}>{student}</Text>
              <Text style={styles.description1}>Student Visited</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    height: '100%',
    flex: 1,
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
  root1: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
    height: 120,
    // marginTop: 20,
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  img1: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
  },
  header1: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  container1: {
    width: '65%',
  },
  description1: {
    color: COLORS.white,
    marginTop: 5,
    fontSize: 20,
    letterSpacing: 1,
  },
});
