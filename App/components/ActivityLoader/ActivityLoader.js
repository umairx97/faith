import React, { Component } from 'react'
import { Text, View,  ActivityIndicator ,StyleSheet,Image} from 'react-native'


import { Images } from "../../../assets/imageAll";
export default class ActivityLoader extends Component {
  render() {
    return (
        <View style={[styles.container, styles.horizontal]}>

    <Image
                  source={Images.loginLogo}
                  style={styles.logoStyle}
                />
         <ActivityIndicator  size="large" color="grey" />
         </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'center',
      padding:30
    },
    logoStyle:{
        height:100,
        width:100,
        resizeMode:"contain",
       
    }
  })