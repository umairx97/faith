import React, { Component } from "react";
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  Image
} from "react-native";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { Actions } from "react-native-router-flux";
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
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.val().friendUid;
          alert(key)
          this.getUserDetail(key);
          //   userProfileId = childSnapshot.key;
          //   var childData = childSnapshot.val().profileImageURL;
          //   var userName = childSnapshot.val().fullName;
          //   varifiedUser = childSnapshot.val().isVarified;
          //   loginUser = childSnapshot.val().isLogin;
          //   userGender = childSnapshot.val().gender;
          //   if (userGender == 0) {
          //     genderName = "Men";
          //   } else {
          //     genderName = "Women";
          //   }
          //   userAge = childSnapshot.val().user_Dob;
          //   var getAge = this.userAgeShow(userAge);
          //   if (this.state.loginUserId != key) {
          //     arr.push({
          //       pName: userName,
          //       pUrl: childData,
          //       ids: userProfileId,
          //       age: getAge,
          //       gender: genderName
          //     });
          //   }
        });
        // this.setState({ showArr: arr });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    // this.setState({ allData: this.state.showArr});
  };
  getUserDetail = async (key) => {
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
    }, () => {
      this.getAllUser();
    });
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.showArr}
          renderItem={({ item }) => (
            <View style={{ margin: 5 }}>
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
            </View>

            //     <ListItem
            //     roundAvatar
            //     title={item.pName}

            //     containerStyle={{ borderBottomWidth: 0 }}
            //    />
          )}
          keyExtractor={item => item.ids}
        />
      </View>
    );
  }
}
