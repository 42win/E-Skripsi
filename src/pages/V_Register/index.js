import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import { colors, responsiveWidth, fonts } from '../../utils'
import { IlustrasiRegister1 } from '../../assets'
import { Distance, FormInput, Button } from '../../components'
import { registerUser } from '../../c_actions/A_Auth'
import { connect } from 'react-redux'

class V_Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            nama: '',
            nim: '',
            password: '',
        }
    }

    componentDidUpdate(prevProps){
        const { registerResult } = this.props

        if(registerResult && prevProps.registerResult !== registerResult){
            this.props.navigation.replace("Home") 
        } 
    }

    onSubmit = () => {
        const {nama, email, nim, password} = this.state
        if(nama && email && nim && password){ 

            const data = {
                nama: nama,
                email: email,
                nim: nim, 
                status: 'user'
            }

            //ke auth action
            this.props.dispatch(registerUser(data, password))
        }else{
            Alert.alert("Error", "Nama, email, no handphone, dan password harus diisi")
        }
    }

 
    render() { 
        const { email,nama,nim,password } = this.state
        const { registerLoading } = this.props

        return ( 
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.page}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={styles.btnBack}>
                                <Button icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
                            </View>

                            <View style={styles.ilustrasi}>
                                <IlustrasiRegister1/>
                                <Distance height={5}/>

                                <Text style={styles.title} >Daftar</Text>
                                <Text style={styles.title} >Isi Data Diri Anda</Text>

                                <View style={styles.wrapperCircle}> 
                                </View> 
                            </View> 

                            <View style={styles.card}>
                                <FormInput 
                                    label="Nama Lengkap" 
                                    value={nama} 
                                    onChangeText={(nama) => this.setState({nama})} />
                                <FormInput 
                                    label="Email" 
                                    value={email} 
                                    onChangeText={(email) => this.setState({email})} />
                                <FormInput 
                                    label="NIM" 
                                    value={nim} 
                                    onChangeText={(nim) => this.setState({nim})} 
                                    keyboardType="number-pad" />
                                <FormInput 
                                    label="Password"
                                    value={password} 
                                    onChangeText={(password) => this.setState({password})}  
                                    secureTextEntry/> 

                                <Distance height={30} />
                                <Button 
                                    title="Daftar" 
                                    type="textIcon" 
                                    icon="submit" 
                                    padding={10} 
                                    fontSize={18}
                                    loading={registerLoading}
                                    onPress={() => this.onSubmit()} />

                            </View>

                        </ScrollView>

                    </TouchableWithoutFeedback>
            </KeyboardAvoidingView> 

        )
    }
}
  
const mapStateToProps = (state) => ({  
    registerLoading : state.R_Auth.registerLoading,
    registerResult : state.R_Auth.registerResult,
    registerError : state.R_Auth.registerError,  
})

export default connect(mapStateToProps, null)(V_Register)

const styles = StyleSheet.create({
    page: {
        flex: 1, 
        backgroundColor: colors.white,
        paddingTop: 20,
    },

    ilustrasi: {
        alignItems: "center", 
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.primary.light,
        color : colors.primary
    },
 
    wrapperCircle: {
        flexDirection: "row",
        marginTop: 10
    }, 

    card: {
        backgroundColor: colors.white,
        marginHorizontal: 30,

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

        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },

    btnBack: {
        marginLeft: 30, 
        position: "absolute"
    }
})
