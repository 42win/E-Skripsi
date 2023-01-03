import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert} from 'react-native'
import { Logo1 } from '../../assets'
import { FormInput, Button, Distance } from '../../components'
import { responsiveHeight, colors, fonts } from '../../utils'
import { loginUser } from '../../c_actions/A_Auth'
import { connect } from 'react-redux'

class V_Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    login = () => {
        const {email, password} = this.state

        if(email && password){
            // action
            this.props.dispatch(loginUser(email,password))
        }else{
            Alert.alert("Error", "Email dan pasword harus diisi")
        }
    }

    componentDidUpdate(prevProps){
        const { loginResult } = this.props

        if(loginResult && prevProps.loginResult !== loginResult){
            this.props.navigation.replace("Home")
        } 
    }
 
    render() {
        const {email, password} = this.state 
        const { loginLoading } = this.props 

        return (
            <View style={styles.pages}>
                <View style={styles.logo}>
                 <Logo1/>
                </View>

                <View style={styles.cardLogin}>
                    <FormInput 
                        label="Email"
                        value={email}
                        onChangeText={(email) => this.setState({email}) } />
                    <FormInput 
                        label="Password" 
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => this.setState({password}) }/>

                    <Distance height={25}/>
                    <Button 
                        title="Login" 
                        type="text" padding={12} fontSize={18}
                        loading={loginLoading}
                        onPress={() => this.login() } />
                </View>

                <View style={styles.register}>
                    <Text style={styles.textBlue} >Belum Punya Akun ?</Text>
                    <Text 
                        style={styles.textBlue} 
                        onPress={() => this.props.navigation.navigate('Register') } 
                        >Klik Untuk Daftar</Text>
                </View>

            </View>
        )
    }
}
 
const mapStateToProps = (state) => ({
    loginLoading : state.R_Auth.loginLoading ,
    loginResult : state.R_Auth.loginResult,
    loginError : state.R_Auth.loginError, 
})


export default connect(mapStateToProps, null)(V_Login)

const styles = StyleSheet.create({
    pages : { 
        flex: 1,  
        backgroundColor : "white"
    },

    ilustrasi : {
        position : "absolute",
        bottom : 0,
        right : -100
    },

    logo: { 
        alignItems: "center",
        marginTop: responsiveHeight(70)
    },

    cardLogin: {
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

        padding: 30,
        borderRadius: 10,
        marginTop: 10
    },

    register: {
        alignItems: "center",
        marginTop: 10,
    },

    textBlue: {
        fontSize: 18,
        fontFamily: fonts.primary.bold,
        color : colors.primary
    }

})
