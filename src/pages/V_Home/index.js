import React, { Component } from 'react'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { D_MenuHome } from '../../data'
import { colors, responsiveWidth, responsiveHeight, fonts, heightMobileUI } from '../../utils'
import { Text, StyleSheet, View, Image } from 'react-native'
import { ListMenu, Distance } from '../../components'
import { Logo1 } from '../../assets/images'

export default class V_Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = { 
             menus: D_MenuHome
        }
    } 

    render() {
        const {menus} = this.state

        return (
            <View style={styles.page}>
                <View style={styles.container}>  
                    <View style={styles.image}> 
                        <Logo1/>
                    </View>

                    <Distance height={responsiveHeight(15)}/>

                    <View style={styles.textHeader}>
                        <Text style={styles.textDesc} >Selamat Datang di E-Skripsita'</Text>
                        <Text style={styles.textDesc} >Kumpulan Skripsi Mahasiswa</Text>
                        <Text style={styles.textDesc} >Jurusan Pend. Teknik Elektronika</Text>
                    </View>

                    <Distance height={responsiveHeight(15)}/>

                    <ListMenu menus={menus} navigation={this.props.navigation} /> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: { 
        flex: 1,  
        backgroundColor: colors.primary
    },

    container: {
        position: "absolute",
        bottom: 0,
        height: responsiveHeight(680),
        width: "100%",
        backgroundColor: colors.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },

    textHeader:{
        alignItems: "center" 
    },

    textDesc:{ 
        fontFamily: fonts.primary.bold,
        color : colors.primary,
        fontSize: RFValue(22,heightMobileUI)
    },

    image: {  
        borderRadius: 30,
        alignSelf: "center",
        marginTop: -responsiveWidth(120),
        backgroundColor: 'white', 
        padding: 15,
        marginBottom: 20,
        
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
    },
 

    profile: {
        marginTop: 10,
        alignItems: "center"
    },

    nama: {
        fontFamily : fonts.primary.bold,
        fontSize: RFValue(24,heightMobileUI)
    },

    desc: {
        fontFamily : fonts.primary.regular,
        fontSize: RFValue(18,heightMobileUI)
    }

})