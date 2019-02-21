import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Easing
} from "react-native";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import AppSlider from "../Slider/Slider";
import { StatusBar } from "react-native";
console.disableYellowBox = true;
import firebase from "../../../App/components/FirebaseConfig/FirebaseConfig";
export default class MyappSplash extends Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);

    this.state = {
      isVisible: true,
      isLoggedIn: false
    };
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start(() => this.StartImageRotateFunction());
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    var that = this;
    this.StartImageRotateFunction();

    setTimeout(function() {
      //Actions.slide();
      that.Hide_Splash_Screen();
    }, 5000);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified == true) {
          this.setState({
            isLoggedIn: true
          });
        } else {
          this.setState({
            isLoggedIn: false
          });
        }
      } else {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}
          <Animated.Image
            source={require("../../../assets/images/logo.png")}
            style={{
              width: "50%",
              height: "50%",
              resizeMode: "contain",
              transform: [{ rotate: RotateData }]
            }}
          />
        </View>
      </View>
    );
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.MainContainer}>
          <BaseEmpty />
          {this.state.isVisible === true ? Splash_Screen : null}
        </View>
      );
    } else {
      return (
        <View style={styles.MainContainer}>
          <AppSlider />
          {this.state.isVisible === true ? Splash_Screen : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    margin: 0,
    position: "absolute",
    width: "100%",
    height: "100%"
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    margin: 0
  },

  TouchableOpacity_Style: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: "absolute"
  }
});
class BaseEmpty extends Component {
  constructor() {
    super();
    Actions.drawer();
  }
  render() {
    return <View />;
  }
}
