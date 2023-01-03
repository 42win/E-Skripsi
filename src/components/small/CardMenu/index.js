import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { IconArrowRight } from '../../../assets'
import { colors, responsiveHeight, fonts, clearStorage } from '../../../utils'
import FIREBASE from '../../../config/FIREBASE'
import { connect } from 'react-redux'
import { deleteParameterSkripsi } from '../../../c_actions/A_Skripsi'

const  CardMenu = ({menu, navigation, dispatch}) => {

    const onSubmit = () => { 
        if(menu.halaman === "Login"){
            FIREBASE.auth().signOut().then(() => {
              // Sign-out successful.
              clearStorage()
              navigation.replace("Login")
            }).catch((error) => {
              // An error happened.
              alert(error)
            }); 
 
        }else {
            if(menu.halaman === "Skripsi"){
                dispatch(deleteParameterSkripsi())
            }
            navigation.navigate(menu.halaman)
        } 
    }
 
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => onSubmit()} >
            <View style={styles.menu}>
                {menu.gambar}
                <Text style={styles.text} >{menu.nama}</Text> 
            </View>
            <IconArrowRight/>
        </TouchableOpacity> 
    ) 
}

export default connect()(CardMenu)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between",
        backgroundColor: colors.white,

        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // end

        marginHorizontal: 30,
        padding: responsiveHeight(15),
        borderRadius: 10,
        alignItems: "center"
    },

    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 18,
        marginLeft: 20
    },

    menu: {
        flexDirection: "row",
        alignItems: "center"
    }
})
