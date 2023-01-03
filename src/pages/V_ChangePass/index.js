import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native' 
import { colors, responsiveHeight, getData } from '../../utils'
import { FormInput, Button } from '../../components' 
import { changePassword } from '../../c_actions/A_Profile'
import { connect } from 'react-redux'

class ChangePass extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             password : '',
             newPassword : '',
             newPasswordConfirmation : ''
        }
    }

    onSubmit = () => {
        const {password, newPassword, newPasswordConfirmation} = this.state

        if(newPassword !== newPasswordConfirmation){
            Alert.alert('Error', "Password baru dan konfirmasi password baru harus sama")

        }else if(newPassword.length < 6 ){
            Alert.alert('Error', "Password baru minimal 6 karakter")

        }else if(password && newPassword && newPasswordConfirmation){
            // get data email from localStorage
            getData('user').then((res) => {
                const parameter = {
                    email: res.email,
                    password: password,
                    newPassword: newPassword
                }
                this.props.dispatch(changePassword(parameter))
            })
        }else{
            Alert.alert('Error', "Password lama, password baru dan konfirmasi password baru harus diisi")
        }
    }

    componentDidUpdate(prevProps){
        const { changePasswordResult } = this.props

        if(changePasswordResult && prevProps.changePasswordResult !== changePasswordResult){
            Alert.alert("Sukses","Change Password Success")
            this.props.navigation.replace("Home")  
        } 
    }
        
    render() { 
        const {password, newPassword, newPasswordConfirmation} = this.state

        const { changePasswordLoading } = this.props

        return (
            <View style={styles.page}>
                <View> 
                    <FormInput 
                        label='Password Lama' 
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => this.setState({password})} />

                    <FormInput 
                        label='Password Baru' 
                        secureTextEntry
                        value={newPassword}
                        onChangeText={(newPassword) => this.setState({newPassword})} />

                    <FormInput 
                        label='Konfirmasi Password Baru'  
                        secureTextEntry
                        value={newPasswordConfirmation}
                        onChangeText={(newPasswordConfirmation) => this.setState({newPasswordConfirmation})} />  
                </View> 
 
                <View style={styles.submit}> 
                    <Button 
                        title="Submit" 
                        type="textIcon" 
                        icon="submit" 
                        padding={responsiveHeight(15)} 
                        fontSize={18}
                        onPress={() => this.onSubmit()}
                        loading={changePasswordLoading}/>
                </View> 
            </View>
        )
    }
}
 
const mapStateToProps = (state) => ({ 
    changePasswordLoading : state.R_Profile.changePasswordLoading,
    changePasswordResult : state.R_Profile.changePasswordResult,
    changePasswordError : state.R_Profile.changePasswordError,  
})

export default connect(mapStateToProps, null)(ChangePass)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 10,
        justifyContent: 'space-between'
    }, 
    
    submit: {
        marginVertical: 30
    }
})
