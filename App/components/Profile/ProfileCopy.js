/*
* Private user profile
*/
import React, { Component, Fragment } from 'react';
import { Text, View, Alert, TouchableOpacity, ActivityIndicator, Image, StyleSheet, ScrollView, Button, Platform, TextInput, KeyboardAvoidingView } from 'react-native';
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
// import SlidingUpPanel from 'rn-sliding-up-panel';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
// import RadioForm, { RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Immersive } from 'react-native-immersive';
import { FlatGrid } from 'react-native-super-grid';
import Video from 'react-native-video';
// import Collapsible from 'react-native-collapsible';


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
  { id: 9, label: 'Reading Books' },
  { id: 10, label: 'Cars' },
  { id: 11, label: 'Theatre' },
  { id: 12, label: 'Politics' },
  { id: 13, label: 'Dancing' },
  { id: 14, label: 'Cooking' },
  { id: 15, label: 'Watching Sports' },
  { id: 16, label: 'Playing Sports' },
  { id: 17, label: 'Fitness' },
  { id: 18, label: 'Boating and Cruising' },
  { id: 19, label: 'Outdoor' },
  { id: 20, label: 'Country' },
  { id: 21, label: 'Snow' },
  { id: 22, label: 'Fine Dining' },
  { id: 23, label: 'Shopping' },
  { id: 24, label: 'Beach' },
  { id: 25, label: 'Water Sports' },
  { id: 26, label: 'Social' },
  { id: 27, label: 'Photography' }
];
const dataLifeStyle = [
  { id: 1, label: 'Smoke' },
  { id: 2, label: 'Foody' },
  { id: 3, label: 'Drink' },
  { id: 4, label: 'Party' },
  { id: 5, label: 'Pets' },
  { id: 6, label: 'Club' },
  { id: 7, label: 'Introvert' },
  { id: 8, label: 'Extrovert' },
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
      isModalVisibleBio: false,
      isModalVisibleReligion: false,
      isModalVisibleJobTitle: false,
      isModalVisibleEducation: false,
      isModalVisibleHeight: false,
      isModalVisibleLanguage: false,
      isModalVisiblePersonalInfo: false,
      personalInfoIsCollapsed: true,
      relationShipStatus: 'Unknown',
      relationShipStatusIndex: 0,
      showComponmentB: '',
      permanentLocation: 'Unknown',
      bioText: '',
      religion: '',
      jobTitle: '',
      education: '',
      height: '',
      language: '',
      likes: '',
      matched: '',
      genderInfo: 'Unknown',
      uploadMediaGallery: false,
      uploadMediaGalleryIndex: null,
      uploadMediaGalleryCanDelete: false,
      _gender: 0,
      imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
      galleryPhoto: [],
      interests: [],
      lifestyleAndSocial: [],
      galleryVideo: null,
      isLoading: false
    }

  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.androidGoInImmersive();
    });

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
    // load likes and matched stats
    this.loadProfileStats();
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
  
  androidGoInImmersive() {
    if(Platform.OS == 'android') {
      Immersive.setImmersive(true);
    }
  }

  loadProfileStats = async () => {
    if((this.state.likes == '')||(this.state.matched == '')) {
      var currentId = await firebase.auth().currentUser.uid;
      var likes = 0;
      var allUserProfile = firebase.database().ref("Users/FaithMeetsLove/ProfileLiked");

      await allUserProfile
      .once("value")
      .then(snapshot => {
          snapshot.forEach(childSnapshot => {
            if(JSON.stringify(childSnapshot).includes(currentId)) {
              likes++;
            }
          });
          
          var allUserProfileMatch = firebase.database().ref("Users/FaithMeetsLove/MatchedProfiles/"+currentId);
          allUserProfileMatch
          .once("value")
          .then(snapshot => {
            snapshot.numChildren();
            
            this.setState({
              likes: likes,
              matched: snapshot.numChildren()
            });
          }).catch(error => {
            console.log(JSON.stringify(error));
          });
          
      }).catch(error => {
        console.log('error1: ', JSON.stringify(error));
      });
    }
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
      var relationShipStatusIndex = snapshot.val().relationShipStatusIndex;
      var permanentAdd = snapshot.val().permanentAddress;
      var bioText = snapshot.val().bioText;
      var genderData = snapshot.val().gender;
      var religionData = snapshot.val().religion;
      var jobTitleData = snapshot.val().jobTitle;
      var educationData = snapshot.val().education;
      var heightData = snapshot.val().height;
      var languageData = snapshot.val().language;
      var videoData = snapshot.val().profileVideo;
      var interestsData = [];
      try {
        interestsData = JSON.parse(snapshot.val().interests);
        this.tag.setState({ value: interestsData });
      } catch (error) {
        
      }
      var lifestyleAndSocialData = [];
      try {
        lifestyleAndSocialData = JSON.parse(snapshot.val().lifestyleAndSocial);
        this.tag2.setState({ value: lifestyleAndSocialData });
      } catch (error) {
        
      }
      

      var ImageUrl1 = '';
      if(snapshot.val().profileImageURL1 != null) {
        ImageUrl1 = snapshot.val().profileImageURL1;
      }
      var ImageUrl2 = '';
      if(snapshot.val().profileImageURL2 != null) {
        ImageUrl2 = snapshot.val().profileImageURL2;
      }
      var ImageUrl3 = '';
      if(snapshot.val().profileImageURL3 != null) {
        ImageUrl3 = snapshot.val().profileImageURL3;
      }
      var ImageUrl4 = '';
      if(snapshot.val().profileImageURL4 != null) {
        ImageUrl4 = snapshot.val().profileImageURL4;
      }
      var ImageUrl5 = '';
      if(snapshot.val().profileImageURL5 != null) {
        ImageUrl5 = snapshot.val().profileImageURL5;
      }
      var ImageUrl6 = '';
      if(snapshot.val().profileImageURL6 != null) {
        ImageUrl6 = snapshot.val().profileImageURL6;
      }
      var ImageUrl7 = '';
      if(snapshot.val().profileImageURL7 != null) {
        ImageUrl7 = snapshot.val().profileImageURL7;
      }

      var mediaPhoto = [
        { url: ImageUrl1 },
        { url: ImageUrl2 },
        { url: ImageUrl3 },
        { url: ImageUrl4 },
        { url: ImageUrl5 },
        { url: ImageUrl6 },
        // { url: ImageUrl7 },
      ];

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
          relationShipStatusIndex: relationShipStatusIndex,
          permanentLocation: permanentAdd,
          bioText: bioText,
          genderInfo: convertGender,
          _gender: genderData,
          religion: religionData,
          jobTitle: jobTitleData,
          education: educationData,
          height: heightData,
          language: languageData,
          galleryPhoto: mediaPhoto,
          galleryVideo: videoData,
          interests: interestsData,
          lifestyleAndSocial: lifestyleAndSocialData
        });
      } else {
        instance.setState({
          imageProfileUrl: ImageUrl,
          nameFull: userName,
          dateOfBirth: dob,
          relationShipStatus: realtionshipS,
          relationShipStatusIndex: relationShipStatusIndex,
          permanentLocation: permanentAdd,
          bioText: bioText,
          genderInfo: convertGender,
          _gender: genderData,
          religion :religionData,
          jobTitle: jobTitleData,
          education: educationData,
          height: heightData,
          language: languageData,
          galleryPhoto: mediaPhoto,
          galleryVideo: videoData,
          interests: interestsData,
          lifestyleAndSocial: lifestyleAndSocialData
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
    this.androidGoInImmersive();
    this.setState({ dialogVisible: false });
  }

  handleRemovePhoto() {
    this.androidGoInImmersive();
    this.setState({ dialogVisible: false });
    this.updateMediaGalleryPhoto(userId, ''); 
  }

  handleCamera() {
    this.setState({ dialogVisible: false });
    var _name = userId;
    if(this.state.uploadMediaGalleryIndex != null) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
            
        let fileUri = decodeURI(image.path);
        var milliseconds = new Date().getTime();

        firebase
          .storage()
          .ref("ProfileImages/" + _name + milliseconds + '.jpg')
          .putFile(fileUri)
          .then(uploadedFile => {
            
            // change main photo
            if(this.state.uploadMediaGallery == false) {
              firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name).update({ profileImageURL: uploadedFile.downloadURL });
              this.setState({ imageProfileUrl: uploadedFile.downloadURL });
              return;
            }
            this.androidGoInImmersive();
            // change media gallery photo
            this.updateMediaGalleryPhoto(_name, uploadedFile);
            
            
          }).catch(error => {
            alert("Firebase profile upload failed: " + error)
          });

      }).catch(error => {
        this.setState({ ...this.state, progressVisible: false });
        console.log(error);
      });
      return;
    }
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
        }).then(image => {

            let fileUri = decodeURI(image.path)
            var milliseconds = new Date().getTime();

            firebase
              .storage()
              .ref("ProfileImages/" + _name + milliseconds + '.jpg')
              .putFile(fileUri)
              .then(uploadedFile => {
                
                // change main photo
                if(this.state.uploadMediaGallery == false) {
                  firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name).update({ profileImageURL: uploadedFile.downloadURL });
                  this.setState({ imageProfileUrl: uploadedFile.downloadURL });
                  return;
                }
                this.androidGoInImmersive();
                // change media gallery photo
                this.updateMediaGalleryPhoto(_name, uploadedFile);
                
                
              }).catch(error => {
                alert("Firebase profile upload failed: " + error)
              });

          }).catch(error => {
            this.setState({ ...this.state, progressVisible: false });
            console.log(error);
          });
      }, 500);
    }
  }

  updateMediaGalleryPhoto(_name, uploadedFile) {
    var mediaPhoto = this.state.galleryPhoto;
    var photo = '';

    if(uploadedFile.downloadURL != null) {
      photo = uploadedFile.downloadURL;
    }

    switch (this.state.uploadMediaGalleryIndex) {
      case 0:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL1: photo
        });
        mediaPhoto[0] = { url: photo };
        break;
      case 1:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL2: photo
        });
        mediaPhoto[1] = { url: photo };
        break;
      case 2:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL3: photo
        });
        mediaPhoto[2] = { url: photo };
        break;
      case 3:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL4: photo
        });
        mediaPhoto[3] = { url: photo };
        break;
      case 4:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL5: photo
        });
        mediaPhoto[4] = { url: photo };
        break;
      case 5:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL6: photo
        });
        mediaPhoto[5] = { url: photo };
        break;
      case 6:
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + _name)
        .update({ 
          profileImageURL7: photo
        });
        mediaPhoto[6] = { url: photo };
        break;
    
      default:
        break;
    }
    this.setState({
      galleryPhoto: mediaPhoto
    });
  }

  age = () => {
    var userAge = this.state.dateOfBirth;
    if(this.state.dateOfBirth == "0") {
      return;
    }

    var date = userAge.split('-')[0];
    var month = userAge.split('-')[1];
    var year = userAge.split('-')[2];

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

  onRelationshipPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModal();
    }, 500);
    this.androidGoInImmersive();
  }

  onLocationPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalLoaction();
    }, 500);
    this.androidGoInImmersive();
  }

  onGenderPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalGender();
    }, 500);
    this.androidGoInImmersive();
  }

  onReligionPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalReligion();
    }, 500);
    this.androidGoInImmersive();
  }

  onJobTitlePress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalJobTitle();
    }, 500);
    this.androidGoInImmersive();
  }

  onEducationPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalEducation();
    }, 500);
    this.androidGoInImmersive();
  }

  onHeightPress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalHeight();
    }, 500);
    this.androidGoInImmersive();
  }

  onLanguagePress = () => {
    this._toggleModalPersonalInfo();
    setTimeout(() => {
      this._toggleModalLanguage();
    }, 500);
    this.androidGoInImmersive();
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.androidGoInImmersive();
  }

  _toggleModalLoaction = () => {
    this.setState({ isModalVisibleLocation: !this.state.isModalVisibleLocation });
    this.androidGoInImmersive();
  }

  _toggleModalBio = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleBio: !this.state.isModalVisibleBio });
  }

  _toggleModalPersonalInfo = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisiblePersonalInfo: !this.state.isModalVisiblePersonalInfo });
  }

  _toggleModalGender = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleGender: !this.state.isModalVisibleGender });
  }

  _toggleModalReligion = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleReligion: !this.state.isModalVisibleReligion });
  }

  _toggleModalJobTitle = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleJobTitle: !this.state.isModalVisibleJobTitle });
  }

  _toggleModalEducation = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleEducation: !this.state.isModalVisibleEducation });
  }

  _toggleModalHeight = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleHeight: !this.state.isModalVisibleHeight });
  }

  _toggleModalLanguage = () => {
    this.androidGoInImmersive();
    this.setState({ isModalVisibleLanguage: !this.state.isModalVisibleLanguage });
  }

  videoUploadGalleryRemove() {
    this.setState({
      isLoading: true
    }, () => {     
        firebase.database().ref("Users/FaithMeetsLove/Registered/" + userId).update({ profileVideo: null });
        this.setState({ 
          galleryVideo: null,
          isLoading: false
        });
        this.androidGoInImmersive();
    });
  }

  videoUploadGallery() {
    this.setState({
      isLoading: true
    }, () => {
      ImagePicker.openPicker({
        mediaType: "video",
      }).then((video) => {
          let fileUri = decodeURI(video.path);
          var milliseconds = new Date().getTime();
  
          firebase
            .storage()
            .ref("ProfileVideos/" + userId + milliseconds + '.jpg')
            .putFile(fileUri)
            .then(uploadedFile => {
              
              firebase.database().ref("Users/FaithMeetsLove/Registered/" + userId).update({ profileVideo: uploadedFile.downloadURL });
              this.setState({ 
                galleryVideo: uploadedFile.downloadURL,
                isLoading: false
              });
              this.androidGoInImmersive();
              
            }).catch(error => {
              alert("Firebase profile upload failed: " + error)
            });
      });
    });
  }

  onPressMediaItem(item, index, isVideo) {
    if(isVideo) {
      var buttons = [
        {
          text: 'CANCEL',
          onPress: () => {
            this.androidGoInImmersive();
          },
          style: 'cancel',
        },
        // {text: 'CAMERA', onPress: () => console.log('OK Pressed')},
        {text: 'GALLERY', onPress: () => this.videoUploadGallery()},
      ];
      if(this.state.galleryVideo != null) {
        var buttons = [
          {
            text: 'CANCEL',
            onPress: () => {
              this.androidGoInImmersive();
            },
            style: 'cancel',
          },
          {text: 'REMOVE VIDEO', onPress: () => this.videoUploadGalleryRemove()}
        ];
      }
      Alert.alert(
        'Select Option',
        'Select option from where you want to upload video',
        buttons,
        {cancelable: false},
      );
      return;
    }

    var canDelete = false;

    try {
      if(item.url.length > 0) {
        canDelete = true;
      } 
    } catch (error) {
      
    }

    this.setState({ 
      dialogVisible: true, 
      uploadMediaGallery: true, 
      uploadMediaGalleryIndex: index,
      uploadMediaGalleryCanDelete: canDelete
    });
  }

  onSlideData = () => {
    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white',

      }}>
        {/* <Text style={{ fontSize: 20, fontWeight: "700", margin: 15 }}>Status</Text> */}
        <TouchableOpacity style={{marginTop: hp(10)}} onPress={() => { this.onRelationshipPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20 }} source={Images.statusIcon}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Relationship</Text>

            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onLocationPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.locationIcon}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>From</Text>
            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onGenderPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.genderIcon}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Gender</Text>
            {/* <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15 }}>{this.state.relationShipStatus}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onReligionPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.religion}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Religion</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onJobTitlePress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.job}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Job Title</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onEducationPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.education}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Education</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onHeightPress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.height}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Height</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.onLanguagePress() }}>
          <View style={{ marginLeft: 15, flexDirection: 'row' }}>
            <Image style={{ height: 20, width: 20, tintColor: 'black' }} source={Images.language}></Image>
            <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Language</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title='Hide' onPress={() => this._panel.hide()} /> */}
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
    this.setState({
      isModalVisibleBio: true
    });
  }

  onShowPersonalInfoModal = () => {
    this.setState({
      isModalVisiblePersonalInfo: true
    });
  }

  OnAddPersonalInfo = () => {
    // this._panel.show();
    this.onShowPersonalInfoModal();
  }

  onSelectGender=(index,value)=>{
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
    // this._panel.hide()
  }

  onSelect(index, value) {
    // this.setState({
    //   text: value
    // })

    this.setState({ 
      relationShipStatus: value,
      relationShipStatusIndex: index
    });

    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        relationshipStatus: value,
        relationShipStatusIndex: index
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {

        alert("fail" + error.toString());
      });

    this._toggleModal();
    // this._panel.hide()
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
    // this._panel.hide()
  }

  onSaveBio = () => {
    var bioText = this.state.bioText;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        bioText: bioText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalBio();
    // this._panel.hide();
  }

  onSaveReligion = () => {
    var religionText = this.state.religion;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        religion: religionText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalReligion();
    // this._panel.hide();
  }

  onSaveJobTitle = () => {
    var jobTitleText = this.state.jobTitle;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        jobTitle: jobTitleText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalJobTitle();
    // this._panel.hide();
  }

  onSaveEducation = () => {
    var educationText = this.state.education;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        education: educationText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalEducation();
    // this._panel.hide();
  }

  onSaveHeight = () => {
    var heightText = this.state.height;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        height: heightText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalHeight();
    // this._panel.hide();
  }

  onSaveLanguage = () => {
    var languageText = this.state.language;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + userId)
      .update({
        language: languageText
      })
      .then(ref => {
        this.componentDidMount()
      })
      .catch(error => {
        alert("fail" + error.toString());
      });

    this._toggleModalLanguage();
    // this._panel.hide();
  }

  onTagInterestPress(data) {
    this.state.interests = this.tag.itemsSelected;

    firebase.database().ref("Users/FaithMeetsLove/Registered/" + userId)
    .update({ 
      interests: JSON.stringify(this.state.interests)
    });
  }

  onTagLifeAndSocialPress(data) {
    this.state.lifestyleAndSocial = this.tag2.itemsSelected;

    firebase.database().ref("Users/FaithMeetsLove/Registered/" + userId)
    .update({ 
      lifestyleAndSocial: JSON.stringify(this.state.lifestyleAndSocial)
    });
  }

  onChangePersonalInfoCollapse() {
    this.setState({
      personalInfoIsCollapsed: !this.state.personalInfoIsCollapsed
    });
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
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{this.state.nameFull}</Text>
              {/* <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 22 }}>,</Text> */}
              {this.state.totalAge != '' ?
                <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold', marginLeft: 10 }}>{', '+this.state.totalAge}</Text>
              : null }
            </View>
            <View>
              {/* <Text style={{ margin: 10 }}>ijkohdkfjchdskjdfvhdfkjvhdfdfkjhvdfjk kjdshvjkdf kjhvkj</Text> */}
            </View>
            {/* <View>
              <Text style={{ marginBottom: 10 }}>more info</Text>
            </View> */}

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
          {/* <TouchableOpacity style={{marginTop: hp(1), width: wp(100), height: hp(10)}} onPress={() => { this.onChangePersonalInfoCollapse() }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Show Personal Info</Text>
            </View>
          </TouchableOpacity> */}
        {/* <Collapsible collapsed={this.state.personalInfoIsCollapsed}> */}
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
                <View style={{ flexDirection: 'row', marginRight: wp(6) }}>
                  <Image source={Images.bio} style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Bio : {this.state.bioText}</Text></View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.homePage} style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Lives in {this.state.place}</Text></View>
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
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.religion}
                  style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Religion : {this.state.religion}</Text></View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.job}
                  style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Job Title : {this.state.jobTitle}</Text></View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.education}
                  style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Education : {this.state.education}</Text></View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.height}
                  style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Height : {this.state.height}</Text></View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}><Image source={Images.language}
                  style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Language : {this.state.language}</Text></View>
              </View>
            </View>
          </View>
        {/* </Collapsible> */}

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
                <Text style={styles.textText}>{this.state.likes}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.matchedText}>Matched</Text>
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
              <Text style={styles.textThreeText}>{this.state.matched}</Text>
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
            <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Gallery</Text>
          </View>
          <View style={{ margin: 10 }}>

            <View>
              <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, marginTop: 10 }}>Photos</Text>
            </View>
            
            <FlatGrid
              itemDimension={wp(20)}
              items={this.state.galleryPhoto}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.gridItem} onPress={() => this.onPressMediaItem(item, index)}>
                  {item.url != ''?
                    <Image source={{ uri: item.url }}
                      style={styles.gridImage}
                    />
                  : null }
                  {item.url == '' ?
                    <Image style={{ height: wp(10), width: wp(10) }} source={Images.addIcon}></Image>
                  : null}
                </TouchableOpacity>
              )}
              extraData={this.state}
            />

            <View>
              <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, marginTop: hp(3), marginBottom: hp(3) }}>Video</Text>
            </View>

            <View>
                {this.state.galleryVideo != null ?
                  <Fragment>
                    <View style={{flex: 1, height: hp(35), width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 1}}>
                        <Video source={{uri: this.state.galleryVideo}}
                            controls={true}
                            paused={true}
                            ref={(ref) => {
                              this.player = ref
                            }}
                            style={styles.backgroundVideo} 
                          />
                    </View>
                    <Button style={{marginTop: hp(25)}} title='Options' onPress={() => this.onPressMediaItem(null, null, true)} />
                  </Fragment>
                : null}
                {this.state.galleryVideo == null ?
                  <TouchableOpacity style={styles.gridItem} onPress={() => this.onPressMediaItem(null, null, true)}>
                    <Image style={{ height: wp(10), width: wp(10) }} source={Images.addIcon}></Image>
                  </TouchableOpacity>
                : null}
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
            {this.state.nameFull != '' ?
              <TagSelect
                data={data}
                value={this.state.interests}
                onItemPress={(data) => this.onTagInterestPress(data)}
                ref={(tag) => {
                  this.tag = tag;
                }}
                onMaxError={() => {
                  alert('Ops', 'Max reached');
                }}
              />
            : null }
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
            {this.state.nameFull != '' ?
              <TagSelect
                ref={(tag) => {
                  this.tag2 = tag;
                }}
                value={this.state.lifestyleAndSocial}
                onItemPress={(data) => this.onTagLifeAndSocialPress(data)}
                data={dataLifeStyle}
                itemStyle={styles.item}
                itemLabelStyle={styles.label}
                itemStyleSelected={styles.itemSelected}
                itemLabelStyleSelected={styles.labelSelected}
              />
            : null }
          </View>
        </View>

        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
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
            {this.state.uploadMediaGalleryCanDelete == true ?
              <Dialog.Button
                label="Remove Photo"
                onPress={() => {
                  this.handleRemovePhoto();
                }}
              />
            : null }
          </Dialog.Container>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <KeyboardAvoidingView style={styles.modalPersonalInfoContainer} behavior="padding" enabled>
            <View style={{flex: 0.9}}>
              <View style={styles.modalBioViewContent}>
                <View style={{ alignContent: 'center', marginLeft: 50 }}>
                  <RadioGroup
                    onSelect={(index, value) => this.onSelect(index, value)}
                    selectedIndex={this.state.relationShipStatusIndex}
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
            </View>
            <View style={{flex: 0.1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModal}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleLocation}>
            <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
              <View style={{flex: 0.7}}>
                <View style={styles.modalBioViewContent}>
                  <View style={styles.whereDataView}>
                    <TextInput style={styles.whereTextInput}
                      defaultValue={this.state.permanentLocation}
                      onChangeText={(text) => this.setState({ permanentLocation: text })} placeholder="Enter where are you from?"
                    />
                    {/* <Button title="Save your location" onPress={() => { this.onSaveLocation() }} /> */}
                  </View>
                </View>
              </View>
              <View style={{flex: 0.3, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalLoaction}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveLocation()}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>Save your location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleGender}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>
              <View style={styles.modalBioViewContent}>
              <View style={{ alignContent: 'center', marginLeft: 50 }}>
                  <RadioGroup
                    onSelect={(index, value) => this.onSelectGender(index, value)}
                    selectedIndex={this.state._gender}
                  >
                    <RadioButton value={0} >
                      <Text>Man</Text>
                    </RadioButton>

                    <RadioButton value={1}>
                      <Text>Woman</Text>
                    </RadioButton>
                  </RadioGroup>
                </View>
              </View>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalGender}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleBio}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>
              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.bioText}
                  onChangeText={(text) => this.setState({ bioText: text })} placeholder="Enter your bio"
                />
              </View>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalBio}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveBio()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save your bio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisiblePersonalInfo}>
          <KeyboardAvoidingView style={styles.modalPersonalInfoContainer} behavior="padding" enabled>
            <View style={{flex: 0.9}}>

              {this.onSlideData()}

            </View>
            <View style={{flex: 0.1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalPersonalInfo}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveBio()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save your bio</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleReligion}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>
              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.religion}
                  onChangeText={(text) => this.setState({ religion: text })} placeholder="Enter your religion"
                />
              </View>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalReligion}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveReligion()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleJobTitle}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>

              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.jobTitle}
                  onChangeText={(text) => this.setState({ jobTitle: text })} placeholder="Enter your Job Title"
                />
              </View>

            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalJobTitle}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveJobTitle()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleEducation}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>

              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.education}
                  onChangeText={(text) => this.setState({ education: text })} placeholder="Enter your Education"
                />
              </View>

            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalEducation}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveEducation()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleHeight}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>

              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.height}
                  onChangeText={(text) => this.setState({ height: text })} placeholder="Enter your Height"
                />
              </View>

            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalHeight}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveHeight()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleLanguage}>
          <KeyboardAvoidingView style={styles.modalBioContainer} behavior="padding" enabled>
            <View style={{flex: 0.7}}>

              <View style={styles.modalBioViewContent}>
                <TextInput style={styles.whereTextInput}
                  multiline={true}
                  numberOfLines={3}
                  value={this.state.language}
                  onChangeText={(text) => this.setState({ language: text })} placeholder="Enter your Language"
                />
              </View>

            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.touchableCancel} onPress={this._toggleModalLanguage}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.touchableOk} onPress={() => this.onSaveLanguage()}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </KeyboardAvoidingView>
        </Modal>

      </ScrollView>
      {this.state.isLoading ?
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      : null }
      </View>
      {/* <SlidingUpPanel ref={c => this._panel = c}>
        {() => this.onSlideData()}
      </SlidingUpPanel> */}

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
    justifyContent: 'center'
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
  },
  modalBioContainer: {
    flex: 0.4,
    // height: hp(35),
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalPersonalInfoContainer: {
    flex: 0.8,
    // height: hp(35),
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalBioViewContent:{
    flex: 1,
    alignContent: 'center',
    marginLeft: 30, 
    marginRight: 30,
    justifyContent: 'center'
  },
  touchableCancel: {
    backgroundColor: '#fc5c65',
    flex: 1, 
    justifyContent: 'center'
  },
  touchableOk: {
    backgroundColor: '#20bf6b',
    flex: 1, 
    justifyContent: 'center'
  },
  gridView: {
    marginTop: hp(2),
    flex: 1,
  },
  gridImage: {
    resizeMode: 'cover',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: '100%',
    height: '100%'
  },
  gridItem: {
    height: hp(20),
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: hp(5),
    right: 0,
  },
  viewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 238, 238, 0.3)',
    alignContent: 'center',
    flex: 1,
    zIndex: 300
  }
});
