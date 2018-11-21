import React from "react"
import { createStackNavigator, createAppContainer } from "react-navigation"
import Login from "./App/Login/Login"
import Discover from "./App/Discover/Discover"
import VIPCenter from "./App/VIPCenter/VIPCenter"

const PushRouteOne = createStackNavigator({
	Login: {
		screen: Login,
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













// const PushRouteOne = createStackNavigator({
// 	Login: {
// 		screen: Login,
// 	},
// }, {
// 	initialRouteName: "Login",
// })
// const RootNavigator = createStackNavigator({
// 	PushRouteOne: {
// 		screen: PushRouteOne,
// 	},
// }, {
// 	mode: "modal",
// 	headerMode: "none",
// 	initialRouteName: "PushRouteOne",
// })

// //const App = createAppContainer(RootNavigator);

// export default createAppContainer(RootNavigator);

// export default class App extends React.Component {

// 	render() {
	
// 		return <RootNavigator/>
// 	}
// }

