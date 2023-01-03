import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, ScrollView, Alert } from 'react-native'
import { colors, responsiveHeight, responsiveWidth, fonts, getData } from '../../utils'
import { FormInput, Button } from '../../components'
import { DefaultImage } from '../../assets'
import { uploadSkripsi } from '../../c_actions/A_Skripsi'
import { connect } from 'react-redux' 
import DocumentPicker from 'react-native-document-picker' 
 

class V_Upload extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            uid: '',
            nama: '', 
            nim: '',
            judul: '', 
            tahun: '', 

            pembimbing1: '',
            pembimbing2: '',
            keyword: '',
  
            fileName: 'no file choosen',
            filePath: false
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
                    uid: data.uid,
                    nama: data.nama,
                    email: data.email,
                    nim: data.nim, 
    
                    avatar: data.avatar,
                    avatarOld: data.avatar,
                })

                const {avatar} = this.state
  
                if(avatar==='' || avatar=== undefined){
                    Alert.alert("Error", "Foto belum ada, silahkan input foto di menu profil")
                    this.props.navigation.replace('Home')  
                }
            }else{
                this.props.navigation.replace('Login')     
            }
        })
    } 

    async getFile(){
        console.log("getFIle")
 
        try{
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf ], 
                // type: [DocumentPicker.types.allFiles ], 
            })
   
            const response = await fetch(res.uri)
            const blob = await response.blob()

            // console.log(blob)

            this.setState({  
                fileName: res.name,
                file : blob
            }) 
             
        } catch (err) {
            if(DocumentPicker.isCancel(err)){
                console.log("user cancel it")
            } else {
                throw err
            }
        } 
    }
 

    onSubmit = () => {
        const {judul, pembimbing1, pembimbing2, keyword, file, tahun} = this.state
        
        if(judul && pembimbing1 && pembimbing2 && keyword && tahun && file){
            // dispatch update
            this.props.dispatch(uploadSkripsi(this.state))
        }else{
            Alert.alert("Error", "judul, pembimbing1, pembimbing2, keyword, tahun, serta file harus diisi harus diisi")
        }
    }
 
    componentDidUpdate(prevProps){
        const { uploadSkripsiResult } = this.props
 
        if(uploadSkripsiResult && prevProps.uploadSkripsiResult !== uploadSkripsiResult){
            Alert.alert("Sukses","Upload Success")
            this.props.navigation.replace("Home")  
        } 
    }
    
    render() {
        const { avatar,nama,nim,judul, pembimbing1, pembimbing2, keyword, tahun, fileName } = this.state
        const { uploadSkripsiLoading, progress } = this.props

        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                      
                    <FormInput 
                        label='Nama' 
                        value={nama}
                        disbaled
                        onChangeText={(nama) => this.setState({nama}) } /> 

                    <FormInput 
                        label='NIM' 
                        value={nim}
                        disbaled
                        keyboardType="number-pad"
                        onChangeText={(nim) => this.setState({nim}) }/>

                    <FormInput 
                        label='Judul' 
                        textArea
                        value={judul}
                        onChangeText={(judul) => this.setState({judul}) }/>

                    <FormInput 
                        label='Pembimbing 1' 
                        value={pembimbing1}
                        onChangeText={(pembimbing1) => this.setState({pembimbing1}) } /> 

                    <FormInput 
                        label='Pembimbing 2' 
                        value={pembimbing2}
                        onChangeText={(pembimbing2) => this.setState({pembimbing2}) } /> 

                    <FormInput 
                        label='Keyword' 
                        value={keyword}
                        onChangeText={(keyword) => this.setState({keyword}) } /> 

                    <FormInput 
                        label='Tahun' 
                        value={tahun}
                        keyboardType="number-pad"
                        onChangeText={(tahun) => this.setState({tahun}) }/>
                        
                    <View style={styles.inputFoto}>

                        <Text style={styles.label}>Foto Mahasiswa :</Text>
                        
                        <View style={styles.wrapperUpload}>
                            <Image source={avatar ? {uri: avatar} : DefaultImage} style={styles.foto} />
                        </View>
                    </View> 

                    <View style={styles.tombolUploadFile}>
                        <Text style={styles.label}>File Skripsi (PDF)</Text>
                        <Button 
                            title="Upload File" 
                            title2={fileName}
                            type="file" 
                            padding={5}

                            onPress={() => this.getFile()} />
                    </View>

                    <View style={styles.submit}> 
                        <Button 
                            title="Submit" 
                            type="textIcon" icon="submit" 
                            padding={responsiveHeight(15)} 
                            fontSize={18}
                            progress={parseInt(progress)}
                            loading={uploadSkripsiLoading}
                            onPress={() => this.onSubmit()} />
                    </View>
                    
                </ScrollView> 
            </View>
        )
    }
}

const mapStateToProps = (state) => ({  
    uploadSkripsiLoading : state.R_Skripsi.uploadSkripsiLoading,
    uploadSkripsiResult : state.R_Skripsi.uploadSkripsiResult,
    uploadSkripsiError : state.R_Skripsi.uploadSkripsiError,  
    progress : state.R_Skripsi.progress
})


export default connect(mapStateToProps, null)(V_Upload)

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

    tombolUploadFile:{ 
        marginTop: 20,
        width: responsiveWidth(150),
    },

    submit: { 
        marginVertical: 30
    }
})
