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
import FavoritesScreen from "../Favorites/FavoritesScreen";
import Chat from "../Chat/Chat";
import { ifIphoneX } from "react-native-iphone-x-helper";
import Favorite from "../Favorites/Favorite";
import ProfileCopy from "../Profile/ProfileCopy";
import CaptureImage from "../CameraView/CaptureImage";
import RecordVideo from "../CameraView/RecordVideo";
import ActivityLoader from "../ActivityLoader/ActivityLoader";
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
  getFavrouiteIcon = () => { 
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/favoriteIcon.png")}
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
  getFilterIcon=()=>{
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/filterIcon.png")}
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
          <Scene key="activityLoader" component={ActivityLoader} hideNavBar={true}/>
          <Scene
            key="forgetPass"
            component={ForgetPassword}
            hideNavBar={true}
          />
          <Scene
            key="drawer"
            drawer={true}
            gesturesEnabled={false}
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
               
                {/* <Scene
                  key="Nearbyuser"
                  title="NearBy"
                  hideNavBar={true}
                  icon={this.getIconNear}
                  tabs={true}
                  tabBarStyle={{...ifIphoneX({ marginTop: 30 })}}
                  tabBarPosition="top"
                > */}
                  <Scene
                    key="Nearby"
                    title="NearBy"
                    icon={this.getIconNear}
                    hideNavBar={true}
                    component={NearbyAllUser}
                  />
                  {/* <Scene
                    key="spotlight"
                    hideNavBar={true}
                    component={Spotlight}
                  /> 
                
                </Scene>*/}
                <Scene
                  key="Favorite"
                  icon={this.getFavrouiteIcon}
                  hideNavBar={true}
                  component={Favorite}
                />
                 <Scene
                    key="Filter"
                    hideNavBar={true}
                    icon={this.getFavrouiteIcon}
                    component={NearbyFilters}
                  />
                {/* <Scene
                  key="Favorite"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={FavoritesScreen}
                /> */}
                {/* <Scene
                  key="Favorite"
                  icon={this.getFavrouiteIcon}
                  hideNavBar={true}
                  component={Favorites}
                /> */}
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
               <Scene
              key="ProfileCopy"
              component={ProfileCopy}
              hideNavBar={true}
            />
            <Scene
            key="recordVideo"
            component={RecordVideo}
            hideNavBar={true}
          />
          <Scene
            key="captureImage"
            component={CaptureImage}
            hideNavBar={true}
          />
              <Scene
                  icon={this.getIconPro}
                  key="Profile"
                  hideNavBar={true}
                  component={Profile}
                />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
