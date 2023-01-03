import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, ScrollView, Alert } from 'react-native'
import { colors, responsiveHeight, responsiveWidth, fonts, getData } from '../../utils'
import { FormInput, Button } from '../../components'
import { DefaultImage } from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux'
import { updateProfile } from '../../c_actions/A_Profile'

class V_ProfileEdit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            uid: '',
            nama: '',
            email: '',
            nim: '', 

            avatar: false,
            avatarForDB: '',
            avatarOld: '',
            updateAvatar: false
        }
    }

    componentDidMount(){
        this.getUserData(); 
    }
 
    getUserData = () => {
        getData('user').then(res => {
            const data = res 

            this.setState({ 
                uid: data.uid,
                nama: data.nama,
                email: data.email,
                nim: data.nim, 

                avatar: data.avatar,
                avatarOld: data.avatar
            }) 
        })
    }

    getImage = () => {
        launchImageLibrary(
            {quality: 1, maxWidth: 500, maxHeight: 500, includeBase64: true, selectionLimit:1, cameraType: 'front'}, 
            (response) => {
                if(response.didCancel || response.errorCode || response.errorMessage) {
                    Alert.alert("Error", "Maaf sepertinya anda tidak memilih foto")
                }else{
                    // to show
                    const source = response.assets[0].uri;
                    console.log(response)
                    // to save in db type base64
                    const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

                    this.setState({
                        avatar: source,
                        avatarForDB: fileString,
                        updateAvatar: true
                    });
                }
            })
    }

    onSubmit = () => {
        const {nama,nim} = this.state
        
        if(nama && nim){
            // dispatch update
            this.props.dispatch(updateProfile(this.state))
        }else{
            Alert.alert("Error", "Nama, NIM harus diisi")
        }
    }
 
    componentDidUpdate(prevProps){
        const { updateProfileResult } = this.props

        if(updateProfileResult && prevProps.updateProfileResult !== updateProfileResult){
            Alert.alert("Sukses","Update Profile Success")
            this.props.navigation.replace("Home")  
        } 
    }
  
    render() {
        const { avatar,avatarOld,nama,email,nim } = this.state
        const { updateProfileLoading } = this.props
  
        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    <FormInput 
                        label='Nama' 
                        value={nama}
                        onChangeText={(nama) => this.setState({nama}) } />
                    <FormInput 
                        label='Email' 
                        value={email}
                        disbaled
                        onChangeText={(email) => this.setState({email}) }/>
                    <FormInput 
                        label='NIM' 
                        value={nim}
                        disbaled
                        keyboardType="number-pad"
                        onChangeText={(nim) => this.setState({nim}) }/>
                        
                    <View style={styles.inputFoto}>
                        <Text style={styles.label}>Foto Mahasiswa :</Text>

                        <View style={styles.wrapperUpload}>
                            <Image source={avatar ? {uri: avatar} : DefaultImage} style={styles.foto} />
                            <View style={styles.tombolChangePhoto}>
                                <Button 
                                    title="Change Photo" 
                                    type="text" padding={5}
                                    onPress={() => this.getImage()} />
                            </View>
                        </View>
                    </View> 

                    <View style={styles.submit}> 
                        <Button 
                            title="Submit" 
                            type="textIcon" icon="submit" 
                            padding={responsiveHeight(15)} 
                            fontSize={18}
                            loading={updateProfileLoading}
                            onPress={() => this.onSubmit()} />
                    </View>
                    
                </ScrollView> 
            </View>
        )
    }
}
 
const mapStateToProps = (state) => ({  
    updateProfileLoading : state.R_Profile.updateProfileLoading,
    updateProfileResult : state.R_Profile.updateProfileResult,
    updateProfileError : state.R_Profile.updateProfileError,  
})


export default connect(mapStateToProps,null)(V_ProfileEdit)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 10
    },

    inputFoto:{
        marginTop: 20,
    },

    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    },

    foto:{
        width: responsiveWidth(150),
        height: responsiveWidth(150),
        borderRadius: 40
    },

    wrapperUpload: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: 'center'
    },

    tombolChangePhoto:{
        marginLeft: 20,
        flex: 1
    },

    submit: { 
        marginVertical: 30
    }
})
