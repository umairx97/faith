import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Button, Platform, TextInput } from 'react-native'
import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";

import { Images } from "../../../assets/imageAll";
import Dialog from "react-native-dialog";
import firebase from "react-native-firebase";
import { TagSelect } from 'react-native-tag-select';
import { BackHandler, Dimensions, PermissionsAndroid } from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import SlidingUpPanel from 'rn-sliding-up-panel';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import RadioForm, {
 
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";



var type = "image/jpg";
var format = ".jpg";
var dirName = "PostImages/";
var isImageUpload = true;

let apiVersion = 1;
var firebaseUid = "";
var firebaseName = "";
var milliseconds = "";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const dialogImageTitle = " Select option from where you want to upload image";
const dialogVideoTitle = " Select option from where you want to upload video";

const data = [
  { id: 1, label: 'Music' },
  { id: 2, label: 'Movies' },
  { id: 3, label: 'Playing Cards' },
  { id: 4, label: 'Playing Games' },
  { id: 5, label: 'Singing' },
  { id: 6, label: 'Swiming' },
  { id: 7, label: 'Driving' },
  { id: 8, label: 'Travelling' },
  { id: 9, label: 'Reading Books' }
];
const dataLifeStyle = [
  { id: 1, label: 'Smoke' },
  { id: 2, label: 'Foody' },
  { id: 3, label: 'Drink' },
  { id: 4, label: 'Party' },
  { id: 5, label: 'Love Hill Stations' },
  { id: 6, label: 'Club' },
]
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
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

var userId;
export default class ProfileCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogMsg: dialogImageTitle,
      dialogVisible: false,
      isImage: true,
      progressVisible: false,
      place: "Searching...",
      imagePath: "",
      imagedata: "",
      videoPath: "",
      videoData: "",
      filePath: "",
      fileData: "",
      video_url: "",
      image_url: "",
      file_url: "",
      nameFull: '',
      dateOfBirth: '',
      totalAge: "",
      slidePanel: false,
      dob: '',
      isDateTimePickerVisible: false,
      isModalVisible: false,
      isModalVisibleLocation: false,
      isModalVisibleGender: false,
      relationShipStatus: 'Unknown',
      showComponmentB: '',
      permanentLocation: 'Unknown',
      genderInfo: 'Unknown',
      _gender: 0,
      imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png"
    }

  }

  componentDidMount = async () => {
    userId = await firebase.auth().currentUser.uid;
    this.openProfileImage();
    if (Platform.OS === "android") {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      }).then(() => {
        // locationTracking(dispatch, getState, geolocationSettings);
      });
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
        this.getLocationAddress(lat, long);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var lastRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ initialPosition: lastRegion });
        this.setState({ markerPosition: lastRegion });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
  }
  componentWillMount() {
    this.openProfileImage();
    navigator.geolocation.clearWatch(this.watchID);
  }
  async getLocationAddress(the_lat, the_long) {
    try {
      let response = await fetch(
        "http://dev.virtualearth.net/REST/v1/Locations/" +
        the_lat +
        "," +
        the_long +
        "?includeEntityTypes=PopulatedPlace&includeNeighborhood=1&include=ciso2&key=AhSM34xkpIXcF5kfykYYeo7ilzzdU24XlF1MOl8CEu7OOL2eHd77WY45T-OdkQ7j"
      );
      let responseJson = await response.json();

      var name = responseJson.resourceSets[0].resources[0].name;
      this.setState({
        place: name
      });
    } catch (error) {
      Alert.alert(error.toString());
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }
  //   componentWillReceiveProps(){
  //     Actions.refresh("drawer")
  //   }

  backAndroid() {
    Actions.pop()
    return true
  }
  onProfileImagePressed = () => {
    this.setState({ dialogVisible: true });
  }
  openProfileImage = async () => {
    instance = this;
    var convertGender;
    var _name = await firebase.auth().currentUser.uid;
    var imgUserId = firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name);
    imgUserId.once('value', function (snapshot) {
      var ImageUrl = snapshot.val().profileImageURL;
      var userName = snapshot.val().fullName;
      var dob = snapshot.val().user_Dob;
      var realtionshipS = snapshot.val().relationshipStatus;
      var permanentAdd = snapshot.val().permanentAddress;
      var genderData = snapshot.val().gender;
      if(genderData==0)
      {
        convertGender="Man";
      }
      else if(genderData==1)
      {
        convertGender="Woman";
      }
      else{
        convertGender="Unknown"
      }
      if((ImageUrl == "")||(ImageUrl == null))
      {
        instance.setState({
          imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
          nameFull: userName,
          dateOfBirth: dob,
          relationShipStatus: realtionshipS,
          permanentLocation: permanentAdd,
          genderInfo: convertGender
        });
      }
      else
      {
        instance.setState({
          imageProfileUrl: ImageUrl,
          nameFull: userName,
          dateOfBirth: dob,
          relationShipStatus: realtionshipS,
          permanentLocation: permanentAdd,
          genderInfo: convertGender
        });
      }
     
      instance.age();
    })
  }
  requestCameraPermission = async val => {
    try {
      const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      ]);
      if (
        results[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (val == "cam") {
          this.setState({
            isImage: true,
            dialogMsg: dialogImageTitle,
            dialogVisible: true
          });
        } else {
          this.setState({
            isImage: false,
            dialogMsg: dialogVideoTitle,
            dialogVisible: true
          });
        }
      } else {
        alert(
          "Permissions are not granted. The application may not work properly"
        );
        this.setState({
          dialogVisible: false
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  //   function getAge(dateString) {
  //     var today = new Date();
  //     var birthDate = new Date(dateString);
  //     var age = today.getFullYear() - birthDate.getFullYear();
  //     var m = today.getMonth() - birthDate.getMonth();
  //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //         age--;
  //     }
  //     return age;
  // }
  handleCancel() {
    this.setState({ dialogVisible: false });
  }
  handleCamera() {
    this.setState({ dialogVisible: false });
    // if (this.state.isImage) {
    Actions.captureImage();
    // } else {
    //   Actions.recordVideo();
    // }
  }




  async handleLibrary() {
    this.setState({ dialogVisible: false });
    var _name = await firebase.auth().currentUser.uid;
    if (this.state.isImage) {
      type = "image/jpg";
      format = ".jpg";
      dirName = "PostImages/";
      isImageUpload = true;
      setTimeout(() => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true
        })
          .then(image => {
            // this.uploadImage(image.path,_name)


            let fileUri = decodeURI(image.path)
            var milliseconds = new Date().getTime();

            firebase
              .storage()
              .ref("ProfileImages/" + _name + milliseconds + '.jpg')
              .putFile(fileUri)
              .then(uploadedFile => {

                //alert("Firebase profile photo uploaded successfully")
                this.setState({ imageProfileUrl: uploadedFile.downloadURL });
                firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name).update({ profileImageURL: uploadedFile.downloadURL });
              })
              .catch(error => {
                alert("Firebase profile upload failed: " + error)
              })

          })
          .catch(error => {
            this.setState({ ...this.state, progressVisible: false });
            console.log(error);
          });
      }, 500);
    }

  }
  age = () => {
    var userAge = this.state.dateOfBirth;

    var date = userAge.split('-')[0]
    var month = userAge.split('-')[1]
    var year = userAge.split('-')[2]

    var ageFull = this.calculate_age(month, date, year);

    this.setState({
      totalAge: ageFull
    })
  }
  onSetAge = () => {

    if (this.state.dateOfBirth == '') {
      return (<Text style={{ marginTop: 5, marginLeft: 10 }}>Add your Dob</Text>)
    }
    else { return (<Text style={{ marginTop: 5, marginLeft: 10 }}>{this.state.dateOfBirth}</Text>) }


  }
  onAgePress = () => {
    this.setState({
      isDateTimePickerVisible: true
    });


  }

  // onLocationPress = () => {
  //   alert('location')
  // }
  onRelationshipPress = () => {
    this._toggleModal();
  }
  onLocationPress = () => {
    this._toggleModalLoaction();
  }
  onGenderPress = () => {
    this._toggleModalGender();
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModalLoaction = () =>
    this.setState({ isModalVisibleLocation: !this.state.isModalVisibleLocation });

  _toggleModalGender = () => {
    this.setState({ isModalVisibleGender: !this.state.isModalVisibleGender });
  }
  onSlideData = () => {
    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white',

      }}>
        <Text style={{ fontSize: 20, fontWeight: "700", margin: 15 }}>Status</Text>

        <TouchableOpacity onPress={() => { this.onRelationshipPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20 }} source={Images.statusIcon}></Image>
            < Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Relationship</Text>

            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.onLocationPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.locationIcon}></Image>
            < Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>From where you are</Text>

            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onGenderPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.locationIcon}></Image>
            < Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 100 }}>Gender</Text>

            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>
        </TouchableOpacity>

        <Button title='Hide' onPress={() => this._panel.hide()} />
      </View>)
  }
  _updateUserProfile = (the_uid, _dob) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + the_uid)
      .update({
        user_Dob: _dob
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {

        alert("fail" + error.toString());
      });
  }
  _toggleShow = () => {
    this.setState({ showComponmentB: !this.state.showComponmentB })
  }
  calculate_age = (birth_month, birth_day, birth_year) => {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
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
      dateOfBirth: NewDate,
      _dob: NewDate
    });
    var bith_Date = NewDate

    this._updateUserProfile(userId, bith_Date);
  };
  OnAddBio = () => {
    alert('open bio')
  }
  OnAddPersonalInfo = () => {

    this._panel.show();

  }
  onSelectGender=(index,value)=>{
    // this.setState({
    //   text: value
    // })
    this.setState({ genderInfo: value });
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        gender: value
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {

        alert("fail" + error.toString());
      });

    this._toggleModalGender();
    this._panel.hide()
  }

  onSelect(index, value) {
    this.setState({
      text: value
    })

    this.setState({ relationShipStatus: value });
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        relationshipStatus: value
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {

        alert("fail" + error.toString());
      });

    this._toggleModal();
    this._panel.hide()
  }
  // onSaveGender=()=>{
  //   alert("gender")
  // }

  onSaveLocation = () => {
    var permanentlocation = this.state.permanentLocation;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        permanentAddress: permanentlocation
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {

        alert("fail" + error.toString());
      });

    this._toggleModalLoaction();
    this._panel.hide()
  }
  render() {
    return (<View>
      <View><ScrollView style={{ backgroundColor: "rgb(249, 249, 249)" }}>
        <View>
          <View style={{
            backgroundColor: "rgb(255, 255, 255)",
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
            borderRadius: 8,
            shadowColor: "rgba(0, 0, 0, 0.08)",
            shadowRadius: 5,
            shadowOpacity: 1,
          }}>
            <View>
              <View>

              </View>
              <TouchableOpacity onPress={() => { this.onProfileImagePressed() }}>
                <Image source={{ uri: this.state.imageProfileUrl }}
                  style={styles.ovalImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{this.state.nameFull}</Text><Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 22 }}>,</Text>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold', marginLeft: 10 }}>{this.state.totalAge}</Text>
            </View>
            <View>
              <Text style={{ margin: 10 }}>ijkohdkfjchdskjdfvhdfkjvhdfdfkjhvdfjk kjdshvjkdf kjhvkj</Text>
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>more info</Text>
            </View>

            <TouchableOpacity onPress={() => { this.onAgePress() }}><View style={{ flexDirection: 'row' }}>
              <Image style={{ height: 25, width: 25, tintColor: 'grey' }} source={Images.ageIcon} ></Image>
              {this.onSetAge()}
            </View></TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
        </View>
        <View style={{
          backgroundColor: "rgb(255, 255, 255)",

          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View styel={{ margin: 10 }}><TouchableOpacity onPress={() => { this.OnAddBio() }}>
            <View style={{ backgroundColor: '#DCDCDC', borderRadius: 6, height: 50, width: Screen.width - 20, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 17, fontWeight: '700' }}> + Add Bio</Text></View>
          </TouchableOpacity>
          </View>
        </View>

        <View style={{
          backgroundColor: "rgb(255, 255, 255)",

          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View><Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Personal Info</Text>
              </View>

            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}><Image source={Images.homePage}
                style={{ height: 25, width: 25, tintColor: 'grey' }} />
                <Text style={{ marginLeft: 10, marginTop: 5 }}>Lives in {this.state.place}</Text></View>

            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}><Image source={Images.locationIcon}
                style={styles.personalDataView} />
                <Text style={styles.personalDataText}>From : {this.state.permanentLocation}</Text></View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}><Image source={Images.statusIcon}
                style={styles.personalDataView} />
                <Text style={styles.personalDataText}>Realtionship Status : {this.state.relationShipStatus}</Text></View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}><Image source={Images.genderIcon}
                style={styles.personalDataView} />
                <Text style={styles.personalDataText}>Gender : {this.state.genderInfo}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.addPersonalView}>
          <View styel={{ margin: 10 }}><TouchableOpacity onPress={() => { this.OnAddPersonalInfo() }}>
            <View style={{ backgroundColor: '#DCDCDC', borderRadius: 6, height: 50, width: Screen.width - 20, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 17, fontWeight: '700' }}> + Add Personal Info</Text></View>
          </TouchableOpacity>
          </View>
        </View>


        <View style={{
          backgroundColor: "rgb(255, 255, 255)",
          justifyContent: 'center',
          alignItems: 'center',
          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View style={styles.followTabView}>
            <Text style={styles.visitorsText}>Likes</Text>

            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.textText}>2318</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.matchedText}>MATCHED</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={styles.textThreeText}>15</Text>
            </View>
          </View>

        </View>
        <View style={{
          backgroundColor: "rgb(255, 255, 255)",

          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View>
            <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Interests</Text>
          </View>

          <View style={{ margin: 10 }}>
            <TagSelect
              data={data}

              ref={(tag) => {
                this.tag = tag;
              }}
              onMaxError={() => {
                alert('Ops', 'Max reached');
              }}
            />
            {/* <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}> */}
            {/* <Button
                title="Get selected count"
                style={styles.button}
                onPress={() => {
                 alert('Selected count', `Total: ${this.tag.totalSelected}`);
                }}
              /> */}

            {/* </View>
            <View> */}
            {/* <Button
                title="Get selected"
                onPress={() => {
                 alert('Selected items:', JSON.stringify(this.tag.itemsSelected));
                }}
              /> */}
            {/* </View>
          </View> */}

          </View>
        </View>

        <View style={{
          backgroundColor: "rgb(255, 255, 255)",

          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View>
            <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Lifestyle and social</Text>
          </View>
          <View style={{ margin: 10 }}>
            <TagSelect
              data={dataLifeStyle}
              itemStyle={styles.item}
              itemLabelStyle={styles.label}
              itemStyleSelected={styles.itemSelected}
              itemLabelStyleSelected={styles.labelSelected}
            />
          </View>
        </View>
        <View><Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Select Option</Dialog.Title>
          <Dialog.Description>{this.state.dialogMsg}</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel();
            }}
          />
          <Dialog.Button
            label="Camera"
            onPress={() => {
              this.handleCamera();
            }}
          />
          <Dialog.Button
            label="Gallery"
            onPress={() => {
              this.handleLibrary();
            }}
          />
        </Dialog.Container></View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container1}>
              {/* <Text style={styles.valueText}>
                  Value = {selectedButton}
              </Text> */}
              {/* <RadioGroup radioButtons={this.state.data} onPress={(data, index) => { this.onPress(this.state.data.find(e => e.selected == true)) }} /> */}
              <View style={{ alignContent: 'center', marginLeft: 50 }}>
              <RadioGroup
                onSelect={(index, value) => this.onSelect(index, value)}
              >
                <RadioButton value={'Single'} >
                  <Text>Single</Text>
                </RadioButton>

                <RadioButton value={'Married'}>
                  <Text>Married</Text>
                </RadioButton>

                <RadioButton value={'In a relationship'}>
                  <Text>In a relationship</Text>
                </RadioButton>
                <RadioButton value={'Separated'}>
                  <Text>Separated</Text>
                </RadioButton>
                <RadioButton value={'In an open relationship'}>
                  <Text>In an open relationship</Text>
                </RadioButton>

                <RadioButton value={'Widowed'}>
                  <Text>Widowed</Text>
                </RadioButton>
                <RadioButton value={"It's complicated"}>
                  <Text>It's complicated</Text>
                </RadioButton>

              </RadioGroup>
             
              </View>

            </View>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text style={{ alignSelf: 'center' }}>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisibleLocation}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container1}>

              <View style={styles.whereDataView}>
                <TextInput style={styles.whereTextInput}
                  onChangeText={(text) => this.setState({ permanentLocation: text })} placeholder="Enter where are you from?"
                />
                <Button title="Save your location" onPress={() => { this.onSaveLocation() }} />
              </View>

            </View>
            <TouchableOpacity onPress={this._toggleModalLoaction}>
              <Text style={{ alignSelf: 'center' }}>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleGender}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container1}>

              <View style={{ alignContent: 'center', marginLeft: 50 }}>

              <RadioGroup
                onSelect={(index, value) => this.onSelectGender(index, value)}
              >
                <RadioButton value={0} >
                  <Text>Man</Text>
                </RadioButton>

                <RadioButton value={1}>
                  <Text>Woman</Text>
                </RadioButton>

            

              </RadioGroup>
             
                {/* <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30 }}
                  onChangeText={(text) => this.setState({ permanentLocation: text })} placeholder="Enter where are you from?"
                /> */}
                 {/* <View
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
                     */}
                    
                {/* <Button title="Save" onPress={() => { this.onSaveGender() }} /> */}
              </View>

            </View>
            <TouchableOpacity onPress={this._toggleModalGender}>
              <Text style={{ alignSelf: 'center' }}>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>
      </View>
      <SlidingUpPanel ref={c => this._panel = c}>
        {() => this.onSlideData()}
      </SlidingUpPanel>

    </View>)
  }
}
const styles = StyleSheet.create({
  profileView: {
    backgroundColor: "rgb(249, 249, 249)",
    flex: 1
  },
  whereTextInput:{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30 },
  container1: {
    flex: 1,
    justifyContent: 'center',

  },
  whereDataView:{ alignContent: 'center', marginLeft: 30, marginRight: 30 },
  valueText: {
    fontSize: 18,
    marginBottom: 50,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  addPersonalView:{
    backgroundColor: "rgb(255, 255, 255)",
    margin: 8,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  personalDataText:{ marginLeft: 10, marginTop: 5, marginBottom: 10 },
  personalDataView:{ height: 25, width: 25, tintColor: 'grey' },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
  navBarView: {
    width: "100%",
    height: "100%"
  },
  ovalImage: {
    resizeMode: 'cover',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 130,
    height: 130,
    marginLeft: 19,
    marginTop: 22,
    borderRadius: 65,
  },
  followTabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 265,
    height: 44,
    marginBottom: 8,
    alignSelf: "center"
  },
  visitorsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "black",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 60,
    margin: 5
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginLeft: 17,
    marginTop: 24
  },
  matchedText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "black",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 70,
    margin: 5
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 24,
    marginRight: 25,
    alignSelf: "flex-end"
  },
  barView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    width: 0,
    height: 0
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  }
});
