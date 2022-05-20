import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../conts/icons';
const Input = ({
  label,
  iconName,
  error,
  password,
  keyboardType,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <Image
          source={iconName}
          style={{
            tintColor: COLORS.darkBlue,
            height: 22,
            width: 22,
            marginRight: 10,
          }}
        />
        <TextInput
          keyboardType={keyboardType}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
        />
        {password && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidePassword(!hidePassword)}>
            <Image
              source={hidePassword ? icons.passvisible : icons.passinvisible}
              style={{tintColor: COLORS.darkBlue, height: 22, width: 22}}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default Input;
