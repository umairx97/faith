import React, { Component } from "react";
import { Formik } from "formik";
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { BackHandler } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import MaterialTextInput from "../OwnComponents/MaterialTextInput";
import { compose } from "recompose";
import * as Yup from "yup";
import { RkButton, RkText, RkTextInput } from "react-native-ui-kitten";
import LoadingButton from "react-native-loading-button";
import AnimateLoadingButton from "react-native-animate-loading-button";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import { ProgressDialog } from "react-native-simple-dialogs";
import DeviceInfo from "react-native-device-info";
let apiVersion;
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
const MyInput = compose(
  makeInputGreatAgain,
  withNextInputAutoFocusInput
)(MaterialTextInput);

const Form = withNextInputAutoFocusForm(View);
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("please! email?")
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "pretty sure this will be hacked")
});

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      userStatus: "",
      logintext: "Login",
      progressVisible: false
    };
    if (Platform.OS === "android") {
      apiVersion = DeviceInfo.getAPILevel();
    }

    GoogleSignin.configure({
      androidClientId:
        "390674890211-q9tdrigtg149nvvsd4c4j0reg1830htk.apps.googleusercontent.com",

      iosClientId:
        "390674890211-kj16bik8bkkjemv872v9o2fi57irs95m.apps.googleusercontent.com"
    });
  }
  showLoading() {
    this.setState({ loading: true });
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  backAndroid() {
    Actions.pop(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  hideLoading() {
    this.setState({ loading: false });
  }

  _onPressHandler() {
    this.loadingButton.showLoading(true);

    // mock
    setTimeout(() => {
      this.loadingButton.showLoading(false);
    }, 2000);
  }
  // componentDidMount() {
  //   const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));

  //   NetInfo.isConnected.fetch().then().done(() => {
  //     NetInfo.isConnected.addEventListener('change', dispatchConnected);
  //   });
  // }
  async _onGoogleLogin() {
    // instance = this;
    // instance.setState({ ...this.state, progressVisible: true });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    GoogleSignin.signIn()
      .then(data => {
        // instance.setState({ ...this.state, progressVisible: false });
        //Alert.alert("token " + data.user.idToken);
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(user => {
        this.openDrawerPage("googleLoggedin");
      })
      .catch(error => {
        //  instance.setState({ ...this.state, progressVisible: false });
        const { code, message } = error;
        // Alert.alert(message + " Errorcode " + code);
      });
  }
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  _onSubmit() {
    instance = this;
    //this.setState({ isLoadingVisible: true });
    // instance.setState({ ...this.state, progressVisible: true });
    // setTimeout(() => {
    //   this.setState({ logintext: "Loading..." });
    // }, 100);
    const { email, password } = this.state;
    if (email != "" && password != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userData => {
          if (userData.user.emailVerified == false) {
            // this.loadingButton.showLoading(false);
            // instance.setState({ ...this.state, progressVisible: false });
            Alert.alert("Please verify your email for login.");
            //  this.setState({ logintext: "Login" });
          } else {
            // this.loadingButton.showLoading(true);
            // instance.setState({ ...this.state, progressVisible: false });
            this.openDrawerPage("firebaseLoggedin");
          }
        })
        .catch(error => {
          //  instance.setState({ ...this.state, progressVisible: false });
          //Login was not successful, let's create a new account
          Alert.alert("Invalid credentials");
        });
    } else {
      Alert.alert("Please enter email & Password");
    }
  }
  async openDrawerPage(_val) {
    if (Platform.OS === "android") {
      if (apiVersion >= 23) {
        this.requestLocationPermission();
      } else {
        AsyncStorage.setItem("checkLoggedType", _val);
        Actions.home();
      }
    } else {
      AsyncStorage.setItem("checkLoggedType", _val);
      Actions.home();
    }
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        AsyncStorage.setItem("checkLoggedType", _val);
        Actions.home();
      } else {
        // Actions.reset("signIn");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  loginWithFacebook = async () => {
    try {
      // LoginManager.setLoginBehavior("web");
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        alert("Facebook login request canceled");
        return;
        //throw new Error('User cancelled request');
      }

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        alert("Invalid user data");
        return;
        //throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      var x = JSON.stringify(credential);

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          this.openDrawerPage("facebookloggedin");
        })
        .catch(error => {
          //  instance.setState({ ...this.state, progressVisible: false });
          const { code, message } = error;
          // Alert.alert(message + " Errorcode " + code);
        });
    } catch (e) {
      console.error(e);
      alert(JSON.stringify("catch" + e));
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ProgressDialog
          visible={this.state.progressVisible}
          title="Progress Dialog"
          message="Please, wait..."
        />
        <Formik
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
          render={props => (
            <ScrollView
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              contentContainerStyle={styles.container}
            >
              <Form>
                <View>
                  <Image
                    source={require("../../../assets/images/logo.png")}
                    style={styles.migoLogoImage}
                  />

                  <View style={styles.loginForm}>
                    <View style={styles.formInput}>
                      <Text>Email</Text>
                      <MyInput
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                        returnKeyLabel={"next"}
                        onChangeText={text => this.setState({ email: text })}
                        style={styles.textInput}
                      />
                    </View>
                    <View style={styles.formInput}>
                      <Text>Password</Text>
                      <MyInput
                        name="password"
                        type="password"
                        placeholder="Please enter your password"
                        returnKeyType="next"
                        onChangeText={value =>
                          this.setState({ password: value })
                        }
                        style={styles.textInput}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        Actions.forgetPass();
                      }}
                    >
                      <Text style={styles.forgetPwd}>Forgot Password</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: "4%" }}>
                      <RkButton
                        rkType="rounded"
                        style={styles.googleButton}
                        // onPress={props.handleSubmit}
                        onPress={() => {
                          this._onSubmit();
                        }}
                      >
                        Login
                      </RkButton>
                      {/* <AnimateLoadingButton
                        ref={c => (this.loadingButton = c)}
                        width={200}
                        height={48}
                        title="Login"
                        titleFontSize={16}
                        titleColor="rgb(255,255,255)"
                        backgroundColor="rgb(252, 56, 80)"
                        borderRadius={24}
                        onPress={this._onSubmit.bind(this)}
                      /> */}

                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            backgroundColor: "black",
                            height: 2,
                            flex: 1,
                            alignSelf: "center",
                            marginLeft: "12%",
                            marginTop: "4%"
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: "center",
                            paddingHorizontal: 5,
                            fontSize: 14,
                            marginTop: "4%"
                          }}
                        >
                          Or Login With
                        </Text>
                        <View
                          style={{
                            backgroundColor: "black",
                            height: 2,
                            flex: 1,
                            alignSelf: "center",
                            marginRight: "12%",
                            marginTop: "4%"
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",

                          marginTop: "5%"
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <RkButton
                            rkType="rounded"
                            style={[
                              {
                                width: "100%",
                                marginRight: "2%",
                                marginVertical: 8
                              }
                            ]}
                          >
                            <Icon
                              style={[
                                styles.icon,
                                { marginHorizontal: 16, fontSize: 21 }
                              ]}
                              name="facebook"
                            />
                            <RkText
                              onPress={() => {
                                this.loginWithFacebook();
                              }}
                              rkType="caption"
                            >
                              Facebook
                            </RkText>
                          </RkButton>
                        </View>
                        <View style={{ flex: 1 }}>
                          <RkButton
                            onPress={() => {
                              this._onGoogleLogin();
                            }}
                            rkType="rounded"
                            style={[
                              {
                                width: "100%",
                                marginLeft: "2%",
                                marginVertical: 8,
                                backgroundColor: "#dd4b39"
                              }
                            ]}
                          >
                            <Icon
                              style={[
                                styles.icon,
                                { marginHorizontal: 16, fontSize: 21 }
                              ]}
                              name="google"
                            />
                            <RkText rkType="caption">Google</RkText>
                          </RkButton>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Form>
              <OfflineNotice />
            </ScrollView>
          )}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "10%",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: "#FFFFFF"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  innerView1: {
    flex: 1,
    padding: "10%",
    width: "100%",
    height: "100%",
    marginTop: "5%",
    flexDirection: "column"
  },
  forgetPwd: {
    width: "100%",
    textAlign: "right",
    marginTop: "3%",
    color: "#000"
  },
  icon: {
    color: "white"
  },
  migoLogoImage: {
    resizeMode: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "25%",
    height: "15%",

    alignSelf: "center"
  },
  loginForm: {
    width: "100%",
    marginTop: "14%"
  },
  textInput: {
    width: "100%",
    color: "#000000"
    // borderColor: "red",
    // marginTop: Platform.OS === "ios" ? 10 + "%" : 0,
    // borderBottomWidth: 1

    // marginTop: Platform.OS === "ios" ? 10 + "%" : 0
  },
  formInput: {
    width: "100%",
    marginTop: "4%"
  },
  googleButton: {
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,

    width: 200,
    height: 48,

    alignSelf: "center"
  },
  facebookButton: {
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 48,
    marginBottom: 33,
    marginTop: 100,
    alignSelf: "center",
    textAlign: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableHighlight,
//   Image,
//   Alert,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import { RkButton, RkText } from "react-native-ui-kitten";
// import { ScrollView } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Actions } from "react-native-router-flux";

// export default class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       email: "",
//       password: ""
//     };
//   }

//   onClickListener = viewId => {
//     Alert.alert("Alert", "Button pressed " + viewId);
//   };
//   _onSubmit() {
//     //const { email, password } = this.state;
//     Alert.alert("Alert", "Button pressed " + this.email);
//    Actions.home();
//   }

//   render() {
//     return (
//       <View style={styles.container}>

//           <Image
//             source={require("../../../assets/images/logo.png")}
//             style={styles.migoLogoImage}
//           />
//           <View style={styles.loginForm}>
//             <View style={styles.formInput}>
//               <Text>Username</Text>
//               <TextInput placeholder="Please enter your email"
//               onChangeText={value => this.setState({ email: value })}
//               returnKeyLabel = {"next"}
//               onChangeText={(text) => this.setState({email:text})}
//                style={styles.textInput} />
//             </View>
//             <View style={styles.formInput}>
//               <Text>Password</Text>
//               <TextInput placeholder="Please enter your password"
//               onChangeText={value => this.setState({ password: value })}
//                style={styles.textInput} />
//             </View>
//              < TouchableOpacity
// onPress = {
//   () => {
//     Actions.forgetPass();
//   }
// } >
//             <Text style={styles.forgetPwd}>Forgot Password</Text></TouchableOpacity>
//             <View style={{ marginTop: "4%" }}>
//               <RkButton
//                 rkType="rounded"
//                 style={styles.googleButton}
//                 onPress={() => {
//                   this._onSubmit();
//                 }}
//               >
//                 Login
//               </RkButton>
//               <View style={{ flexDirection: "row" }}>
//                 <View
//                   style={{
//                     backgroundColor: "black",
//                     height: 2,
//                     flex: 1,
//                     alignSelf: "center",
//                     marginLeft: "12%",
//                     marginTop: "4%"
//                   }}
//                 />
//                 <Text
//                   style={{
//                     alignSelf: "center",
//                     paddingHorizontal: 5,
//                     fontSize: 14,
//                     marginTop: "4%"
//                   }}
//                 >
//                   Or Login With
//                 </Text>
//                 <View
//                   style={{
//                     backgroundColor: "black",
//                     height: 2,
//                     flex: 1,
//                     alignSelf: "center",
//                     marginRight: "12%",
//                     marginTop: "4%"
//                   }}
//                 />
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",

//                   marginTop: "5%"
//                 }}
//               >
//                 <View style={{ flex: 1 }}>
//                   <RkButton
//                     rkType="rounded"
//                     style={[
//                       {
//                         width: "100%",
//                         marginRight: "2%",
//                         marginVertical: 8
//                       }
//                     ]}
//                   >
//                     <Icon
//                       style={[
//                         styles.icon,
//                         { marginHorizontal: 16, fontSize: 21 }
//                       ]}
//                       name="facebook"
//                     />
//                     <RkText rkType="caption">Facebook</RkText>
//                   </RkButton>
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <RkButton
//                     rkType="rounded"
//                     style={[
//                       {
//                         width: "100%",
//                         marginLeft: "2%",
//                         marginVertical: 8,
//                         backgroundColor: '#dd4b39'
//                       }
//                     ]}
//                   >
//                     <Icon
//                       style={[
//                         styles.icon,
//                         { marginHorizontal: 16, fontSize: 21 }
//                       ]}
//                       name="google"
//                     />
//                     <RkText rkType="caption" >Google</RkText>
//                   </RkButton>
//                 </View>
//               </View>
//             </View>
//           </View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     padding: "10%",
//     flexDirection: "column",
//         justifyContent: "center",

//     backgroundColor: "#FFFFFF"
//   },
//   innerView1: {
//     flex: 1,
//     padding: "10%",
//     width: "100%",
//     height: "100%",
//     marginTop: "5%",
//     flexDirection: "column"
//   },
//   forgetPwd: {
//     width: "100%",
//     textAlign: "right",
//     marginTop: "3%",
//     color: "#000"
//   },
//   icon: {
//     color: "white"
//   },
//   migoLogoImage: {
//     resizeMode: "contain",
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: "25%",
//     height: "15%",

//     alignSelf: "center"
//   },
//   loginForm: {
//     width: "100%",
//     marginTop: "14%"
//   },
//   textInput: {
//     width: "100%",
//     color: "#000000",
//     borderColor: "red",
//     marginTop: Platform.OS === 'ios' ? 10+"%" : 0,
//     borderBottomWidth: 1
//   },
//   formInput: {
//     width: "100%",
//     marginTop: "4%"
//   },
//   googleButton: {
//     backgroundColor: "rgb(252, 56, 80)",
//     borderRadius: 24,

//     width: 200,
//     height: 48,

//     alignSelf: "center"
//   },
//   facebookButton: {
//     backgroundColor: "rgb(38, 114, 203)",
//     borderRadius: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 100,
//     height: 48,
//     marginBottom: 33,
//     marginTop: 100,
//     alignSelf: "center",
//     textAlign: "center"
//   },
//   inputContainer: {
//     borderBottomColor: "#F5FCFF",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 30,
//     borderBottomWidth: 1,
//     width: 250,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   inputs: {
//     height: 45,
//     marginLeft: 16,
//     borderBottomColor: "#FFFFFF",
//     flex: 1
//   },
//   inputIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//     justifyContent: "center"
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30
//   },
//   loginButton: {
//     backgroundColor: "#00b5ec"
//   },
//   loginText: {
//     color: "white"
//   }
// });
