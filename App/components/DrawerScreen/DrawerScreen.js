//
//  Profile.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  
  Dimensions
} from "react-native";
import React from "react";
import { Images } from "../../../assets/imageAll";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import firebase from "../FirebaseConfig/FirebaseConfig";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { RNCamera } from "react-native-camera";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var count = 0;

export default class DrawerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      profileImageUrl:
        "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    };
    // this.getData();
    this.getUid();
    // this.ref=firebase.firestore().collection("Users")
    // .doc("FaithMeetsLove")
    // .collection("Registered")
  }
  //    getData(){
  // this.allData=this.ref.onSnapshot()
  //   }

  async logout() {
    var v = await AsyncStorage.getItem("checkLoggedType");
    if (v == "firebaseLoggedin") {
      this.signOutGoogle();
    } else if (v == "facebookloggedin") {
      this.signOutFacebook();
      //LoginManager.logOut();
      //Actions.reset("login");
    } else {
      this.signOut();
    }
  }
  //   onVipCenterPressed() {
  //     Actions.vipCenter();
  //   }
  watchID = null;
  async componentDidMount() {
    this.getUid();
    var uidUser = await firebase.auth().currentUser.uid;

    if (Platform.OS === "android") {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      }).then(() => {
        locationTracking(dispatch, getState, geolocationSettings);
      });
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
       firebase.database().ref("Users/FaithMeetsLove/Registered/" + uidUser).update({ latitude: lat, longitude: long }).then(msg=>{
        this.getUid();
       })
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var lastRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ initialPosition: lastRegion });
        this.setState({ markerPosition: lastRegion });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
  }
  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.getUid();
  }
  componentWillReceiveProps() {
    //Actions.refresh("drawer")
    this.getUid();
  }
  getUid = async () => {
    instance = this;
    var fullName;
    var gender;
    var latitude;
    var longitude;
    var email;
    var user_Dob;
    var profileImageURL;
    var uname = await firebase.auth().currentUser.displayName;
    var uidUser = await firebase.auth().currentUser.uid;
    if (uname == null) {
      var displayUserName = firebase
        .database()
        .ref("Users/FaithMeetsLove/Registered/" + uidUser);
    await  displayUserName.once("value", function (snapshot) {
        var usrName = snapshot.val().fullName;
        var ImageUrl = snapshot.val().profileImageURL;
        fullName = snapshot.val().fullName;
        gender = snapshot.val().gender;
        latitude = snapshot.val().latitude;
        longitude = snapshot.val().longitude;
        email = snapshot.val().email;
        user_Dob = snapshot.val().user_Dob;
        profileImageURL = snapshot.val().profileImageURL;

        instance.setState({
          user_name: usrName,
          profileImageUrl: ImageUrl
        });
      });
    AsyncStorage.setItem("reg_user_name", fullName);
    AsyncStorage.setItem("reg_user_gender", "" + gender);
    AsyncStorage.setItem("reg_user_latitude", "" + latitude);
    AsyncStorage.setItem("reg_user_longitude", "" + longitude);
    AsyncStorage.setItem("reg_user_email", email);
    AsyncStorage.setItem("reg_user_dob",  user_Dob);
    AsyncStorage.setItem("reg_user_profileImageURL", profileImageURL);
    } else {
      this.setState({
        user_name: uname.toUpperCase()
      });
    }
  
  };
  _SignoutPress() {
    Alert.alert("Alert!", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => Actions.drawerClose(),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          this.logout();
        }
      }
    ]);
  }
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
      Actions.login();
    } catch (error) {
      console.error(error);
    }
  };
 
  onHomePressed = () => {
    Actions.Discover();
    Actions.drawerClose();
  };
  onChatPressed = () => {
    Actions.chatList();
  };
  signOutGoogle = async () => {
    firebase
      .auth()
      .signOut()
      .then(res => {
        Actions.reset("login");
      });
  };
  signOutFacebook = async () => {
    await LoginManager.logOut();
    await firebase
      .auth()
      .signOut()
      .then(res => {
        Actions.reset("login");
      });
    // const data=await AccessToken.setCurrentAccessToken("akjkshk")
    //  var credential = firebase.auth.FacebookAuthProvider.credential(data.accesToken)
    // const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    //  const firebaseUserCredential = await firebase.auth().signOut();
  };
  onProfileImagerPressed = () => {
    Actions.ProfileCopy();
  };
  onMatchPressed=()=>{
    Actions.matchProfile();
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: "rgb(249, 249, 249)" }}>
        <View style={styles.profileView}>
          <LinearGradient
            start={{
              x: 0.9,
              y: 0.41
            }}
            end={{
              x: -0.04,
              y: 0.62
            }}
            locations={[0, 1]}
            colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
            style={styles.navBarViewLinearGradient}
          >
            <View style={styles.navBarView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              />
            </View>
          </LinearGradient>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <View style={styles.iphoneXBarsTabBar5ItemsView}>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Image
                  source={require("../../../assets/images/profile.png")}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          >
            <View style={styles.accountInforView}>
              <View
                style={{
                  flexDirection: "column",
                  alignSelf: "stretch"
                }}
              >
                <TouchableOpacity onPress={this.onProfileImagerPressed}>
                  <Image
                    source={{ uri: this.state.profileImageUrl }}
                    style={styles.ovalImage}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center"
                  }}
                >
                  <Text style={styles.landonGibsonText}>
                    {this.state.user_name.length > 18
                      ? this.state.user_name.substring(0, 18) + "..."
                      : this.state.user_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              />
            </View>
          </View>
          <View style={styles.panel1View}>
            <View style={styles.likesView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2View}>
                  <Image
                    source={Images.findFriendList}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onHomePressed}>
                  <Text style={styles.likesText}>Home</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image source={Images.shapeArrow} style={styles.shapeImage} />
                </View>
              </View>
            </View>
            <View style={styles.likesView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2View}>
                  <Image
                    source={Images.findFriendList}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={()=>{this.onMatchPressed()}}>
                  <Text style={styles.likesText}>Matches</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image source={Images.shapeArrow} style={styles.shapeImage} />
                </View>
              </View>
            </View>
           
           
            <View style={styles.visitorsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2TwoView}>
                  <Image
                    source={Images.informationCenter}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.visitsText}>Information center</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeTwoImage}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleTwoView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={Images.shapeArrow}
                      style={styles.shapeThreeImage}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.visitorsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2TwoView}>
                  <Image
                    source={Images.visitProfile}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.visitsText}>Visits</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeTwoImage}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleTwoView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={Images.shapeArrow}
                      style={styles.shapeThreeImage}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.visitorsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2TwoView}>
                  <Image
                    source={Images.userGroups}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.visitsText}>Events</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeTwoImage}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleTwoView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={Images.shapeArrow}
                      style={styles.shapeThreeImage}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View style={styles.groupsView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.rectangle2ThreeView}>
                    <Image
                      source={Images.userGroups}
                      style={styles.logoutImage}
                    />
                  </View>
                  <TouchableOpacity onPress={this.onFacebookPressed}>
                    <Text style={styles.groupsText}>Events</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={Images.shapeArrow}
                      style={styles.shapeFourImage}
                    />
                  </View>
                </View>
              </View>
            </View> */}
            <View style={styles.likesView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2View}>
                  <Image source={Images.chatIcons} style={styles.logoutImage} />
                </View>
                <TouchableOpacity onPress={this.onChatPressed}>
                  <Text style={styles.likesText}>Chat</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image source={Images.shapeArrow} style={styles.shapeImage} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.panel2View}>
            <View style={styles.walletView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2FourView}>
                  <Image
                    source={Images.walletIcon}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.myWalletText}>My wallet</Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeFiveImage}
                  />
                </View>
              </View>
            </View>
            <View style={styles.levelView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2FiveView}>
                  <Image source={Images.vipCenter} style={styles.logoutImage} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Actions.vipCenter();
                  }}
                >
                  <Text style={styles.vipCenterText}>VIP center</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeSixImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyFourView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleFiveView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={Images.shapeArrow}
                      style={styles.shapeSevenImage}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.friendsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SixView}>
                  <Image
                    source={Images.findFriendList}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.findFriendsText}>Expert Help</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeNineImage}
                  />
                </View>
              </View>
            </View>
            <View style={styles.blacklistView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SevenView}>
                  <Image source={Images.blacklist} style={styles.logoutImage} />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.blacklistText}>Blacklist</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeNineImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>
            <View style={styles.blacklistView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SevenView}>
                  <Image
                    source={Images.shareIcons}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.blacklistText}>Share App</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeNineImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>

            <View style={styles.blacklistView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SevenView}>
                  <Image
                    source={Images.settingsApp}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onSettingPressed}>
                  <Text style={styles.blacklistText}>Settings</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={Images.shapeArrow}
                    style={styles.shapeNineImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopySixView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View style={styles.settingsView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch"
                  }}
                >
                  <View style={styles.rectangle2EightView}>
                    <Image
                      source={Images.shuticon}
                      style={styles.logoutImage}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this._SignoutPress();
                    }}
                  >
                    <Text style={styles.LogText}>LogOut</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: "rgb(249, 249, 249)",
    flex: 1
  },

  navBarViewLinearGradient: {
    height: 100,
    ...ifIphoneX({ height: 110 })
  },
  navBarView: {
    width: "100%",
    height: "100%"
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 75,
    ...ifIphoneX({ height: 85 })
  },
  accountInforView: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    height: 140,
    ...ifIphoneX({ height: 150 }),
    marginLeft: 18,
    marginTop: 20,
    ...ifIphoneX({ marginTop: 30 }),
    marginRight: 16
  },
  panel1View: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    height: 270,
    marginLeft: 19,
    marginTop: 1,
    marginRight: 15
  },
  panel2View: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 17,
    marginLeft: 17,
    marginTop: 15,
    marginRight: 16
  },
  likesView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,

    marginTop: Platform.OS === "ios" ? 9 : 9,
    marginRight: 1
  },
  visitorsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,

    marginTop: Platform.OS === "ios" ? 9 : 9,
    marginRight: 1
  },
  groupsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 22,
    marginLeft: 14,
    marginRight: 18,
    marginBottom: 14,
    marginTop: Platform.OS === "ios" ? 10 : 10,
    justifyContent: "center"
  },
  rectangle2View: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 14
  },
  likesText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12,
    marginTop: 3
  },
  shapeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 17,
    marginTop: 3
  },
  rectangleView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  colorWhiteView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 0
  },
  colorWhiteTwoView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 0
  },
  rectangle2TwoView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 14
  },
  visitsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12,
    marginTop: 3
  },
  shapeTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 17,
    marginTop: 3
  },
  rectangleTwoView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  shapeThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2ThreeView: {
    borderRadius: 8,
    width: 22,
    height: 22
  },
  groupsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12
  },
  shapeFourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12
  },
  iconsLikeCopyTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 3
  },
  rectangleThreeView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  groupsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  logoutImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    alignSelf: "center",
    width: 15,

    height: 15
  },
  walletView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,
    marginLeft: 1,
    marginTop: 9,
    marginRight: 1
  },
  levelView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,
    marginLeft: 1,
    marginTop: 9,
    marginRight: 1
  },
  friendsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,
    marginTop: 9,
    marginRight: 1
  },
  blacklistView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 36,
    marginTop: 10,
    marginRight: 1
  },
  settingsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 35,
    marginRight: 1,
    marginTop: 9
  },
  rectangle2FourView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 15
  },
  myWalletText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeFiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyThreeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 18,
    marginTop: 3
  },
  rectangleFourView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  walletImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2FiveView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 15
  },
  vipCenterText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeSixImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyFourView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 18,
    marginTop: 3
  },
  rectangleFiveView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  shapeSevenImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2SixView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 16
  },
  findFriendsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeEightImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyFiveView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleSixView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  friendsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2SevenView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 16
  },
  blacklistText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeNineImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopySixView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleSevenView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  blacklistImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2EightView: {
    borderRadius: 8,
    width: 22,
    alignItems: "center",
    height: 22,
    marginLeft: 16
  },
  LogText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3,
    paddingBottom: 20,
    marginBottom: 18
  },
  shapeTenImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopySevenView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleEightView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  settingsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  ovalImage: {
    resizeMode: "cover",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 90,
    height: 90,
    borderRadius: 45,
    marginLeft: 19,
    marginTop: 14
  },
  iconsEditImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 24,
    height: 24,
    marginTop: 47,
    marginRight: 15
  },
  landonGibsonText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 15,
    alignSelf: "center",
    fontStyle: "normal",

    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 0.23,
    marginTop: 10,
    marginRight: 4
  },
  followTabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 265,
    height: 44,
    marginBottom: 8,
    alignSelf: "center"
  },
  vipLevelImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginLeft: 82,
    marginTop: 89
  },
  visitorsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 50
  },
  likesTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 31,
    alignSelf: "center"
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginLeft: 3,
    marginTop: 20
  },
  matchedText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 55
  },
  textTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 20,
    alignSelf: "center"
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 20,
    marginRight: 16,
    alignSelf: "flex-end"
  },
  barView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    width: 0,
    height: 0
  },
  homeIndicatorOnLightImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  logoutImage: {
    resizeMode: "stretch",
    width: 20,
    height: 20
  },
  favoriteView: {
    backgroundColor: "rgb(193, 192, 201)",
    width: 0,
    height: 0
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  }
});
