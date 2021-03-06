import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";
import Discover from "../Discover/Discover";
import { Actions } from "react-native-router-flux";
import { RkButton } from "react-native-ui-kitten";
import { StatusBar } from "react-native";
import { Immersive } from 'react-native-immersive';
// console.disableYellowBox = true;
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
    this.androidGoInImmersive();
  }

  onFacebookPressed = () => {
    this.props.navigation.navigate("UniversalTabView");
  };

  androidGoInImmersive() {
    if(Platform.OS == 'android') {
      Immersive.setImmersive(true);
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.migoLogoImage}
        />
        <View
          style={styles.signUpView}
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
  signUpView:{
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },

  facebookButton: {
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",

    justifyContent: "center",
    width: 300,
    height: 48,
    marginBottom: 40,
    alignSelf: "center",
    // textAlign: "center"
  },
  googleButton: {
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 48,
    marginBottom: 40,
    alignSelf: "center"
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
