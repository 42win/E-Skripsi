import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {colors, responsiveHeight, fonts } from '../../../utils';
import {IconSearch} from '../../../assets'; 
import { saveKeywordSkripsi } from '../../../c_actions/A_Skripsi'
import { connect } from 'react-redux';

class HeaderComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      search: ""
    }
  }

  selesaiCari = () => {
    // console.log("cek", this.state.search)
    const { dispatch } = this.props
    const { search } = this.state 

    // jalankan action save keyword
    dispatch(saveKeywordSkripsi(search))
  
    // kembalikan state search itu ke string kosong
    this.setState({
      search: ''
    })

  }
 

  render() {
    const { search } = this.state 
      
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* search section */}
          <View style={styles.searchSection}>
            <IconSearch />
            <TextInput 
              value={search} 
              placeholder="Cari Skripsi . . . " 
              style={styles.input}
              onChangeText={(search) => this.setState({search})}
              onSubmitEditing={() => this.selesaiCari()} 
              />
          </View> 

        </View>
      </View>
    );
  }
}
  
export default connect() (HeaderComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(120),
  },

  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },

  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
});
