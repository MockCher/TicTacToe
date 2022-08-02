import { Animated, Easing, Pressable as PressableOrigin, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { GameContext } from '../Provider/GameProvider'

const Pressable = Animated.createAnimatedComponent(PressableOrigin)


type TileProps = {
    id: number,
    value: null | string,
    onPress: ({ id, value }: { id: number, value: string }) => void
}
const Tile: React.FC<TileProps> = ({ id, value, onPress }) => {

    const { players } = useContext(GameContext)
  
    const wiggleAnim = useRef(new Animated.Value(1)).current
    const tileAnim = useRef(new Animated.Value(0)).current

    const getColor = () => {
    let color = 'grey'
    switch (value){
        case players.player1.icon: color = players.player1.color; break;
        case players.player2.icon: color = players.player2.color; break;
        case 'W': 
        case 'I': 
        case 'N': color = '#ff000099'; break;
    }
    return color
  }

  useEffect(() => {
    if (value !== null){
        Animated.timing(
            tileAnim,
            {
                toValue: 1,
                duration: 250,
                useNativeDriver: false
            }
        ).start()
    }
    else {
        Animated.timing(
            tileAnim,
            {
                toValue: 0,
                duration: 250,
                useNativeDriver: false
            }
        ).start()
    }
  },[value])

  const startWiggleAnimation = () => {
    onPress({id, value})
    Animated.timing(
    wiggleAnim,
    {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.elastic(1.2)
    }
  ).start()
}
  
    return (
        <View style={styles.tileWrapper}>
        <Pressable onPress={startWiggleAnimation} style={[styles.tile, { 
            height: tileAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['90%', '110%', '90%'] }),
            width: tileAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['90%', '110%', '90%'] }),
            }] }>
            <Animated.Text style={[styles.icon, { color: getColor(), opacity: tileAnim, fontSize: tileAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [45, 55, 45] })  }]}>{value}</Animated.Text>
        </Pressable>
    </View>
  )
}

export default Tile

const styles = StyleSheet.create({
    tileWrapper: {
        width: '33%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tile: {
        backgroundColor: '#52796f',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.34,
        shadowRadius: 2.44,
        shadowOffset: { width: 0, height: 6 }
    },
    icon: {
        fontSize: 45,
        color: 'yellow',
        fontWeight: 'bold'
    }
})