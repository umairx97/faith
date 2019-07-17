import React, { Component } from 'react'
import {
  Text,
  View,
  ListItem,
  FlatList,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { Button, Card, Icon, Rating, Image } from 'react-native-elements';
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Images } from "../../../assets/imageAll";
import { ScrollView } from 'react-native-gesture-handler';
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
      showArr: [],
      visible: true
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
              eventLocation: eventLocation,
              eventTitle: eventTitle,
              eventUrl: eventUrl,
              eventlat: eventLatitude,
              eventlong: eventLongitude,
              eventkey: key,
              eventAdmin: eventAdmin
            })
          }
          console.log(arr)
          this.setState({ showArr: arr, visible: false });
        })
          .catch(error => {
            console.log(JSON.stringify(error));
          });
      })
  }
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
    // arr = [];
    // var uidUser = await firebase.auth().currentUser.uid;
    // var displayEventName = firebase
    //   .database()
    //   .ref("Users/FaithMeetsLove/Event/EventList/");
    // await displayEventName
    //   .once("value")
    //   .then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //       console.log(childSnapshot.val())
    //       var key = childSnapshot.key;
    //       var userId = childSnapshot.val().eventId;
    //       var eventAdmin = childSnapshot.val().eventAdmin;
    //       var eventLatitude = childSnapshot.val().eventLatitued;
    //       var eventLocation = childSnapshot.val().eventLocation;
    //       var eventLongitude = childSnapshot.val().eventLongituded;
    //       var eventTitle = childSnapshot.val().eventTitle;
    //       var eventUrl = childSnapshot.val().eventURL;
    //       if (uidUser == userId) {
    //         arr.push({
    //           eventLocation: eventLocation,
    //           eventTitle: eventTitle,
    //           eventUrl: eventUrl,
    //           eventlat: eventLatitude,
    //           eventlong: eventLongitude,
    //           eventkey: key,
    //           eventAdmin: eventAdmin
    //         })
    //         // alert(eventUrl)
    //       }
    //       this.setState({ showArr: arr, visible: false },()=> console.log('state',this.state));
    //     })
    //       .catch(error => {
    //         console.log(JSON.stringify(error));
    //       });
    //   })
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

  showSpinner() {
    this.setState({ visible: true });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }
  render() {
    const { showArr, visible } = this.state
    return (
      <View style={{ flex: 1}}>
        {visible ? <View style={visible === true ? styles.stylOld : styles.styleNew}>
          <ActivityIndicator
                    color="#0000ff"
                    size="large"
                    style={styles.ActivityIndicatorStyle}
                  />
        </View> :
      <ScrollView style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)", }}>
         <View
          style={{
            ...ifIphoneX({ marginTop: 25 }, { marginTop: 0 }),
            ...ifIphoneX({ marginBottom: 25 }, { marginBottom: 0 })
          }}
        >
          
         {showArr.length ? showArr.map((users,i) => {
            return (
              <Card title={users.eventAdmin} key={i}>
                  <View>
                    <Image
                      style={{height: 300, width: '100%'}}
                      resizeMode="cover"
                      source={{ uri: users.eventUrl }}
                    />
                    {/* <Text style={{margin: 5}}>
                      {users.services.map((u,i) => { 
                        return(
                          u.type && `(${u.name.toLocaleUpperCase()}) `
                        )
                      })}
                    </Text> */}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, margin: 0.5}}>
                    <Button
                      icon={<Icon type='font-awesome' name='comments' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
                      onPress={() => console.log(users)}
                      title='CHAT' />
                    </View>
                    <View style={{flex: 1, margin: 0.5}}>
                    <Button
                      icon={<Icon type='font-awesome' name='plus' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='HIRE'
                      onPress={() => console.log(users)}
                       />
                      </View>
                    </View>
                    <Rating
                    showRating={false}
                    ratingCount={5}
                    readonly
                    startingValue={4.3}
                    fractions={20}
                    onFinishRating={(u,i) => console.log(u)}
                    onStartRating={() => console.log("Bye")}
                    style={{ paddingVertical: 10 }}
                  />
                  </View>
            </Card>
            )
          })
          : 
          null
          }
        </View>
      </ScrollView>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1
  },
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
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
})