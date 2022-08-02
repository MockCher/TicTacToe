import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type InfoTileProps = {
    label: string,
    value: string,
    color: string
}
const InfoTile: React.FC<InfoTileProps> = ({ label, value, color }) => {
  return (
    <View style={styles.wrapper}>
        <View style={[styles.tile, { backgroundColor: color }]}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
        </View>
    </View>
  )
}

export default InfoTile

const styles = StyleSheet.create({
    wrapper: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tile: {
        backgroundColor: '#52796f',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.66,
        shadowRadius: 0.24,
        shadowOffset: { width: 0, height: 2 },
        padding: 5,
    },
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase'

    }
})