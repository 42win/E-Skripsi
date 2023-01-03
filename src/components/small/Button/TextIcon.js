import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconBack, IconSubmit, IconSearch, IconDownload } from '../../../assets'
import { colors, fonts } from '../../../utils' 

const TextIcon = ({icon, padding, onPress, title, fontSize, disabled}) => { 
  
    const Icon = () => {
        if(icon === "arrow-left") {
            return <IconBack/> 
        }else if(icon === "submit"){
            return <IconSubmit/> 
        }else if(icon === "search") {
            return <IconSearch/>
        }else if(icon === "download") {
            return <IconDownload/>
        }

        return <IconBack/>
    }
 
    return (
        <TouchableOpacity style={styles.container(padding, disabled)} onPress={onPress} >
            <Icon /> 
            <Text style={styles.title(fontSize)} > {title}</Text>
        </TouchableOpacity>
    )
}

export default TextIcon

const styles = StyleSheet.create({
    container: (padding, disabled) =>  ({
        backgroundColor : disabled ? colors.border : colors.primary,
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
