import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import GridView from "react-native-super-grid";
import LinearGradient from "react-native-linear-gradient";
import geolib from "geolib";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NoDataComponent } from "../ui/NoData";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// var arr = [];

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export default class NearbyAllUser extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      loginUserId: "",
      userKey: "",
      allArr: [],
      userId: "",
      dateOfBirth: "",
      ageFromShow: 18,
      ageToShow: 75,
      userDistanceShow: 100,
      userGenderShow: 2,
      myLatitude: 0,
      myLongitude: 0
    };
  }

  // async componentWillMount() {
  //   await this.getSearchFilter();
  // }

  async componentDidMount() {
    // this.getAllNearbyUser();
    this.focusListener = this.props.navigation.addListener("didFocus", async () => {
      await this.getSearchFilter();
      this.setState({
        loading: true,
        allArr: []
      }, () => {
        this.getAllNearbyUser();
      });
    });
  }

  async getAllNearbyUser() {
    var uidUser = await firebase.auth().currentUser.uid;
    arrayKey = [];

    var myLat;
    var myLong;
    var myProfileRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + uidUser);
    await myProfileRef.once("value").then(snapshot => {
      myLat = snapshot.val().latitude;
      myLong = snapshot.val().longitude;
      this.setState({ myLatitude: myLat, myLongitude: myLong });
    });
    
    var varifiedUser;
    var key;
    var userProfileId;
    var loginUser;
    var userName;
    var childData;
    var userGender;
    var userAge;
    var friendLatitude;
    var friendLongitude;
    var allNearbyUser = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered");

    allNearbyUser.once("value").then(snapshot => {
      // console.warn('users: ', snapshot);
      snapshot.forEach(childSnapshot => {
        key = childSnapshot.key;
        this.setState({ userId: key });
        userProfileId = childSnapshot.key;
        childData = childSnapshot.val().profileImageURL;
        userName = childSnapshot.val().fullName;
        varifiedUser = childSnapshot.val().isVarified;
        loginUser = childSnapshot.val().isLogin;
        userAge = childSnapshot.val().user_Dob;
        userGender = childSnapshot.val().gender;
        friendLatitude = childSnapshot.val().latitude;
        friendLongitude = childSnapshot.val().longitude;
        
        var getAge = this.userAgeShow(userAge);

        if (uidUser != key) {
          // console.warn('getDistance: ', 'myPos: ' + myLat + ':' + myLong + ' | friendPos: ' + friendLatitude + ':' + friendLongitude);
          let distanceBetweenFriends = 1000000;
          if((friendLatitude != null)&&(friendLongitude != null)) {
            distanceBetweenFriends = geolib.getDistance(
              {
                lat: myLat,
                lon: myLong
              },
              { lat: friendLatitude, lon: friendLongitude }
            );
          }
          
          // console.warn('user: ', 'varifiedUser: ', varifiedUser + ' | ' + 'distance: ', distanceBetweenFriends/1000 + ' | ' + this.state.userDistanceShow + ' | ' + 'age: ', getAge + ' | from: ' + this.state.ageFromShow + ' | to: ' + this.state.ageToShow);
          if (
            varifiedUser == true &&
            getAge >= this.state.ageFromShow &&
            getAge <= this.state.ageToShow &&
            distanceBetweenFriends/1000 <= this.state.userDistanceShow
          ) {
            try {
              if (this.state.userGenderShow == 2) {
                arrayKey.push({
                  id: userProfileId,
                  UserName: userName,
                  ImageURL: childData,
                  fullAge: getAge
                });
              } else if (this.state.userGenderShow == userGender) {
                arrayKey.push({
                  id: userProfileId,
                  UserName: userName,
                  ImageURL: childData,
                  fullAge: getAge
                });
              }
            } catch (error) {
              console.warn('error 3');
            }
          }
        }
      });
      this.setState({
        allArr: arrayKey,
        loading: false
      });
    });
  }

  getSearchFilter = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    instance = this;
    var ageFrom;
    var ageTo;
    var searchDistance;
    var genderShow;
    let snapExist = false;
    var displayUserName = firebase
      .database()
      .ref("Users/FaithMeetsLove/SearchFilters/" + uidUser);
    await displayUserName.once("value", function(snapshot) {
      if (snapshot.exists()) {
        ageFrom = snapshot.val().age_from;
        ageTo = snapshot.val().age_to;
        searchDistance = snapshot.val().distance;
        genderShow = snapshot.val().show_me;
        snapExist = true;
      }
    });
    if (snapExist)
      this.setState({
        ...this.state,
        ageFromShow: ageFrom,
        ageToShow: ageTo,
        userDistanceShow: searchDistance,
        userGenderShow: genderShow
      });
  };

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

  openClickedProfile(usrId) {
    AsyncStorage.setItem("userProfileKeys", usrId);
    setTimeout(() => Actions.userProfile(), 500);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ flex: 1 }}> */}
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
          <ScrollView contentContainerStyle={{flex: 1}}>
          {this.state.loading ?
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            :
              <Fragment>
                  {this.state.allArr.length == 0 ?
                    <View style={{flex: 1}}>
                      <NoDataComponent text={"No users nearby"} onPress={() => Actions.Discover()}/>
                    </View>
                  : 
                    <GridView
                        itemDimension={130}
                        items={this.state.allArr}
                        style={styles.gridView}
                        renderItem={({ item, index }) => (
                          <View style={[styles.itemContainer]}>
                            <TouchableOpacity
                              onPress={() => {
                                this.openClickedProfile(item.id);
                              }}
                            >
                              <Image
                                source={{ uri: item.ImageURL }}
                                style={[styles.imageContainer]}
                              />
                              <View style={styles.itemViewText}>
                                <Text
                                style={styles.listDataText}
                                >
                                  {item.UserName}
                                </Text>
                                <Text
                                style={styles.listDataText}
                                >
                                  {", "}
                                </Text>
                                <Text
                                  style={styles.listDataText}
                                >
                                  {item.fullAge}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                  }
              </Fragment>
            }
          </ScrollView>
        {/* </View> */}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorPrimaryViewLinearGradient: {
    flex: 1,
    height: Screen.height
  },
  gridView: {
    paddingTop: Platform.OS === "ios" ? hp(5) : hp(5),
    ...ifIphoneX({ paddingTop: hp(7) }),
    flex: 1
  },
  itemContainer: {
    // justifyContent: "flex-end",
    borderRadius: 15,
    padding: 5,
    height: hp(30)
  },
  listDataText:{
    fontSize: 15,
    marginTop:5, 
    fontWeight: 'bold', 
    color: 'white'
  },
  imageContainer: {
    justifyContent: "flex-end",
    borderRadius: 15,
    padding: 10,
    // height: hp(30)
    height: Platform.OS == 'android' ? hp(30) : hp(26)
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  itemViewText: {
    position: 'absolute',
    // top: hp(26),
    top: Platform.OS == 'android' ? hp(26) : hp(22.5),
    width: wp(45),
    flexDirection: 'row',
    justifyContent:'center'
  },
  nearbyAllUserView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  contentsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 860
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 83
  },
  bgWhiteView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 812
  },
  barsNavigationNearbyFiltersView: {
    backgroundColor: "rgb(248, 248, 248)",
    height: 145,
    justifyContent: "center"
  },
  tabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 30,
    marginLeft: 16,
    marginTop: 115,
    marginRight: 14
  },
  col18vView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginLeft: 8,
    marginTop: 9
  },
  col18vTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginTop: 9,
    marginRight: 8
  },
  nearbyText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.32,
    marginLeft: 15
  },
  filtersBtnImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 40,
    height: 39,
    marginRight: 15
  },
  filtersView: {
    backgroundColor: "rgb(218, 217, 226)",
    height: 1
  },
  items1View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3Image: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3ImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  augustaCastroText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallView: {
    width: "100%",
    height: "100%"
  },
  oval2Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 8,
    marginRight: 8
  },
  rectangle3TwoImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3TwoImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  videosImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  minaHowellText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallTwoViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallTwoView: {
    width: "100%",
    height: "100%"
  },
  textTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2TwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3ThreeImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3ThreeImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  hettieBarberText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallThreeViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallThreeView: {
    width: "100%",
    height: "100%"
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3FourImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3FourImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  videosTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  susieDelgadoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFourView: {
    width: "100%",
    height: "100%"
  },
  genderAgeSmallFourViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  textFourText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2ThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3FiveImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3FiveImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  corneliaGilbertText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFiveViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8,
    justifyContent: "center"
  },
  genderAgeSmallFiveView: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  oval2FourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 9,
    height: 12,
    marginLeft: 1
  },
  rectangle3View: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 5
  },
  rectangle3TwoView: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 7,
    marginTop: 1
  },
  textFiveText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 5,
    marginRight: 8
  },
  rectangle3SixImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3SixImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  claraMatthewsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallSixViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallSixView: {
    width: "100%",
    height: "100%"
  },
  textSixText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2FiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  allUserText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  spotlightText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 46,
    marginTop: -3
  },
  nearbyTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 3
  },
  newText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 43
  },
  rectangleView: {
    backgroundColor: "rgb(255, 104, 154)",
    width: 60,
    height: 3
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 22,
    marginTop: 12
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 45,
    marginTop: 12
  },
  homeIndicatorOnLightView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 34
  },
  favoriteImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    alignSelf: "center"
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 23
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 45
  },
  rectangle24View: {
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 2.5,
    width: 134,
    height: 5,
    marginTop: 20,
    alignSelf: "center"
  }
});
