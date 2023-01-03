import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { colors, fonts } from '../../../utils' 


const ButtonLoading = ({padding, fontSize, progress}) => { 

    if(progress){ 
        return (
            <View style={styles.container(padding)} >
                <ActivityIndicator 
                    size="small"
                    color="#FFFFFF"/>
                <Text style={styles.title(fontSize)} >{progress===100? " wait a moment": " Loading "+progress+"%"}</Text>
            </View>
        )
    }else{
        return (
            <TouchableOpacity style={styles.container(padding)} >
                <ActivityIndicator 
                    size="small"
                    color="#FFFFFF"/>
                <Text style={styles.title(fontSize)} >Loading ...</Text>
            </TouchableOpacity>
        )
    } 
  
}

export default ButtonLoading

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
    })
})
