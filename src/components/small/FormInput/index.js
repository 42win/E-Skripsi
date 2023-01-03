import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { fonts, widthMobileUI, heightMobileUI, colors } from '../../../utils'

const FormInput = ({textArea, width, height, fontSize, placeholder, label, value, secureTextEntry, keyboardType, onChangeText, disbaled}) => {

    if(textArea){
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)} >{label} :</Text>
                <TextInput 
                    style={styles.inputArea(fontSize)}
                    multiline={true}
                    numberOfLines={3}
                    value={value}
                    onChangeText={onChangeText}
                    editable={disbaled ? false : true} />
            </View> 
        ) 
    } 
    return (
        <View style={styles.container}>
            <Text style={styles.label(fontSize)} >{label} :</Text>
            <TextInput 
                style={styles.input(width, height, fontSize)} 
                value={value} 
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                editable={disbaled ? false : true}  />
        </View>
    )
  
}

export default FormInput

const styles = StyleSheet.create({
    container: {
        marginTop: 10, 
    },

    label: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        fontFamily: fonts.primary.regular,
    }),

    input: (width, height, fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        fontFamily: fonts.primary.regular,
        width: width,
        height: height,
        borderWidth: 1,
        borderRadius: 5,
        borderColor : colors.border,

        // how text inside show
        paddingVertical: 5,
        paddingHorizontal: 10
    }),

    inputArea: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        fontFamily: fonts.primary.regular, 
        borderWidth: 1,
        borderRadius: 5,
        borderColor : colors.border,

        // how text inside show
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlignVertical: 'top'
    })
})
