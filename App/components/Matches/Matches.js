import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";

import { Images } from "../../../assets/imageAll";
import { NoDataComponent } from "../ui/NoData";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

var arr = [];

export default class Matches extends Component {
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
  }

  async componentDidMount() {
    // var jeck =await  AsyncStorage.getItem("userProfileKeys");
    // alert(jeck)

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
      .ref("Users/FaithMeetsLove/MatchedProfiles/" + this.state.loginUserId);
    var varifiedUser;
    var key;
    var userProfileId;
    var loginUser;
    var userGender;
    var userAge;
    var genderName;
    allUserProfile
      .orderByChild("order")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.val().friendUid;
          this.getUserDetail(key);
          // this.frndList(key);
        });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  frndList = (key) => {
    firebase
      .database()
      .ref(
        "Users/FaithMeetsLove/ChatUserList/" +
        this.state.loginUserId +
        "/" +
        key
      )
      .set({
        _show: true
      })
      .then(ref => { })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }

  getUserDetail = async key => {
    arr = [];
    instance = this;
    var allUserProfile = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + key);
    var varifiedUser;
    var key;
    var userProfileId;
    var loginUser;
    var userGender;
    var userAge;
    var genderName;
    allUserProfile
      .once("value")
      .then(childSnapshot => {
        userProfileId = key;
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
            ids: userProfileId,
            age: getAge,
            gender: genderName
          });
        }

        this.setState({ showArr: arr });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

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
    this.setState(
      {
        loginUserId: uidUser
      },() => {
        this.getAllUser();
      }
    );
  };

  openChatScreen(id, name) {
    this.frndList(id);
    AsyncStorage.setItem("friendsUid", '' + id);
    AsyncStorage.setItem("friendName", name);
    Actions.chat();
  }

  openProfile = (id) => {
    AsyncStorage.setItem("userProfileKeys", "" + id);
    setTimeout(() => Actions.userProfile(), 200);
  }

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

                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity onPress={() => { this.openProfile(item.ids) }}>

                    <ImageBackground
                      style={styles.mainImage}
                      imageStyle={{ borderRadius: 10 }}
                      source={{ uri: item.pUrl }}
                    >
                      <Text style={styles.mainTextStyle}>
                        {item.pName.length > 10
                          ? item.pName.substring(0, 10) + "..."
                          : item.pName}, {item.age} </Text>
                      <TouchableOpacity style={styles.openChatButton}
                        onPress={() => { this.openChatScreen(item.ids, item.pName) }}>

                        <Image style={styles.iconStyle} source={Images.chatIcons}></Image>

                      </TouchableOpacity>
                      <TouchableOpacity style={styles.openProfileIcon}
                        onPress={() => { this.openProfile(item.ids) }}>

                        <Image style={styles.iconStyle} source={Images.eyeIcon}></Image>

                      </TouchableOpacity>
                    </ImageBackground>

                  </TouchableOpacity>
                  {/* <View style={{ flexDirection: "column", marginTop: 15 }}>
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
                   */}
                </View>
                {/* <View style={{ flexDirection: "row" }}>
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
                 */}

              </View>
            )}
            keyExtractor={item => item.ids}
          />
        </View>
        {this.state.showArr.length == 0 ?
          <NoDataComponent text={"You have no matches yet"} onPress={() => Actions.Discover()}/>
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 10, left: 10,
    letterSpacing: 2
  },
  mainImage: {
    height: 200,
    width: Screen.width - 30,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: "cover",

  },
  openChatButton: {
    position: 'absolute',
    right: 80, bottom: 15,
    height: 32,
    width: 32,
    backgroundColor: 'red',
    borderRadius: 16,
    justifyContent: 'center'
  },
  iconStyle: {
    height: 24,
    backgroundColor: 'red',
    width: 24, resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white'
  },
  openProfileIcon: {
    position: 'absolute',
    right: 30,
    bottom: 15,
    height: 32,
    width: 32,
    backgroundColor: 'red',
    borderRadius: 16,
    justifyContent: 'center'
  },
})