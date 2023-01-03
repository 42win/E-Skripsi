import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { colors, responsiveWidth, responsiveHeight, fonts, getData } from '../../utils/'
import { D_MenuProfile  } from '../../data'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightMobileUI } from '../../utils/constant';
import { ListMenu } from '../../components'
import { DefaultImage } from '../../assets/images'
import { Button } from '../../components';

export default class V_Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             profile : false,
             menus: D_MenuProfile
        }
    } 

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => { 
            this.getUserData()
        });
    }

    getUserData = () => {
        getData('user').then(res => {
            const data = res
            
            if(data) {
                this.setState({
                    profile:data
                })
            }else{
                this.props.navigation.replace('Login')     
            }
        })
    }
   
    render() {
        const {navigation} = this.props;
        const { profile, menus } = this.state 


        return (
            <View style={styles.page}>
                <View style={styles.button}>
                    <Button
                        icon="arrow-left"
                        padding={7}
                        onPress={() => navigation.replace("Home")}  
                    />
                </View>

                <View style={styles.container}>
                    <Image  source={profile.avatar ? {uri: profile.avatar} : DefaultImage } style={styles.image} />

                    <View style={styles.profile}>
                        <Text style={styles.nama} >{profile.nama}</Text> 
                        <Text style={styles.desc} >NIM : {profile.nim}</Text>  
                    </View>

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
