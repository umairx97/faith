import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Images } from "../../../assets/imageAll";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import firebase from "react-native-firebase";
import moment from "moment";
import geolib from "geolib";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;
var arr = [];
var markers = [];
var check=false;
export default class DiscoverEvents extends Component {
  constructor() {
    super();
    this.state = {
      showme: 0,
        userDistance: 200,
        eventLat: 0,
        eventLong: 0,
        startDate: "20-03-2019",
        endDate: "20-12-2019",
       
      markers: [],
    
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
    this.getFilterEvent();
    this.getEventList();
  }
  getFilterEvent = async () => {
    var snapExist = false;
    var showme, endEventDate, startEventDate, distance;
    var uidUser = await firebase.auth().currentUser.uid;
    var searchFilter = firebase
      .database()
      .ref("Users/FaithMeetsLove/EventSearchFilters/" + uidUser)

    await searchFilter.once("value", function (snapshot) {

      if (snapshot.exists()) {
        showme = snapshot.val().show_me;
        distance = snapshot.val().distance;
        startEventDate = snapshot.val().start_Date;
        endEventDate = snapshot.val().end_Date;
        eventLati = snapshot.val().userLatitude;
        eventLong = snapshot.val().userLongitude;
        snapExist = true;
      }
      else
      {
        check=true;
        var dddd=check;
      }
    });
    if (snapExist)
      this.setState({
        ...this.state,
        showme: showme,
        userDistance: distance,
        eventLat: eventLati,
        eventLong: eventLong,
        startDate: startEventDate,
        endDate: endEventDate,

      });
   
  }
  getEventList = async () => {
    var uidUser = await firebase.auth().currentUser.uid;
    arr = [];
    var displayEventName = firebase
      .database()
      .ref("Users/FaithMeetsLove/Event/EventList/");
    await displayEventName
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          var key=childSnapshot.key;
          var eventAdmin = childSnapshot.val().eventAdmin;
          var eventDate = childSnapshot.val().eventDate;
          var desc = childSnapshot.val().eventDesc;
          var userId = childSnapshot.val().eventId;
          var eventLatitude = childSnapshot.val().eventLatitued;
          var eventLocation = childSnapshot.val().eventLocation;
          var eventLongitude = childSnapshot.val().eventLongituded;
          var eventOrganiser = childSnapshot.val().eventOrganiser;

          var eventTitle = childSnapshot.val().eventTitle;
          var eventType = childSnapshot.val().eventType;
          var eventUrl = childSnapshot.val().eventURL;
          var price = childSnapshot.val().price;
          var endEventDateActual=childSnapshot.val().endEventDate;
          var elat = this.state.eventLat;
          var elong = this.state.eventLong;
          var searchDistance = this.state.userDistance;
          var showMeEvent = this.state.showme;
          var startEventDates = this.state.startDate;
          var endEventDates = this.state.endDate;
         // var searchExisted=this.state.searchExist;
          var dates = moment(eventDate, "DD-MM-YYYY");
          var end_eventDate=moment(endEventDateActual,"DD-MM-YYYY")
          var startdates = moment(startEventDates, "DD-MM-YYYY");
          var endDates = moment(endEventDates, "DD-MM-YYYY");
        
          var a = dates.toDate(), b = startdates.toDate(), c = endDates.toDate(),d=end_eventDate.toDate();
         
          var dis = this.getDistance(elat, elong, eventLatitude, eventLongitude);
          if (uidUser == userId) {

          }
          else {
           if(check==true)
           {
            arr.push({
              coordinate: {
                latitude: eventLatitude,
                longitude: eventLongitude,
              },
              id:key,
              title: eventTitle,
              description: desc,
              image: eventUrl,
            })
           }
           else{if (showMeEvent == 0) {
            if (searchDistance >= dis) {
              arr.push({
                coordinate: {
                  latitude: eventLatitude,
                  longitude: eventLongitude,
                },
                id:key,
                title: eventTitle,
                description: desc,
                image: eventUrl,
              })
            }

          }
          else {
            if (a.getTime() >= b.getTime() && d.getTime() <= c.getTime())
             {

              arr.push({
                coordinate: {
                  latitude: eventLatitude,
                  longitude: eventLongitude,
                },
                title: eventTitle,
                description: desc,
                image: eventUrl,
              })
            }

          }
            
           }

//searchExist
          }

        })
        this.setState({
          markers: arr
        })
      })
  }
  getDistance(lat1, long1, eventLatitude, eventLongitude) {
    var distanceBetweenFriends = geolib.getDistance(
      {
        lat: lat1,
        lon: long1
      },
      { lat: eventLatitude, lon: eventLongitude }
    );
    var distance = distanceBetweenFriends / 1000;
    this.setState({
      distanceMiles: distance
    })
    return distance;
    //alert(distance)
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  onDrawerPressed() {
    // Actions.drawerOpen("homeDrawer");
    Actions.drawerOpen();
  }
  async componentDidMount() {


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
        //  this.setState({ markerPosition: initialRegion });
        // this.getLocationAddress(lat, long);
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
        // this.setState({ markerPosition: lastRegion });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
    var uidUser = await firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/EventSearchFilters/" + uidUser)

  }
  getLoactionInfo = (coordinate, index) => {
    alert(coordinate, index);
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
  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
        //   provider={PROVIDER_GOOGLE}
        //  followsUserLocation={true}

          showsBuildings={true}
          // minZoomLevel={14}
          //  maxZoomLevel={20}
          // initialRegion={this.state.region}
          region={this.state.initialPosition}
          style={styles.container}

        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              //   <MapView.Marker
              //   coordinate={{latitude: 45.5230786, longitude: -122.6701034}}
              //   title={'title'}
              //   description={'description'}
              // />
              <MapView.Marker onPress={() => { this.onPressEvent(JSON.stringify(marker.coordinate.latitude), JSON.stringify(marker.coordinate.longitude),marker.id) }} key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
              //               <MapView.Marker
              //   coordinate={this.state.markerPosition}
              //   title={this.state.place}
              // />


            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity onLongPress={() => { this.onPressEvent(JSON.stringify(marker.coordinate.latitude), JSON.stringify(marker.coordinate.longitude),marker.id) }}>
              <View style={styles.card} key={index}>
                <Image
                  source={{ uri: marker.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                </View>
              </View></TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => this.onDrawerPressed()}>
            <Image style={styles.btnDrawerImage} source={require("../../../assets/images/filters-btn-2.png")} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => this.onDrawerPressed()}>
            <Image style={styles.btnNotifiImage} source={require("../../../assets/images/filters-btn-2.png")} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftContainer: {
    position: "absolute",
    resizeMode: "cover",
    top: 20,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: 55,
    borderRadius: 25
  },
  rightContainer: {

    position: "absolute",
    resizeMode: "cover",
    top: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: 55,
    borderRadius: 25
  },
  btnDrawerImage: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    tintColor: 'black',
    width: 30,
    height: 30
  },
  btnNotifiImage: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    tintColor: 'black',
    width: 30,
    height: 30
  },
  scrollView: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

