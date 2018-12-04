//
//  Login.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";
import Discover from "../Discover/Discover";
import { Actions } from "react-native-router-flux";
import { RkButton } from "react-native-ui-kitten";
import { StatusBar } from "react-native";
console.disableYellowBox = true;
export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  onFacebookPressed = () => {
    this.props.navigation.navigate("UniversalTabView");
  };

  // onGooglePressed = () => {

  // }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.migoLogoImage}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 36
          }}
        >
          <View>
            <RkButton
              rkType="rounded"
              style={styles.facebookButton}
              onPress={() => {
                Actions.signUp();
              }}
            >
              Sign Up
            </RkButton>
          </View>
          <View>
            <RkButton
              rkType="rounded"
              style={styles.googleButton}
              onPress={() => {
                Actions.signIn();
              }}
            >
              Login
            </RkButton>
          </View>
          <Text style={styles.byClickingStartYText}>
            By clicking start, you agree to our Terms and Conditions{" "}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  container: {
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  loginView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  bgWhiteImageLinearGradient: {
    width: 726,
    height: 834,
    marginLeft: -107,
    marginTop: -18,
    marginRight: -244
  },
  bgWhiteImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  },

  facebookButton: {
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",

    justifyContent: "center",
    width: 200,
    height: 48,
    marginBottom: 40,
    alignSelf: "center",
    textAlign: "center"
  },
  googleButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 0,
    letterSpacing: 0
  },
  googleButtonImage: {
    resizeMode: "contain"
  },
  googleButton: {
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 48,
    marginBottom: 40,
    alignSelf: "center"
  },
  byClickingStartYText: {
    color: "rgb(0,0,0)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: -0.36,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "70%",
    alignSelf: "center",
    marginBottom: 3
  },
  iphoneXHomeIndicatorHomeIndicatorOnLightImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 34
  },
  migoLogoImage: {
    resizeMode: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "25%",
    height: "15%",
    marginTop: "35%",
    alignSelf: "center"
  }
});

