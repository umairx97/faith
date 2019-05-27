import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import NearbyAllUser from "./NearbyAllUser"
import NearbyFilters from "../NearbyFilters/NearbyFilters"
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
// const AllUser=()=>(
// <NearbyAllUser/>
// )
console.disableYellowBox = true;
export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
        {
            key:'AllUser', title:'AllUser',
        },
      { key: 'first', title: 'Spotlight' },
      { key: 'second', title: 'New' },
{key:'NearbyF',title:'NearBy'}
    ],
  };
  static navigationOptions = ({ navigation }) => {
	
    const { params = {} } = navigation.state
    return {
            header: null,
            headerLeft: null,
            headerRight: null,
        }
}
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
            AllUser:NearbyAllUser,
          first: FirstRoute,
          second: SecondRoute,
          NearbyF:NearbyFilters,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});