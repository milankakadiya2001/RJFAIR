import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../../conts'

const FindCard = ({source, title, desc, onPress}) => {
  return (
    <TouchableOpacity  activeOpacity={0.7} style={styles.root} onPress={onPress} >
      <View  style={styles.img} >
          <Image source={source} />
      </View>
      <View style={styles.container} >
          <Text style={styles.header} >{title}</Text>
          <Text style={styles.description} >{desc}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FindCard

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        backgroundColor: COLORS.darkBlue,
        height: 120,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: SIZES.radius
    },
    img: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius
    },
    header: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        fontWeight: 'bold'
    },
    container: {
        width: '65%',
        
    },
    description: {
        color: COLORS.white,
        marginTop: 5,
        fontSize: 20,
        letterSpacing: 1
    }
})