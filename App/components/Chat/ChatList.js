import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";

var arr = [];
export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      showArr: [],
      allData: [],
      FullName: "",
      ImageProfileUrl: "",
      Gender: 0
    };
    this.getCurrentUserId();
    // this.getLikedProfile();
    this.getAllUser();
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  backAndroid() {
    Actions.pop(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  getAllUser = async () => {
    arr = [];
    instance = this;
    var allUserProfile = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered");
    var key;
    allUserProfile
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.key;
          this.getChatRef(key);
        });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    // this.setState({ allData: this.state.showArr});
  };
  getFriendsChatList(key) {
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
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }
  userAgeShow = dob => {
    var userAge = dob;
    //alert(userAge)
    var date = userAge.split("-")[0];
    var month = userAge.split("-")[1];
    var year = userAge.split("-")[2];

    var ageFull = this.calculate_age(month, date, year);
    return ageFull;
    // this.setState({
    //   totalAge: ageFull
    // })
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
  };
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
  onClickUser = (id, name) => {
    AsyncStorage.setItem("friendsUid", "" + id);
    AsyncStorage.setItem("friendName", name);
    Actions.chat();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            ...ifIphoneX({ marginTop: 25 }, { marginTop: 0 }),
            ...ifIphoneX({ marginBottom: 25 }, { marginBottom: 0 })
          }}
        >
          <FlatList
            data={this.state.showArr}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
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
                    <View style={{ flexDirection: "column", marginTop: 15 }}>
                      <View>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>
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
              </View>
            )}
            keyExtractor={item => item.ids}
          />
        </View>
      </View>
    );
  }
}
