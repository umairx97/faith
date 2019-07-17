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
import firebase from "react-native-firebase";
import { BackHandler } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import MaterialTextInput from "../OwnComponents/MaterialTextInput";
import { compose } from "recompose";
import * as Yup from "yup";
import { RkButton, RkText, RkTextInput } from "react-native-ui-kitten";
// import LoadingButton from "react-native-loading-button";
// import AnimateLoadingButton from "react-native-animate-loading-button";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
// import { ProgressDialog } from "react-native-simple-dialogs";
import { Images } from "../../../assets/imageAll";

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
    // old 390674890211-oniimc9c6cf0r1mqml75rfc9l94b29s0.apps.googleusercontent.com
    GoogleSignin.configure({
      webClientId: "390674890211-p2orsbqht6g3d41p00d9r0hbf90se69b.apps.googleusercontent.com",
      iosClientId: "390674890211-3k8l7no4j9jku84dag3j7cuq0637hvn2.apps.googleusercontent.com"
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

    setTimeout(() => {
      this.loadingButton.showLoading(false);
    }, 2000);
  }

  async _onGoogleLogin() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    GoogleSignin.signIn()
      .then(data => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(user => {
        // console.warn('user: ', user);
        this.updateUserProfile(user.user.uid, user.user.displayName, user.user.email, "g+", user.user.photoURL+'?sz=300');
      })
      .catch(error => {
        const { code, message } = error;
        Alert.alert(message + " Errorcode " + code);
      });
  }

  updateUserProfile(uid, name, email, loginWith, photoUrl) {
    var userUserName = name.split(" ").join("_");
    // var userName=name;
    var userRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + uid);
    userRef.once("value").then(snapshot => {
      if (snapshot.exists()) {
        if (loginWith == "FB") {
          this.openDrawerPage("facebookloggedin");
          return;
        }
        this.openDrawerPage("googleLoggedin");
      } else {
        userRef
          .set({
            uid: uid,
            email: email,
            userName: userUserName,
            fullName: name,
            gender: "0",
            latitude: 0,
            user_Dob: "0",
            longitude: 0,
            isVarified: true,
            isLogin: true,
            profileImageURL: photoUrl
          })
          .then(ref => {
            if (loginWith == "FB") {
              this.openDrawerPage("facebookloggedin");
              return;
            }
            this.openDrawerPage("googleLoggedin");
          })
          .catch(error => {
            alert(error);
          });
      }
    });
  }
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  _onSubmit() {
    this.setState({ ...this.state, progressVisible: true });
    instance = this;

    const { email, password } = this.state;
    if (email != "" && password != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userData => {
          if (userData.user.emailVerified == false) {
            this.setState({ ...this.state, progressVisible: false });
            Alert.alert("Please verify your email for login.");
          } else {
          //  this.getOnlineInfo();
            firebase.database().ref("Users/FaithMeetsLove/Registered/" + userData.user.uid).update({
              isVarified: true,
              isLogin: true,
            })

            this.openDrawerPage("firebaseLoggedin");
          }
        })
        .catch(error => {
          this.setState({ ...this.state, progressVisible: false });
          Alert.alert("Invalid credentials");
        });
    } else {
      this.setState({ ...this.state, progressVisible: false });
      Alert.alert("Please enter email & Password");
    }
  }
//   getOnlineInfo=async()=>{
//     var uidUser = await firebase.auth().currentUser.uid;
//   var userStatusDatabaseRef = firebase.database().ref('Users/FaithMeetsLove/status/' + uidUser);
 
// firebase.database().ref('.info/connected').on('value', function(snapshot) 
// {   
//   if (snapshot.val() == false) {
//     userStatusDatabaseRef.set(isOfflineForDatabase);
//       return;
//   };
//   userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
//   userStatusDatabaseRef.set(isOnlineForDatabase);
//   });
// });

