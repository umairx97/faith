import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Router, Scene, Stack } from "react-native-router-flux";
import Login from "../Login/Login";
import Discover from "../Discover/Discover";
import NearbyAllUser from "../NearbyAllUser/NearbyAllUser";
import Spotlight from "../Spotlight/Spotlight";
import NearbyFilters from "../NearbyFilters/NearbyFilters";
import Profile from "../Profile/Profile";
import AppSlider from "../Slider/Slider";
import SignIn from "../Login/SignIn";
import SignUp from "../Login/SignUp";

import MyappSplash from "../SplashScreen/MyappSplash";

export default class Route extends Component {
  getIcon = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/discover.png")}
      />
    );
  };
  getIconNear = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/neaby.png")}
      />
    );
  };
  getIconPro = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/profile-2.png")}
      />
    );
  };
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="myappSplash" hideNavBar={true} component={MyappSplash} />
          <Scene
            key="slide"
            replace={true}
            hideNavBar={true}
            component={AppSlider}
          />
          <Scene
            key="login"
            replace={true}
            component={Login}
            hideNavBar={true}
          />
          <Scene key="signIn" component={SignIn} hideNavBar={true} />
          <Scene key="signUp" component={SignUp} hideNavBar={true} />
          <Scene  key="home" tabs={true} hideNavBar={true}>
            <Scene
              key="Discover"
              icon={this.getIcon}
              hideNavBar={true}
              component={Discover}
            />
            <Scene
              key="Nearbyuser"
              hideNavBar={true}
              icon={this.getIconNear}
              tabs={true}
              tabBarPosition="top"
            >
              <Scene
                key="alluser"
                hideNavBar={true}
                component={NearbyAllUser}
              />
              <Scene key="spotlight" hideNavBar={true} component={Spotlight} />
              <Scene key="Nearby" hideNavBar={true} component={NearbyFilters} />
            </Scene>
            <Scene
              icon={this.getIconPro}
              key="Profile"
              hideNavBar={true}
              component={Profile}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
}
