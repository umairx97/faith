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
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "react-native-fetch-blob";
import Dialog from "react-native-dialog";

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
      messageKey: "",
      messageVideoUrl: "",
      isImage: true,
      filePath: "",
      fileData: "",
      imagePath: "",
      videoPath: "",
      imagedata: "",
      dialogVisible: false,
      dialogPlayVisible: false,
      userChatTime: 0
    };
    this.user = firebase.auth().currentUser;

    setTimeout(() => {
      this.chatRef = firebase.database().ref().child(
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
    }, 500);
  }

  generateChatId() {
    if (this.user.uid > friendUid) return `${this.user.uid}-${friendUid}`;
    else return `${friendUid}-${this.user.uid}`;
  }

  async componentWillMount() {
    friendUid = await AsyncStorage.getItem("friendsUid");
  }
  async componentDidMount() {
    var path = await AsyncStorage.getItem("file_path");
    if (path != null && path != "") this.setState({ imagePath: path });
    if (Platform.OS === "android") {
      apiVersion = DeviceInfo.getAPILevel();
    }
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
    setTimeout(() => {
      this.listenForItems(this.chatRefData);
    }, 550);
  }

  componentWillUnmount() {
    this.setState({ imagePath: "" });
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); 
  }
  listenForItems(chatRef) {
    var keys;
    var allUsersChat = firebase
      .database()
      .ref("Users/FaithMeetsLove/ChatUser/" + this.user.uid);
    allUsersChat
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            keys = childSnapshot.val().CreatedAt;
          })
        }
        else {
          keys = 0
        }
      })
    chatRef.on("value", snap => {
      var items = [];
      snap.forEach(child => {
        lastChat = child.val().createdAt;
        if (lastChat > keys) {
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
            image: child.val().image,
            video: child.val().video
          });
        }
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
    Actions.pop(); 
    return true; 
  }

  async onSend(messages = []) {
    // var uidUser = await firebase.auth().currentUser.uid;
    // var alreadyBlokedUser = firebase.database().ref("Users/FaithMeetsLove/BlockedFriends/" + uidUser);
   
    // await alreadyBlokedUser.once('value').then(snapshot => {
    //   snapshot.forEach(childSnapshot => {
    //     key = childSnapshot.key;
    //     var blocked = childSnapshot.val().blockedFromChat;
        
    //   })
    // })
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
            filePath: this.state.imagePath,
            imagePath: ""
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
                    fName: friendName,
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
                    fName: friendName,
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
          fName: friendName,
          order: -1 * now
        });
      });
    }
  }
  // sendMessage(messages = []) { }
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
  onChatMessageLongPressed(context, message) {
    if (message.video.includes("http"))
      this.setState({
        dialogPlayVisible: true,
        dialogVisible: false,
        messageKey: message.key,
        messageVideoUrl: message.video
      });
    else
      this.setState({
        dialogVisible: true,
        dialogPlayVisible: false,
        messageKey: message.key
      });
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
    } else if (val === "cam") {
      Actions.fullScreenCamera();
    }
  }

  renderBubble(props) {
    return <Bubble {...props} videoProps={{ muted: true }} />;
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
              this.onChatMessageLongPressed(context, message);
            }}
            renderBubble={this.renderBubble}
            onPressAvatar={message => {
              this.showFriendProfile(message);
            }}
          />
        </View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Select Option</Dialog.Title>
          <Dialog.Description>Select Action</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel();
            }}
          />
          <Dialog.Button
            label="Block"
            onPress={() => {
              this.handleBlock();
            }}
          />
          <Dialog.Button
            label="Delete"
            onPress={() => {
              this.handleDeleteMessage();
            }}
          />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogPlayVisible}>
          <Dialog.Title>Select Option</Dialog.Title>
          <Dialog.Description>Select Action</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel();
            }}
          />
          <Dialog.Button
            label="Block"
            onPress={() => {
              this.handleBlock();
            }}
          />
          <Dialog.Button
            label="Delete"
            onPress={() => {
              this.handleDeleteMessage();
            }}
          />
          <Dialog.Button
            label="Play Video"
            onPress={() => {
              this.handleVideo();
            }}
          />
        </Dialog.Container>
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
              this.openAction("cam");
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
  handleBlock() {
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
    setTimeout(() => {
      Alert.alert("Block!", "Are you sure you want to block " + friendName + " ?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            this.blockFriend();
          }
        }
      ]);
    }, 400);
  }
  blockFriend() {
    firebase.database().ref('Users/FaithMeetsLove/BlockedFriends/' + this.user.uid + '/' + friendUid).set({
      blockedFromChat: true
    }).then()

  }
  handleVideo() {
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
    setTimeout(() => {
      AsyncStorage.setItem("videoUrl", this.state.messageVideoUrl);
      Actions.fullScreenVideo();
    }, 400);
  }
  handleDeleteMessage() {
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
    firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/chat/" +
        this.generateChatId() +
        "/" +
        this.state.messageKey
      )
      .remove();
  }
  handleCancel() {
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
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
