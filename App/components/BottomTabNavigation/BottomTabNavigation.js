import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default class BottomTabBar extends React.Component  {
    render(){
        return <ScrollableTabView
        style={{marginTop: 20, }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <TouchableOpacity
						onPress={this.onFacebookPressed}
						>
						<Image style={styles.img}
							source={require("../../../assets/images/discover.png")}/>
					</TouchableOpacity>
                    <TouchableOpacity
						onPress={this.onFacebookPressed}
						>
						<Image style={styles.img}
							source={require("../../../assets/images/neaby.png")}/>
					</TouchableOpacity>
                    <TouchableOpacity
						onPress={this.onFacebookPressed}
						>
						<Image style={styles.img}
							source={require("../../../assets/images/message.png")}/>
					</TouchableOpacity>
                    <TouchableOpacity
						onPress={this.onFacebookPressed}
						>
						<Image style={styles.img}
							source={require("../../../assets/images/profile.png")}/>
					</TouchableOpacity>
        {/* <Text tabLabel='Tab #1'></Text>
        <Text tabLabel='Tab #2 '></Text>
        <Text tabLabel='Tab #3'></Text>
        <Text tabLabel='Tab #4'></Text>
        <Text tabLabel='Tab #5'></Text> */}
      </ScrollableTabView>
    }

}
const styles = StyleSheet.create({
    img:{
        width: 20,
         height: 20,
        resizeMode: 'contain'
    }
})