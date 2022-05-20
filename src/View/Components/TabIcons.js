import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import COLORS from '../../conts/colors';
import {SIZES} from '../../conts';

const TabIcons = ({focused, icon, name}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? COLORS.orange : COLORS.black,
          marginVertical: 10,
          // tintColor: COLORS.red,
        }}
      />
      <Text
        style={{
          fontSize: SIZES.body3,
          fontWeight: '500',
          color: focused ? COLORS.orange : COLORS.black,
        }}>
        {name}
      </Text>
    </View>
  );
};

export default TabIcons;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 70,
    marginTop: 10
  },
});
