import React, { Component } from 'react' 
import { Text, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { dummySkripsi } from '../../data'  
import { RFValue } from "react-native-responsive-fontsize"; 
import { colors, responsiveHeight, fonts, heightMobileUI, getData } from '../../utils'
import { Button, Distance } from '../../components'
import { connect } from 'react-redux';
import { getOneSkripsi, downloadSkripsi } from '../../c_actions/A_Skripsi';

class V_mySkripsi extends Component {
 
    componentDidMount() {  
        this.getUserData()  
    } 

    getUserData = () => {
        getData('user').then(res => {
            const data = res  
            this.props.dispatch(getOneSkripsi(data.uid)) 
        })
    }
   
    onDownload(){
        const { getOneSkripsiResult } = this.props  
        this.props.dispatch(downloadSkripsi(getOneSkripsiResult[0].file,getOneSkripsiResult[0].tahun,getOneSkripsiResult[0].nim))
    }

    componentDidUpdate(prevProps){
        const { downloadSkripsiResult } = this.props 
 
        if(downloadSkripsiResult && prevProps.downloadSkripsiResult !== downloadSkripsiResult){
            alert("Download Success")
        }
    } 
  
    
    render() { 
        const { getOneSkripsiLoading, getOneSkripsiResult, downloadSkripsiLoading} = this.props
  
        if(getOneSkripsiLoading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.primary} />
                </View>     
            ) 
        }else{
            if(getOneSkripsiResult){
                return (
                    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.card} >  
                                <Text style={styles.nama} >Mahasiswa:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].nama}</Text>
        
                                <Text style={styles.nama} >NIM:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].nim}</Text>
        
                                <Text style={styles.nama} >Judul:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].judul}</Text>
        
                                <Text style={styles.nama} >Tahun:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].tahun}</Text>
        
                                <Text style={styles.nama} >Keyword:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].keyword}</Text>
        
                                <Text style={styles.nama} >Pembimbing 1:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].pembimbing1}</Text>
        
                                <Text style={styles.nama} >Pembimbing 2:</Text>
                                <Text style={styles.desc} >{getOneSkripsiResult[0].pembimbing2}</Text>
                                
                                <Distance height={15}/>
        
                                <Button 
                                    title="Preview File" 
                                    type="text" padding={5} 
                                    onPress={() => this.props.navigation.navigate("Preview", {fileData: getOneSkripsiResult[0].file})}
                                />

                                <Distance height={15}/>

                                <Button 
                                    title="Download File" 
                                    type="text" padding={5}
                                    loading={downloadSkripsiLoading}
                                    onPress={() => this.onDownload()}  />
                                    
                            </View>
                        </View> 
        
                        <View style={styles.submit}> 
                            <Button 
                                title="Edit" 
                                type="textIcon" icon="submit" 
                                padding={responsiveHeight(15)} 
                                fontSize={18}
                                onPress={() => this.props.navigation.navigate('mySkripsiEdit',{getOneSkripsiResult})}  />
                        </View>
        
                    </ScrollView>
                )
            }else{
                return(
                    <View style={styles.page}>
    
                        <Distance height={15}/>
    
                        <View style={styles.container} > 
                            <Text>tidak ada skripsi, Silahkan upload</Text>
                        </View>
    
                        
                        <View style={styles.submit}> 
                            <Button 
                                title="Upload" 
                                type="textIcon" icon="submit" 
                                padding={responsiveHeight(5)} 
                                fontSize={18}
                                // progress={parseInt(progress)}
                                // loading={uploadSkripsiLoading}
                                onPress={() =>  this.props.navigation.navigate("Upload") } 
                                />
                        </View>
                    </View>
                ) 
            }
        } 
    }
}

const mapStateToProps = (state) => ({
    getOneSkripsiLoading : state.R_Skripsi.getOneSkripsiLoading,
    getOneSkripsiResult : state.R_Skripsi.getOneSkripsiResult, 
    getOneSkripsiError : state.R_Skripsi.getOneSkripsiError,

    downloadSkripsiLoading : state.R_Skripsi.downloadSkripsiLoading,
    downloadSkripsiResult : state.R_Skripsi.downloadSkripsiResult,
    downloadSkripsiError : state.R_Skripsi.downloadSkripsiError,  
})


export default connect(mapStateToProps, null)(V_mySkripsi)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15, 
        backgroundColor: colors.white,

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

        marginHorizontal: 30, 
        borderRadius: 10,
        alignItems: "center",

        // jarak antara isi dan garis luar
        paddingVertical: 10,
        paddingHorizontal: 15,

        marginVertical: 10
    },

    page:{
        backgroundColor: colors.white,
        flex: 1,
    },

    card: { 
        // width: responsiveWidth(150),
        // alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },

    nama: {
        fontFamily : fonts.primary.bold,
        fontSize: RFValue(22,heightMobileUI),
        marginTop: 10
    },

    desc: {
        fontFamily : fonts.primary.regular,
        fontSize: RFValue(19,heightMobileUI)
    },

    submit: {  
        paddingVertical: 10,
        paddingHorizontal: 2_5, 
    },

    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30
    }, 
 
})
