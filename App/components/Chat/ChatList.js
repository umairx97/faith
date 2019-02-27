import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import { MenuProvider } from 'react-native-popup-menu';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Dialog from "react-native-dialog";
import { Images } from "../../../assets/imageAll";

var arr = [];
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
        this.getFriendsChatList(frndKey);
      }
    });
  }
  generateChatId(frndKey) {
    if (this.state.loginUserId > frndKey)
      return `${this.state.loginUserId}-${frndKey}`;
    else return `${frndKey}-${this.state.loginUserId}`;
  }
  getFriendsChatList(key) {
    arr = [];

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
        if (this.state.loginUserId != key) {

          arr.push({
            pName: userName,
            pUrl: childData,
            ids: key,
            age: getAge,
            gender: genderName
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
  
  // getChatList = () => {
  //   var allUserProfile = firebase
  //     .database()
  //     .ref("Users/FaithMeetsLove/MatchedProfiles/" + this.state.loginUserId);
  //   allUserProfile
  //     .once("value")
  //     .then(snapshot => {
  //       snapshot.forEach(childSnapshot => {
  //         key = childSnapshot.val().friendUid;
  //       });
  //     })
  //     .catch(error => {
  //       console.log(JSON.stringify(error));
  //     });
  // }

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
        arr.splice(index,1)
        this.setState({
          showArr:arr
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
    if (this.state.showArr === undefined || this.state.showArr.length == 0 ) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please select user from match list</Text></View>)

    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...ifIphoneX({ marginTop: 30 }, { marginTop: 0 }),
              ...ifIphoneX({ marginBottom: 30 }, { marginBottom: 0 })
            }}
          >

            <FlatList
              data={this.state.showArr}
              renderItem={({ item,index }) => (

                <MenuProvider>
                  <View style={{ margin: 5, flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                    <TouchableOpacity
                      onPress={() => {
                        this.onClickUser(item.ids, item.pName);
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View>

                          <Image
                            style={{
                              height: 80,
                              width: 80,
                              margin: 3,
                              resizeMode: "cover",
                              borderRadius: 40
                            }}
                            source={{ uri: item.pUrl }}
                          />
                        </View>
                        <View >
                          <View>
                            <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}>
                              {item.pName}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ fontSize: 12, marginLeft: 10 }}>
                              {item.gender}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ fontSize: 12, marginLeft: 10 }}>
                              {item.age}
                            </Text>
                          </View>
                        </View>

                      </View>
                    </TouchableOpacity>
                    <View>
                      <Menu>
                        <MenuTrigger>
                          <Image source={Images.iconThreeDots} styles={{ height: 80, width: 80, resizeMode: 'cover' }} />
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
