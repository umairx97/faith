import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  BackHandler,
  FlatList,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  Platform,
  PermissionsAndroid
} from "react-native";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import { Actions, Scene } from "react-native-router-flux";
import { Images } from "../../../assets/imageAll";
import { ifIphoneX } from "react-native-iphone-x-helper";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { GiftedChat } from "react-native-gifted-chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "react-native-fetch-blob";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const originalXMLHttpRequest = window.XMLHttpRequest;

let apiVersion = 1;
var type = "image/jpg";
var format = ".jpg";
var dirName = "ChatImages/";
var isImageUpload = true;
var milliseconds;

var friendName, friendUid, friendEmail, friendAvatar, uidUser;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage: "",
      receiverUid: "",
      isImage: true,
      filePath: "",
      fileData: "",
      imagePath: "",
      videoPath: "",
      imagedata: ""
    };

    this.user = firebase.auth().currentUser;
    //get friend Uis, email and name from props here    QBO1EBBXMGVcrUSy5zHJj9EtsaC2  //vMIndR3M35M2ZWL8jGEyHOoUqOv1
    friendUid = "vMIndR3M35M2ZWL8jGEyHOoUqOv1";

    this.chatRef = this.getRef().child(
      "Users/FaithMeetsLove/chat/" + this.generateChatId()
    );
    this.chatRefData = this.chatRef.orderByChild("order");
    this.onSend = this.onSend.bind(this);

    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + friendUid)
      .once("value")
      .then(snapshot => {
        friendAvatar = snapshot.val().profileImageURL;
        friendName = snapshot.val().fullName;
      });
  }
  generateChatId() {
    if (this.user.uid > friendUid) return `${this.user.uid}-${friendUid}`;
    else return `${friendUid}-${this.user.uid}`;
  }
  getRef() {
    return firebase.database().ref();
  }
  async componentDidMount() {
    if (Platform.OS === "android") {
      apiVersion = DeviceInfo.getAPILevel();
    }
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  listenForItems(chatRef) {
    chatRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        // alert(child.val().text);
        //var name = child.val().uid == this.user.uid ? this.user.name : name1;
        items.push({
          key: child.key,
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid,
            name: friendName,
            avatar: friendAvatar
          },
          // You can also add a image prop:
          image: child.val().image,
          // You can also add a video prop:
          video: child.val().video
          // Any additional custom parameters are passed through
        });
      });

      this.setState({
        loading: false,
        messages: items
      });
    });
  }
  componentWillUnmount() {
    this.chatRefData.off();
  }
  backAndroid() {
    Actions.pop(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  updateMessageState(text) {
    this.setState({ chatMessage: text });
  }
  async onSend(messages = []) {
    if (this.state.imagePath != "" || this.state.videoPath != "") {
      milliseconds = new Date().getTime();
      // Prepare Blob support
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.Blob = Blob;

      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      if (isImageUpload) {
        this.setState(
          {
            filePath: this.state.imagePath
          },
          () => {
            this.uploadMedia(
              this.state.filePath,
              this.user.uid,
              type,
              format,
              dirName,
              fs
            )
              .then(url => {
                this.setState({
                  file_url: url,
                  imagePath: "",
                  videoPath: "",
                  filePath: ""
                });
                var imageUrl = "";
                var VideoUrl = "";
                if (isImageUpload) {
                  imageUrl = url;
                } else {
                  VideoUrl = url;
                }
                window.XMLHttpRequest = originalXMLHttpRequest;
                messages.forEach(message => {
                  var now = new Date().getTime();
                  this.chatRef.push({
                    _id: now,
                    text: message.text,
                    image: imageUrl,
                    video: VideoUrl,
                    createdAt: now,
                    uid: this.user.uid,
                    fuid: friendUid,
                    order: -1 * now
                  });
                });
              })
              .catch(error => {
                alert(JSON.stringify(error));
                console.log(error);
              });
          }
        );
      } else {
        this.setState(
          {
            filePath: this.state.videoPath
          },
          () => {
            this.uploadMedia(
              this.state.filePath,
              this.user.uid,
              type,
              format,
              dirName,
              fs
            )
              .then(url => {
                this.setState({
                  file_url: url,
                  imagePath: "",
                  videoPath: "",
                  filePath: ""
                });
                var imageUrl = "";
                var VideoUrl = "";
                if (isImageUpload) {
                  imageUrl = url;
                } else {
                  VideoUrl = url;
                }
                window.XMLHttpRequest = originalXMLHttpRequest;
                messages.forEach(message => {
                  var now = new Date().getTime();
                  this.chatRef.push({
                    _id: now,
                    text: message.text,
                    image: imageUrl,
                    video: VideoUrl,
                    createdAt: now,
                    uid: this.user.uid,
                    fuid: friendUid,
                    order: -1 * now
                  });
                });
              })
              .catch(error => {
                alert(JSON.stringify(error));
                console.log(error);
              });
          }
        );
      }
    } else {
      window.XMLHttpRequest = originalXMLHttpRequest;
      messages.forEach(message => {
        var now = new Date().getTime();
        this.chatRef.push({
          _id: now,
          text: message.text,
          image: "",
          video: "",
          createdAt: now,
          uid: this.user.uid,
          fuid: friendUid,
          order: -1 * now
        });
      });
    }
  }
  sendMessage(messages = []) {}
  async uploadMedia(uri, uid, mime, format, dirName, fs) {
    this.setState({ ...this.state, progressVisible: true });
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;
      const imageRef = firebase
        .storage()
        .ref(dirName + uid)
        .child(milliseconds + format);

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  onChatMessagePressed(context, message) {
    // alert(message.key);

    Alert.alert("Delete!", "Are you sure?", [
      {
        text: "Cancel",
        //        onPress: () => Actions.drawerClose(),
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          firebase
            .database()
            .ref(
              "Users/FaithMeetsLove/chat/" +
                this.generateChatId() +
                "/" +
                message.key
            )
            .remove();
        }
      }
    ]);
  }
  showFriendProfile(message) {
    //alert(friendUid)
    AsyncStorage.setItem("userProfileKeys", "" + friendUid);
    setTimeout(() => Actions.userProfile(), 200);
  }
  async openAction(val) {
    if (val == "img") {
      if (Platform.OS === "android" && apiVersion >= 23) {
        this.requestCameraPermission(val);
      } else {
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
    } else if (val == "video") {
      if (Platform.OS === "android" && apiVersion >= 23) {
        this.requestCameraPermission(val);
      } else {
        type = "video/mp4";
        format = ".mp4";
        dirName = "ChatVideos/";
        isImageUpload = false;
        setTimeout(() => {
          ImagePicker.openPicker({
            mediaType: "video"
          })
            .then(video => {
              this.setState({
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
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            ...ifIphoneX({ bottom: 61 }, { bottom: 41 }),
            position: "absolute",
            width: Screen.width,
            height: Screen.height - 50
          }}
        >
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend.bind(this)}
            user={{
              _id: this.user.uid
            }}
            isAnimated
            showAvatarForEveryMessage
            renderAvatarOnTop={true}
            onLongPress={(context, message) => {
              this.onChatMessagePressed(context, message);
            }}
            onPressAvatar={message => {
              this.showFriendProfile(message);
            }}
          />
        </View>
        <View
          style={{
            ...ifIphoneX({ bottom: 60 }, { bottom: 40 }),
            position: "absolute",
            width: Screen.width,
            height: 1
          }}
        />
        <View style={styles.positionViewBottom}>
          <TouchableHighlight
            onPress={() => {
              this.openAction("img");
            }}
          >
            <Image style={styles.btnImage} source={Images.IconImage} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              //this.openAction("cam");
            }}
          >
            <Image style={styles.btnImage} source={Images.IconCamera} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.openAction("video");
            }}
          >
            <Image style={styles.btnImage} source={Images.IconVideo} />
          </TouchableHighlight>
        </View>
      </View>
    );
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
        if (val == "img") {
          this.setState({
            isImage: true
          });
        } else {
          this.setState({
            isImage: false
          });
        }
      } else {
        alert(
          "Permissions are not granted. The application may not work properly"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    marginRight: 2,
    marginLeft: 2
  },
  positionViewBottom: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    ...ifIphoneX({ height: 60 }, { height: 40 }),
    width: Screen.width,
    borderRadius: 15,
    flexDirection: "row"
  },
  btnImage: {
    alignSelf: "stretch",
    alignItems: "stretch",
    width: 20,
    height: 20,
    marginLeft: "15%"
  }
});
