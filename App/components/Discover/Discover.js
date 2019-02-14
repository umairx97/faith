import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  FlatList,
  Platform,
  AsyncStorage,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import Modal from "react-native-modal";
import firebase from "../FirebaseConfig/FirebaseConfig";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
var arr = [];

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      showArr: [],
      showUrl: [],
      showAll: [],
      xData: [],
      xInfo: [],
      nName: 'hello',
      nUrl: '',
      userId: '',
      loginUserId: '',
      isFavouriteUser: false,
      nameFull: '',
      dateOfBirth: '',
      imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
      isModalVisible: false,
      transparent: false,
      viewFullProfileId: ''
    }
    this.getAllUser();
    this.getCurrentUserId();
  }
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }
  toggleModal = () => {
    this.swiper.goBackFromTop();
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }


  getCurrentUserId = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    this.setState({
      loginUserId: uidUser
    })
  }

  componentDidMount() {

  }

  getAllUser = async () => {
    arr = [];
    instance = this;
    var allUserProfile = firebase.database().ref("Users/FaithMeetsLove/Registered");
    var varifiedUser;
    var key
    var userProfileId
    var loginUser

    allUserProfile
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.key;
          this.setState({ userId: key })
          userProfileId = childSnapshot.key;
          var childData = childSnapshot.val().profileImageURL;
          var userName = childSnapshot.val().fullName;
          varifiedUser = childSnapshot.val().isVarified;
          loginUser = childSnapshot.val().isLogin;
          this.getAlreadyLikedUser(key, userName, childData, userProfileId, varifiedUser)
        });
      }).catch(error => {
        console.log(JSON.stringify(error));
      });
  }
  async getAlreadyLikedUser(id, userName, childData, userProfileId, varifiedUser) {
    arr = [];
    var alreadyLikedUser = firebase.database().ref("Users/FaithMeetsLove/ProfileLiked/" + this.state.loginUserId + "/" + id);

    await alreadyLikedUser.once('value').then(snapshot => {
      if (snapshot.exists()) {
        //alert('yes')
      }
      else {
        this.getAlreadyFavouriteUser(id, userName, childData, userProfileId, varifiedUser);
      }
    }).catch(error => {
      alert(JSON.stringify(error))
    })
  }
  async getAlreadyFavouriteUser(id, userName, childData, userProfileId, varifiedUser) {
    var alreadyFavouriteUser = firebase.database().ref("Users/FaithMeetsLove/FavouriteProfile/" + this.state.loginUserId + "/" + id);
    await alreadyFavouriteUser.once('value').then(snapshot => {
      if (snapshot.exists()) {
        //return;
      }
      else {
        this.getAlreadyRejectedUser(id, userName, childData, userProfileId, varifiedUser);
      }
    }).catch(error => {
      alert(JSON.stringify(error))
    })
  }


  async getAlreadyRejectedUser(id, userName, childData, userProfileId, varifiedUser) {
    var alreadyFavouriteUser = firebase.database().ref("Users/FaithMeetsLove/RejectedProfile/" + this.state.loginUserId + "/" + id);
    await alreadyFavouriteUser.once('value').then(snapshot => {
      if (snapshot.exists()) {
        //return;
      }
      else {
        if (this.state.loginUserId != id)
          if (varifiedUser == true) {
            arr.push({ pName: userName, pUrl: childData, id: userProfileId });
          }
        this.setState({ showArr: arr });
      }
    }).catch(error => {
      alert(JSON.stringify(error))
    })
    this.setState({ showAll: this.state.showArr })
    var getF = this.state.showAll;
    this.setState({ xData: getF })
  }
  getProfileId = (id) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/ProfileLiked/" + this.state.loginUserId + "/" + id)
      .set({
        isLike: true
      })
      .then(ref => {
      })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }
  getFavouriteProfileId = (id) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/FavouriteProfile/" + this.state.loginUserId + "/" + id)
      .set({
        isLike: true
      })
      .then(ref => {
      })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }
  rejectUserProfile = async (id) => {
    firebase
      .database()
      .ref("Users/FaithMeetsLove/RejectedProfile/" + this.state.loginUserId + "/" + id)
      .set({
        isLike: true
      })
      .then(ref => {
      })
      .catch(error => {
        Alert.alert("fail" + error.toString());
      });
  }

  viewUserProfile = async (id) => {

    this.toggleModal();
    instance = this;

    var displayUserProfile = firebase
      .database()
      .ref("Users/FaithMeetsLove/Registered/" + id);
    displayUserProfile.once("value", function (snapshot) {
      var usrName = snapshot.val().fullName;
      var ImageUrl = snapshot.val().profileImageURL;
      var dob = snapshot.val().user_Dob;
      instance.setState({
        imageProfileUrl: ImageUrl,
        nameFull: usrName,
        dateOfBirth: dob,
        viewFullProfileId: id
      });
      instance.age();
    });
  }
  age = () => {
    var userAge = this.state.dateOfBirth;
    //alert(userAge)
    var date = userAge.split('-')[0]
    var month = userAge.split('-')[1]
    var year = userAge.split('-')[2]

    var ageFull = this.calculate_age(month, date, year);

    this.setState({
      totalAge: ageFull
    })
  }

  calculate_age = (birth_month, birth_day, birth_year) => {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
  }
  renderAllAccount = (items) => {
    var x = items;
    return (items.map((item) => {
      var uriProfile = item.pUrl;
      var userProfileId = item.id;
      return (
        <Card style={{
          backgroundColor: 'white',
          height: Screen.height - ((Screen.height / 2) - 60),
          width: Screen.width - 80, borderRadius: 10,
        }}
          onSwipedRight={() => { this.getProfileId(userProfileId) }}
          onSwipedBottom={() => { this.getFavouriteProfileId(userProfileId) }}
          onSwipedTop={() => { this.viewUserProfile(userProfileId) }}
          onSwipedLeft={() => { this.rejectUserProfile(userProfileId) }}
        >
          <View style={{ flexDirection: 'column' }}><Image
            source={{ uri: uriProfile }}
            style={{
              height: Screen.height - ((Screen.height / 2) - 20),
              width: Screen.width - 80,
              borderRadius: 10,
              resizeMode: "cover"
            }}
          />
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.pName}</Text></View>
        </Card>
      )
    }))
  }
 async viewFullProfile(id) {
    //alert(id);
    //this.toggleModal();

    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.swiper.goBackFromTop();
    //this.setState({ isModalVisible: false})
    AsyncStorage.setItem("userProfileKeys", id);
    setTimeout(() => Actions.userProfile(), 500);



  }
  render() {
    return (
      <View>
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
          <View>
            <View
              style={{
                position: "absolute",
                ...ifIphoneX({ marginTop: 30 }),
                left: 20,
                top: 20
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Discover
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 20,
                ...ifIphoneX({ marginTop: 30 }),
                top: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.drawerOpen("drawer");
                }}
              >
                <Image
                  source={require("../../../assets/images/filters-btn-2.png")}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ position: "absolute", left: 40, top: 80, ...ifIphoneX({ top: 100 }), right: 40 }}>

            <CardStack
              style={styles.content}
              renderNoMoreCards={() => (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    color: "gray",
                    position: "absolute",
                    left: 80,
                    top: 180,
                    ...ifIphoneX({ top: 220 }),
                    right: 60
                  }}
                >No more cards :(</Text>
              )}
              ref={swiper => {
                this.swiper = swiper;
              }}
              onSwiped={() => console.log("onSwiped")}
              onSwipedLeft={() => console.log("onSwipedLeft")}
              onSwipedTop={() => console.log("onSwipedtop")}
              onSwipedBottom={() => console.log("onSwipedbottom")}
            >{this.renderAllAccount(this.state.xData)}</CardStack>
          </View>
          <View
            style={{
              position: "absolute",
              left: 50,
              bottom: 70,
              right: 40,
              ...ifIphoneX({ marginBottom: 70 })
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => {
                  this.swiper.swipeLeft();

                }}
              >
                <Image
                  source={require("../../../assets/images/red.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.orange]}
                onPress={() => {
                  this.swiper.goBackFromLeft();
                }}
              >
                <Image
                  source={require("../../../assets/images/back.png")}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();

                }}
              >
                <Image
                  source={require("../../../assets/images/green.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <Modal isVisible={this.state.isModalVisible} animationType="slide"
          transparent={true} onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ backgroundColor: 'white', justifyContent: 'center', padding: 10, borderRadius: 10, }}>
            <Image source={{ uri: this.state.imageProfileUrl }}
              style={styles.ovalImage}
            />
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{this.state.nameFull}</Text><Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 22 }}>,</Text>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold', marginLeft: 10 }}>{this.state.totalAge}</Text>
            </View>
            <View>
              <Text style={{ margin: 10 }}>ijkohdkfjchdskjdfvhdfkjvhdfdfkjhvdfjk kjdshvjkdf kjhvkj</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
              <View>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity></View>
              <View>
                <TouchableOpacity onPress={() => { this.viewFullProfile(this.state.viewFullProfileId) }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>View Profile</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  discoverView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  colorPrimaryViewLinearGradient: {
    height: Screen.height
  },
  buttonContainer: {
    alignSelf: "center",
    alignContent: "center",
    width: 220,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  ovalImage: {
    resizeMode: 'cover',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 130,
    height: 130,


    borderRadius: 65,
    alignSelf: 'center'
  },
});
