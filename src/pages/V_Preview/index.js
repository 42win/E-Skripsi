
import React from 'react' 
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Pdf from 'react-native-pdf'
 

const V_Preview = ({route}) => { 
    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={{
                uri: route.params.fileData,
                cache: true,
                }} 
                onLoadComplete={(numberOfPages,filePath) => {
                    // console.log(`Number of pages: ${numberOfPages}`);
                }}
                // onPageChanged={(page,numberOfPages) => {
                //     console.log(`Current page: ${page}`);
                // }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    // console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}/>
        </View> 
    )
}

export default V_Preview

  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});