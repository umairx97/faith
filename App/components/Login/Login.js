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

  componentDidMount() {}

  onFacebookPressed = () => {
    this.props.navigation.navigate("UniversalTabView");
  };

  // onGooglePressed = () => {

  // }

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/images/bg-plainwhite.png")}
        style={styles.MainContainer}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.migoLogoImage}
        />

        <TouchableOpacity
          onPress={() => {
            Actions.signUp();
          }}
          style={styles.facebookButton}
        >
          <Text style={{ color: "white" }}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.signIn();
          }}
          style={styles.googleButton}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.byClickingStartYText}>
          By clicking start, you agree to our Terms and Conditions{" "}
        </Text>
      </ImageBackground>

      // <ImageBackground
      //         source={require("../../../assets/images/bg-plainwhite.png")}
      //         style={styles.MainContainer}
      //       >
      //         <Image
      //           source={require("../../../assets/images/logo.png")}
      //           style={styles.migoLogoImage}
      //         />

      //         <TouchableOpacity
      //           onPress={() => {
      //             Actions.home();
      //           }}
      //           style={styles.facebookButton}
      //         >
      //           <Image source={require("../../../assets/images/path.png")} />
      //           <Text style={{ color: "white" }}> Connect with Facebook</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           onPress={this.onGooglePressed}
      //           style={styles.googleButton}
      //         >
      //           <Image source={require("../../../assets/images/path-2.png")} />
      //           <Text style={{ color: "white" }}> Connect with Google</Text>
      //         </TouchableOpacity>
      //         <Text style={styles.byClickingStartYText}>
      //           By clicking start, you agree to our Terms and Conditions{" "}
      //         </Text>
      //       </ImageBackground>

      // <ScrollView>
      // <View
      // 		pointerEvents="box-none"
      // 		style={styles.loginView}>
      // 		<LinearGradient
      // 			start={{
      // 				x: 0.5,
      // 				y: 0.55,
      // 			}}
      // 			end={{
      // 				x: 0.5,
      // 				y: 1,
      // 			}}
      // 			locations={[0, 1]}
      // 			colors={['rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.67)']}
      // 			style={styles.bgWhiteImageLinearGradient}>
      // 			<Image
      // 				source={require("../../../assets/images/bg-white.png")}
      // 				style={styles.bgWhiteImage}/>
      // 		</LinearGradient>
      // 		<View
      // 			pointerEvents="box-none"
      // 			style={{
      // 				flex: 1,
      // 				flexDirection: "column",
      // 				justifyContent: "flex-end",
      // 			}}>
      // 			<TouchableOpacity
      // 				onPress={this.onFacebookPressed}
      // 				style={styles.facebookButton}>
      // 				<Image
      // 					source={require("../../../assets/images/path.png")}/>
      // 				<Text>Connect with Facebook</Text>
      // 			</TouchableOpacity>
      // 			<TouchableOpacity
      // 				onPress={this.onGooglePressed}
      // 				style={styles.googleButton}>
      // 				<Image
      // 					source={require("../../../assets/images/path-2.png")}/>
      // 				<Text>Connect with Google</Text>
      // 			</TouchableOpacity>
      // 			<Text
      // 				style={styles.byClickingStartYText}>By clicking start, you agree to our Terms and Conditions </Text>
      // 			<Image
      // 				source={require("../../../assets/images/iphone-x-home-indicator-home-indicator---on-light.png")}
      // 				style={styles.iphoneXHomeIndicatorHomeIndicatorOnLightImage}/>
      // 		</View>
      // 		<View
      // 			pointerEvents="box-none"
      // 			style={{
      // 				position: "absolute",
      // 				width: "100%",
      // 				height: "100%",
      // 			}}>
      // 			<Image
      // 				source={require("../../../assets/images/migo-logo.png")}
      // 				style={styles.migoLogoImage}/>
      // 		</View>
      // 	</View>
      // 	</ScrollView>)
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,

    width: null,
    height: null
  },
  container: {
    flex: 1,
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
  facebookButtonImage: {
    resizeMode: "contain"
  },
  facebookButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 0,
    letterSpacing: 0
  },
  facebookButton: {
    flex: 1,
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 316,
    height: 48,
    marginBottom: 33,
    marginTop: 200,
    alignSelf: "center"
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
    flex: 1,
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 316,
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
    width: 243,
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    marginBottom: 3
  },
  iphoneXHomeIndicatorHomeIndicatorOnLightImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 34
  },
  migoLogoImage: {
    flex: 1,
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 156,
    height: 43,
    marginTop: 75,
    alignSelf: "center"
  }
});

// export default createStackNavigator({
// 	Login: Login,
// 	Discover: Discover
//   });
