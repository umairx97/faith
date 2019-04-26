// import React, { Component } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import { Actions } from "react-native-router-flux";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// const GLOBAL = require("../Constant/Globals");
// import { Images } from "../../../assets/imageAll";
// const ImagesData = [
//   { uri: "https://i.imgur.com/sNam9iJ.jpg" },
//   { uri: "https://i.imgur.com/N7rlQYt.jpg" },
//   { uri: "https://i.imgur.com/UDrH0wm.jpg" },
//   { uri: "https://i.imgur.com/Ka8kNST.jpg" }
// ]
// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = height / 4;
// const CARD_WIDTH = CARD_HEIGHT;

// export default class EventLocation extends Component {
//   constructor(){
//     super();
//    this.state = {
//     coords: [],
//     latitude: null,
//     longitude: null,
//     error:null,
//     mapRegion: null,
//     lastLat: null,
//     lastLong: null,
   
//     place: "",
//           initialPosition: {                      
//             latitude: 0,
//             longitude: 0,
//             latitudeDelta: 0,
//             longitudeDelta: 0
//           },
//           markerPosition: {
//             latitude: 0,
//             longitude: 0
//           }
//   };
//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

//   onDrawerPressed() {

//     Actions.drawerOpen();
//   }
//   watchID = null;
//   async componentDidMount() {
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
//     // const { lat, lng } = await this.getcurrentLocation();
//     // this.setState(prev => ({
//     //   fields: {
//     //     ...prev.fields,
//     //     location: {
//     //       lat,
//     //       lng
//     //     }
//     //   },
//     //   currentLocation: {
//     //     lat,
//     //     lng
//     //   }
//     // }));
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
//             var name = responseJson.resourceSets[0].resources[0].name;
//       this.setState({
//         place: name
//       });
     
//     } catch (error) {
//       Alert.alert(error.toString());
//     }
// }
//    getcurrentLocation() {
//     if (navigator && navigator.geolocation) {
//       return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(pos => {
//           const coords = pos.coords;
//           resolve({
//             lat: coords.latitude,
//             lng: coords.longitude
//           });
//         });
//       });
//     }
//     return {
//       lat: 0,
//       lng: 0
//     };
//   }
//   addMarker = (location, map) => {
//     this.setState(prev => ({
//       fields: {
//         ...prev.fields,
//         location
//       }
//     }));
//     map.panTo(location);
//   };

//   render() {


//     return (
//       <View style={styles.container}>
//   <MapView
//           style={styles.map}
//         // region={this.state.mapRegion}
//         initialRegion={this.state.initialPosition}
     
//         //  customMapStyle={GLOBAL.mapStyle}
//          // initialRegion={this.state.region}
//         minZoomLevel={5}
//         maxZoomLevel={20}
//           showsUserLocation={true}
//           followUserLocation={true} 
//           showsBuildings={true}
//           onLongPress={(event) => {alert(event.nativeEvent.coordinate.latitude),alert(event.nativeEvent.coordinate.longitude)}}>
       
//         </MapView>
     
//         <View style={styles.rightContainer}>
//           <TouchableOpacity onPress={() => this.onDrawerPressed()}>
//             <Image style={styles.btnNotifiImage} source={require("../../../assets/images/filters-btn-2.png")} />
//           </TouchableOpacity>
//         </View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
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
//   rightContainer: {
    
//     position: "absolute",
//     resizeMode: "cover",
//     top: 30,
//     right: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 55,
//     width: 55,
//     borderRadius: 25
//   },
//   btnDrawerImage: {
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     tintColor:'black',
//     width: 30,
//     height: 30
//   },
//   btnNotifiImage: {
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     tintColor:'black',
//     width: 30,
//     height: 30
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 10,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     padding: 10,
//     elevation: 1,
//     backgroundColor: "#FFF",
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 1,
//   },
//   cardtitle: {
//     fontSize: 12,
//     marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   marker: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(130,4,150, 0.9)",
//   },
//   ring: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "rgba(130,4,150, 0.3)",
//     position: "absolute",
//     borderWidth: 1,
//     borderColor: "rgba(130,4,150, 0.5)",
//   },
// });

// AppRegistry.registerComponent("mapfocus", () => screens);




// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// export default class DiscoverEvents extends Component {
//     constructor(props) {
//         super(props);
//     }
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     )
//   }
// }
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Dimensions,
  BackHandler
} from "react-native";
import { RkButton, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Images } from "../../../assets/imageAll";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import { ifIphoneX } from "react-native-iphone-x-helper";
const GLOBAL = require("../Constant/Globals");

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var count = 0;
export default class EventLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
   
  }

  onDrawerPressed() {
   // Actions.drawerOpen("homeDrawer");
   Actions.drawerOpen();
  }
  watchID = null;
  componentDidMount() {
  
    if (Platform.OS === "android") {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      }).then(() => {
        // locationTracking(dispatch, getState, geolocationSettings);
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
        this.setState({ markerPosition: lastRegion });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    );
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    //alert('back pressed')
    this.props.navigation.goBack(null);
    //  Actions.pop();
    return true;
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
      var latix=the_lat.toString();
      var lngx=the_long.toString();
      AsyncStorage.setItem("event_Location", name);
      AsyncStorage.setItem("event_latitude", latix);

      AsyncStorage.setItem("event_longitude", lngx);
     // alert(name)
      this.setState({
        place: name
      });
      Actions.AddEvent();

    } catch (error) {
      Alert.alert(error.toString());
    }

    // Geocode.fromLatLng( this.state.latitude, this.state.longitude).then(
    //   response => {
    //     const address = response.results[0].formatted_address;
    //     Alert.alert(address);
    //   },
    //   error => {
    //     Alert.alert("error");
    //   }
    // );

    // fetch(
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //   this.state.latitude +
    //     "," +
    //     this.state.longitude +
    //     "&key="+GLOBAL.geoLocationAPIKey
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       place: response.data.results[0].formatted_address // access from response.data.results[0].formatted_address
    //   })
    //     Alert.alert(JSON.stringify(responseJson));
    //     // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        <View><MapView
          //mapType={"standard"}
          provider={PROVIDER_GOOGLE}
          //customMapStyle={GLOBAL.mapStyle}
          style={styles.map}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={true}
          minZoomLevel={11}
          maxZoomLevel={20}
          region={this.state.initialPosition}
          onLongPress={(event) => {this.getLocationAddress(event.nativeEvent.coordinate.latitude,event.nativeEvent.coordinate.longitude)}}
        >
          <MapView.Marker
            coordinate={this.state.markerPosition}
            title={this.state.place}
          />
        </MapView></View>
        <View>

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
   flex:1
  },
  map: {
    width: Screen.width,
    height: Screen.height,
   
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
  btnDrawerImage: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30
  },
  btnNotifiImage: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    tintColor:'black'
  },
  rightContainer: {
    backgroundColor: "#ddddda",
    position: "absolute",
    resizeMode: "cover",
    top: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    borderRadius: 15
  }
});