// AppRegistry.registerComponent("mapfocus", () => screens);




// // import React, { Component } from 'react'
// // import { Text, View } from 'react-native'

// // export default class DiscoverEvents extends Component {
// //     constructor(props) {
// //         super(props);
// //     }
// //   render() {
// //     return (
// //       <View>
// //         <Text> textInComponent </Text>
// //       </View>
// //     )
// //   }
// // }
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableHighlight,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Platform,
//   Dimensions,
//   BackHandler
// } from "react-native";
// import { RkButton, RkText } from "react-native-ui-kitten";
// import { ScrollView } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Actions } from "react-native-router-flux";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { Images } from "../../../assets/imageAll";
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

// import { ifIphoneX } from "react-native-iphone-x-helper";
// const GLOBAL = require("../Constant/Globals");

// const Screen = {
//   width: Dimensions.get("window").width,
//   height: Dimensions.get("window").height
// };
// const ASPECT_RATIO = Screen.width / Screen.height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
// var count = 0;
// export default class DiscoverEvents extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       place: "",
//       initialPosition: {                      
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 0,
//         longitudeDelta: 0
//       },
//       markerPosition: {
//         latitude: 0,
//         longitude: 0
//       }
//     };
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//   }

//   onDrawerPressed() {
//    // Actions.drawerOpen("homeDrawer");
//    Actions.drawerOpen();
//   }
//   watchID = null;
//   componentDidMount() {
//     if (Platform.OS === "android") {
//       LocationServicesDialogBox.checkLocationServicesIsEnabled({
//         message:
//           "<h2>Use Location?</h2> \
//                             This app wants to change your device settings:<br/><br/>\
//                             Use GPS for location<br/><br/>",
//         ok: "YES",
//         cancel: "NO"
//       }).then(() => {
//         locationTracking(dispatch, getState, geolocationSettings);
//       });
//     }
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         var lat = parseFloat(position.coords.latitude);
//         var long = parseFloat(position.coords.longitude);

