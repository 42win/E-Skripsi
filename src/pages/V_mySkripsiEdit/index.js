import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, ScrollView, Alert } from 'react-native'
import { colors, responsiveHeight, responsiveWidth, fonts } from '../../utils'
import { FormInput, Button, Distance } from '../../components'
import { DefaultImage } from '../../assets'
import { connect } from 'react-redux'
import DocumentPicker from 'react-native-document-picker' 
import { updateSkripsi } from '../../c_actions/A_Skripsi'

class V_mySkripsiEdit extends Component {
    constructor(props) {
        super(props) 
    
        var skripsi = this.props.route.params.getOneSkripsiResult[0]
  
        this.state = {
            uid: skripsi.uid,
            nama: skripsi.nama, 
            nim: skripsi.nim,
            judul: skripsi.judul, 
            pembimbing1: skripsi.pembimbing1,
            pembimbing2: skripsi.pembimbing2,
            keyword: skripsi.keyword,
            tahun: skripsi.tahun,
  
            fileUrl: skripsi.file,
            fileName: skripsi.tahun+'_'+skripsi.nim+'.pdf',
            updateFile: false,
        }
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
                file : blob,
                updateFile: true,
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
        const {judul, pembimbing1, pembimbing2, keyword, fileName, tahun} = this.state
        
        if(judul && pembimbing1 && pembimbing2 && keyword && tahun && fileName){
            // dispatch update
            this.props.dispatch(updateSkripsi(this.state))
        }else{
            Alert.alert("Error", "judul, pembimbing1, pembimbing2, keyword, tahun, serta file harus diisi harus diisi")
        }
    }
 
    componentDidUpdate(prevProps){
        const { updateSkripsiResult } = this.props
 
        if(updateSkripsiResult && prevProps.updateSkripsiResult !== updateSkripsiResult){
            Alert.alert("Sukses","Update Success")
            this.props.navigation.replace("Home")  
        } 
    }
  
    render() {
        const { fileName, nama,nim,judul, pembimbing1, pembimbing2, keyword, tahun } = this.state
        const { updateSkripsiLoading, progress } = this.props
   
        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    <FormInput 
                        label='Nama' 
                        value={nama}
                        disbaled /> 

                    <FormInput 
                        label='NIM' 
                        value={nim}
                        disbaled
                        keyboardType="number-pad" />

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
                        
                    <View style={styles.tombolUploadFile}>
                        <Text style={styles.label}>File Skripsi (PDF)</Text>
                        
                        <Distance height={5} /> 
                        <Text>*Abaikan upload file, jika tidak ingin update file</Text>
                        
                        <Distance height={5} /> 
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
                            loading={updateSkripsiLoading}
                            onPress={() => this.onSubmit()} /> 
                    </View>
                    
                </ScrollView> 
            </View>
        )
    }
}
 
const mapStateToProps = (state) => ({  
    updateSkripsiLoading : state.R_Skripsi.updateSkripsiLoading,
    updateSkripsiResult : state.R_Skripsi.updateSkripsiResult,
    updateSkripsiError : state.R_Skripsi.updateSkripsiError, 

    progress : state.R_Skripsi.progress
})

export default connect(mapStateToProps, null) (V_mySkripsiEdit)

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
    },

    tombolUploadFile:{ 
        marginTop: 20,
        // width: responsiveWidth(150),
    },
})
