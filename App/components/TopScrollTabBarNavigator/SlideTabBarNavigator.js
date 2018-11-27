

import { Text, StyleSheet, View, Image,TouchableOpacity } from "react-native"
import React from "react"
import NearbyAllUser from "../NearbyAllUser/NearbyAllUser";
import Profile from "../Profile/Profile"

import Tabbar from 'react-native-tabbar-bottom'
// import MyView1 from "../NearbyAllUser/NearbyAllUser";
// import MyView2 from "../NearbyAllUser/NearbyAllUser";
export default class TabberBottom extends React.Component {
  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" && <NearbyAllUser/> }
       
        {this.state.page === "ProfileScreen" &&<Profile/>}
        {this.state.page === "ChatScreen" && <Text>Screen 4</Text>}
        
        
        <Tabbar
          stateFunc={(tab) => {
            this.setState({page: tab.page})
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home",
            },
         
            {
              page: "ProfileScreen",
              icon: "person",
            },
            {
              page: "ChatScreen",
              icon: "chatbubbles",
              badgeNumber: 7,
            },
            {
              page: "SearchScreen",
              icon: "search",
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});





// import SlidableTabBar  from 'react-native-slidable-tab-bar'

// import { Text, StyleSheet, View, Image,TouchableOpacity } from "react-native"
// import React from "react"
// import MyView1 from "../NearbyAllUser/NearbyAllUser";
// import MyView2 from "../NearbyFilters/NearbyFilters"
// import MyView3 from "../NearbyAllUser/NearbyAllUser";
// import MyView4 from "../NearbyFilters/NearbyFilters"
// var {
//     Dimensions
//   } = React;
//   var {width, height} = Dimensions.get('window');
// export default class SlidableTabBarNavigator extends React.Component{

//     render(){
//         return(
//             <SlidableTabBar>
// 				<MyView1 title="All user" navigator={this.props.navigator}/>
// 				<MyView2 title="New" navigator={this.props.navigator} />
// 				<MyView3 title="Spotlight" navigator={this.props.navigator}/>
// 				<MyView4 title="Nearby" navigator={this.props.navigator}/>
// 			</SlidableTabBar>
//         )
//     }
// }