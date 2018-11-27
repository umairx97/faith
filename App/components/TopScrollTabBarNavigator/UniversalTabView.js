import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import Tabs from './tabs';
import NearbyAllUser from '../NearbyAllUser/NearbyAllUser';
import NearbyFilters from '../NearbyFilters/NearbyFilters';
import TabberBottom from "../TopScrollTabBarNavigator/SlideTabBarNavigator"
import { ScrollView } from 'react-native-gesture-handler';
export default class UniversalTabView extends Component {
    static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
			headerTitle: "NearbyAllUser",
			
			}
	}
  render() {
    return (<View style={{flex:1}}>
    <ScrollView>
      <View style={styles.container}>
        <Tabs>
          {/* First tab */}
          <View title="All User" style={styles.content}>
        <NearbyAllUser/>
          </View>
          {/* Second tab */}
          <View title="New" style={styles.content}>
          
          </View>
           {/* Third tab */}
          <View title="Spotlight" style={styles.content}>
         
          </View>
         {/* Fourth tab */}
          <View title="NearBy" style={styles.content}>
       <NearbyFilters/>
          </View>

        </Tabs>
      </View>
</ScrollView>



</View>

    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: '#E91E63',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#C2185B',         // Darker background for content area
  },
  // Content header
  header: {
    margin: 10,                         // Add margin
    color: '#FFFFFF',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 26,                       // Bigger font size
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 10,
  },
});