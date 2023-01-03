import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { HeaderComponent, Distance, ListSkripsi, Button } from '../../components'
import { colors, fonts } from '../../utils'  
import { dummySkripsi } from '../../data'
import { getListSkripsi, deleteParameterSkripsi } from '../../c_actions/A_Skripsi'
import { connect } from 'react-redux'


class V_Skripsi extends Component {

    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //          skripsi: dummySkripsi,
    //     }
    // } 

    componentDidMount() { 
        this._unsubscribe = this.props.navigation.addListener('focus', () => { 
            const {keyword} = this.props
            this.props.dispatch(getListSkripsi(keyword))
        }); 
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
 
    componentDidUpdate(prevProps){
        const { keyword } = this.props 
 
        if(keyword && prevProps.keyword !== keyword){
            this.props.dispatch(getListSkripsi(keyword))
        }
    } 

    getData(){
        this.props.dispatch(deleteParameterSkripsi())
        this.props.dispatch(getListSkripsi(false))
    }

 
    render() {  
        const { navigation, keyword } = this.props
  
        return (
           
            <View style={styles.page}>

                <View style={styles.header}>
                    <HeaderComponent navigation={navigation} page="ListJersey"/>  
                </View>

                <View style={styles.pilihJersey} >
                    {
                        keyword ? ( 
                            <Text style={styles.label} >
                                Cari : <Text style={styles.boldLabel}>{keyword}</Text>  
                            </Text> 

                        ) : (
                            <Text style={styles.label} >
                                Pilih  <Text style={styles.boldLabel}>Skripsi </Text>  
                            </Text>
                        )
                    }   
                </View>   
                <Distance height={10} />

               
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.container} >

                    <ListSkripsi 
                        // dataSkripsi={skripsi}
                        navigation={navigation}  /> 

                {keyword ? ( 
                    <View >
                        <Button 
                            title="Hapus Pencarian" 
                            type="text" 
                            padding={5}
                            onPress={() => this.getData()} />
                    </View> 
                ) : ( "" ) }
 
                </ScrollView>
                
                {/* <View style={{ flex: 1, marginHorizontal: 30, }}>
                    <ListSkripsi 
                        // dataSkripsi={skripsi}
                        navigation={navigation}  /> 
                </View> */}

               
                
            </View> 
        )
    }
} 
 
const mapStateToProps = (state) => ({ 
    keyword : state.R_Skripsi.keyword
})

export default connect(mapStateToProps, null)(V_Skripsi) 

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor : colors.white
    },

    header: {
        display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: 100, 
      },

    container: {
        marginHorizontal: 30,
    },

    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    },

    boldLabel: {  
        fontFamily: fonts.primary.bold 
    },

    pilihJersey: {
        marginHorizontal: 30,
        marginTop: 10
    },
 
    tombolHapusPencarian:{
        alignContent: "center",
        flex: 1
    },
})
