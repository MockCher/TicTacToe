import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import PlayerIndicator from './PlayerIndicator'
import Button from './Button'
import { GameContext } from '../Provider/GameProvider'

const Header = () => {
  const {reset} = useContext(GameContext)
  return (
    <View style={styles.header}>
      <PlayerIndicator />
      <View style={styles.placeHolder} />
      <Button title={'Reset'} color='#ccc' onPress={reset} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: { flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-evenly', height: 100, width: '100%' },
    placeHolder: { flex: 1 }
})