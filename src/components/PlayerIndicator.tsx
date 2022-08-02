import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { GameContext } from '../Provider/GameProvider'

const PlayerIndicator = () => {

  const { activePlayer, players } = useContext(GameContext)

  const playerOneAnim = useRef(new Animated.Value(0)).current
  const playerTwoAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        playerOneAnim,
        {
          toValue: activePlayer === players.player1.icon ? 1 : 0,
          duration: 250,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        playerTwoAnim,
        {
          toValue: activePlayer === players.player2.icon ? 1 : 0,
          duration: 250,
          useNativeDriver: false
        }
      )
    ]).start()
  },[activePlayer])



  return (
      <View style={styles.indicatorContainer}>
        <Animated.Text style={[styles.icon, { 
            color: playerOneAnim.interpolate({ inputRange: [0, 1], outputRange: ['#fff', players.player1.color] }), 
            fontSize: playerOneAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 60] }) 
          }]}>X</Animated.Text>
        <Animated.Text style={[ styles.icon, {
          color: playerTwoAnim.interpolate({ inputRange: [0, 1], outputRange: ['#fff', players.player2.color] }),
          fontSize: playerTwoAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 60] }) 
          }]}>O</Animated.Text>
      </View>
  )
}

export default PlayerIndicator

const styles = StyleSheet.create({
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 40, fontWeight: 'bold', margin: 10 },
})