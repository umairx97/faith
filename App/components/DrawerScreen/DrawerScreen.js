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
  Dimensions,
  PermissionsAndroid
} from "react-native";
import React from "react";
import { Images } from "../../../assets/imageAll";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import firebase from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
// import { RNCamera } from "react-native-camera";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
var isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

var isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

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
      profileImageUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
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
    this.getUid();
    this.getUserLoginInfo();
  }

  getUserLoginInfo = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    var userStatusDatabaseRef = firebase.database().ref('Users/FaithMeetsLove/status/' + uidUser);

    firebase.database().ref('.info/connected').on('value', function (snapshot) {
      if (snapshot.val() == false) {
        userStatusDatabaseRef.set(isOfflineForDatabase);
        return;
      };
      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
        userStatusDatabaseRef.set(isOnlineForDatabase);
      });
    });

  }

  async logout() {
    var uidUser = await firebase.auth().currentUser.uid;
    var userStatusDatabaseRef = firebase.database().ref('Users/FaithMeetsLove/status/' + uidUser);
    firebase.database().ref('.info/connected').on('value', function (snapshot) {
      if (snapshot.val() == false) {
        return;
      };
      userStatusDatabaseRef.onDisconnect().set(isOnlineForDatabase).then(function () {
        userStatusDatabaseRef.set(isOfflineForDatabase);
      });
    });

    var v = await AsyncStorage.getItem("checkLoggedType");
    
    console.warn('log type: ', v);
    
    if ((v == "firebaseLoggedin")||(v == "googleLoggedin")) {
      this.signOutGoogle();
    } else if (v == "facebookloggedin") {
      this.signOutFacebook();
    } else {
      this.signOut();
    }
  }

  watchID = null;

  async componentDidMount() {
    this.getUid();

    if (Platform.OS == "android") {
      // LocationServicesDialogBox.checkLocationServicesIsEnabled({
      //   message:
      //     "<h2>Use Location?</h2> \
      //                       This app wants to change your device settings:<br/><br/>\
      //                       Use GPS for location<br/><br/>",
      //   ok: "YES",
      //   cancel: "NO",
      //   showDialog: true, // false => Opens the Location access page directly
      //   openLocationServices: false, // false => Directly catch method is called if location services are turned off
      //   preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
      //   preventBackClick: true // true => To prevent the location services popup from closing when it is clicked back button
      // }).then((success) => {
      //   // locationTracking(dispatch, getState, geolocationSettings);
      //   console.warn('passato: ', success);
      //   if(success.enabled == true) {
      //     this.getLocation();
      //   }
      // }).catch((error) => {
      //   console.warn(error);
      // });
      this.requestPermissionOnAndroid();
      return;
    }
    this.getLocation();
  }

  async requestPermissionOnAndroid() {
    try {
      var granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION],
          {
            title: 'Use Location?',
            message:
              'This app wants to change your device settings: ' +
              'Use GPS for location',
            buttonNegative: 'NO',
            buttonPositive: 'YES',
          },
        );
        if ((granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED)&&
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the camera');
          this.getLocation();
        } else {
          // console.log('Camera permission denied');
          Alert.alert(
            'Info',
            'To use this function of the app, you must enable the permission to use the GPS',
            [
              {text: 'Ask me later'},
              {text: 'Ok, tell me the permissions', onPress: () => this.requestPermissionOnAndroid()},
            ],
            {cancelable: false},
          );
        }
    } catch (err) {
      console.warn(err);
    }
  }

  async getLocation() {
    var uidUser = await firebase.auth().currentUser.uid;
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
        setTimeout(() => {
          var userRef = firebase
            .database()
            .ref("Users/FaithMeetsLove/Registered/" + uidUser);
          userRef.once("value").then(snapshot => {
            if (snapshot.exists()) {
              userRef.update({ latitude: lat, longitude: long }).then(msg => {
                this.getUid();
              });
            }
          });
        }, 200);
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
    var FCM = firebase.messaging();
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

      var displayUserName = firebase
        .database()
        .ref("Users/FaithMeetsLove/Registered/" + uidUser);
      await displayUserName.once("value", function (snapshot) {
        
        var usrName = snapshot.val().fullName;
      
        fullName = snapshot.val().fullName;
        gender = snapshot.val().gender;
        latitude = snapshot.val().latitude;
        longitude = snapshot.val().longitude;
        email = snapshot.val().email;
        user_Dob = snapshot.val().user_Dob;
        profileImageURL = snapshot.val().profileImageURL;
        var dss=fullName;
        if(fullName.length>18)
        {
          var x=fullName.substring(0,18)+ "...";
          instance.setState({
            user_name:x
          })
        }else{
          instance.setState({
            user_name:fullName
          })
        }
          
        var fss=usrName;
        if ((profileImageURL == "")||(profileImageURL == null)) {
          instance.setState({
            profileImageUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png"
          });
        }
        else {
          instance.setState({
            profileImageUrl: profileImageURL
          });
        }
      });
      
      if(fullName != null) {
        AsyncStorage.setItem("reg_user_name", fullName);
      }

      if(gender != null) {
        AsyncStorage.setItem("reg_user_gender", "" + gender);
      }
      
      if(latitude != null) {
        AsyncStorage.setItem("reg_user_latitude", "" + latitude);
      }

      if(longitude != null) {
        AsyncStorage.setItem("reg_user_longitude", "" + longitude);
      }
      
      if(email != null) {
        AsyncStorage.setItem("reg_user_email", email);
      }
      
      if(user_Dob != null) {
        AsyncStorage.setItem("reg_user_dob", user_Dob);
      }
      
      if(profileImageURL != null) {
        AsyncStorage.setItem("reg_user_profileImageURL", profileImageURL);
      }



    var fcmToken;
    var ref = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + uidUser);
    await FCM.getToken()
      .then(token => {
        // stores the token in the user's document
        fcmToken = token;
        ref
          .update({
            pushToken: token
          })
          .then(data => {
            //alert("done");
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      });
    await AsyncStorage.setItem("fcmToken", fcmToken);
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
      await firebase.auth().signOut();
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
    AsyncStorage.setItem("newChatMessage", "true");
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
  };
  onProfileImagerPressed = () => {
    Actions.ProfileCopy();
  };
  onMatchPressed = () => {
    Actions.matchProfile();
  };
  onEventPressed=()=>{
    Actions.DiscoverEvent();
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
              <View style={styles.likesViewView}>
                <View style={styles.rectangle2View}>
                  <Image
                    source={Images.homePage}
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
              <View style={styles.likesViewView}>
                <View style={styles.rectangle2View}>
                  <Image
                    source={Images.findFriendList}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.onMatchPressed();
                  }}
                >
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

            <View style={styles.likesView}>
              <View style={styles.likesViewView}>
                <View style={styles.rectangle2TwoView}>
                  <Image
                    source={Images.informationCenter}
                    style={styles.logoutImage}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.likesText}>Information center</Text>
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
                    style={styles.shapeImage}
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

            <View style={styles.likesView}>
              <View style={styles.likesViewView}>
                <View style={styles.rectangle2View}>
                  <Image source={Images.userGroups} style={styles.logoutImage} />
                </View>
                <TouchableOpacity onPress={this.onEventPressed}>
                  <Text style={styles.likesText}>Events</Text>
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
          

            {/* <View style={styles.likesView}>
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
                <TouchableOpacity onPress={this.onEventPressed}>
                  <Text style={styles.likesText}>Events</Text>
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
                    style={styles.shapeImage}
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
            </View> */}

        

            <View style={styles.likesView}>
              <View style={styles.likesViewView}>
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
            <View style={styles.levelView}>
              <View style={styles.levelViewView}>
                <View style={styles.rectangle2TwoView}>
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
              <View style={styles.levelViewView}>
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
                    style={styles.shapeFiveImage}
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
            <View style={styles.blacklistView}>
              <View style={styles.levelViewView}>
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
              <View style={styles.levelViewView}>
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
              <View style={styles.levelViewView}>
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
                <View style={styles.iconsLikeCopyFourView}>
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
              <View style={styles.blacklistView}>
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
    ...ifIphoneX({ height: 145 }),
    marginLeft: 18,
    marginTop: 20,
    ...ifIphoneX({ marginTop: 35 }),
    marginRight: 16
  },
  panel1View: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    // height: 220,
    height: hp(33),
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
    // backgroundColor: "blue",
    // height: 35,
    height: hp(5),
    marginTop: Platform.OS === "ios" ? 9 : 9,
    marginRight: 1
  },
  likesViewView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center'
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
    // fontSize: 15,
    fontSize: hp(2),
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12,
    marginTop: 3
  },
  levelViewView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center'
  },
  shapeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  rectangle2TwoView: {
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 14
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
  logoutImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    alignSelf: "center",
    width: 15,
    height: 15
  },
  levelView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    // height: 35,
    height: hp(5),
    marginLeft: 1,
    marginTop: 9,
    marginRight: 1
  },
  
  blacklistView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    // height: 35,
    height: hp(5),
    marginTop: 9,
    marginRight: 1
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
  barView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    width: 0,
    height: 0
  },
  logoutImage: {
    resizeMode: "stretch",
    marginTop: 2,
    width: 20,
    height: 20
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  }
});
