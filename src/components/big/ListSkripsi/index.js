import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../../../utils';
import { CardSkripsi } from '../../small';


const ListSkripsi = ({navigation, getSkripsiLoading,getSkripsiResult,getSkripsiError}) => {
         
        return (
            <View> 
                { 
                    getSkripsiResult ? (
                        // result
                        (getSkripsiResult).map((item,key) => 
                        {
                            return(
                                <CardSkripsi
                                    key={key}
                                    dataSkripsi={item}
                                    navigation={navigation} />
                            ) 
                        })
    
                    ) : getSkripsiLoading ? ( 
                        // loading
                        <View style={styles.loading}>
                            <ActivityIndicator color={colors.primary} />
                        </View> 
    
                    ) : getSkripsiError ? (
                        // error
                        <Text>{getSkripsiError}</Text>
    
                    ) : (
                        // kosong
                        <Text>Data Kosong</Text> 
                    )
    
                    // dataSkripsi.map((skripsi) => {
                    //     return(
                    //         <CardSkripsi
                    //             key={skripsi.id}
                    //             dataSkripsi={skripsi}
                    //             navigation={navigation} />
                    //     )
                    // })
                } 
            </View>
        )
}

const mapStateToProps = (state) => ({
    getSkripsiLoading : state.R_Skripsi.getSkripsiLoading,
    getSkripsiResult : state.R_Skripsi.getSkripsiResult, 
    getSkripsiError : state.R_Skripsi.getSkripsiError,
})

export default connect(mapStateToProps, null)(ListSkripsi)

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30
    }, 
})

