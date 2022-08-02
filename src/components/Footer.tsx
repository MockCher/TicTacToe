import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { GameContext } from '../Provider/GameProvider'
import InfoTile from './InfoTile'

const Footer = () => {

    const { gameResults, players } = useContext(GameContext)

  return (
    <View style={styles.footer}>
        <InfoTile color={players.player1.color} label={`${players.player1.name}`} value={gameResults.PLAYER1} />
        <InfoTile color={'lightgrey'} label='Ties' value={gameResults.TIES} />
        <InfoTile color={players.player2.color} label={`${players.player2.name}`} value={gameResults.PLAYER2} />
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%'
    }
})