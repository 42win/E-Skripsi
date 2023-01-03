import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { colors, responsiveWidth, responsiveHeight, fonts, } from '../../utils/'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightMobileUI } from '../../utils/constant';
import { Button } from '../../components';
import { Logo1 } from '../../assets/images'

export default class V_About extends Component {
    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.page}>
                <View style={styles.button}>
                    <Button
                        icon="arrow-left"
                        padding={7}
                        onPress={() => navigation.goBack()}  
                    />
                </View>

                <View style={styles.container}>
                    <View style={styles.image}> 
                        <Logo1/>
                    </View>
 
                    <View style={styles.profile}>
                        <Text style={styles.nama} >
                            Aplikasi ini bertujuan untuk mengumpulkan
                            Skripsi mahasiswa dalam bentuk digital 
                            untuk memudahkan mahasiswa mencari referensi tugas akhir mereka
                        </Text>   
                    </View> 

                    <View style={styles.footer}> 
                        <Text>Version 1.2</Text>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.primary,
    },

    button: {
        position: 'absolute',
        marginTop: 30,
        marginLeft: 30,
        zIndex: 1,
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
        marginHorizontal: 10,
        fontFamily : fonts.primary.bold,
        fontSize: RFValue(24,heightMobileUI),
        textAlign: "center" 
    },

    footer: {
        marginBottom: responsiveWidth(20),
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center"
    }
})
