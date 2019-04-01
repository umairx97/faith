import React, { Component } from 'react'
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
} from 'react-native';
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Images } from "../../../assets/imageAll";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

//var showArr=[];
var arr = [];
export default class MyEvent extends Component {
  constructor(props) {
    super();
    this.getMyEvent();
    this.state = ({
      showArr: []
    })
  }
  getMyEvent = async () => {
    arr = [];
    var uidUser = await firebase.auth().currentUser.uid;
    var displayEventName = firebase
      .database()
      .ref("Users/FaithMeetsLove/Event/EventList/");
    await displayEventName
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          var key = childSnapshot.key;
          var userId = childSnapshot.val().eventId;
          var eventAdmin = childSnapshot.val().eventAdmin;
          var eventLatitude = childSnapshot.val().eventLatitued;
          var eventLocation = childSnapshot.val().eventLocation;
          var eventLongitude = childSnapshot.val().eventLongituded;
          var eventTitle = childSnapshot.val().eventTitle;
          var eventUrl = childSnapshot.val().eventURL;
          if (uidUser == userId) {
            arr.push({
              event_Location: eventLocation,
              event_Title: eventTitle,
              event_Url: eventUrl,
              event_lat: eventLatitude,
              event_long: eventLongitude,
              event_key: key,
            })
          }
          this.setState({ showArr: arr });
        })
          .catch(error => {
            console.log(JSON.stringify(error));
          });
      })
  }
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }
  onPressEvent = (lat, long, id) => {
    //alert(id);
    AsyncStorage.setItem("event_lat", lat);
    AsyncStorage.setItem("event_long", long);
    AsyncStorage.setItem("event_key", id);
    // alert(long);
    // alert(lat)
    Actions.eventDetailPage();
  }

  backAndroid() {
    Actions.pop();
    return true;
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)", }}>
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
                  <View>

                    <ImageBackground
                      style={styles.mainImage}
                      imageStyle={{ borderRadius: 10 }}
                      source={{ uri: item.event_Url }}
                    >
                      <Text style={styles.addressTextStyle}>{item.event_Location.length > 40
                        ? item.event_Location.substring(0, 39) + "..."
                        : item.event_Location}</Text>
                      <Text style={styles.mainTextStyle}>
                        {item.event_Title.length > 10
                          ? item.event_Title.substring(0, 10) + "..."
                          : item.event_Title}</Text>

                      <TouchableOpacity style={styles.openProfileIcon}
                        onPress={() => { this.onPressEvent(item.event_lat, item.event_long, item.event_key) }}>

                        <Image style={styles.iconStyle} source={Images.eyeIcon}></Image>

                      </TouchableOpacity>
                    </ImageBackground>

                  </View>

                </View>


              </View>

            )}
            keyExtractor={item => item.ids}
          />
        </View>
      </View>
    )
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
  addressTextStyle: {
    fontSize: 18,
    width: Screen.width / 2 + 80,
    color: 'white',
    position: 'absolute',
    top: 10, left: 10,
    letterSpacing: 0
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