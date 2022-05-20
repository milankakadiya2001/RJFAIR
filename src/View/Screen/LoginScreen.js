import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../conts/colors';
import Input from '../Components/Input';
import icons from '../../conts/icons';
import Buttons from '../Components/Buttons';
import Loader from '../Components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = data => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.username) {
      handleError('Please input username', 'username');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }

    if (isValid) {
      login(data);
    }
  };
  const login = value => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const loginData = await axios.post(
          `http://15.206.203.93:3001/api/university/login`,
          value,
        );
        if (loginData.data.status == 200) {
          console.log('Logged in successfully!');
          const university = loginData.data.data;
          const token = loginData.data.token;
          const uCountry = university.universityCountry;
          const uName = university.universityName;
          const uNo = university.universityStoleNo;
          try {
            console.log(token, 'ededededededededed');
            await AsyncStorage.setItem('tokenData', token);
            await AsyncStorage.setItem('universityCountry', uCountry);
            await AsyncStorage.setItem('universityName', uName);
            await AsyncStorage.setItem('universityStoleNo', uNo);
          } catch (e) {
            console.log(e);
          }
          navigation.navigate('Tabs', {universityData: university});
        } else if (loginData.data.status == 401) {
          Alert.alert('Error', loginData.data.msg);
          console.log(loginData.data.msg, "University doesn't exist!");
        } else if (loginData.data.status == 400) {
          Alert.alert('Error', loginData.data.msg);
          console.log(loginData.data.msg, 'Login failed! Please try again!');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        console.log(error);
      }
    }, 1000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  console.log(inputs);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // height: '100%',
          }}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>Enter Your Details to Login</Text>
          <View style={{marginVertical: 20}}>
            <Input
              onChangeText={text => handleOnchange(text, 'username')}
              onFocus={() => handleError(null, 'username')}
              label="user name"
              placeholder="Enter your user name"
              error={errors.username}
              autoCapitalize="none"
              iconName={icons.user}
            />
            <Input
              label="password"
              iconName={icons.password}
              placeholder="Enter your password"
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
              onChangeText={text => handleOnchange(text, 'password')}
              password
            />
            <Buttons title="Login" onPress={() => validate(inputs)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  description: {
    fontSize: 18,
    color: COLORS.grey,
    marginVertical: 10,
  },
});
