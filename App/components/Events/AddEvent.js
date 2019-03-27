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
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

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
import { ButtonGroup } from "react-native-elements";
import RNFetchBlob from "react-native-fetch-blob";


var radio_props = [
  {label: 'Paid', value: 0 },
  {label: 'Free', value: 1 }
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
var mainUri;
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
      fileType: '',
      fileName: '',
      fileSize: '',
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
      dob_color: "black",
      selectedIndex: 0,
      _eventTitle: '',
      _eventDesc: '',
      _eventLocation: '',
      _eventType: '',
      _price: '',
      _eventOrganiser: '',
      _eventDate: '',
      _eventFullAdd: '',
      _adminName: '',
      _doe: ''
    };
    this.updateIndex = this.updateIndex.bind(this);
    GoogleSignin.configure({
      androidClientId:
        "390674890211-q9tdrigtg149nvvsd4c4j0reg1830htk.apps.googleusercontent.com",
      iosClientId:
        "390674890211-oniimc9c6cf0r1mqml75rfc9l94b29s0.apps.googleusercontent.com"
    });
  }
  async componentDidMount() {
    // if(this.props.myProps==null)
    // {
    //   alert(this.props.myProps)
    // }
    // else
    // {
    //   alert(this.props.myProps)
    // }
    var eventAddress = await AsyncStorage.getItem("event_Location");
    if (eventAddress == null) {
      this.setState({

        _eventFullAdd: "Please Add location by click on add Location Icon"

      })
    }
    else {
      this.setState({
        _eventFullAdd: eventAddress
      })
    }

    //   alert(eventAddress)
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }
  getInitialState=()=> {
    return {
      value: 0,
    }
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

  //   _handleSignUp() {
  //     // Actions.activityLoader();
  //     this.setState({ ...this.state, progressVisible: true });
  //     instance = this;
  //     const {
  //       _fullName,
  //       _username,
  //       _email,
  //       _password,
  //       _dob,
  //       _gender
  //     } = this.state;
  //     if (
  //       _email != "" &&
  //       _password != "" &&
  //       _fullName != "" &&
  //       _username != null &&
  //       _dob != null
  //     ) {
  //       firebase
  //         .auth()
  //         .signInWithEmailAndPassword(_email, _password)
  //         .then(userData => {})
  //         .catch(() => {
  //           firebase
  //             .auth()
  //             .createUserWithEmailAndPassword(_email, _password)
  //             .then(userData => {
  //               this._updateUserProfile(
  //                 userData.user.uid,
  //                 userData.user.email,
  //                 _username,
  //                 _fullName,
  //                 _gender,
  //                 _dob
  //               );
  //             })
  //             .catch(error => {
  //               alert("Authentication failed." + error.toString());
  //             });
  //         });
  //     } else {
  //       alert("Please fill all fields");
  //     }
  //   }

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
      _doe: NewDate
    });
  };
  onClickListener = viewId => {
    alert("Alert", "Button pressed " + viewId);
  };

  onClickAttachements = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      // Android
      console.log(
        res.uri,
        res.type, // mime type
        res.fileName,
        res.fileSize
      );
    });
  }
  _addEventSave = async () => {
    var _id = await firebase.auth().currentUser.uid;
    var path = this.state.fileUri;
    var milliseconds = new Date().getTime();
    firebase
      .storage()
      .ref("Event/EventAttachments/" + _id + milliseconds)
      .putFile(path)
      .then(path => {
        firebase.database().ref("Users/FaithMeetsLove/Event/EventList/" + _id).update({ eventTitle: this.state._eventTitle, eventDesc: this.state._eventDesc, eventLocation: this.state._eventFullAdd, eventType: this.state._eventType, price: this.state._price, eventOrganiser: this.state._eventOrganiser, eventDate: this.state._doe, eventURL: path.downloadURL, eventAdmin: this.state._adminName });
      })
      .catch(error => {
        alert("Firebase profile upload failed: " + error)
      })

    alert('save');
  }
  handleChange = async () => {

    //Opening Document Picker
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
      },
      (error, res) => {


        if (res == null) {

        }
        else {
          const path = res.uri;

          this.setState({ fileUri: res.uri });
          this.setState({ fileType: res.type });
          this.setState({ fileName: res.fileName });
          this.setState({ fileSize: res.fileSize });
        }
      }
    );
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
  updateIndex(selectedIndex) {
    alert(selectedIndex);
    this.setState({ _price: selectedIndex });
  }


  render() {
    const buttons = ["Paids","Free",];
    const { selectedIndex } = this.state;
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
          ...ifIphoneX({ height: Screen.height, backgroundColor: "#FFFFFF" }),
          backgroundColor: "#FFFFFF"
        }}
      >
        <Formik
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
          render={props => (
            <ScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                justifyContent: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              <Form>
                <View style={{ flex: 1, marginTop: 30, marginBottom: 30 }}>
                  <OfflineNotice />
                  <View
                    style={{
                      paddingLeft: 10 + "%",
                      paddingRight: 10 + "%"
                    }}
                  ><View
                    style={{
                      flexDirection: "column"
                    }}
                  >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View ><Text style={styles.formInput}>Event Location</Text></View>
                        <View><TouchableOpacity onPress={() => { Actions.EventLocation() }}>
                          <Image style={{ height: 30, width: 30 }} source={Images.locationPin} /></TouchableOpacity></View>

                      </View>

                      <Text
                        style={[styles.textInput, { borderBottomColor: '#007FFF', borderBottomWidth: 0.5, marginTop: 15 }]}>{this.state._eventFullAdd}</Text>

                    </View>

                    <View
                      style={{
                        flexDirection: "column",

                        paddingTop: 30
                      }}
                    >
                      <Text>Event Title</Text>
                      <MyInput
                        name="Title"
                        type="name"
                        onChangeText={text =>
                          this.setState({ _eventTitle: text })
                        }
                        placeholder="Please enter event title"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Event Description</Text>
                      <MyInput
                        name="Description"
                        type="name"
                        onChangeText={text =>
                          this.setState({ _eventDesc: text })
                        }
                        placeholder="Please enter event description"
                        style={styles.textInput}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Event Type</Text>
                      <MyInput
                        name="EventType"
                        type="name"
                        onChangeText={text => this.setState({ _eventType: text })}
                        placeholder="Please enter event type"
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <View style={styles.showMeView}>
                        <Text style={styles.showMeText}>Price :</Text>
                        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({_price:value})}}
        />
                        {/* <ButtonGroup
                          onPress={this.updateIndex}
                          selectedIndex={selectedIndex}
                          buttons={buttons}
                          containerStyle={{ height: 50, marginTop: 15 }}
                        /> */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.formInput}>Event Organizer</Text>
                      <MyInput
                        name="Organizer"
                        type="name"

                        onChangeText={text => this.setState({ _eventOrganiser: text })}
                        placeholder="Please enter event organiser"
                        style={styles.textInput}
                      />
                    </View>


                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={{
                        marginBottom: 2,
                        paddingBottom: 18
                      }}>Event Date</Text>
                      <TouchableOpacity onPress={this._showDateTimePicker}>
                        <TextInput
                          style={{
                            paddingBottom: 10
                          }}
                          placeholder="Please select event date"
                          value={this.state.dob}
                          onChangeText={value =>
                            this.setState({
                              _eventDate: value
                            })
                          }
                          onFocus={this._showDateTimePicker}
                          style={styles.textInput}
                        />
                        {/* <Text
                          placeholder="Plz, Select your date of event"
                          style={{
                            color: this.state.dob_color,
                            marginTop: 20,
                            marginBottom: 2,
                            paddingBottom: 10
                          }}
                        >
                          {this.state.dob}
                        </Text> */}
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
                        flexDirection: "column",
                        paddingTop: 15
                      }}
                    >
                      <Text style={styles.formInput}>Admin Name</Text>
                      <MyInput
                        name="admin"
                        type="name"

                        onChangeText={text => this.setState({ _adminName: text })}
                        placeholder="Please enter admin Name"
                        style={styles.textInput}
                      />
                    </View>



                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      {/* <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ alignItems: 'center' }}
                        onPress={this.handleChange.bind(this)}>
                        <Image
                          source={{
                            uri:
                              'https://aboutreact.com/wp-content/uploads/2018/09/clips.png',
                          }}
                          style={styles.ImageIconStyle}
                        />
                        <Text style={{ marginTop: 10 }}>Add Attachment</Text>
                      </TouchableOpacity> */}
                      {/* <Text style={styles.text}>
          {this.state.fileUri ? 'URI\n' + this.state.fileUri : ''}
        </Text>
        <Text style={styles.text}>
          {this.state.fileType ? 'Type\n' + this.state.fileType : ''}
        </Text> */}
                      <Text style={styles.text}>
                        {this.state.fileName ? 'File Name ' + this.state.fileName + ' uploaded' : ''}
                      </Text>
                      {/* <Text style={styles.text}>
          {this.state.fileSize ? 'File Size\n' + this.state.fileSize : ''}
        </Text> */}
                      {/* <Text style={styles.formInput}>Add attachements</Text>
                     <Button title="add" onPress={()=>{this.onClickAttachements()}}/> */}
                    </View>


                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: 'space-around',
                        marginTop: 20
                      }}
                    ><TouchableOpacity
                      activeOpacity={0.5}
                      style={{ alignItems: 'center' }}
                      onPress={this.handleChange.bind(this)}>
                        <Image
                          source={{
                            uri:
                              'https://aboutreact.com/wp-content/uploads/2018/09/clips.png',
                          }}
                          style={styles.ImageIconStyle}
                        />
                        <Text style={{ marginTop: 10 }}>Add Attachment</Text>
                      </TouchableOpacity>
                      <RkButton
                        rkType="rounded"
                        style={styles.googleButton}
                        onPress={() => {
                          this._addEventSave();
                        }}
                      >
                        Add Event
                      </RkButton>
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
    color: "#000000",
    fontSize: 17
  },
  formInput: {
    width: "100%"
  },
  googleButton: {
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,

    width: 150,
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
  showMeText: {

    color: "black",
    fontSize: 17,
 paddingBottom:15,
    textAlign: "left",

  },
  showMeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",

    marginBottom: 15,

    marginRight: 16
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
  },
  text: {
    backgroundColor: '#fff',


    fontSize: 15,

    marginTop: 16,
    color: 'black',
  },
  ImageIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'stretch',
  },

});
