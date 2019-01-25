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
import ForgetPassword from "../Login/forget_pass";
import MyappSplash from "../SplashScreen/MyappSplash";
import DrawerScreen from "../DrawerScreen/DrawerScreen";
import VIPCenter from "../VIPCenter/VIPCenter";
import UserProfile from "../UserProfile/UserProfile";
import Favorites from "../Favorites/Favorites";
import Chat from "../Chat/Chat";
import { ifIphoneX } from "react-native-iphone-x-helper";
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
        <Scene key="root">
          <Scene key="myappSplash" hideNavBar={true} component={MyappSplash} />
          <Scene key="slide" hideNavBar={true} component={AppSlider} />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="signIn" component={SignIn} hideNavBar={true} />
          <Scene key="signUp" component={SignUp} hideNavBar={true} />
          <Scene
            key="forgetPass"
            component={ForgetPassword}
            hideNavBar={true}
          />
          <Scene
            key="drawer"
            drawer={true}
            contentComponent={DrawerScreen}
            hideNavBar={true}
          >
            <Scene key="home" hideNavBar={true} replace={true}>
              <Scene key="homeTAB" tabs={true} hideNavBar={true}>
                <Scene
                  key="Discover"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={Discover}
                />
                <Scene
                  key="favorites"
                  title="Favorites"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={Favorites}
                />
                <Scene
                  key="Nearbyuser"
                  title="NearBy"
                  hideNavBar={true}
                  icon={this.getIconNear}
                  tabs={true}
                  tabBarStyle={{...ifIphoneX({ marginTop: 30 })}}
                  tabBarPosition="top"
                >
                  <Scene
                    key="alluser"
                    hideNavBar={true}
                    component={NearbyAllUser}
                  />
                  <Scene
                    key="spotlight"
                    hideNavBar={true}
                    component={Spotlight}
                  />
                  <Scene
                    key="Nearby"
                    hideNavBar={true}
                    component={NearbyFilters}
                  />
                </Scene>
               
                <Scene
                  icon={this.getIconPro}
                  key="Profile"
                  hideNavBar={true}
                  component={Profile}
                />
              </Scene>
            </Scene>
            <Scene
                  key="Chat"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={Chat}
                />
            <Scene key="vipCenter" component={VIPCenter} hideNavBar={true} />
            <Scene
              key="userProfile"
              component={UserProfile}
              hideNavBar={true}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
