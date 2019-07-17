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
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
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
// import Dialog from "react-native-dialog";
// import { ButtonGroup } from "react-native-elements";
// import RNFetchBlob from "rn-fetch-blob";


var radio_props = [
  { label: 'Paid', value: 0 },
  { label: 'Free', value: 1 }
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
// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumDate: new Date(),
      minimumDate1: new Date(),
      fullName: 'Marco Polo',
      tos: false,
      fileUri: '',
      fileType: '',
      fileName: '',
      fileSize: '',
      email: "",
      eventTime: "",
      password: "",
      isDateTimePickerVisible: false,
      isDateTimePickerVisible1: false,
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
      _price: 0,
      _eventOrganiser: '',
      _eventDate: '',
      _eventTime: '',
      _eventFullAdd: '',
      _adminName: '',
      _doe: '',
      _latitude: 0,
      _longitude: 0,
      endEventDate: "",
      endEventTime: "",
      startDateTime: 0,
      endEventDate: "",
      endEventTime: "",
      _eventTicketPrice: 0,
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

    var eventAddress = await AsyncStorage.getItem("event_Location");
    var eventLati = await AsyncStorage.getItem("event_latitude");
    var eventLongi = await AsyncStorage.getItem("event_longitude");
    var eventLatitude1 = parseFloat(eventLati)
    var eventLongitude1 = parseFloat(eventLongi)
    if (eventLatitude1 != NaN) {
      this.setState({
        _latitude: eventLatitude1,
        _longitude: eventLongitude1
      })
    }
    else {

    }

    if (eventAddress == null) {
      this.setState({

        _eventFullAdd: "Please Add location by click on add Location Icon"

      })
    }
    else {
      this.setState({
        _eventFullAdd: eventAddress,

      })
    }
    var uidUser = await firebase.auth().currentUser.uid;
      var displayUserName = firebase
        .database()
        .ref("Users/FaithMeetsLove/Registered/" + uidUser);
      await displayUserName.once("value",  (snapshot) => {
        
        var usrName = snapshot.val().fullName;
      
        fullName = snapshot.val().fullName;
        gender = snapshot.val().gender;
        latitude = snapshot.val().latitude;
        longitude = snapshot.val().longitude;
        email = snapshot.val().email;
        user_Dob = snapshot.val().user_Dob;
        profileImageURL = snapshot.val().profileImageURL;
          this.setState({
            _adminName: fullName
          })
      })        

    //   alert(eventAddress)
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener

  getInitialState = () => {
    return {
      value: 0,
    }
  }
}

  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
  }

  backAndroid() {
    Actions.pop(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true,
      startDateTime: 0
    });
  _showDateTimePickerEnd = () =>
    this.setState({
      isDateTimePickerVisible1: true,
      startDateTime: 1
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible1: false,
      isDateTimePickerVisible: false
    });
  _handleDatePicked = datetime => {
    Moment.locale("en");
    const NewDate = Moment(datetime).format("DD-MM-YYYY");
    const Time = Moment(datetime).format("h:mm A");
    this._hideDateTimePicker();
    if (this.state.startDateTime == 0)
      this.setState({
        dob: NewDate,
        _doe: NewDate,
        eventTime: Time,
        minimumDate1: datetime
      });
    else {
      this.setState({
        endEventDate: NewDate,
        endEventTime: Time
      });
    }
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
    // this.setState({ ...this.state, progressVisible: true });
    const { _eventTitle, _eventDesc, _eventType, _eventOrganiser, dob, eventTime, endEventDate, endEventTime, _adminName, _price,_eventTicketPrice, fileUri } = this.state
    if(_eventTitle === ""){
      alert("Event Title Required!!!")
    }
    else if(_eventDesc === ""){
      alert("Event Description Required!!!")
    }
    else if(_eventType === ""){
      alert("Event Type Required!!!")
    }
    else if(_eventOrganiser === ""){
      alert("Event Organiser Required!!!")
    }
    else if(dob === "" || eventTime === ""){
      alert("Event Start Date Required!!!")
    }
    else if(endEventDate === "" || endEventTime === ""){
      alert("Event End Date Required!!!")
    }
    else if(_price === 0 && _eventTicketPrice === 0){
      alert("Event Price Required!!!")
    }
    else if(fileUri === ""){
      alert("Attachment is required")
    }
    else{
      var _id = await firebase.auth().currentUser.uid;
    var path = this.state.fileUri;
    // var virtualId = new Date().getTime();
    var milliseconds = new Date().getTime();
    var eventIdCreated = _id + milliseconds;
    // alert(eventIdCreated);
    firebase
      .storage()
      .ref("Event/EventAttachments/" + _id + milliseconds)
      .putFile(path)
      .then(path => {
        firebase.database().ref("Users/FaithMeetsLove/Event/EventList/").push({
          id: eventIdCreated, eventTitle: this.state._eventTitle,
          eventDesc: this.state._eventDesc,
          eventLocation: this.state._eventFullAdd,
          eventType: this.state._eventType,
          price: this.state._price,
          eventOrganiser: this.state._eventOrganiser,
          eventDate: this.state._doe,
          eventTime: this.state.eventTime,
          eventURL: path.downloadURL,
          eventAdmin: this.state._adminName,
          eventId: _id,
          eventLatitued: this.state._latitude,
          eventLongituded: this.state._longitude,
          endEventDate: this.state.endEventDate,
          endEventTime: this.state.endEventTime,
          eventTicketPrice: this.state._eventTicketPrice,
        });
      }).then(ref => {
        this.setState({ ...this.state, progressVisible: false });
        this.setState({ ...this.state, fileName: '', _eventTicketPrice: 0, dob: '', eventTime: '', endEventDate: "", endEventTime: '', eventLocation: "", _price: 0, })
        //  alert('save');
        Actions.myEvent();
      })
      .catch(error => {
        alert("Firebase profile upload failed: " + error)
      })
    }
    


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
  showPriceInput = () => {
    if (this.state._price == 0) {
      return (
        <View style={{ marginTop: 10 }}><MyInput
          name="Price"
          type="name"

          onChangeText={text => this.setState({ _eventTicketPrice: text })}
          placeholder="Please enter event ticket price"
          style={styles.textInput}
        /></View>)
    }


  }

  render() {
    const buttons = ["Paids", "Free",];
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
          height: Screen.height - 40,
          ...ifIphoneX({ height: Screen.height - 70, backgroundColor: "#FFFFFF" }),
          backgroundColor: "#FFFFFF",
          marginTop: 5
        }}
      >
        <GiftedForm
          formName='AddEvent'
          openModal={(route) => { this.props.navigator.push(route) }}
          validationSchema={validationSchema}
          onValueChange={this.handleValueChange.bind(this)}
        > 
          <OfflineNotice />
          <GiftedForm.SeparatorWidget />
          <GiftedForm.TextInputWidget
            name='eventTitle'
            title='Title'
            placeholder='Enter Event Title Here...'
            onChangeText={text =>
              this.setState({ _eventTitle: text })
            }
            clearButtonMode='while-editing'
            value={this.state._eventTitle}
          />
          <GiftedForm.TextInputWidget
            name='eventDescription'
            title='Description'
            placeholder='Enter Event Description Here...'
            clearButtonMode='while-editing'
            onChangeText={text =>
              this.setState({ _eventDesc: text })
            }
            value={this.state._eventDesc}
          />
          <GiftedForm.SeparatorWidget />
          <GiftedForm.SeparatorWidget />          

          <GiftedForm.TextInputWidget
            name='eventType'
            title='Type'
            placeholder='Enter Event Type Here...'
            onChangeText={text => this.setState({ _eventType: text })}
            clearButtonMode='while-editing'
            value={this.state._eventType}
          />
          <GiftedForm.TextInputWidget
            name='eventOrganizer'
            title='Organizer'
            placeholder='Enter Event Organizer Here...'
            onChangeText={text => this.setState({ _eventOrganiser: text })}
            clearButtonMode='while-editing'
            value={this.state._eventOrganiser}
          />
          <GiftedForm.SeparatorWidget />
          <GiftedForm.SeparatorWidget />
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              marginBottom: 2
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingLeft: "2.5%" }}>
              <View >
                <Text
                  style={styles.textInput}
                >{this.state.dob && this.state.eventTime ? this.state.dob + " " + this.state.eventTime : "Please select event start date"}</Text></View>
              <View >
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <Image style={{ height: 28, width: 35 }} source={Images.calenderIcon} />
                </TouchableOpacity>
              </View></View>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                height: 1.2,
                marginBottom: "4%"
              }}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="datetime"
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff"
            }}
          ><View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#ffffff", paddingTop: 15, paddingLeft: "2.5%" }}>
              <View >
                <Text
                  placeholder="Please select event date"
                  style={styles.textInput}
                >{this.state.endEventDate && this.state.endEventTime ? this.state.endEventDate + " " + this.state.endEventTime : "Please select event End date"}</Text></View>
              <View >
                <TouchableOpacity onPress={this._showDateTimePickerEnd}>
                  <Image style={{ height: 28, width: 35 }} source={Images.calenderIcon} />
                </TouchableOpacity>
              </View></View>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                height: 1.2,
                marginBottom: "4%"
              }}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible1}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              minimumDate={this.state.minimumDate1}
              mode="datetime"
            />
          </View>
          <GiftedForm.SeparatorWidget />
          <GiftedForm.SeparatorWidget />


          <View style={{ flex: 1, paddingTop: 15, paddingBottom: 10, backgroundColor: "#ffffff", marginBottom: 2 }}>
            <View
              style={{
                paddingLeft: 2.5 + "%",
                // paddingRight: 10 + "%"
              }}
            ><View
              style={{
                flexDirection: "column"
              }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View ><Text style={{ width: "100%", color: "black" }}>{this.state._eventFullAdd}</Text></View>
                  <View><TouchableOpacity onPress={() => { Actions.EventLocation() }}>
                    <Image style={{ height: 28, width: 30 }} source={Images.locationPin} /></TouchableOpacity></View>

                </View>

              </View>
            </View>
          </View>
          <GiftedForm.TextInputWidget
            name='adminName'
            title='Admin Name'
            placeholder='Enter Event Admin Name Here...'
            onChangeText={text => this.setState({ _adminName: text })}
            clearButtonMode='while-editing'
            value={this.state._adminName}
          />
          
          <GiftedForm.SeparatorWidget />
          <GiftedForm.SeparatorWidget />
          <Formik
          onSubmit={values => console.log(values)}
          // validationSchema={validationSchema}
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
              <Form>
                <View style={{ flex: 1, borderBottomColor: '	rgba(211,211,211,0.6)', borderStyle: 'solid', borderBottomWidth: 2}}>
                  <View
                    style={{
                      paddingLeft: 2.5 + "%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <View style={styles.showMeView}>
                        <Text style={styles.showMeText}>Price :</Text>
                        <View style={{ flex: 1}}>
                        <RadioForm
                          style={{ justifyContent: 'space-around' }}
                          radio_props={radio_props}
                          initial={0}
                          formHorizontal={true}
                          labelHorizontal={true}
                          onPress={(value) => { this.setState({ _price: value }) }}
                        />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Form>
            </ScrollView>
          )}
        />
        {this.state._price === 0 ? <GiftedForm.TextInputWidget
            name='price'
            title='Price'
            placeholder='Please enter event ticket price'
            onChangeText={text => this.setState({ _eventTicketPrice: text })}
            clearButtonMode='while-editing'
            value={this.state._eventTicketPrice}
          /> : null}
          <View
            style={{
              flex: 1,
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 1,
              flexDirection: "row",
              justifyContent: 'space-around',
              backgroundColor: "#ffffff",
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
              <Text>Add Attachment</Text>
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

          <GiftedForm.HiddenWidget name='tos' value={this.state.tos} />
        </GiftedForm>
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
    width: "100%",
  },
  googleButton: {
    backgroundColor: "#37A000",
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
    paddingBottom: 15,
    textAlign: "left",
    flex: 1

  },
  showMeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row'
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

    marginTop: 5,
    marginBottom: 10,
    color: 'black',
  },
  ImageIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'stretch',
  },

});
