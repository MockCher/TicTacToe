import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import Tile from './Tile'
import { GameContext } from '../Provider/GameProvider'

const Board = () => {

    const { tiles, updateGameState } = useContext(GameContext)


    return (
    <View style={styles.board}>
        { Object.entries(tiles).map(tile => 
            <Tile 
                key={tile[0]} 
                id={tile[0]} 
                value={tile[1]} 
                onPress={updateGameState} 
            />) }
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
    board: {
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})