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
import Matches from "../Matches/Matches";
import ChatList from "../Chat/ChatList";
import FullScreenVideo from "../Chat/FullScreenVideo";
import FullScreenCamera from "../Chat/FullScreenCamera";
import GalleryView from "../Chat/GalleryView";

import DiscoverEvents from "../Events/DiscoverEvents";
import AddEvent from "../Events/AddEvent";
import MyEvent from "../Events/MyEvent";
import EventFilter from "../Events/EventFilter";
import EventLocation from "../Events/EventLocation";
import EventDetailPage from "../Events/EventDetailPage";
import RightSlide from "../Events/RightSlide";

export default class Route extends Component {
  getIcon = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain", tintColor: 'black' }}
        source={require("../../../assets/images/discover.png")}
      />
    );
  };
  getIconEvent = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/addEvent.png")}
      />
    );
  };
  getAddIconEvent = () => {
    return (
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/addEventIcon.png")}
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

  getImage = () => {
    return (<Image
      style={{ height: 20, width: 20, resizeMode: "contain" }}
      source={require("../../../assets/images/chatIcons.png")}
    />);
  }
  getFilterIcon = () => {
    return (
      //   <SvgUri
      //   width="20"
      //   height="20"

      //   source={require("../../../assets/images/svgFilter.svg")}
      // />
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/images/svgFilter1.png")}
      />
    );
  };
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="myappSplash" replace={true} hideNavBar={true} component={MyappSplash} />
          <Scene key="slide" replace={true} hideNavBar={true} component={AppSlider} />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="signIn" component={SignIn} hideNavBar={true} />
          <Scene key="signUp" replace={true} component={SignUp} hideNavBar={true} />
          <Scene
            key="activityLoader"
            component={ActivityLoader}
            hideNavBar={true}
          />
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

                <Scene
                  key="Favorite"
                  icon={this.getFavrouiteIcon}
                  hideNavBar={true}
                  component={Favorite}
                />

                <Scene key="Filter"
                  title="Filter"
                  hideNavBar={true}
                  icon={this.getFilterIcon}
                  component={NearbyFilters}
                />

              </Scene>
            </Scene>
            <Scene key="event" hideNavBar={true} replace={true}>
              <Scene key="homeTAB" tabs={true} hideNavBar={true}>
                {/* <Scene
                  key="DiscoverEvent"
                  title="Discover"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={DiscoverEvents}
                /> */}

                <Scene
                  key="DiscoverEvent"
                  title="Discover"
                  icon={this.getIcon}
                  hideNavBar={true}
                  component={DiscoverEvents}
                />
                <Scene
                  key="myEvent"
                  title="MyEvent"
                  icon={this.getIconEvent}
                  hideNavBar={true}
                  component={MyEvent}
                />

                <Scene
                  key="AddEvent"
                  icon={this.getAddIconEvent}
                  hideNavBar={true}
                  component={AddEvent}
                />

                <Scene key="Filter"
                  title="Filter"
                  hideNavBar={true}
                  icon={this.getFilterIcon}
                  component={EventFilter}
                />

              </Scene>
            </Scene>

            <Scene
              key="chat"
             
              hideNavBar={true}
              component={Chat}
            />
             
            <Scene key="vipCenter" component={VIPCenter} hideNavBar={true} />
            <Scene
              key="userProfile"
              component={UserProfile}
              hideNavBar={true}
            />
            <Scene key="matchProfile" component={Matches} hideNavBar={true} />
            <Scene
              key="fullScreenVideo"
              component={FullScreenVideo}
              hideNavBar={true}
            />
            <Scene
              key="fullScreenCamera"
              component={FullScreenCamera}
              hideNavBar={true}
            />
            <Scene
              key="galleryView"
              component={GalleryView}
              hideNavBar={true}
            />
            <Scene key="chatList" component={ChatList} hideNavBar={true} />
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
           
              key="Profile"
              hideNavBar={true}
              component={Profile}
            />
            <Scene
           
            key="EventLocation"
            hideNavBar={true}
            component={EventLocation}
          />
          </Scene>
          <Scene
            key="drawerRight"
            drawer={true}
            gesturesEnabled={false}
            contentComponent={RightSlide}
            hideNavBar={true}
            drawerPosition="right"
          >
          <Scene
              key="eventDetailPage"
              
              hideNavBar={true}
              component={EventDetailPage}
            /></Scene>
        </Scene>
      </Router>
    );
  }
}
