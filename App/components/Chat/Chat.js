import React, { Component } from "react";
import { Text, View,TouchableOpacity,Image,TextInput,Dimensions,BackHandler } from "react-native";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import { Actions } from "react-native-router-flux";
import { Images } from "../../../assets/imageAll";
import { ifIphoneX } from "react-native-iphone-x-helper";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
export default class Chat extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }

  backAndroid () {
    Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  render() {
    return (
      <KeyboardAwareScrollView style={{backgroundColor: "rgb(249, 249, 249)"}}>
      <View style={{height:Screen.height,backgroundColor:'white',...ifIphoneX({ marginTop: 0 })}}>
      <Text>hello</Text>
      </View>
<View style={{backgroundColor:'red',position:'absolute',height:55,bottom:0,left:5,right:5}}>
  <Image source={Images.addIcon} style={{height:40,width:40,position:'absolute', left:10,bottom:0}}/>
  <TextInput placeholder="enter your text" style={{position:'absolute', left:150,bottom:0, width:200}}/>
  <Text style={{position:'absolute',right:10,bottom:0}}>Send</Text>
  </View>
        
      </KeyboardAwareScrollView>
    );
  }
}
