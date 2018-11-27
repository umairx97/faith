import React from "react"
import { createStackNavigator, createAppContainer } from "react-navigation"
import Login from "./App/components/Login/Login"
import Discover from "./App/components/Discover/Discover"
import VIPCenter from "./App/components/VIPCenter/VIPCenter"
import Profile from "./App/components/Profile/Profile";
import Profile1 from "./App/components/Profile/Profile1";
import UserProfile from "./App/components/UserProfile/UserProfile"
import MyProfileEdit from "./App/components/MyProfileEdit/MyProfileEdit"
import NearbyAllUser from "./App/components/NearbyAllUser/NearbyAllUser"
import NearbyFilters from "./App/components/NearbyFilters/NearbyFilters"
import Tabular from "./App/components/Tabular/Tabular"
import NearByTab from "./App/components/NearbyAllUser/NearByTab"
import UniversalTabView from "./App/components/TopScrollTabBarNavigator/UniversalTabView"


const PushRouteOne = createStackNavigator({
	Login: {
		screen: Login,
  },
  Discover: {
		screen: Discover,
	},
	NearbyAllUser:{
		screen:NearbyAllUser,
	},
	NearByTab:{
		screen:NearByTab,
	},
	Profile1:{
		screen:Profile1,
	},
	Profile:{
		screen:Profile,
	},
	NearbyFilters:{
		screen:NearbyFilters,
	},
	UniversalTabView:{
		screen:UniversalTabView,
	},
	UserProfile:{
		screen:UserProfile,
	},

}, {
	initialRouteName: "Login",
})
const RootNavigator = createStackNavigator({
	PushRouteOne: {
		screen: PushRouteOne,
  },

}, {
	mode: "modal",
	headerMode: "none",
	initialRouteName: "PushRouteOne",
})

//const App = createAppContainer(RootNavigator);

export default createAppContainer(RootNavigator);
// export default createStackNavigator({
// 	Login: Login,
// 	Discover: Discover
//   });