import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import Route from "./App/components/routes/Routes";
import { Actions } from "react-native-router-flux";

import MyappSplash from "./App/components/SplashScreen/MyappSplash";
export default class App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }
  //Remove listeners allocated in createNotificationListeners()

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { id, title, body } = notification;
        // alert(JSON.stringify(notification.data.id));
        // AsyncStorage.setItem("friendsUid", "" + notification.data.id);
        // AsyncStorage.setItem("friendName", notification.data.name);
        // AsyncStorage.setItem("openChatFrom", "true");
        // setTimeout(() => {
        //   Actions.chat();
        // }, 300);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        AsyncStorage.setItem("friendsUid", "" + notificationOpen.notification.data.id);
        AsyncStorage.setItem("friendName", notificationOpen.notification.data.name);
        AsyncStorage.setItem("openChatFrom", "true");
        setTimeout(() => {
          Actions.chat();
        }, 300);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      AsyncStorage.setItem("friendsUid", "" + notificationOpen.notification.data.id);
      AsyncStorage.setItem("friendName", notificationOpen.notification.data.name);
      AsyncStorage.setItem("openChatFrom", "true");
      setTimeout(() => {
        Actions.chat();
      }, 300);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }
  render() {
    return <Route />;
  }
}
