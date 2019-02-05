import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import firebase from "../FirebaseConfig/FirebaseConfig";

import { BackHandler,Dimensions,PermissionsAndroid} from "react-native";


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


export default class ProfileCopy extends Component {
    constructor(props) {
        super(props);
        this.state={
          dialogMsg: dialogImageTitle,
          dialogVisible: false,
          isImage: true,
          progressVisible: false,
          imagePath: "",
          imagedata: "",
          videoPath: "",
          videoData: "",
          filePath: "",
          fileData: "",
          video_url: "",
          image_url: "",
          file_url: "",
        }
      }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }

  backAndroid () {
    Actions.pop() 
    return true 
   }
   onProfileImagePressed=()=>{
    this.setState({ dialogVisible: true });
  }
  openProfileImage=async()=>{
    var _name = await firebase.auth().currentUser.uid;
    const ref = firebase.storage().ref('ProfileImages/'+_name+".jpg");
    const url = await ref.getDownloadUrl();
    console.log(ref);
    return(  <Image
      source={require("../../../assets/images/profile.png")}
      style={styles.profileImage}
    />);
  
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

  handleCancel() {
    this.setState({ dialogVisible: false });
  }
  handleCamera() {
    this.setState({ dialogVisible: false });
    if (this.state.isImage) {
      Actions.captureImage();
    } else {
      Actions.recordVideo();
    }
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
            this.setState({
              filePath: image.path,
              fileData: image.data,
              imagePath: image.path,
              videoPath: "",
              imagedata: image.data
            });
          })
          .catch(error => {
            this.setState({ ...this.state, progressVisible: false });
            console.log(error);
          });
      }, 500);
    }
     else {
      type = "video/mp4";
      format = ".mp4";
      dirName = "PostVideos/";
      isImageUpload = false;
      setTimeout(() => {
        ImagePicker.openPicker({
          mediaType: "video"
        })
          .then(video => {
            this.setState({
              filePath: video.path,
              fileData: video.data,
              videoPath: video.path,
              videoData: video.data,
              imagePath: ""
            });
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    }
  }
    render() {
        return (
            <ScrollView style={{ backgroundColor: "rgb(249, 249, 249)" }}>
                <View>
                    <View style={{
                        backgroundColor: "rgb(255, 255, 255)", 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        margin: 10, 
                        borderRadius: 8,
                        shadowColor: "rgba(0, 0, 0, 0.08)",
                        shadowRadius: 5,
                        shadowOpacity: 1,
                    }}><View>
                            <TouchableOpacity onPress={() => {this.onProfileImagePressed()}}>
                                <Image source={require("../../../assets/images/1.png")}
                                    style={styles.ovalImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22, marginTop:10, fontWeight: 'bold' }}>Name</Text><Text style={{ fontWeight: 'bold',marginTop:10, fontSize: 22 }}>,</Text>
                            <Text style={{ fontSize: 22, marginTop:10,fontWeight: 'bold',marginLeft:10 }}>27</Text>
                        </View>
                        <View>
                            <Text style={{ margin: 10 }}>ijkohdkfjchdskjdfvhdfkjvhdfdfkjhvdfjk kjdshvjkdf kjhvkj</Text>
                        </View>
                        <View>
                            <Text style={{ marginBottom:10}}>more info</Text>
                        </View></View>


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
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    profileView: {
        backgroundColor: "rgb(249, 249, 249)",
        flex: 1
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
    navBarViewLinearGradient: {
        height: 231
    },
    navBarView: {
        width: "100%",
        height: "100%"
    },
    iphoneXBarsTabBar5ItemsView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 83
    },
    accountInforView: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowRadius: 5,
        shadowOpacity: 1,
        height: 212,
        marginLeft: 18,
        marginTop: 86,
        marginRight: 16
    },
    panel1View: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowRadius: 5,
        shadowOpacity: 1,
        height: 152,
        marginLeft: 19,
        marginTop: 15,
        marginRight: 15
    },
    panel2View: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowRadius: 5,
        shadowOpacity: 1,
        height: 256,
        marginLeft: 17,
        marginTop: 15,
        marginRight: 16
    },
    likesView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 36,
        marginTop: 14,
        marginRight: 1
    },
    visitorsView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 36,
        marginTop: 15,
        marginRight: 1
    },
    groupsView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 22,
        marginLeft: 14,
        marginRight: 18,
        marginBottom: 14,
        justifyContent: "center"
    },
    rectangle2View: {
        backgroundColor: "rgb(237, 74, 71)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 14
    },
    likesText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 12,
        marginTop: 3
    },
    shapeImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 17,
        marginTop: 3
    },
    rectangleView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    colorWhiteView: {
        backgroundColor: "rgb(255, 255, 255)",
        height: 0
    },
    colorWhiteTwoView: {
        backgroundColor: "rgb(255, 255, 255)",
        height: 0
    },
    rectangle2TwoView: {
        backgroundColor: "rgb(80, 227, 194)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 14
    },
    visitsText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 12,
        marginTop: 3
    },
    shapeTwoImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopyView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 17,
        marginTop: 3
    },
    rectangleTwoView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    shapeThreeImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    rectangle2ThreeView: {
        backgroundColor: "rgba(144, 19, 254, 0.92)",
        borderRadius: 8,
        width: 22,
        height: 22
    },
    groupsText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 12
    },
    shapeFourImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12
    },
    iconsLikeCopyTwoView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 3
    },
    rectangleThreeView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    groupsImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    walletView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 36,
        marginLeft: 1,
        marginTop: 14,
        marginRight: 1
    },
    levelView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 36,
        marginLeft: 1,
        marginTop: 15,
        marginRight: 1
    },
    friendsView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 38,
        marginTop: 15,
        marginRight: 1
    },
    blacklistView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 38,
        marginTop: 13,
        marginRight: 1
    },
    settingsView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 38,
        marginRight: 1
    },
    rectangle2FourView: {
        backgroundColor: "rgb(240, 85, 34)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 15
    },
    myWalletText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 11,
        marginTop: 3
    },
    shapeFiveImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopyThreeView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 18,
        marginTop: 3
    },
    rectangleFourView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    walletImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    rectangle2FiveView: {
        backgroundColor: "rgb(74, 144, 226)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 15
    },
    vipCenterText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 11,
        marginTop: 3
    },
    shapeSixImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopyFourView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 18,
        marginTop: 3
    },
    rectangleFiveView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    shapeSevenImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    rectangle2SixView: {
        backgroundColor: "rgba(126, 211, 33, 0.84)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 16
    },
    findFriendsText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 11,
        marginTop: 3
    },
    shapeEightImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopyFiveView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 19,
        marginTop: 3
    },
    rectangleSixView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    friendsImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    rectangle2SevenView: {
        backgroundColor: "rgb(74, 74, 74)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 16
    },
    blacklistText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 11,
        marginTop: 3
    },
    shapeNineImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopySixView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 19,
        marginTop: 3
    },
    rectangleSevenView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    blacklistImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    rectangle2EightView: {
        backgroundColor: "rgb(218, 217, 226)",
        borderRadius: 8,
        width: 22,
        height: 22,
        marginLeft: 16
    },
    settingsText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0,
        marginLeft: 11,
        marginTop: 3
    },
    shapeTenImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 7,
        height: 12,
        marginTop: 5,
        marginRight: 17
    },
    iconsLikeCopySevenView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 16,
        height: 16,
        marginLeft: 19,
        marginTop: 3
    },
    rectangleEightView: {
        backgroundColor: "rgba(255, 0, 0, 0.0)",
        height: 0
    },
    settingsImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    ovalImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 130,
        height: 130,
        marginLeft: 19,
        marginTop: 22,
        borderRadius: 65,
    },
    iconsEditImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 24,
        height: 24,
        marginTop: 47,
        marginRight: 15
    },
    landonGibsonText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(74, 74, 74)",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 0.23,
        marginTop: 42,
        marginRight: 4
    },
    followTabView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 265,
        height: 44,
        marginBottom: 8,
        alignSelf: "center"
    },
    vipLevelImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 28,
        height: 28,
        marginLeft: 82,
        marginTop: 89
    },
    visitorsText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(194, 196, 202)",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: 0,
        width: 50
    },
    likesTwoText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(194, 196, 202)",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: 0,
        width: 31,
        alignSelf: "center"
    },
    textText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        letterSpacing: 0,
        marginLeft: 3,
        marginTop: 20
    },
    matchedText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(194, 196, 202)",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: 0,
        width: 55
    },
    textTwoText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        letterSpacing: 0,
        marginTop: 20,
        alignSelf: "center"
    },
    textThreeText: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "rgb(38, 38, 40)",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        letterSpacing: 0,
        marginTop: 20,
        marginRight: 16,
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
    homeIndicatorOnLightImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    discoverImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    neabyImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 0,
        height: 0
    },
    favoriteView: {
        backgroundColor: "rgb(193, 192, 201)",
        width: 0,
        height: 0
    },
    messageImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
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
