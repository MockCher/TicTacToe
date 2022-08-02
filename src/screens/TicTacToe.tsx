import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Board from '../components/Board'
import Header from '../components/Header'
import Footer from '../components/Footer'



const TicTacToe = () => {

    return (
    <View style={ styles.wrapper }>
      <Header />
      <Board  />
      <Footer />
    </View>
  )
}

export default TicTacToe

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        maxWidth: 350,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})