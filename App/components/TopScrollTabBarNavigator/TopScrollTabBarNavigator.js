import React from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default class TopScrollTabBarNavigator extends React.Component{

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	onUserPressed = () => {
		this.props.navigation.navigate('NearbyFilters');
	}

    render(){
  return <ScrollableTabView
    style={{marginTop: 20, }}
    initialPage={0}
    renderTabBar={() => <ScrollableTabBar />}
  >
   {/* <TouchableOpacity
						onPress={this.onFacebookPressed} style={{width:30,height:30, resizeMode: 'contain',}}
						> */}
						
                        {/* <Text tabLabel='All user'></Text> */}
					{/* </TouchableOpacity> */}
                    {/* <Image tabLabel='All user'
							source={require("../../../assets/images/path.png")}/> */}
                            <Text tabLabel='All user'></Text>
                            <Text tabLabel='New' ></Text>                      
  
    <Text tabLabel='Spotlight'></Text>
    <Text tabLabel='Nearby' onPress={this.onUserPressed}></Text>
   
  </ScrollableTabView>;
}
}
const styles = StyleSheet.create({
    facebookButton: {
		flex:1,
		
	},
})