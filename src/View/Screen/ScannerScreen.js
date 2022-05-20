import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS, FONTS, icons, SIZES} from '../../conts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

const ScannerScreen = ({navigation}) => {
  const [student_id, setStudent_id] = useState('');
  const [loading, setLoading] = React.useState(false);

  const token = AsyncStorage.getItem('tokenData');

  const OnScanData = e => {
    setStudent_id(e.data);
    console.log(e.data, '555555555');
  };

  const dataSendHandler = data => {
    console.log(student_id, 'student_id');
    let isValid = true;
    if (student_id == '') {
      isValid = false;
      Alert.alert('No find any scan code');
    }

    if (isValid) {
      allData(student_id);

      console.log(student_id, '1222231');
    }
  };

  const allData = value => {
    console.log(value, 'value');
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const studentData = await axios.post(
          `http://15.206.203.93:3001/api/university/scan`,
          {student_id: value},
          {
            headers: {
              Authorization: `Bearer ${token['_W']}`,
            },
          },
        );

        if (studentData.data.status == 200) {
          Alert.alert(
            'Congratulation',
            'Student add successfully',
            [{text: 'OK', onPress: () => navigation.navigate('Tabs')}],
            {cancelable: false},
          );
          // value =""
          console.log(value, '////');
        } else if (studentData.data.status == 400) {
          Alert.alert('Student already exist!', 'Please try another', [
            // {
            //   text: 'ok',
            //   onPress: () => navigation.navigate('Tabs'),
            // },
            {text: 'scan again', onPress: () => navigation.navigate('Tabs')},
         ]);
        }
        console.log(studentData.data);
      } catch (error) {
        console.log(error);
      }
      console.log(setStudent_id, 'setStudent_id');
    });
  };

  const reverse = value => {
    value = '';
    OnScanData;
    console.log(value, 'reverse');
  };

  return (
    <View>
      <Loader visible={loading} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs')}
        activeOpacity={0.7}
        style={styles.backContainer}>
        <Image source={icons.back} style={styles.backBtn} />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.black,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <QRCodeScanner
          onRead={OnScanData}
          containerStyle={{marginTop: 100}}
          cameraContainerStyle={{
            borderRadius: 40,
            backgroundColor: 'grey',
            overflow: 'hidden',
            marginHorizontal: 50,
            borderWidth: 1,
            borderColor: COLORS.orange,
            height: '45%',
          }}
          cameraStyle={{width: '100%'}}
          cameraType="back"
          topContent={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('')}
              style={{
                backgroundColor: COLORS.darkBlue,
                paddingHorizontal: 25,
                borderRadius: 10,
              }}>
              <Text style={styles.textBold}>write code here</Text>
            </TouchableOpacity>
          }
          bottomContent={
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {!student_id == '' && (
                <View
                  style={{
                    backgroundColor: COLORS.darkBlue,
                    paddingHorizontal: 25,
                    borderRadius: 10,
                  }}>
                  <Text style={styles.textBold}>{student_id}</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={dataSendHandler}
                activeOpacity={0.7}
                style={{
                  backgroundColor: COLORS.darkBlue,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  marginTop: 10,
                  width: 95,
                }}>
                <Text style={styles.textBold}>Send</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  textBold: {
    fontWeight: '500',
    color: COLORS.orange,
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
  },
  backContainer: {
    position: 'absolute',
    top: 35,
    left: 25,
    right: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.orange,
    zIndex: 10,
    borderRadius: 10,
  },
  backBtn: {
    width: 25,
    height: 25,
    tintColor: COLORS.orange,
  },
});
