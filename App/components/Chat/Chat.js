import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Dimensions,
  BackHandler,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  Platform,
  ActionSheetIOS,
  PermissionsAndroid
} from "react-native";
// import OfflineNotice from "../OfflineNotice/OfflineNotice";
import { Actions, Scene } from "react-native-router-flux";
import { Images } from "../../../assets/imageAll";
import { ifIphoneX } from "react-native-iphone-x-helper";
import firebase, { Firebase } from "react-native-firebase";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
// import Video from 'react-native-video';
import Video from "react-native-gifted-chat/node_modules/react-native-video";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import Dialog from "react-native-dialog";
import { MenuProvider } from "react-native-popup-menu";
import ActionSheet from 'react-native-action-sheet';
import { Immersive } from 'react-native-immersive';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
//const originalXMLHttpRequest = window.XMLHttpRequest;

var MEDIA_BUTTONS = [
  'Photo Library',
  'Video Library',
  'Camera',
  'Gallery',
  'Cancel'
];

var DESTRUCTIVE_INDEX = 4;
var CANCEL_INDEX = 4;


let apiVersion = 1;
var type = "image/jpg";
var format = ".jpg";
var dirName = "ChatImages/";
var isImageUpload = true;
var milliseconds;

var myAvatar, friendName, friendUid, friendEmail, friendAvatar, friendToken, chatUserName, mutedChat = false;
var mediaGallery = [];

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage: "",
      receiverUid: "",
      messageKey: "",
      messageVideoUrl: "",
      messageImageUrl: "",
      messageText: "",
      isImage: true,
      filePath: "",
      fileData: "",
      imagePath: "",
      videoPath: "",
      imagedata: "",
      dialogVisible: false,
      dialogPlayVisible: false,
      blockedByFriend: false,
      blockedByMe: false,
      checkBlock: false,
      checkFriendBlock: false,
      userChatTime: 0,
      friendProfileName: "",
      chatMuted: false,
      friendChatId:'',
      isMediaLoaded: false,
      text: "",
      isUploading: false
    };
    this.user = firebase.auth().currentUser;
    // this.getChatGenerated();
  }

  getChatGenerated=async()=>{
    chatUserName = await AsyncStorage.getItem("reg_user_name");
    friendUid = await AsyncStorage.getItem("friendsUid");
    myAvatar = await AsyncStorage.getItem("reg_user_profileImageURL");
    this.setState({
      friendChatId:friendUid
    })
    this.getMutedbyFriend();
    this.chatRef = await firebase
    .database()
    .ref()
    .child("Users/FaithMeetsLove/chat/" + this.generateChatId());
    // console.warn("chatID: ", "Users/FaithMeetsLove/chat/" + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild("order");
    // this.onSend = this.onSend.bind(this);

    firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + friendUid)
      .once("value")
      .then(snapshot => {
        friendAvatar = snapshot.val().profileImageURL;
        friendName = snapshot.val().fullName;
        friendToken = snapshot.val().pushToken;
        this.setState({
          friendProfileName: friendName
        });
      });

  }

  generateChatId() {
    if (this.user.uid > this.state.friendChatId) return `${this.user.uid}-${this.state.friendChatId}`;
    else return `${this.state.friendChatId}-${this.user.uid}`;
  }

  // async componentWillMount() { }

  async componentDidMount() {
    this.focusListener2 = this.props.navigation.addListener("willFocus", async () => {
      if(this.state.messages.length != 0) {
        this.setState({
          messages: [],
          friendProfileName: ""
        });
      }
    });
    this.focusListener = this.props.navigation.addListener("didFocus", async () => {
      this.getChatGenerated();
      var isForward = await AsyncStorage.getItem("openChatFrom");
      var isForwardText = await AsyncStorage.getItem("messageText");
      var isForwardImage = await AsyncStorage.getItem("messageImage");
      var isForwardVideo = await AsyncStorage.getItem("messageVideo");
      if (isForwardImage == null) {
        isForwardImage = "";
      }
      if (isForwardVideo == null) {
        isForwardVideo = "";
      }
      
      this.getBlokedUser();
      var path = await AsyncStorage.getItem("file_path");
      if (path != null && path != "") this.setState({ imagePath: path });
      if (Platform.OS === "android") {
        apiVersion = DeviceInfo.getAPILevel();
      }
      BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
      setTimeout(() => {
        this.listenForItems(this.chatRefData);
        if (isForward == "false") {
          AsyncStorage.setItem("openChatFrom", "true");
          AsyncStorage.setItem("newChatMessage", "true");

          var now = new Date().getTime();
          this.chatRef.push({
            _id: now,
            text: isForwardText,
            image: isForwardImage,
            video: isForwardVideo,
            createdAt: now,
            uid: this.user.uid,
            fuid: friendUid,
            blockedByMe: this.state.blockedByMe,
            blockedByFriend: this.state.blockedByFriend,
            fName: friendName,
            order: -1 * now
          });
        }
        // console.warn('user: ', this.user);
      }, 600);
      this.androidGoInImmersive();
    });
  }

  getBlokedUser = async () => {
    var keyID;
    let blocked;

    var alreadUserBlokedUser = firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/BlockedFriends/" + this.user.uid + "/" + this.state.friendChatId
      );
    await alreadUserBlokedUser.once("value").then(snapshot => {
      if (snapshot.exists()) {
        blocked = snapshot.val().blockedFromChat;
        this.setState({
          blockedByMe: blocked,
          checkBlock: blocked
        });
        //alert(blocked)
      }
    });

    var alreadyFriendBlokedUser = firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/BlockedFriends/" + this.state.friendChatId + "/" + this.user.uid
      );
    await alreadyFriendBlokedUser.once("value").then(snapshot => {
      if (snapshot.exists()) {
        blocked = snapshot.val().blockedFromChat;
        // alert("friend blocked me " + blocked)
        this.setState({
          blockedByFriend: blocked,
          checkFriendBlock: blocked
        });
        //alert(blocked)
      }
    });
  };

  componentWillUnmount() {
    this.unMountComponent();
  }

  unMountComponent() {
    this.chatRefData.off();
    this.setState({ imagePath: "", messages: [], friendProfileName: "" });
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  listenForItems(chatRef) {
    // var keys;
    var keys = 0;
    var allUsersChat = firebase
      .database()
      .ref("Users/FaithMeetsLove/ChatUser/" + this.user.uid);
    allUsersChat.once("value").then(snapshot => {
      // console.warn('userChatSnap: ', snapshot);
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          frndID = childSnapshot.val()._id;
          if (frndID == this.state.friendChatId) {
            keys = childSnapshot.val().CreatedAt;
          }
        });
      } 
      // else {
      //   keys = 0;
      // }
    });

    chatRef.on("value", snap => {
      var items = [];
      mediaGallery = [];
      var dataBlock;
      let i = 0;
      snap.forEach(child => {
        lastChat = child.val().createdAt;
        dataBlock = child.val().blockedByFriend;
        if (lastChat > keys) {
          if (this.state.blockedByMe && dataBlock) {

          } else {
            var avatar = friendAvatar;
            
            if(child.val().uid == this.user.uid) {
              avatar = myAvatar;
            }

            var dataItem = {
              key: child.key,
              _id: child.val().createdAt,
              text: child.val().text,
              createdAt: new Date(child.val().createdAt),
              user: {
                _id: child.val().uid,
                name: friendName,
                avatar: avatar
              },
              read: child.val().read,
              image: child.val().image,
              video: child.val().video
            };

            if((child.val().uid != this.user.uid)&&(child.val().read != "1")) {
              this.setMessageRead(dataItem);
            }

            items.push(dataItem);
          }
          if (child.val().image.includes("http"))
            mediaGallery.push({ id: i++, image: child.val().image, video: "" });
          else if (child.val().video.includes("http")) {
            mediaGallery.push({ id: i++, video: child.val().video, image: "" });
          }
        }
      });

      this.setState({
        loading: false,
        messages: items
      });
    });
  }

  setMessageRead(item) {
    firebase.database().ref("Users/FaithMeetsLove/chat/" + this.generateChatId() + '/' + item.key).update({read:"1"});
  }

  backAndroid() {
    this.unMountComponent();
    Actions.chatList();
    return true;
  }

  getMutedbyFriend = () => {
    var alreadyChatMutedUser = firebase.database().ref("Users/FaithMeetsLove/MuteChatNotifications/" + this.state.friendChatId + '/' + this.user.uid);
    alreadyChatMutedUser.once('value').then(snapshot => {
      if (snapshot.exists()) {
        this.setState({
          chatMuted: true
        })
        mutedChat = true
      }

    })
  }

  sendNotification = (text) => {
    var key =
      "AAAAWvYJveM:APA91bH0GyTfgtn07tryKn4uTb-_VFlm1oODrfmtVdWyDHxfEZwO_GneT71SXjQ6Jh69-j2XKqFBXepdPgxkZKK7Mj_oDqWN7eSY-IuztW0x8PG8KJPKiS2MFh6oRwMK74ReHjfHB7sLh_QlNznducxSIjf4awstIQ";
    var notification = {

      title: chatUserName,
      body: text,

      icon: "firebase-logo.png",
      sound: "default",
      priority: "high",
      color: "red",
      vibrate: 1000,
      lights: true,
      show_in_foreground: true
    };
    if (this.state.chatMuted) {

    } else {
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "key=" + key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          notification: notification,
          to: friendToken,
          data: {
            id: this.user.uid,
            name: chatUserName
          }

        })
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert(error);
        });
    }

  }

  // async onSend(messages = []) {
  onSend(messages = []) {
    if (this.state.friendChatId==undefined) {
      alert("wait or open again");
    } else { 
      //alert(this.state.friendChatId);

      if (this.state.blockedByMe == true) {
        alert("user blocked");
      } else {

        if (this.state.imagePath != "" || this.state.videoPath != ""){

          milliseconds = new Date().getTime();
          // Prepare Blob support
          
          if (isImageUpload) {
            this.setState(
              {
                filePath: this.state.imagePath,
                imagePath: "",
                isUploading: true
              },
              () => {
                let fileUri = decodeURI(this.state.filePath)
                var milliseconds = new Date().getTime();
                firebase
                  .storage()
                  .ref(dirName + this.user.uid + milliseconds + format)
                  .putFile(fileUri)
                  .then(uploadedFile => {
                    this.setState({
                      file_url: uploadedFile.downloadURL,
                      imagePath: "",
                      imagedata: "",
                      videoPath: "",
                      filePath: "",
                      isMediaLoaded: false,
                      isUploading: false
                    });
                    var imageUrl = "";
                    var VideoUrl = "";
                    if (isImageUpload) {
                      imageUrl = uploadedFile.downloadURL;
                    } else {
                      VideoUrl = uploadedFile.downloadURL;
                    }
                    messages.forEach(message => {
                      var now = new Date().getTime();
                      this.sendNotification(message.text);
                      this.chatRef.push({
                        _id: now,
                        text: message.text,
                        image: imageUrl,
                        video: VideoUrl,
                        createdAt: now,
                        uid: this.user.uid,
                        fuid: friendUid,
                        blockedByMe: this.state.blockedByMe,
                        blockedByFriend: this.state.blockedByFriend,
                        fName: friendName,
                        order: -1 * now
                      });
                    });
                  });

              }
            );
          } else {
            this.setState(
              {
                filePath: this.state.videoPath,
                isUploading: true
              },
              () => {
                let fileUri = decodeURI(this.state.filePath)
                var milliseconds = new Date().getTime();

                // this.uploadMedia(
                //   this.state.filePath,
                //   this.user.uid,
                //   type,
                //   format,
                //   dirName,
                //   fs
                // )
                
                firebase
                  .storage()
                  .ref(dirName + this.user.uid + milliseconds + format)
                  .putFile(fileUri)
                  .then(uploadedFile => {

                    this.setState({
                      file_url: uploadedFile.downloadURL,
                      imagePath: "",
                      videoPath: "",
                      filePath: "",
                      isMediaLoaded: false,
                      isUploading: false
                    });
                    var imageUrl = "";
                    var VideoUrl = "";
                    if (isImageUpload) {
                      imageUrl = uploadedFile.downloadURL;
                    } else {
                      VideoUrl = uploadedFile.downloadURL;
                    }
                    // window.XMLHttpRequest = originalXMLHttpRequest;
                    messages.forEach(message => {
                      var now = new Date().getTime();
                      this.sendNotification(message.text);
                      this.chatRef.push({
                        _id: now,
                        text: message.text,
                        image: imageUrl,
                        video: VideoUrl,
                        createdAt: now,
                        blockedByMe: this.state.blockedByMe,
                        blockedByFriend: this.state.blockedByFriend,
                        uid: this.user.uid,
                        fuid: friendUid,
                        fName: friendName,
                        order: -1 * now
                      });
                    });
                  })
                  .catch(error => {
                    alert(JSON.stringify(error));
                    console.warn(error);
                  });
              }
            );
          }
        } else {
          // window.XMLHttpRequest = originalXMLHttpRequest;
          messages.forEach(message => {
            if(message.text.trim() == "") {
              return;
            }
            this.sendNotification(message.text);
            var now = new Date().getTime();
            this.chatRef.push({
              _id: now,
              text: message.text,
              image: "",
              video: "",
              createdAt: now,
              uid: this.user.uid,
              fuid: friendUid,
              blockedByMe: this.state.blockedByMe,
              blockedByFriend: this.state.blockedByFriend,
              fName: friendName,
              order: -1 * now,
              read: 0
            });
          });
        }
      }
    }
  }

  // sendMessage(messages = []) { }
  // async uploadMedia(uri, uid, mime, format, dirName, fs) {
  //   this.setState({ ...this.state, progressVisible: true });
  //   return new Promise((resolve, reject) => {
  //     const uploadUri =
  //       Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  //     let uploadBlob = null;
  //     const imageRef = firebase
  //       .storage()
  //       .ref(dirName + uid)
  //       .child(milliseconds + format);

  //     fs.readFile(uploadUri, "base64")
  //       .then(data => {
  //         return Blob.build(data, { type: `${mime};BASE64` });
  //       })
  //       .then(blob => {
  //         uploadBlob = blob;
  //         return imageRef.put(blob, { contentType: mime });
  //       })
  //       .then(() => {
  //         uploadBlob.close();
  //         return imageRef.getDownloadURL();
  //       })
  //       .then(url => {
  //         resolve(url);
  //       
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }

  onChatMessageLongPressed(context, message) {
    if (message.video.includes("http"))
      this.setState({
        dialogPlayVisible: true,
        dialogVisible: false,
        messageKey: message.key,
        messageVideoUrl: message.video,
        messageImageUrl: message.image,
        messageText: message.text
      });
    else
      this.setState({
        dialogVisible: true,
        dialogPlayVisible: false,
        messageKey: message.key,
        messageVideoUrl: message.video,
        messageImageUrl: message.image,
        messageText: message.text
      });
  }

  showFriendProfile() {
    //alert(friendUid)
    AsyncStorage.setItem("userProfileKeys", "" + this.state.friendChatId);
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
                imagedata: image.data,
                isMediaLoaded: true
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
                imagePath: "",
                isMediaLoaded: true
              });
            })
            .catch(err => {
              console.log(err);
            });
        }, 500);
      }
    } else if (val === "cam") {
      Actions.fullScreenCamera();
    } else if (val === "gallery") {
      //AsyncStorage.setItem('imageArray',galleryView)
      AsyncStorage.setItem("imageArray", JSON.stringify(mediaGallery))
        .then(json => Actions.galleryView({ text1: "Hello World" }))
        .catch(error => alert(error));
    }
  }

  handleBlock() {
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
    setTimeout(() => {
      Alert.alert(
        "Block!",
        "Are you sure you want to block " + this.state.friendProfileName + " ?",
        [
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
        ]
      );
    }, 400);
  }

  blockFriend() {
    firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/BlockedFriends/" + this.user.uid + "/" + this.state.friendChatId
      )
      .set({
        blockedFromChat: true
      })
      .then(() => { this.listenForItems(this.chatRefData); });
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

  handleForward() {
    this.unMountComponent();
    this.setState({ dialogVisible: false, dialogPlayVisible: false });
    AsyncStorage.setItem("newChatMessage", "false");
    AsyncStorage.setItem("messageText", this.state.messageText);
    AsyncStorage.setItem("messageImage", this.state.messageImageUrl);
    AsyncStorage.setItem("messageVideo", this.state.messageVideoUrl);
    Actions.chatList();
    // firebase
    //   .database()
    //   .ref(
    //     "Users/FaithMeetsLove/chat/" +
    //     this.generateChatId() +
    //     "/" +
    //     this.state.messageKey
    //   )
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
                this.setState({
                  imagePath: image.path,
                  videoPath: "",
                  imagedata: image.data,
                  isMediaLoaded: true
                });
                this.androidGoInImmersive();
              })
              .catch(error => {
                this.setState({ ...this.state, progressVisible: false });
                console.warn('error on pick: ', error);
                this.androidGoInImmersive();
              });
          }, 500);
          this.setState({
            isImage: true
          });
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
                  imagePath: "",
                  isMediaLoaded: true
                });
                this.androidGoInImmersive();
              })
              .catch(err => {
                console.log(err);
                this.androidGoInImmersive();
              });
          }, 500);
          this.setState({
            isImage: false
          });
        }
      } else {
        alert(
          "Permissions are not granted. The application may not work properly"
        );
        this.androidGoInImmersive();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  onDeleteConversation = () => {
    setTimeout(() => {
      Alert.alert(
        "Delete Chat!",
        "Are you sure you want to Delete conversation with " +
        this.state.friendProfileName +
        " ?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              this.onDeleteUserChat(this.state.friendChatId);
            }
          }
        ]
      );
    }, 400);
  };
  // onClickBlock = () => {

  //   setTimeout(() => {
  //     Alert.alert("Block!", "Are you sure you want to block " + friendName + " ?", [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Yes",
  //         onPress: () => {
  //          // this.getBlockChatHistory(friendUid);
  //           this.blockFriend();
  //         }
  //       }
  //     ]);
  //   }, 400);
  // }
  onMuteChat = () => {
    setTimeout(() => {
      Alert.alert("Mute Chta!", "Are you sure you want to mute this user " + this.state.friendProfileName + " ?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            var muteChat = firebase
              .database()
              .ref("Users/FaithMeetsLove/MuteChatNotifications/" + this.user.uid + '/' + this.state.friendChatId);
            muteChat.set({ isMuted: true }).then(msg => {

            })
          }
        }
      ]);
    }, 400);

  }

  onDeleteUserChat = friendUid => {
    var key;
    var uid;
    var fuid;
    var createdAt;
    var frndId = friendUid;
    var chatRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/chat/" + this.generateChatId(friendUid));
    chatRef
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.val()._id;
          uid = childSnapshot.val().uid;
          fuid = childSnapshot.val().fuid;
          createdAt = childSnapshot.val().createdAt;
        });
        this.saveChat(key, uid, fuid, createdAt, frndId);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  saveChat = (key, uid, fuid, createdAt, frndId) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/ChatUser/" + this.user.uid)
      .push({
        _id: frndId,
        fUid: fuid,
        Uid: uid,
        CreatedAt: createdAt
      })
      .then(ref => {
        this.componentDidMount();
      })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        videoProps={{
          paused: Platform.OS === "ios" ? true : false,
          muted: Platform.OS === "ios" ? false : true,
          controls: true
        }}
      />
    );
  }

  renderTime(props) {
    var isReaded = false;
    if((props.currentMessage.user._id == this.user.uid)&&(props.currentMessage.read == "1")) {
      isReaded = true;
    }
    return(
      <View style={{flexDirection: 'row'}}>
        <Time {...props} />
        {isReaded ?
          <Text>{"√"}</Text>
        : null }
      </View>
    );
  } 

  // renderTime(props) {
  //   if (props.currentMessage && props.currentMessage.createdAt) {
  //     const {
  //       containerStyle,
  //       wrapperStyle,
  //       textStyle,
  //       ...timeProps
  //     } = props;
  //     if (props.renderTime) {
  //       return props.renderTime(timeProps)
  //     }
  //     return <Time {...timeProps} />
  //   }
  //   return null
  // }

  onDeleteVideoAndImage() {
    this.setState({
      isMediaLoaded: false,
      imagePath: "",
      videoPath: "",
      imagedata: ""
    });
  }

  setCustomText(value) {
    this.setState({
      text: value
    });
  }

  showActions() {
    // if(Platform.OS == 'ios') {
    //   ActionSheetIOS.showActionSheetWithOptions(
    //     {
    //       options: MEDIA_BUTTONS,
    //       destructiveButtonIndex: DESTRUCTIVE_INDEX,
    //       cancelButtonIndex: CANCEL_INDEX,
    //     },
    //     (buttonIndex) => {
    //       if (buttonIndex === 1) {
    //         /* destructive action */
    //       }
    //     },
    //   );
    //   return;
    // }
    ActionSheet.showActionSheetWithOptions({
      options: MEDIA_BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'blue'
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.openAction("img");
          break;
        case 1:
          this.openAction("video");
          break;
        case 2:
          this.openAction("cam");
          break;
        case 3:
          this.openAction("gallery");
          break;
        default:
          this.androidGoInImmersive();
          break;
      }
    });
  }

  androidGoInImmersive() {
    if(Platform.OS == 'android') {
      Immersive.setImmersive(true);
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <MenuProvider>
          <View
            style={{
              height: hp(9),
              width: Screen.width,
              ...ifIphoneX({ height: hp(11) }),
              backgroundColor: "red"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                ...ifIphoneX({ marginTop: 30 })
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.unMountComponent();
                      Actions.chatList();
                    }}
                  >
                    <Image
                      source={Images.arrowBackIcon}
                      style={styles.imageArrowBack}
                    />
                  </TouchableOpacity>
                </View>
                {/* <View style={{backgroundColor: 'blue', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => { this.showFriendProfile() }}>
                    <Text style={styles.friendProfileViewShow}>{this.state.friendProfileName}</Text>
                  </TouchableOpacity>
                </View> */}
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => { this.showFriendProfile() }}>
                    <Text style={styles.friendProfileViewShow}>{this.state.friendProfileName}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{justifyContent: 'center'}}>
                <Menu>
                  <MenuTrigger>
                    <Image
                      source={Images.iconThreeDots}
                      style={styles.imageTriggerView}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption
                      onSelect={() => {
                        this.onDeleteConversation();
                      }}
                    >
                      <Text style={styles.menuChatRed}>Delete Chat</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => {
                        this.openAction("gallery");
                      }}
                    >
                      <Text style={styles.menuChatNormal}>View gallery</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => { this.handleBlock() }}>
                      <Text style={styles.menuChatNormal}>Block</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => { }}>
                      <Text style={styles.menuChatNormal}>Report</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => { this.onMuteChat() }}>
                      <Text style={styles.menuChatNormal}>Mute Chat</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>

          <View
            style={styles.gifetedChatView}
          >
            <GiftedChat
              // text={this.state.text}
              // onInputTextChanged={text => this.setCustomText(text)}
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: this.user.uid
              }}
              isAnimated
              showAvatarForEveryMessage
              renderAvatarOnTop={true}
              onLongPress={(context, message) => {
                this.onChatMessageLongPressed(context, message);
              }}
              alwaysShowSend={true}
              renderActions={() => {
                  return(
                    <TouchableOpacity
                        testID='send'
                        accessible
                        accessibilityLabel='send'
                        style={styles.containerSend}
                        onPress={() =>this.showActions()}
                        accessibilityTraits='button'
                      >
                        <View>
                          <Image
                            source={Images.addIcon}
                            style={styles.imagePlusButton}
                          />
                        </View>
                      </TouchableOpacity>
                  );
                }}
              // renderSend={(props) => {
              //   console.warn('props: ', props);
              //   console.warn('lenght: ', props.messages.length);
              //   return(
              //     <TouchableOpacity
              //         testID='send'
              //         accessible
              //         accessibilityLabel='send'
              //         style={styles.containerSend}
              //         onPress={() => props.onSend(props.text)}
              //         accessibilityTraits='button'
              //       >
              //         <View>
              //           <Text style={styles.textSend}>{"Send"}</Text>
              //         </View>
              //       </TouchableOpacity>
              //   );
              // }}
              renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
              renderBubble={this.renderBubble}
              renderTime={(timeProps) => this.renderTime(timeProps)}
              onPressAvatar={message => {
                this.showFriendProfile();
              }}
            />
            {this.state.isMediaLoaded ?
              <View style={styles.mediaView}>
                {this.state.imagedata != "" ?
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 1}}>
                    <TouchableOpacity
                          onPress={() => {
                            this.onDeleteVideoAndImage();
                          }}
                        style={styles.btnImageDelete}
                      >
                        <Image style={{width: 50, height: 50}} source={Images.deleteIcon} />
                    </TouchableOpacity>
                    <Image
                      source={{uri: `data:image/jpg;base64,${this.state.imagedata}`}}
                      resizeMode={"contain"}
                      style={{width: wp(30), height: hp(20)}}
                    />
                  </View>
                  : null }
                  {this.state.videoPath != "" ?
                    <View style={{flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 1}}>
                      <TouchableOpacity
                            onPress={() => {
                              this.onDeleteVideoAndImage();
                            }}
                          style={styles.btnVideoDelete}
                        >
                          <Image style={{width: 50, height: 50}} source={Images.deleteIcon} />
                      </TouchableOpacity>
                      <View style={{flex: 1, height: '100%', width: '65%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 1}}>
                        <Video source={{uri: this.state.videoPath}}
                          controls={true}
                          fullscreen={true}
                          ref={(ref) => {
                            this.player = ref
                          }}
                          style={styles.backgroundVideo} 
                        />
                      </View>
                    </View>
                  : null }
              </View>
            : null }
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
              label="Delete"
              onPress={() => {
                this.handleDeleteMessage();
              }}
            />
            <Dialog.Button
              label="Forward"
              onPress={() => {
                this.handleForward();
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
              label="Delete"
              onPress={() => {
                this.handleDeleteMessage();
              }}
            />
            <Dialog.Button
              label="Forward"
              onPress={() => {
                this.handleForward();
              }}
            />

            <Dialog.Button
              label="Play Video"
              onPress={() => {
                this.handleVideo();
              }}
            />
          </Dialog.Container>
          {/* <View
            style={styles.bottomView}
          /> */}
          {/* <View style={styles.positionViewBottom}>
            <TouchableOpacity
              onPress={() => {
                this.openAction("img");
              }}
            >
              <Image style={styles.btnImage} source={Images.IconImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openAction("cam");
              }}
            >
              <Image style={styles.btnImage} source={Images.IconCamera} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openAction("video");
              }}
            >
              <Image style={styles.btnImage} source={Images.IconVideo} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.openAction("gallery");
              }}
            >
              <Image style={styles.btnImage} source={Images.viewGallery} />
            </TouchableOpacity>
          </View> */}
          {this.state.isUploading ?
            <View style={{backgroundColor: "rgba(245,245,245, 0.4)", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          : null}
          </MenuProvider>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column"
  },
  imageArrowBack:{
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 5,
    tintColor: "white"
  },
  imagePlusButton:{
    height: wp(7),
    width: wp(7),
    marginTop: hp(1),
    marginLeft: hp(1),
    // tintColor: "white"
  },
  friendProfileViewShow:{
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
    marginLeft: 8,
    color: "white"
  },
  mediaView: {
    height: hp(20),
    textAlign: 'center',
    justifyContent: 'center', 
    alignContent: 'center'
  },
  bottomView:{
    ...ifIphoneX({ bottom: 60 }, { bottom: 40 }),
    position: "absolute",
    width: Screen.width,
    height: 1
  },
  imageTriggerView:{
    height: 30,
    width: 30,
    marginTop: 8,
    tintColor: "white"
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
  btnImageDelete: {
    position: 'absolute',
    zIndex: 100,
    top: hp(5),
    right: wp(10),
    // alignSelf: "flex-end",
    width: 50,
    height: 50
  },
  btnVideoDelete: {
    position: 'absolute',
    zIndex: 100,
    top: hp(5),
    right: wp(2),
    // alignSelf: "flex-end",
    width: 50,
    height: 50
  },
  btnImage: {
    alignSelf: "stretch",
    alignItems: "stretch",
    width: 20,
    height: 20,
    marginLeft: "15%"
  },
  gifetedChatView:{
    ...ifIphoneX({ bottom: hp(5) }, { bottom: 1 }),
    ...ifIphoneX({ top: hp(11) }, { top: hp(9) }),
    position: "absolute",
    width: Screen.width - 2,
    marginLeft: 2,
    // ...ifIphoneX(
    //   { height: Screen.height - hp(15) },
    //   { height: Screen.height - hp(3) }
    // )
  },
  containerSend: {
    height: 44,
    // justifyContent: 'flex-end',
  },
  textSend: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  menuChatRed: {
    color: "red", 
    fontSize: wp(5),
    marginTop: hp(1),
    marginBottom: hp(1)
  },
  menuChatNormal: {
    color: "black", 
    fontSize: wp(5),
    marginTop: hp(1),
    marginBottom: hp(1)
  }
});
