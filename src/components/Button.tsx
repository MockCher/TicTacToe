import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({ title, color, onPress }) => {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        aspectRatio: 1,
        marginRight: 10,
        shadowColor: '#000',
        shadowOpacity: 0.66,
        shadowRadius: 0.24,
        shadowOffset: { width: 0, height: 2 } 
    },
    title: {

    }
})