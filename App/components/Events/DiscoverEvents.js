import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Images } from "../../../assets/imageAll";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const ImagesData = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

const GLOBAL = require("../Constant/Globals");

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var count = 0;
var clickButton;
export default class DiscoverEvents extends Component {
  state = {
    place: "",
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    markerPosition: {
      latitude: 0,
      longitude: 0
    },

    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Event fest",
        description: "Cocktail Event",
        image: ImagesData[0],
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "NY Event",
        description: "This is Evening party",
        image: ImagesData[1],
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: "KK Event",
        description: "This is the Youth Event",
        image: ImagesData[2],
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Night Part Event",
        description: "This is night Party",
        image: ImagesData[3],
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  onDrawerPressed() {
    // Actions.drawerOpen("homeDrawer");
    Actions.drawerOpen();
  }
 // watchID = null;
  componentDidMount() {
    

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
  }
  getCurrentLocation=()=>{
    clickButton=true;
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
        this.getLocationAddress(lat, long);
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
    async getLocationAddress(the_lat, the_long) {
    try {
      let response = await fetch(
        "http://dev.virtualearth.net/REST/v1/Locations/" +
          the_lat +
          "," +
          the_long +
          "?includeEntityTypes=Address&includeNeighborhood=1&include=ciso2&key=AnRJNPwenLtgDSzoyFtFVIA-JOG6O20LzI_aMtlW6RxAlikWApgR5NhKuW0cMYf9"
      );
      let responseJson = await response.json();
   
      var name = responseJson.resourceSets[0].resources[0].name;
      this.setState({
        place: name
      });
     
    } catch (error) {
      Alert.alert(error.toString());
    }

 
  }

  onPressEvent = () => {
    alert("event deatil can open here");
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
        provider={PROVIDER_GOOGLE}
           followsUserLocation={true}
         
          ref={map => this.map = map}
          initialRegion={this.state.region}
          region={this.state.initialPosition}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            clickButton=false;
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
            if(clickButton==true)
            {
              return( <MapView.Marker
                            coordinate={this.state.markerPosition}
                            title={this.state.place}
                          />)
            }
            else
            {  return (
              <MapView.Marker title={this.state.place} key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            )}
          
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
            <TouchableOpacity onLongPress={() => { this.onPressEvent() }}>
              <View style={styles.card} key={index}>
                <Image
                  source={marker.image}
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
       <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => this.getCurrentLocation()}>
            <Image style={styles.btnDrawerImage} source={Images.currentLocation} />
          </TouchableOpacity>
        </View> 
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
    height: 60,
    width: 60,
    borderRadius: 30
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
    width: 55,
    height: 55
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
  // componentDidMount() {
  //   if (Platform.OS === "android") {
  //     LocationServicesDialogBox.checkLocationServicesIsEnabled({
  //       message:
  //         "<h2>Use Location?</h2> \
  //                           This app wants to change your device settings:<br/><br/>\
  //                           Use GPS for location<br/><br/>",
  //       ok: "YES",
  //       cancel: "NO"
  //     }).then(() => {
  //       locationTracking(dispatch, getState, geolocationSettings);
  //     });
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       var lat = parseFloat(position.coords.latitude);
  //       var long = parseFloat(position.coords.longitude);

  //       var initialRegion = {
  //         latitude: lat,
  //         longitude: long,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA
  //       };
  //       this.setState({ initialPosition: initialRegion });
  //       this.setState({ markerPosition: initialRegion });
  //       this.getLocationAddress(lat, long);
  //     },
  //     error => console.log(error),
  //     { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
  //   );
  //   this.watchID = navigator.geolocation.watchPosition(
  //     position => {
  //       var lat = parseFloat(position.coords.latitude);
  //       var long = parseFloat(position.coords.longitude);

  //       var lastRegion = {
  //         latitude: lat,
  //         longitude: long,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA
  //       };
  //       this.setState({ initialPosition: lastRegion });
  //       this.setState({ markerPosition: lastRegion });
  //     },
  //     error => console.log(error),
  //     { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
  //   );
  // }
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