//         var initialRegion = {
//           latitude: lat,
//           longitude: long,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA
//         };
//         this.setState({ initialPosition: initialRegion });
//         this.setState({ markerPosition: initialRegion });
//         this.getLocationAddress(lat, long);
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
//     );
//     this.watchID = navigator.geolocation.watchPosition(
//       position => {
//         var lat = parseFloat(position.coords.latitude);
//         var long = parseFloat(position.coords.longitude);

//         var lastRegion = {
//           latitude: lat,
//           longitude: long,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA
//         };
//         this.setState({ initialPosition: lastRegion });
//         this.setState({ markerPosition: lastRegion });
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
//     );
//   }
//   componentWillMount() {
//     BackHandler.addEventListener(
//       "hardwareBackPress",
//       this.handleBackButtonClick
//     );
//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//     BackHandler.removeEventListener(
//       "hardwareBackPress",
//       this.handleBackButtonClick
//     );
//   }
//   handleBackButtonClick() {
//     //alert('back pressed')
//     this.props.navigation.goBack(null);
//     //  Actions.pop();
//     return true;
//   }
//   async getLocationAddress(the_lat, the_long) {
//     try {
//       let response = await fetch(
//         "http://dev.virtualearth.net/REST/v1/Locations/" +
//           the_lat +
//           "," +
//           the_long +
//           "?includeEntityTypes=Address&includeNeighborhood=1&include=ciso2&key=AnRJNPwenLtgDSzoyFtFVIA-JOG6O20LzI_aMtlW6RxAlikWApgR5NhKuW0cMYf9"
//       );
//       let responseJson = await response.json();
//       // for (var i = 0; responseJson.resourceSets.length; i++) {
//       //   for (
//       //     var r = 0;
//       //     r < responseJson.resourceSets[i].resources.length;
//       //     r++
//       //   ) {
//       var name = responseJson.resourceSets[0].resources[0].name;
//       this.setState({
//         place: name
//       });
//       //   Alert.alert(name);
//       //     break;
//       //   }
//       //   break;
//       // }
//     } catch (error) {
//       Alert.alert(error.toString());
//     }

//     // Geocode.fromLatLng( this.state.latitude, this.state.longitude).then(
//     //   response => {
//     //     const address = response.results[0].formatted_address;
//     //     Alert.alert(address);
//     //   },
//     //   error => {
//     //     Alert.alert("error");
//     //   }
//     // );

//     // fetch(
//     //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
//     //   this.state.latitude +
//     //     "," +
//     //     this.state.longitude +
//     //     "&key="+GLOBAL.geoLocationAPIKey
//     // )
//     //   .then(response => response.json())
//     //   .then(responseJson => {
//     //     this.setState({
//     //       place: response.data.results[0].formatted_address // access from response.data.results[0].formatted_address
//     //   })
//     //     Alert.alert(JSON.stringify(responseJson));
//     //     // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
//     //   });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View><MapView
//           mapType={"standard"}
//           provider={PROVIDER_GOOGLE}
//           customMapStyle={GLOBAL.mapStyle}
//           style={styles.map}
//           followsUserLocation={true}
//           showsMyLocationButton={true}
//           showsBuildings={true}
//           minZoomLevel={14}
//           maxZoomLevel={20}
//           region={this.state.initialPosition}
//         >
//           <MapView.Marker
//             coordinate={this.state.markerPosition}
//             title={this.state.place}
//           />
//         </MapView></View>
//         <View>

//         </View>

//         <View style={styles.leftContainer}>
//           <TouchableOpacity onPress={() => this.onDrawerPressed()}>
//             <Image style={styles.btnDrawerImage} source={require("../../../assets/images/filters-btn-2.png")} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.rightContainer}>
//           <TouchableOpacity onPress={() => {}}>
//             <Image style={styles.btnNotifiImage} source={Images.camIcon} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//    flex:1
//   },
//   map: {
//     width: Screen.width,
//     height: Screen.height-51,
//     ...ifIphoneX({  height: Screen.height-81})
//   },
//   leftContainer: {
//     position: "absolute",
//     resizeMode: "cover",
//     top: 20,
//     left: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 55,
//     width: 55,
//     borderRadius: 25
//   },
//   btnDrawerImage: {
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: 30,
//     height: 30
//   },
//   btnNotifiImage: {
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: 20,
//     height: 20
//   },
//   rightContainer: {
//     backgroundColor: "#ddddda",
//     position: "absolute",
//     resizeMode: "cover",
//     top: 30,
//     right: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 30,
//     width: 30,
//     borderRadius: 15
//   }
// });
