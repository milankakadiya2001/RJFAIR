import {
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import FindCard from '../Components/FindCard';
import {COLORS, icons, SIZES} from '../../conts';
import Input from '../Components/Input';
import Buttons from '../Components/Buttons';
import Loader from '../Components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    student_id: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const token = AsyncStorage.getItem('tokenData');

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 3,
      duration: 1300,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const handleClick = () => {
    fadeIn();
    setModalVisible(true);
  };
  const handleBack = () => {
    fadeOut();
    setModalVisible(!modalVisible);
    inputs.student_id = '';
  };

  const validate = data => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.student_id) {
      handleError('Please input student id', 'student');
      isValid = false;
    }

    if (isValid) {
      studentId(data);
    }
  };

  const studentId = value => {
    console.log(value, 'value');
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const studentData = await axios.post(
          `http://15.206.203.93:3001/api/university/scan`,
          value,
          {
            headers: {
              Authorization: `Bearer ${token['_W']}`,
            },
          },
        );

        if (studentData.data.status == 200) {
          Alert.alert('Student add successfully');
        } else if (studentData.data.status == 400) {
          Alert.alert('Student already exist!');
        }
        console.log(studentData.data);
        // console.log(studentData, 'hhhhhhhh');
        console.log(token['_W'], 'asddsadasdsadsadsadsa');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  console.log(inputs);

  return (
    <SafeAreaView style={styles.root}>
      <Loader visible={loading} />
      <ScrollView>
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <View>
            <FindCard source={icons.student} title="100+ " desc="Students" />

            <FindCard
              source={icons.write}
              title="Write Code"
              desc="Get a best course in top university"
              onPress={handleClick}
            />
            <Modal visible={modalVisible}>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeAnim}]}>
                <Input
                  onChangeText={text => handleOnchange(text, 'student_id')}
                  onFocus={() => handleError(null, 'student')}
                  // label="Email"
                  keyboardType="numeric"
                  placeholder="Enter your code"
                  autoCapitalize="none"
                  iconName={icons.findcode}
                  error={errors.student_id}
                />
                <Buttons title="Submit" onPress={() => validate(inputs)} />
                <Buttons title="Back" onPress={handleBack} />
              </Animated.View>
            </Modal>
            <FindCard
              source={icons.scanner}
              title="Scan Code"
              desc="Get a best course in top university"
              onPress={() => navigation.navigate('Scanner')}
            />
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
    height: '100%',
  },
  inputContainer: {
    height: 300,
    backgroundColor: COLORS.darkBlue,
    marginTop: 80,
    borderRadius: SIZES.radius,
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: COLORS.orange,
    width: '90%',
  },
});
