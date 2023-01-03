import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { colors, fonts } from '../../../utils' 
import Distance from '../Distance'


const ButtonFile = ({padding, fontSize, onPress, title2}) => { 
    
    return (
        <View style={styles.wrap}>      
            <TouchableOpacity 
                style={styles.container(padding)} 
                onPress={onPress}> 

                <Text style={styles.title(fontSize)} >Choose File</Text>
            </TouchableOpacity>
            <Distance width={10}/>
            <Text>{title2}</Text>
        </View>
        
    )
}

export default ButtonFile

const styles = StyleSheet.create({
    container: (padding) =>  ({
        backgroundColor : colors.border,
        padding : padding,
        borderRadius : 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }), 

    title: (fontSize) => ({
        color: colors.white,
        fontSize : fontSize ? fontSize: 15,
        fontFamily: fonts.primary.bold
    }),

    wrap: {
        flexDirection: "row",
        alignItems: "center"
    }
})
