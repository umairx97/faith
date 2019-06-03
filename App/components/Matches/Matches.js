import React, { Component, Fragment } from "react";
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
  TouchableHighlight,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import GridView from "react-native-super-grid";
import firebase from "react-native-firebase";
import LinearGradient from "react-native-linear-gradient";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
      loading: true,
      showArr: [],
      allData: [],
      FullName: "",
      ImageProfileUrl: "",
      Gender: 0
    };
    // this.getCurrentUserId();
  }

  componentDidMount() {
    // var jeck =await  AsyncStorage.getItem("userProfileKeys");
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      arr = [];
      this.setState({
        loading: true,
        showArr: [],
        allData: [],
        FullName: "",
        ImageProfileUrl: "",
        Gender: 0
      }, () => {
        this.getCurrentUserId();
      });
    });

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
          // test
          // arr.push({
          //   pName: userName,
          //   pUrl: childData,
          //   ids: userProfileId,
          //   age: getAge,
          //   gender: genderName
          // });
          // arr.push({
          //   pName: userName,
          //   pUrl: childData,
          //   ids: userProfileId,
          //   age: getAge,
          //   gender: genderName
          // });
        }

        this.setState({ showArr: arr, loading: false });
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
        {/* <View
          style={{
            flex: 1,
            ...ifIphoneX({ marginTop: 25 }, { marginTop: 0 }),
            ...ifIphoneX({ marginBottom: 25 }, { marginBottom: 0 })
          }}
        > */}
          {/* <FlatList
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
                </View>
              </View>
            )}
            keyExtractor={item => item.ids}
          /> */}
          <ScrollView contentContainerStyle={{flex: 1}}>
            {this.state.loading ?
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            :
            <Fragment>
              {this.state.showArr.length == 0 ?
                <View style={{flex: 1}}>
                  <NoDataComponent text={"You have no matches yet"} onPress={() => Actions.Discover()}/>
                </View>
              : 
                <GridView
                  itemDimension={130}
                  items={this.state.showArr}
                  style={styles.gridView}
                  renderItem={({ item, index }) => (
                    <View
                      style={[styles.itemContainer]}
                    >
                      <TouchableOpacity onPress={()=>{this.openProfile(item.ids)}}>
                        <Image source={{ uri: item.pUrl }}
                          style={[styles.imageContainer]}
                        ></Image>
                        <TouchableOpacity style={styles.openChatButton}
                          onPress={() => { this.openChatScreen(item.ids, item.pName) }}>
                          <Image style={styles.iconStyle} source={Images.chatIcons}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.openProfileIcon}
                          onPress={() => { this.openProfile(item.ids) }}>
                          <Image style={styles.iconStyle} source={Images.eyeIcon}></Image>
                        </TouchableOpacity>
                        <View style={styles.itemViewText}>
                            <Text style={{ fontSize: 15, marginTop:5, fontWeight: 'bold', color: 'white'}}>{item.pName}</Text><Text style={{ fontWeight: 'bold',marginTop:5, fontSize: 15, color: 'white' }}>,</Text>
                            <Text style={{ fontSize: 15, marginTop:5,fontWeight: 'bold', color: 'white'}}> {item.age}</Text>
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
        {/* {this.state.showArr.length == 0 ?
          <NoDataComponent text={"You have no matches yet"} onPress={() => Actions.Discover()}/>
        : null} */}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorPrimaryViewLinearGradient: {
    height: Screen.height
  },
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
    // right: wp(30),
    left: wp(4),
    bottom: hp(4),
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
    right: wp(4),
    bottom: hp(4),
    height: 32,
    width: 32,
    backgroundColor: 'red',
    borderRadius: 16,
    justifyContent: 'center'
  },
  gridView: {
    paddingTop: Platform.OS === "ios" ? hp(5) : hp(5),
    ...ifIphoneX({ paddingTop: hp(10) }),
    flex: 1
  },
  itemContainer: {
    // justifyContent: "flex-end",
    borderRadius: 15,
    padding: 5,
    height: hp(30)
  },
  imageContainer: {
    justifyContent: "flex-end",
    borderRadius: 15,
    padding: 10,
    height: hp(30)
  },
  itemViewText: {
    position: 'absolute',
    top: hp(26),
    width: wp(45),
    flexDirection: 'row',
    justifyContent:'center'
  },
})