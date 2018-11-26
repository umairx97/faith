import TabNavigator from 'react-native-tab-navigator';
import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'

export default class TabBarNavigator extends Component {
    constructor(){
        super()
        // this.state={
        //     selectedTab:
        // }
    }
  render() {
    return (
      <View>
     <TabNavigator>
  <TabNavigator.Item
   // selected={this.state.selectedTab === 'home'}
   
    renderIcon={() => <Image source={"../../../assets/images/profile.png"} />}
    renderSelectedIcon={() => <Image source={"../../../assets/images/profile.png"} />}
   
    // onPress={() => this.setState({ selectedTab: 'home' })}
    >
    
  </TabNavigator.Item>
  <TabNavigator.Item
    // selected={this.state.selectedTab === 'profile'}
    
    renderIcon={() => <Image source={"../../../assets/images/neaby.png"} />}
    renderSelectedIcon={() => <Image source={"../../../assets/images/neaby.png"} />}
    
    // onPress={() => this.setState({ selectedTab: 'profile' })}
    >
    
  </TabNavigator.Item>
</TabNavigator>
      </View>
    )
  }
}