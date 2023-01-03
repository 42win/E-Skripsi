import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, responsiveWidth, fonts } from '../../../utils'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightMobileUI } from '../../../utils/constant';

const CardSkripsi = ({dataSkripsi, navigation}) => {
   
    return (
        <View> 
            <TouchableOpacity style={styles.card}
                onPress={() => navigation.navigate('SkripsiDetail', {dataSkripsi}) } > 
                <Text style={styles.nama} >{dataSkripsi.judul}</Text>
                <Text style={styles.desc} >{dataSkripsi.tahun} - {dataSkripsi.nama}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CardSkripsi

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.yellow,
        // width: responsiveWidth(150),
        // alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },

    nama: {
        fontFamily : fonts.primary.bold,
        fontSize: RFValue(19,heightMobileUI)
    },

    desc: {
        fontFamily : fonts.primary.regular,
        fontSize: RFValue(16,heightMobileUI)
    }

})
