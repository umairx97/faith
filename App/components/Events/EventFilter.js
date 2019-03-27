//
//  NearbyFilters.js
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
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Platform,
  Dimensions,
  AsyncStorage
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ButtonGroup } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import firebase from "react-native-firebase";

import { ifIphoneX } from "react-native-iphone-x-helper";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DateRangePicker from './DateRangePicker';

import SlidingUpPanel from 'rn-sliding-up-panel';
import { Images } from "../../../assets/imageAll";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var count = 0;
type Props = {};
export default class EventFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      Km: 18,
      values: [18, 75],
      place: "Searching...",
      startDate: '',
      endDate: '',
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
    this.updateIndex = this.updateIndex.bind(this);
    this.getUserInfo();

  }
  async getUserInfo() {
    var fullName;
    var gender = await AsyncStorage.getItem("reg_user_gender");
    var latitude = await AsyncStorage.getItem("reg_user_latitude");
    var longitude = await AsyncStorage.getItem("reg_user_longitude");
    var email;
    var user_Dob = await AsyncStorage.getItem("reg_user_dob");
    var profileImageURL;
    if (gender == "0") {
      this.setState({ selectedIndex: 1 });
    } else {
      this.setState({ selectedIndex: 1 });
    }
    this.getLocationAddress(
      latitude.replace(",", ""),
      longitude.replace(",", "")
    );
    var uidUser = await firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Users/FaithMeetsLove/EventSearchFilters/" + uidUser).once('value').then(snapshot => {
        var show_me = snapshot.val().show_me
        var distance = snapshot.val().distance
        var age_to = snapshot.val().age_to
        var age_from = snapshot.val().age_from

        this.setState({
          selectedIndex: show_me,
          Km: distance,
          values: [age_from, age_to]
        })
      })


  }
  getVal(val) {
    console.warn(val);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
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
  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  async getLocationAddress(the_lat, the_long) {
    try {
      let response = await fetch(
        "http://dev.virtualearth.net/REST/v1/Locations/" +
        the_lat +
        "," +
        the_long +
        "?includeEntityTypes=PopulatedPlace&includeNeighborhood=1&include=ciso2&key=AhSM34xkpIXcF5kfykYYeo7ilzzdU24XlF1MOl8CEu7OOL2eHd77WY45T-OdkQ7j"
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
  multiSliderValuesChange = values => {
    //alert(values)
    this.setState({
      values: values
    });
  };
  onAddDateRanger = () => {
    this._panel.show();
  }
  async onDonePressed() {
      var uidUser = await firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("Users/FaithMeetsLove/EventSearchFilters/" + uidUser)
        .update({
          show_me: this.state.selectedIndex,
          distance: this.state.Km,
          start_Date: this.state.startDate,
          end_Date: this.state.endDate,
        })
        .then(msg => {
          Actions.DiscoverEvent();
          //alert("Update Successfully");
        });
  }
  getDatesOnClick = (s, e) => {
  
    this.setState({
      startDate: s,
      endDate: e

    })
  }
  onSlideData = () => {
    return (<View style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)", alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Select Dates</Text>
      <DateRangePicker
        initialRange={['2018-04-01', '2018-04-10']}
        onSuccess={(s, e) => { this.getDatesOnClick(s, e) }}
        theme={{ markColor: 'red', markTextColor: 'white' }} />
      <TouchableOpacity onPress={() => { this._panel.hide() }}>
        <Text style={{ color: 'red', fontSize: 18, fontWeight: '600', marginTop: 150 }}>Close</Text>
      </TouchableOpacity>
    </View>)
  }
  render() {
    const buttons = ["Distance", "Date"];
    const { selectedIndex } = this.state;
    return (<View style={{ flex: 1 }}>
      <View style={styles.toplineView}>
        <Text style={styles.filterText}>Filter</Text>
        <TouchableOpacity
          onPress={() => {
            this.onDonePressed();
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)" }}>
        <View style={styles.nearbyFiltersView}>
          <View style={styles.contentsView}>
            <View style={styles.showMeView}>
              <Text style={styles.showMeText}>Short By :</Text>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 50, marginTop: 15 }}
              />
            </View>

            <View style={styles.locationsView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.locationText}>Location</Text>
              </View>
              <View
                style={styles.locationViewText}
              >
                {/* <Text style={styles.currentLocationText}>Current Location</Text> */}

                <Text style={styles.sanFranciscoText}>
                  {this.state.place}
                </Text>
                <Image
                  source={require("../../../assets/images/locations.png")}
                  style={styles.locationsImage}
                />
              </View>
            </View>
            <View style={styles.ageView}>
              <View
                style={{
                  flexDirection: "column",
                  alignSelf: "stretch"
                }}
              >
                {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}><Text style={styles.ageRangeText}>Date range</Text></View>
                  <View style={{ flex: 1 }}><TouchableOpacity onPress={() => { this.onAddDateRanger() }}><Image source={Images.iconCalenderRange} style={{ height: 35, width: 35 }} /></TouchableOpacity></View>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View ><Text style={styles.distanceText}>Event Date Range : </Text></View>
                  <View><TouchableOpacity onPress={() => { this.onAddDateRanger() }}>
                    <Image style={{ height: 30, width: 30 }} source={Images.iconCalenderRange} /></TouchableOpacity></View>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text>Start Date : </Text>
                    <Text>{this.state.startDate}</Text>
                  </View>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text>End Date : </Text><Text>{this.state.endDate}</Text></View>

                </View>

              </View>

            </View>

            <View style={styles.distanceView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "stretch",

                }}
              >
                <Text style={styles.distanceText}>Distance</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Slider
                    style={{ width: "85%", alignSelf: "center" }}
                    step={2}
                    minimumValue={2}
                    maximumValue={200}
                    value={this.state.Km}
                    onSlidingComplete={val => this.getVal(val)}
                    onValueChange={val => this.setState({ Km: val })}
                  />
                  <Text style={styles.kmText}>{this.state.Km} Km</Text>
                </View>
              </View>
            </View>

          </View>
        </View>
        <SlidingUpPanel ref={c => this._panel = c}>
          {() => this.onSlideData()}
        </SlidingUpPanel>
      </ScrollView>
    </View>
    );

  }
}

