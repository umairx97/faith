import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  PermissionsAndroid
} from "react-native";
import { RkButton, RkText } from "react-native-ui-kitten";
import { BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Images } from "../../../assets/imageAll";
import { AccessToken, LoginManager } from "react-native-fbsdk";


import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import AnimateLoadingButton from "react-native-animate-loading-button";
import firebase from "react-native-firebase";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ProgressDialog } from "react-native-simple-dialogs";
import Moment from "moment";
import { Actions } from "react-native-router-flux";
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import MaterialTextInput from "../OwnComponents/MaterialTextInput";
import { compose } from "recompose";
import * as Yup from "yup";
import { Formik } from "formik";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import Dialog from "react-native-dialog";
let apiVersion;
import DeviceInfo from "react-native-device-info";

var radio_props = [
  {
    label: "Male  ",
    value: 0
  },
  {
    label: "Female",
    value: 1
  }
];
const MyInput = compose(
  makeInputGreatAgain,
  withNextInputAutoFocusInput
)(MaterialTextInput);
const Form = withNextInputAutoFocusForm(View);
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required(" Full Name is required"),
  username: Yup.string().required("User Name is required"),
  email: Yup.string()
    .required("please! email?")
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(8, "Please enter 8 digit password"),
  dateOfBirth: Yup.string().required(" Date of birth is required")
});
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isDateTimePickerVisible: false,
      dob: "",
      _email: "",
      _username: "",
      _password: "",
      _fullName: "",
      _gender: 0,
      _dob: "",
      progressVisible: false,
      dialogVisible: false,
      dob_color: "black"
    };
    if (Platform.OS === "android") {
      apiVersion = DeviceInfo.getAPILevel();
    }
    
    GoogleSignin.configure({
      webClientId: "390674890211-p2orsbqht6g3d41p00d9r0hbf90se69b.apps.googleusercontent.com",
      iosClientId: "390674890211-3k8l7no4j9jku84dag3j7cuq0637hvn2.apps.googleusercontent.com"
    });
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
  _sendEmailVerification() {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        firebase.auth().signOut();
        this.setState({
          ...this.state,
          progressVisible: false,
          dialogVisible: true
        });
      })
      .catch(err => {
        this.setState({ ...this.state, progressVisible: false });
      });
  }

  _handleSignUp() {
    // Actions.activityLoader();
    this.setState({ ...this.state, progressVisible: true });
    instance = this;
    const {
      _fullName,
      _username,
      _email,
      _password,
      _dob,
      _gender
    } = this.state;
    if (
      _email != "" &&
      _password != "" &&
      _fullName != "" &&
      _username != null &&
      _dob != null
    ) {
      firebase
        .auth()
        .signInWithEmailAndPassword(_email, _password)
        .then(userData => {})
        .catch(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(_email, _password)
            .then(userData => {
              this._updateUserProfile(
                userData.user.uid,
                userData.user.email,
                _username,
                _fullName,
                _gender,
                _dob
              );
            })
            .catch(error => {
              alert("Authentication failed." + error.toString());
            });
        });
    } else {
      alert("Please fill all fields");
    }
  }
  
  _updateUserProfile(the_uid, _email, _username, _fullName, _gender, _dob) {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + the_uid)
      .set({
        uid: the_uid,
        email: _email,
        userName: _username,
        fullName: _fullName,
        gender: _gender,
        user_Dob: _dob,
        isVarified: false,
        isLogin: false
      })
      .then(ref => {
        this._sendEmailVerification();
      })
      .catch(error => {
        this.setState({ ...this.state, progressVisible: false });
        alert("fail" + error.toString());
      });
  }

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true
    });
  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false
    });
  _handleDatePicked = date => {
    Moment.locale("en");
    const NewDate = Moment(date).format("DD-MM-YYYY");
    this._hideDateTimePicker();
    this.setState({
      dob: NewDate,
      _dob: NewDate
    });
  };
  onClickListener = viewId => {
    alert("Alert", "Button pressed " + viewId);
  };

  _onGoogleLogin = async () => {
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
        this.setState({ ...this.state, progressVisible: false });
        this.updateUserProfile(user.user.uid, user.user.displayName, user.user.email,"g+", user.user.photoURL);
      })
      .catch(error => {
        this.setState({ ...this.state, progressVisible: false });
        const { code, message } = error;
        console.warn(message + " Errorcode " + code);
        Alert.alert(message + " Errorcode " + code);
      });
  };

  updateUserProfile(uid, name, email,loginWith, photoUrl) {
    // var userName = name.split(" ").join("_");
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
            userName: name,
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
          });
      }
    });
  }
  
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
  onClickListener = viewId => {
    alert("Alert", "Button pressed " + viewId);
  };
  handleSuccess() {
    this.setState({ ...this.state, dialogVisible: false });
    setTimeout(() => {
      Actions.login();
    }, 400);
  }

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
          this.updateUserProfile(user.user._user.uid, user.user._user.displayName, user.user._user.email, "FB", user.user._user.photoURL);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn('facebook error: ', JSON.stringify(error));
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
    }
    return (
      <KeyboardAvoidingView
        style={{
          ...ifIphoneX({ height: Screen.height, backgroundColor: "#FFFFFF" }), flex: 1
        }}
      >
        <Formik
          onSubmit={values => console.log(values)}
          style={{flex: 1}}
          validationSchema={validationSchema}
          render={props => (
            <ScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              <Form style={{flex: 1}}>
                <View style={{ flex: 1, marginTop: 30, marginBottom: 30 }}>
                  <OfflineNotice />
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10 + "%",
                      paddingRight: 10 + "%"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",

                        paddingTop: 30
                      }}
                    >
                      <Text>Full Name</Text>
                      <MyInput
                        name="fullname"
                        type="name"
                        onChangeText={text =>
                          this.setState({ _fullName: text })
                        }
                        placeholder="Please enter your name"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Username</Text>
                      <MyInput
                        name="username"
                        type="name"
                        onChangeText={text =>
                          this.setState({ _username: text })
                        }
                        placeholder="Please enter your username"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Email</Text>
                      <MyInput
                        name="email"
                        type="email"
                        onChangeText={text => this.setState({ _email: text })}
                        placeholder="Please enter your email"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Password</Text>
                      <MyInput
                        name="password"
                        type="password"
                        onChangeText={text =>
                          this.setState({ _password: text })
                        }
                        placeholder="Please enter your Password"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text>Date of Birth</Text>
                       <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text
                          placeholder="Plz, Select your date of birth"
                          style={{
                            color: this.state.dob_color,
                            marginTop: 20,
                            marginBottom: 2,
                            paddingBottom: 10
                          }}
                        >
                          {this.state.dob}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: "#3090C7",
                          height: 1.2,
                          marginBottom: "4%"
                        }}
                      />
                      <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                      />
                    </View>
                    
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",

                        marginBottom: 20,
                        marginTop: 20
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 8,
                          marginRight: 8
                        }}
                      >
                        Gender
                      </Text>
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={"#2196f3"}
                        animation={true}
                        onPress={value => {
                          this.setState({
                            _gender: value
                          });
                        }}
                      />
                    </View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                      <Dialog.Title>Success</Dialog.Title>
                      <Dialog.Description>
                        Your account created successfully! Please check your
                        email for verification
                      </Dialog.Description>
                      <Dialog.Button
                        label="Ok"
                        onPress={() => {
                          this.handleSuccess();
                        }}
                      />
                    </Dialog.Container>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: 20
                      }}
                    >
                      <RkButton
                        rkType="rounded"
                        style={styles.googleButton}
                        onPress={() => {
                          this._handleSignUp();
                        }}
                      >
                        Register
                      </RkButton>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          backgroundColor: "black",
                          height: 2,
                          flex: 1,
                          alignSelf: "center",
                          marginLeft: "12%",
                          marginTop: "10%"
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: "center",
                          paddingHorizontal: 5,
                          fontSize: 14,
                          marginTop: "10%"
                        }}
                      >
                        Or SignUp With
                      </Text>
                      <View
                        style={{
                          backgroundColor: "black",
                          height: 2,
                          flex: 1,
                          alignSelf: "center",
                          marginRight: "12%",
                          marginTop: "10%"
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: "15%",
                        marginTop: "10%"
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <RkButton
                          onPress={() => {
                            this.loginWithFacebook();
                          }}
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
              </Form>
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
    flexDirection: "column",
    backgroundColor: "#FFFFFF"
  },
  mainContainer: {
    flex: 1
  },
  innerView1: {
    flex: 1,
    padding: "10%",
    width: "100%",

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
  },
  formInput: {
    width: "100%"
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
