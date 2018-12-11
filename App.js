import React, { Component } from "react";
import { View, Text } from "react-native";
import Route from "./App/components/routes/Routes";



import MyappSplash from "./App/components/SplashScreen/MyappSplash";
export default class App extends Component {
  constructor(){
    super();
    // Immersive.on();
    // Immersive.setImmersive(true);
  }
  render() {
    return <Route />;
  }
}