const styles = StyleSheet.create({
  nearbyFiltersView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  mainViewContainer: {
    flex: 1,

    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "column",
    ...ifIphoneX({ marginTop: 30 })
  },
  barsNavigationFilterView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 70,
    justifyContent: "center"
  },
  locationViewText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30,
    backgroundColor: "#fff"
  },
  contentsView: {
    backgroundColor: "rgb(255, 255, 255)"
  },
  rangeViewValue: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 83
  },
  showMeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 70,
    marginLeft: 16,
    marginTop: 15,
    marginRight: 16
  },
  locationsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 83,
    marginLeft: 16,
    marginTop: 40,
    marginRight: 16
  },
  distanceView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 60,
    marginLeft: 16,
    marginTop: 30,
    marginRight: 16
  },
  ageView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 91,
    marginLeft: 16,
    marginTop: 30,
    marginRight: 16
  },
  showMeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  guysText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    marginLeft: 38,
    marginTop: 28
  },
  rectangleViewLinearGradient: {
    width: 114,
    height: 18,
    alignSelf: "flex-end"
  },
  rectangleView: {
    width: "100%",
    height: "100%"
  },
  girlsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    marginTop: 47,
    alignSelf: "center"
  },
  bothText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: 43,
    marginRight: 40,
    alignSelf: "flex-end"
  },
  locationText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  locationsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 20,
    height: 20,
    paddingTop: 7,
    alignSelf: "center"
  },
  sanFranciscoText: {
    color: "black",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 1.5,
    paddingTop: 7
  },
  currentLocationText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 5,
    paddingTop: 7
  },
  distanceText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  kmText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    letterSpacing: -0.41
  },
  rectangle6View: {
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 3.5,
    height: 7,
    marginBottom: 17
  },
  rectangle6CopyView: {
    width: "100%",
    height: "100%"
  },
  rectangle6CopyViewLinearGradient: {
    borderRadius: 3.5,
    width: 200,
    height: 7,
    marginBottom: 17
  },
  ageRangeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    letterSpacing: -0.41,
    marginRight: 2
  },
  rectangle6CopyTwoViewLinearGradient: {
    borderRadius: 3.5,
    width: 97,
    height: 7,
    marginLeft: 37,
    marginBottom: 16
  },
  rectangle6CopyTwoView: {
    width: "100%",
    height: "100%"
  },
  rectangle6TwoView: {
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 3.5,
    width: 306,
    height: 7,
    marginBottom: 16
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
  },
  toplineView: {
    flexDirection: "row",
    backgroundColor: "rgb(248, 248, 248)",
    height: 50,

    justifyContent: "space-between"
  },
  filterText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginLeft: 16,
    marginTop: 10
  },
  filtersView: {
    backgroundColor: "rgb(218, 217, 226)",
    height: 1
  },
  doneText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    marginTop: 10,
    marginRight: 16,
    alignSelf: "flex-end"
  }
});
