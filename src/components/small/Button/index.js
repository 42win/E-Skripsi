import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IconBack, IconSubmit, IconSearch } from '../../../assets'
import { colors } from '../../../utils'
import TextOnly from './TextOnly'
import TextIcon from './TextIcon'
import ButtonLoading from './ButtonLoading'
import ButtonFile from  './ButtonFile'

const Button = (props) => {
    const {icon, padding, type, onPress, loading} = props

    const Icon = () => {
        if(icon === "arrow-left") {
            return <IconBack/>
        }

        return <IconBack/>
    }

       
    // loading 
    if(loading){
        return <ButtonLoading {...props} />
    }

    if(type === "text") {
        return <TextOnly {...props} />

    }else if(type === "textIcon"){
        return <TextIcon {...props} />

    }else if(type === "file"){
        return <ButtonFile {...props} />
    }

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress} >
            <Icon />
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: (padding) =>  ({
        backgroundColor : colors.white,
        padding : padding,
        borderRadius : 5
    }), 
})

