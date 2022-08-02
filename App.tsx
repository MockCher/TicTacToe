import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GameProvider from './src/Provider/GameProvider';
import TicTacToe from './src/screens/TicTacToe';

export default function App() {
  return (
    <GameProvider>
    <View style={styles.container}>
      <TicTacToe />
      <StatusBar style="auto" />
    </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f3e46'
  },
});
