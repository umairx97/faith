import React, {
  Component
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from "react-native";
import {
  RkButton,
  RkText
} from "react-native-ui-kitten";
import {
  ScrollView
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
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

import firebase from "../FirebaseConfig/FirebaseConfig";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import { Actions } from "react-native-router-flux";

var radio_props = [{
  label: "Male  ",
  value: 0
},
{
  label: "Female",
  value: 1
}
];
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
      _gender: "",
      _dob: ""
    };
    GoogleSignin.configure({
      androidClientId:
      "390674890211-q9tdrigtg149nvvsd4c4j0reg1830htk.apps.googleusercontent.com",
      iosClientId:
      "390674890211-kj16bik8bkkjemv872v9o2fi57irs95m.apps.googleusercontent.com"
      });

  } 

  _sendEmailVerification(){
    firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email sent.
    Alert.alert(
    'Success',
    'Your account created successfully! Please check your email for verification',
    [
    {text: 'OK', onPress: () => {Actions.signIn()}},
    ]
    )
    }, function(error) {
    // An error happened.
    });
    }

  _handleSignUp() {
    const {
    _fullName,
    _username,
    _email,
    _password,
    _dob,
    _gender
    } = this.state;
    
    firebase
    .auth()
    .signInWithEmailAndPassword(_email, _password)
    .then(userData => {
    //Alert.alert(userData.user.uid);
    })
    .catch(() => {
    //Login was not successful, let's create a new account
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
    Alert.alert("Authentication failed." + error.toString());
    });
    });
    }
    _updateUserProfile(the_uid, _email, _username, _fullName, _gender, _dob) {
    firebase
    .firestore()
    .collection("Users")
    .doc("faithInLove")
    .collection("Registered")
    .doc(the_uid)
    .set({
    uid: the_uid,
    email: _email,
    userName: _username,
    fullName: _fullName,
    gender: _gender,
    user_Dob: _dob
    })
    .then(ref => {
    // console.log(ref);
    //Alert.alert("firebase data save")
    this._sendEmailVerification();
    })
    .catch(error => {
    Alert.alert("fail" + error.toString());
    });
    }

  _showDateTimePicker = () => this.setState({
    isDateTimePickerVisible: true
  });
  _hideDateTimePicker = () => this.setState({
    isDateTimePickerVisible: false
  });
  _handleDatePicked = date => {
    Moment.locale("en");
    const NewDate = Moment(date).format("DD-MM-YYYY");
    this._hideDateTimePicker();
    this.setState({
      dob: NewDate,
      _dob: NewDate,
    });
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  async _onGoogleLogin() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    GoogleSignin.signIn()
    .then(data => {
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
    Actions.home();
    })
    .catch(error => {
    const { code, message } = error;
   // Alert.alert(message + " Errorcode " + code);
    });
  
    }
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  _onSubmit() {
    const { email, password } = this.state;
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        if(userData.user.emailVerified==false)
        {
       Alert.alert("Please verify your email for login.");
        }
        else
        {
       Actions.home();
         }
        //Alert.alert(userData.user.uid);
      })
      .catch(error => {
        //Login was not successful, let's create a new account
        Alert.alert("Invalid credentials");
      });
    
  }



  render() {
    return ( 
    < ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always' contentContainerStyle = {
          {
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: "#FFFFFF",
          }
        }
     >
      <View>
        <View style={
          {
            flex: 1,
            padding: "10%"
          }
        }>
          {/* <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              width: "100%"
            }
          } /> */}
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Image source={
              require("../../../assets/images/logo.png")
            }
              style={
                {
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: 90,
                  height: 90,
                  resizeMode: "contain",
                  marginBottom: 30
                }
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 20
            }
          }>
            <Text>Full Name</Text>
            <TextInput onChangeText={text => this.setState({ _fullName: text })} placeholder="Please enter your name"
              style={
                styles.textInput
              }
            />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text style={styles.formInput}> Username</Text>
            <TextInput onChangeText={text => this.setState({ _username: text })} placeholder="Please enter your username"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text style={styles.formInput}>Email</Text>
            <TextInput onChangeText={text => this.setState({ _email: text })} 
            placeholder="Please enter your email"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text style={styles.formInput}>Password</Text>
            <TextInput onChangeText={text => this.setState({ _password: text })} secureTextEntry={
              true
            }
              placeholder="Please enter your Password"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 10
            }
          }>
            <Text >Date of Birth</Text>
             <TouchableOpacity
             onPress = {
               this.onFacebookPressed
             } >
            <TextInput style={
              {
                color: "#000000"
              }
            }
              placeholder="Please select your DOB"
            
              value={
                this.state.dob
              }
            
              onChangeText={
                value => this.setState({
                  _dob:value
                })
              }
              onFocus={
                this._showDateTimePicker
              }
              style={
                styles.textInput
              } /></TouchableOpacity>
            <DateTimePicker isVisible={
              this.state.isDateTimePickerVisible
            }
              onConfirm={
                this._handleDatePicked
              }
              onCancel={
                this._hideDateTimePicker
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "row",

              marginBottom: 20,
              marginTop: 20
            }
          }>
            <Text style={
              {
                marginTop: 8,
                marginRight: 8
              }
            }>Gender</Text>
            <RadioForm radio_props={
              radio_props
            }
              initial={
                0
              }
              formHorizontal={
                true
              }
              labelHorizontal={
                true
              }
              buttonColor={
                "#2196f3"
              }
              animation={
                true
              }
              onPress={
                value => {
                  this.setState({
                    _gender: value
                  });
                }
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 20
            }
          }>
            <RkButton rkType="rounded"
              style={
                styles.googleButton
              }
              onPress={
                () => {this._handleSignUp();}
              }>Register</RkButton>
          </View>
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
                  Or SignUp With
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
marginBottom:"15%",
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
                    <RkText rkType="caption">Facebook</RkText>
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
                        backgroundColor: '#dd4b39'
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
                    <RkText rkType="caption" >Google</RkText>
                  </RkButton>
                </View>
              </View>
            
        </View>

      </View>
    </ScrollView>

      
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
    flex: 1,
    
    // backgroundColor: 'yellow'
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
    color: "#000000",
    borderColor: "red",
    marginTop: Platform.OS === 'ios' ? 10+"%" : 0,
    borderBottomWidth: 1
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