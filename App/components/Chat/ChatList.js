import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  Dimensions,
  FlatList,
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Platform
} from "react-native";
import firebase from "react-native-firebase";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import { NoDataComponent } from "../ui/NoData";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Moment from "moment";
import { Immersive } from 'react-native-immersive';
import LinearGradient from "react-native-linear-gradient";
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
//   MenuProvider
// } from 'react-native-popup-menu';
// import Dialog from "react-native-dialog";
// import { Images } from "../../../assets/imageAll";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

var arr = [];
var chatOpen;

export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showArr: [],
      allData: [],
      FullName: "",
      ImageProfileUrl: "",
      Gender: 0,
      updateList: false,
      userChatDelted: '',
      countedVal: 0,
      showOut: false,
      isVisible: false,
      todayDate: Moment()
    };
    // this.getCurrentUserId();
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if(Platform.OS == 'android') {
        Immersive.setImmersive(true);
      }
      arr = [];
      this.setState({
        showArr: [],
        allData: [],
        loading: true
      }, async () => {
        chatOpen = await AsyncStorage.getItem("newChatMessage");
        this.getCurrentUserId();
        // console.warn('chatOpen: ', chatOpen);
        BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());    
      });
    });
    // setInterval(() => this.getCurrentUserId(), 2000);
    //setTimeout(  this.getCurrentUserId(), 500);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
    // this.clearInterval(this.timer);
  }

  backAndroid() {
    Actions.pop();
    return true;
  }

  getChatRef = async (frndKey) => {
    // console.warn('getChatRef: ', frndKey);
    // console.warn('generateChatId:', this.generateChatId(frndKey));
    var chatRef = firebase.database().ref("Users/FaithMeetsLove/chat/" + this.generateChatId(frndKey));

    chatRef.once("value").then(async snapshot => {
        if (snapshot.exists()) {
          // console.warn('getChatRef - snapshot exist: ', snapshot);
          await this.getLastChatHistory(frndKey);
          return;
        }

        // new chat
        var friendsProfile = firebase.database().ref("Users/FaithMeetsLove/Registered/" + frndKey);

        friendsProfile
        .once("value")
        .then(childSnapshot => {
          // var userID = childSnapshot.val().uid;
          var childData = childSnapshot.val().profileImageURL;
          var userName = childSnapshot.val().fullName;
          // varifiedUser = childSnapshot.val().isVarified;
          // loginUser = childSnapshot.val().isLogin;
          // userGender = childSnapshot.val().gender;
          // if (userGender == 0) {
          //   genderName = "Men";
          // } else {
          //   genderName = "Women";
          // }
          // userAge = childSnapshot.val().user_Dob;
          // var getAge = this.userAgeShow(userAge);
          // var stillUtc = Moment.utc(msgTime).toDate();
          // var actualTime = Moment(stillUtc)
          //   .local()
          //   .format("DD MMM YYYY h:mm:ss A");
          // var cd = actualTime;
          // if (msgText.length > 20) {
          //   msgTrunkated = msgText.substring(0, 19) + '...';
          // } else {
          //   msgTrunkated = msgText;
          // }

          // if (this.state.loginUserId != key) {
          //   arr.push({
          //     pName: userName,
          //     pUrl: childData,
          //     ids: key,
          //     time: actualTime,
          //     messageText: msgTrunkated
          //   });
          // }
          // this.setState({ showArr: arr });
          // if (this.state.showArr === undefined || this.state.showArr.length == 0) {
          //   this.setState({
          //     isVisible: true
          //   });
          // }

          var chats = this.state.showArr;
          chats.push({
            pName: userName,
            pUrl: childData,
            ids: frndKey,
            time: '',
            messageText: ''
          });

          console.warn('chat nuova: ', chats);

          this.setState({
            loading: false,
            showArr: chats
          });

        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });

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
        // var userID = childSnapshot.val().uid;
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
        // var getAge = this.userAgeShow(userAge);
        var stillUtc = Moment.utc(msgTime).toDate();
        var actualTime = Moment(stillUtc)
          .local()
          .format("DD MMM YYYY h:mm:ss A");
        // var cd = actualTime;
        if (msgText.length > 20) {
          msgTrunkated = msgText.substring(0, 19) + '...';
        } else {
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
        
        if (this.state.showArr === undefined || this.state.showArr.length == 0) {
          this.setState({
            isVisible: true,
            loading: false,
            showArr: arr
          });
          return;
        }

        console.warn('chats n: ', arr.length);

        arr.sort((a, b) => Moment(b.time).valueOf() - Moment(a.time).valueOf());
        
        this.setState({ showArr: arr, loading: false });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }

  getAllList = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    // console.warn('uidUser: ', uidUser);
    var alreadyChatUser = firebase.database().ref("Users/FaithMeetsLove/ChatUserList/" + uidUser);
    arrayKey = [];
    await alreadyChatUser.once('value').then(snapshot => {
      // console.warn('snapshot test:', snapshot);
      // console.warn('exists: ', snapshot.exists());
      // if((snapshot == null)||(snapshot == "null")||(snapshot == " null")||(snapshot.length == null)) {
      if (!snapshot.exists()) {
        this.setState({
          loading: false
        });
        return;
      }
      snapshot.forEach( async childSnapshot => {
        // console.warn('childSnapshot: ', childSnapshot);
        key = childSnapshot.key;
        var x = childSnapshot.val()._show;
        if (x == true) {
          await this.getChatRef(key);
        }
      });
    });
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
    
    this.getAllList();
    // this.timer = setInterval(() => this.getAllList(), 5000);
  };

  onClickUser = (id, name) => {
    // console.warn('openChat: ', id);
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

  async getLastChatHistory(id) {
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

  /* Riccardo
  * like upwork chat, if the date is today then render the time, otherwise render the date
  */
  renderTime(time) {
    var timeDisplay = '';

    if (this.state.todayDate.isSame(Moment(time), 'd')) {
      timeDisplay = Moment(time).format('h:mm');
    } else {
      timeDisplay = Moment(time).format('MM/DD/YYYY');
    }

    return(
      <Text style={styles.chatListTime2}>
        {timeDisplay}
      </Text>
    );
  }

  render() {
    if(this.state.loading) {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    // if (this.state.showArr === undefined || this.state.showArr.length == 0) {
    //   return (
    //     <View style={styles.emptyView}>
    //       <NoDataComponent text={"No chats here yet"} onPress={() => Actions.Discover()}/>
    //     </View>
    //   )
    // }else {
      return (
        <View style={styles.contentView}>
        {/* <MenuProvider> */}
        <LinearGradient 
          start={{
            x: 0.51,
            y: 0.17
          }}
          end={{
            x: 0.24,
            y: 0.87
          }}
          locations={[0, 1]}
          colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
          style={styles.colorPrimaryViewLinearGradient}
        >
          <View style={styles.header}>
            <View style={{flex: 0.25}}>

            </View>
            <View style={{flex: 0.50, justifyContent: 'center', textAlign: 'center'}}>
              <Text style={{textAlign: 'center', fontSize: wp(8)}}>Messages</Text>
            </View>
            <View style={{flex: 0.25}}>
              
            </View>
          </View>
          <View style={styles.mainView}>
            {this.state.showArr.length == 0 ?
              <View style={styles.emptyView}>
                <NoDataComponent text={"No chats here yet"} onPress={() => Actions.Discover()}/>
              </View>
            :
            <FlatList
              data={this.state.showArr}
              renderItem={({ item, index }) => (
                  <View style={styles.mainProviderView}>
                    <TouchableOpacity
                      style={{flex: 1}}
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
                        <View style={styles.itemChatRight}>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Text style={styles.chatListName}>
                                {item.pName}
                              </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                              {this.renderTime(item.time)}
                            </View>
                          </View>
                          <View>
                            <Text style={styles.chatListMessage}>
                              {item.messageText}
                            </Text>
                          </View>
                          {/* <View>
                            <Text style={styles.chatListTime}>
                              {item.time}
                            </Text>
                          </View> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                    {/* <View style={styles.viewMenu}>
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
                    </View> */}
                  </View>
              )}
              keyExtractor={item => item.ids}
            />
            }
          </View>
          {/* </MenuProvider> */}
          </LinearGradient>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  colorPrimaryViewLinearGradient: {
    height: Screen.height,
    flex: 1
  },
  contentView: {
    flex: 1,
    ...ifIphoneX({ marginTop: hp(3) }, { marginTop: 0 }),
  },
  emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold' },
  mainView: {
    flex: 0.9,
    ...ifIphoneX({ marginTop: hp(2) }, { marginTop: 0 }),
    ...ifIphoneX({ marginBottom: 30 }, { marginBottom: 0 })
  },
  mainProviderView: { 
    // margin: 5,
    marginTop: wp(2),
    marginLeft: wp(3),
    marginRight: wp(3),
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between'
  },
  itemChatRight: {
      flex: 1,
      marginLeft: wp(2),
      paddingBottom: hp(2),
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      borderBottomWidth: 1
  },
  chatListImage: {
    height: wp(13),
    width: wp(13),
    marginLeft: wp(2),
    marginRight: wp(2),
    marginTop: hp(2),
    resizeMode: "cover",
    borderRadius: 25
  },
  chatListName: { 
    fontSize: 16, 
    // marginLeft: 10, 
    marginTop: 10, 
    fontWeight: '700' 
  },
  chatListMessage: { 
    fontSize: 14, 
    // marginLeft: 10, 
    fontWeight: '300' 
  },
  chatListTime: { 
    fontSize: 10, 
    // marginLeft: 10
  },
  manupopUp:{
    height: 100,
    width: 100, 
    // resizeMode: "cover",
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain'
  },
  viewMenu: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(2)
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1
  }
 
})