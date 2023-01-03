import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { colors, responsiveWidth, responsiveHeight, fonts, getData } from '../../utils/'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightMobileUI } from '../../utils/constant'; 
import { DefaultImage } from '../../assets/images'
import { Button, Distance } from '../../components'; 
import { downloadSkripsi } from '../../c_actions/A_Skripsi'
import FIREBASE from '../../config/FIREBASE';

import { connect } from 'react-redux';

class SkripsiDetail extends Component {
 
    constructor(props) {
        super(props)
    
        this.state = {
            avatar : false,
            skripsi: this.props.route.params.dataSkripsi
        }
    }

    componentDidMount(){
        this.getImage()
    }

    componentDidUpdate(prevProps){
        const { downloadSkripsiResult } = this.props 
 
        if(downloadSkripsiResult && prevProps.downloadSkripsiResult !== downloadSkripsiResult){
            alert("Download Success")
        }
    } 

    onDownload(){
        const { skripsi } = this.state  
        this.props.dispatch(downloadSkripsi(skripsi.file,skripsi.tahun,skripsi.nim))
    }

    getImage(){
        const { skripsi } = this.state 
        
        FIREBASE.database()
                .ref('users') //nama folder
                .orderByChild('uid')
                .equalTo(skripsi.uid)
                .once('value', (querySnapshot) => { 
                    let data = querySnapshot.val()   

                    var arr = Object(data)[skripsi.uid]['avatar'] 

                    this.setState({  
                        avatar: arr, 
                    })
                })
    }
 

    render() { 
        const { navigation, downloadSkripsiLoading } = this.props
        const { skripsi, avatar } = this.state 
  
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
                    <Image source={avatar ? {uri: avatar} : DefaultImage} style={styles.image} /> 

                    <View style={styles.profile}>
                        <Text style={styles.desc} >Nama : {skripsi.nama}</Text> 

                        <Distance height={10} />
                        <Text style={styles.nama} >{skripsi.judul}</Text>  
 
                        <Distance height={10} />
                        <Text style={styles.desc} >Tahun : {skripsi.tahun}</Text> 
 
                        <Text style={styles.desc} >{skripsi.namaMhs}</Text> 
                        <Text style={styles.desc} >NIM : {skripsi.nim}</Text> 

                        <Distance height={10} />
                        <Text style={styles.desc} >Pembimbing 1 : {skripsi.pembimbing1}</Text> 
                        <Text style={styles.desc} >Pembimbing 2 : {skripsi.pembimbing2}</Text> 
                     
                        <Distance height={30} />

                        <Button
                            title="Download" 
                            type="textIcon" 
                            icon="download" 
                            padding={10} 
                            fontSize={18}
                            loading={downloadSkripsiLoading}
                            onPress={() => this.onDownload()} />

                        <Distance height={30} />

                        <Button
                            title="Preview" 
                            type="textIcon" 
                            icon="search" 
                            padding={10} 
                            fontSize={18}
                            onPress={() => this.props.navigation.navigate("Preview", {fileData: skripsi.file})}
                            />
                    </View> 

                    

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({  
    downloadSkripsiLoading : state.R_Skripsi.downloadSkripsiLoading,
    downloadSkripsiResult : state.R_Skripsi.downloadSkripsiResult,
    downloadSkripsiError : state.R_Skripsi.downloadSkripsiError,  
})

export default connect(mapStateToProps, null)(SkripsiDetail)

const styles = StyleSheet.create({
    page: { 
        flex: 1,  
        backgroundColor: colors.primary
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
        width: responsiveWidth(150),
        height: responsiveWidth(150),
        borderRadius: 40,
        alignSelf: "center",
        marginTop: -responsiveWidth(75)
    },

    profile: {
        marginTop: 20,
        alignItems: "center"
    },

    nama: {
        fontFamily : fonts.primary.bold,
        fontSize: RFValue(24,heightMobileUI),
        textAlign: "center",
        marginHorizontal: 10
    },

    desc: {
        fontFamily : fonts.primary.regular,
        fontSize: RFValue(20,heightMobileUI)
    }

})