//   }
  async openDrawerPage(_val) {
    AsyncStorage.setItem("checkLoggedType", _val);
    var fullName;
    var gender;
    var latitude;
    var longitude;
    var email;
    var user_Dob;
    var profileImageURL;
    var uidUser = await firebase.auth().currentUser.uid;
    var displayUserInfo = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + uidUser);
    await displayUserInfo.once("value").then(snapshot => {
      fullName = snapshot.val().fullName;
      gender = snapshot.val().gender;
      latitude = snapshot.val().latitude;
      longitude = snapshot.val().longitude;
      email = snapshot.val().email;
      user_Dob = snapshot.val().user_Dob;
      profileImageURL = snapshot.val().profileImageURL;
    });

    AsyncStorage.setItem("reg_user_name", fullName);
    AsyncStorage.setItem("reg_user_gender", "" + gender);
    AsyncStorage.setItem("reg_user_latitude", "" + latitude);
    AsyncStorage.setItem("reg_user_longitude", "" + longitude);
    AsyncStorage.setItem("reg_user_email", email);
    AsyncStorage.setItem("reg_user_dob", user_Dob);
    AsyncStorage.setItem("reg_user_profileImageURL", profileImageURL);

    if (Platform.OS === "android") {
      if (apiVersion >= 23) {
        this.requestLocationPermission(_val);
      } else {
        Actions.home();
      }
    } else {
      Actions.home();
    }
  }

  requestLocationPermission = async _val => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // AsyncStorage.setItem("checkLoggedType", _val);
        Actions.home();
      } else {
        // Actions.reset("signIn");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  loginWithFacebook = async () => {
    //Actions.activityLoader();
    try {
      // LoginManager.setLoginBehavior("web");
      LoginManager.logOut();
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
      // var x = JSON.stringify(credential);

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          // console.warn('data: ', user);
          this.updateUserProfile(user.user.uid, user.user.displayName, user.user.email, "FB", user.user.photoURL+'?type=large&width=300&height=300');
        })
        .catch(error => {
          Alert.alert('An account already exists with the same email address.');
        });
    } catch (e) {
      console.error(e);
      alert(JSON.stringify("catch" + e));
    }
  };

  render() {
    if (this.state.progressVisible) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <Image source={Images.loginLogo} style={styles.logoStyle} />
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    } else
      return (
        <KeyboardAvoidingView behavior="padding">
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
                         
                          onPress={() => {
                            this._onSubmit();
                          }}
                        >
                          Login
                        </RkButton>
                     
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={styles.orLoginView}
                          />
                          <Text
                            style={styles.orLoginText}
                          >
                            Or Login With
                          </Text>
                          <View
                            style={styles.socialLogin}
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
                              onPress={() => {
                                this.loginWithFacebook();
                              }}
                              rkType="rounded"
                              style={styles.facebookRk}
                            >
                              <Icon
                                style={[
                                  styles.icon,
                                  { marginHorizontal: 16, fontSize: 21 }
                                ]}
                                name="facebook"
                              />
                              <RkText
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
                              style={styles.googleRk}
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
  orLoginView:{
    backgroundColor: "black",
    height: 2,
    flex: 1,
    alignSelf: "center",
    marginLeft: "12%",
    marginTop: "4%"
  },
  facebookRk:{
    width: "100%",
    marginRight: "2%",
    marginVertical: 8
  },
  orLoginText:{
    alignSelf: "center",
    paddingHorizontal: 5,
    fontSize: 14,
    marginTop: "4%"
  },
  googleRk: {
    width: "100%",
    marginLeft: "2%",
    marginVertical: 8,
    backgroundColor: "#dd4b39"
  },
  socialLogin:{
    backgroundColor: "black",
    height: 2,
    flex: 1,
    alignSelf: "center",
    marginRight: "12%",
    marginTop: "4%"
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
  
  loginText: {
    color: "white"
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  logoStyle: {
    height: 100,
    width: 100,
    resizeMode: "contain"
  }
});
