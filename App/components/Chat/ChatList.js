import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import firebase from "react-native-firebase";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import { MenuProvider } from 'react-native-popup-menu';

import Moment from "moment";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Dialog from "react-native-dialog";
import { Images } from "../../../assets/imageAll";

var arr = [];
var chatOpen;
export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      showArr: [],
      allData: [],
      FullName: "",
      ImageProfileUrl: "",
      Gender: 0,
      updateList: false,
      userChatDelted: '',
      countedVal: 0,
      showOut: false,
      isVisible: false
    };

    this.getCurrentUserId();

  }

  async componentDidMount() {
    chatOpen = await AsyncStorage.getItem("newChatMessage");
    // setInterval(() => this.getCurrentUserId(), 2000);
    //setTimeout(  this.getCurrentUserId(), 500);
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    Actions.pop();
    return true;
  }

  getChatRef(frndKey) {
    var chatRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/chat/" + this.generateChatId(frndKey));
    chatRef.once("value").then(snapshot => {
      if (snapshot.exists()) {
        this.getLastChatHistory(frndKey);
      }
    });
  }
  generateChatId(frndKey) {
    if (this.state.loginUserId > frndKey)
      return `${this.state.loginUserId}-${frndKey}`;
    else return `${frndKey}-${this.state.loginUserId}`;
  }
  getFriendsChatList(key, msgText, msgTime) {
    arr = [];
    var msgTrunkated;
    instance = this;
    var friendsProfile = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + key);
    var varifiedUser;
    var userProfileId;
    var loginUser;
    var userGender;
    var userAge;
    var genderName;
    friendsProfile
      .once("value")
      .then(childSnapshot => {
        var userID = childSnapshot.val().uid;
        var childData = childSnapshot.val().profileImageURL;
        var userName = childSnapshot.val().fullName;
        varifiedUser = childSnapshot.val().isVarified;
        loginUser = childSnapshot.val().isLogin;
        userGender = childSnapshot.val().gender;
        if (userGender == 0) {
          genderName = "Men";
        } else {
          genderName = "Women";
        }
        userAge = childSnapshot.val().user_Dob;
        var getAge = this.userAgeShow(userAge);
        var stillUtc = Moment.utc(msgTime).toDate();
        var actualTime = Moment(stillUtc)
          .local()
          .format("DD MMM YYYY h:mm:ss A");
        // var cd = actualTime;
        if (msgText.length > 20) {
          msgTrunkated = msgText.substring(0, 19) + '...';
        }

        else {
          msgTrunkated = msgText;
        }

        if (this.state.loginUserId != key) {

          arr.push({
            pName: userName,
            pUrl: childData,
            ids: key,
            time: actualTime,
            messageText: msgTrunkated
          });
        }
        this.setState({ showArr: arr });
        if (this.state.showArr === undefined || this.state.showArr.length == 0) {
          this.setState({
            isVisible: true
          })
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }
  getAllList = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    var alreadyChatUser = firebase.database().ref("Users/FaithMeetsLove/ChatUserList/" + uidUser);
    arrayKey = [];
    await alreadyChatUser.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        key = childSnapshot.key;
        var x = childSnapshot.val()._show;
        if (x == true) {
          this.getChatRef(key);
        }
      })
    })
    return count;
  }

  userAgeShow = dob => {
    var userAge = dob;
    var date = userAge.split("-")[0];
    var month = userAge.split("-")[1];
    var year = userAge.split("-")[2];
    var ageFull = this.calculate_age(month, date, year);
    return ageFull;
  };

  calculate_age(birth_month, birth_day, birth_year) {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;
    if (today_month < birth_month - 1) {
      age--;
    }
    if (birth_month - 1 == today_month && today_day < birth_day) {
      age--;
    }
    return age;
  }
  getCurrentUserId = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    this.setState({
      loginUserId: uidUser
    });
    //this.getChatList();
    this.getAllList();
  };

  onClickUser = (id, name) => {
    AsyncStorage.setItem("friendsUid", "" + id);
    AsyncStorage.setItem("friendName", name);
    AsyncStorage.setItem("openChatFrom", chatOpen)
    Actions.chat();
  };

  onClickDelete = (id, index) => {
    firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/ChatUserList/" +
        this.state.loginUserId +
        "/" +
        id
      )
      .set({
        _show: false
      })
      .then(ref => {
        arr.splice(index, 1)
        this.setState({
          showArr: arr
        })
      })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
    this.getChatHistory(id);

  }
  getChatHistory = (id) => {
    var key;
    var uid;
    var fuid;
    var createdAt;
    var frndId = id;
    var chatRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/chat/" + this.generateChatId(id));
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

  }
  saveChat = (key, uid, fuid, createdAt, frndId) => {

    firebase
      .database()
      .ref("Users/FaithMeetsLove/ChatUser/" + this.state.loginUserId)
      .push({
        _id: frndId,
        fUid: fuid,
        Uid: uid,
        CreatedAt: createdAt,
      })
      .then(ref => { })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }
  onClickBlock = (id, name) => {
    //alert(id)
    // this.setState({ dialogVisible: false, dialogPlayVisible: false });
    setTimeout(() => {
      Alert.alert("Block!", "Are you sure you want to block " + name + " ?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            this.getBlockChatHistory(id);
            this.blockFriend(id);
          }
        }
      ]);
    }, 400);
  }
  getBlockChatHistory = (id) => {
    var key;
    var uid;
    var fuid;
    var createdAt;
    var frndId = id;
    var chatRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/chat/" + this.generateChatId(id));
    chatRef
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.val()._id;
          uid = childSnapshot.val().uid;
          fuid = childSnapshot.val().fuid;
          createdAt = childSnapshot.val().createdAt;

        });
        this.saveBlockChat(key, uid, fuid, createdAt, frndId);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });

  }

  getLastChatHistory = (id) => {
    var key;
    var uid;
    var fuid;
    var createdAt;
    var frndId = id;
    var chatRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/chat/" + this.generateChatId(id));
    chatRef
      .orderByChild('_id')
      .limitToLast(1)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(element => {
          key = element.key;
          msgText = element.val().text;
          msgTime = element.val().createdAt;
          this.getFriendsChatList(id, msgText, msgTime);

        });


      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });

  }

  saveBlockChat = (key, uid, fuid, createdAt, frndId) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/BlockChatUser/" + this.state.loginUserId)
      .push({
        _id: frndId,
        fUid: fuid,
        Uid: uid,
        CreatedAt: createdAt,
      })
      .then(ref => { })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }
  blockFriend(friendId) {
    firebase.database().ref('Users/FaithMeetsLove/BlockedFriends/' + this.state.loginUserId + '/' + friendId).set({
      blockedFromChat: true
    }).then()

  }
  onClickMarkunread = (id, name) => {
    alert(id)
  }
  render() {
    if (this.state.showArr === undefined || this.state.showArr.length == 0) {
      return (<View style={styles.emptyView}><Text style={styles.emptyText}>Please select user from match list</Text></View>)

    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={styles.mainView}
          >

            <FlatList
              data={this.state.showArr}
              renderItem={({ item, index }) => (

                <MenuProvider>
                  <View style={styles.mainProviderView}>

                    <TouchableOpacity
                      onPress={() => {
                        this.onClickUser(item.ids, item.pName);
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View>

                          <Image
                            style={styles.chatListImage}
                            source={{ uri: item.pUrl }}
                          />
                        </View>
                        <View >
                          <View>
                            <Text style={styles.chatListName}>
                              {item.pName}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.chatListMessage}>
                              {item.messageText}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.chatListTime}>
                              {item.time}
                            </Text>
                          </View>
                        </View>

                      </View>
                    </TouchableOpacity>
                    <View>
                      <Menu>
                        <MenuTrigger>
                          <Image source={Images.iconThreeDots} styles={styles.manupopUp} />
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption onSelect={() => this.onClickDelete(item.ids, index)} >
                            <Text style={{ color: 'red' }}>Delete</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => this.onClickBlock(item.ids, item.pName)}>
                            <Text style={{ color: 'black' }}>Block</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => this.onClickMarkunread(item.ids, item.pName)} text='Mark unread' />
                        </MenuOptions>

                      </Menu>

                    </View>
                  </View>


                </MenuProvider>
              )}
              keyExtractor={item => item.ids}
            />
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold' },
  mainView: {
    ...ifIphoneX({ marginTop: 30 }, { marginTop: 0 }),
    ...ifIphoneX({ marginBottom: 30 }, { marginBottom: 0 })
  },
  mainProviderView: { margin: 5, flexDirection: 'row', flex: 1, justifyContent: 'space-between' },
  chatListImage: {
    height: 80,
    width: 80,
    margin: 3,
    resizeMode: "cover",
    borderRadius: 40
  },
  chatListName: { fontSize: 16, marginLeft: 10, marginTop: 10, fontWeight: '700' },
  chatListMessage: { fontSize: 14, marginLeft: 10, fontWeight: '300' },
  chatListTime: { fontSize: 10, marginLeft: 10 },
 manupopUp:{ height: 80, width: 80, resizeMode: 'cover' },
 
})